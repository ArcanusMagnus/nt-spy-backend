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
exports.uploadCsvFile = exports.getTeams = void 0;
const fs_1 = __importDefault(require("fs"));
const csv_parser_1 = __importDefault(require("csv-parser"));
const team_data_transformer_1 = require("../util/team-data-transformer");
const team_1 = __importDefault(require("../models/team"));
const getTeams = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const teams = team_1.default.find();
    if (!teams) {
        const error = new Error("No teams in the database");
        res.status(404);
        next(error);
    }
    res.status(200).json({
        message: "List of teams successfully fetched",
        teams: teams,
    });
});
exports.getTeams = getTeams;
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
        console.log(data);
    })
        .on("end", () => {
        if (teamRaw.length == 0) {
            res.status(204).json({
                message: "No data found in provided file"
            });
        }
        else {
            const team = (0, team_data_transformer_1.transformTeamData)(teamRaw);
            insertPlayersIntoDb(team);
            fs_1.default.unlinkSync(fileUrl);
            res.status(201).json({
                message: "Csv File uploaded and processed successfully",
                team: team
            });
        }
    });
});
exports.uploadCsvFile = uploadCsvFile;
function insertPlayersIntoDb(team) {
    return __awaiter(this, void 0, void 0, function* () {
        // Decide team category, refactor into separate function maybe later
        let category = 'U21';
        let averageAge = 0;
        for (let player of team) {
            if (player.NTmatches > 0) {
                category = 'NT';
                break;
            }
            averageAge += (player.age_years * 112 + player.age_days);
        }
        averageAge = (averageAge / 112) / team.length;
        if (averageAge > 22 && category === 'U21') {
            category = 'NT';
        }
        ;
        // If nation already in the db, find and update
        const nationality = team[0].nationality;
        const existingTeam = yield team_1.default.find({ country: nationality, category: category });
        console.log(existingTeam);
        if (existingTeam.length > 0) {
            console.log('This team already exists');
            // Update players and team solution to be done
        }
        else {
            // Create & insert into db
            //Need to create players first
            // console.log(nationality + '' + category);
            const newTeam = new team_1.default({
                country: nationality,
                category: category
            });
            yield newTeam.save();
        }
    });
}
;
