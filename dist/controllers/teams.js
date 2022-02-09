"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadCsvFile = exports.getOneTeam = exports.getTeams = void 0;
const fs_1 = __importDefault(require("fs"));
const csv_parser_1 = __importDefault(require("csv-parser"));
const team_data_transformer_1 = require("../util/team-data-transformer");
const team_1 = __importDefault(require("../models/team"));
const insert_into_db_1 = require("../util/insert-into-db");
// Simply get list of all teams
const getTeams = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const teams = yield team_1.default.find();
    if (!teams || teams.length === 0) {
        const error = new Error("No teams in the database");
        res.status(404);
        next(error);
    }
    else {
        res.status(200).json({
            message: "List of teams successfully fetched",
            teams: teams
        });
    }
});
exports.getTeams = getTeams;
// Get one team by ID and populate it by player data
const getOneTeam = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.params) {
        const error = new Error("Invalid URL");
        res.status(400);
        next(error);
    }
    // TODO: This throws unhandled error if id wrong
    const team = yield team_1.default.findById(req.params.teamId);
    if (!team) {
        const error = new Error("Team not found");
        res.status(404);
        next(error);
    }
    else {
        const populatedTeam = yield team.populate('players');
        res.status(200).json({
            message: "Team successfully fetched",
            team: populatedTeam
        });
    }
});
exports.getOneTeam = getOneTeam;
// Upload CSV exported from Hattrick - a lot more security and error handling stuff to do
// Maybe needs a cleanup function - compare old IDs with new ones and delete players who are not in the list anymore
const uploadCsvFile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.file) {
        const error = new Error("No file provided");
        res.status(404);
        next(error);
    }
    const teamRaw = [];
    const fileUrl = req.file.path.replace("\\", "/");
    fs_1.default.createReadStream(fileUrl)
        .pipe((0, csv_parser_1.default)())
        .on("data", (data) => {
        teamRaw.push(data);
    })
        .on("end", () => {
        fs_1.default.unlinkSync(fileUrl);
        if (teamRaw.length == 0) {
            res.status(204).json({
                message: "No data found in provided file"
            });
        }
        else {
            const team = (0, team_data_transformer_1.transformTeamData)(teamRaw);
            (0, insert_into_db_1.insertTeamIntoDb)(team);
            res.status(201).json({
                message: "Csv File uploaded and processed successfully",
                team: team
            });
        }
    });
});
exports.uploadCsvFile = uploadCsvFile;
