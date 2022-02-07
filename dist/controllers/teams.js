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
    })
        .on("end", () => {
        const team = transformTeamData(teamRaw);
        res.status(201).json({
            message: "Csv File uploaded and processed successfully",
            team: team
        });
    });
});
exports.uploadCsvFile = uploadCsvFile;
function transformTeamData(inputTeam) {
    const team = []; // will store our result there
    for (let inputPlayer of inputTeam) {
        // Need to create an "empty" player so that it doesn't shout at me
        let player = {
            nationality: '',
            name: '',
            ht_id: 0,
            age_years: 0,
            age_days: 0,
            TSI: 0,
            experience: 0,
            leadership: 0,
            form: [],
            stamina: [],
            NTmatches: 0,
            U21matches: 0,
            isInTeam: false
        };
        // Loop through all key and assign to the new "player" with normal key names
        for (let key in inputPlayer) {
            if (hasKey(inputPlayer, key)) {
                switch (key) {
                    case 'Vlast':
                        player.nationality = inputPlayer[key];
                        break;
                    case 'Jméno':
                        player.name = inputPlayer[key];
                        break;
                    case 'ID hráče':
                        player.ht_id = inputPlayer[key];
                        break;
                    case 'Specialita':
                        // need to create transform speciality function
                        player.speciality = inputPlayer[key];
                        break;
                    case 'Zranění':
                        player.injury = inputPlayer[key];
                        break;
                    case 'Na přestupové listině':
                        player.onTL = inputPlayer[key];
                        break;
                    case 'Věk':
                        player.age_years = inputPlayer[key];
                        break;
                    case 'dní':
                        player.age_days = inputPlayer[key];
                        break;
                    case 'TSI':
                        player.TSI = inputPlayer[key];
                        break;
                    case 'Zkušenost':
                        player.experience = inputPlayer[key];
                        break;
                    case 'Vůdcovství':
                        player.leadership = inputPlayer[key];
                        break;
                    case 'Forma':
                        player.form.push(inputPlayer[key]);
                        break;
                    case 'Kondice':
                        player.stamina.push(inputPlayer[key]);
                        break;
                    case 'Chytání':
                        player.goalkeeping = inputPlayer[key];
                        break;
                    case 'Bránění':
                        player.defending = inputPlayer[key];
                        break;
                    case 'Tvorba hry':
                        player.playmaking = inputPlayer[key];
                        break;
                    case 'Křídlo':
                        player.winger = inputPlayer[key];
                        break;
                    case 'Přihrávky':
                        player.passing = inputPlayer[key];
                        break;
                    case 'Zakončování':
                        player.scoring = inputPlayer[key];
                        break;
                    case 'Standardky':
                        player.setPieces = inputPlayer[key];
                        break;
                    case 'Zápasy za Národní tým':
                        player.NTmatches = inputPlayer[key];
                        break;
                    case 'Zápasy za NT U21':
                        player.U21matches = inputPlayer[key];
                        break;
                    case 'Hráč národního týmu!':
                        player.isInTeam = inputPlayer[key];
                        break;
                }
            }
        }
        team.push(player);
    }
    return team;
}
// Googled function to make for-in loop above work, try to understand it later
function hasKey(obj, key) {
    return key in obj;
}
