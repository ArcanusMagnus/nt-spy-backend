"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTeams = void 0;
const team_1 = __importDefault(require("../models/team"));
const getTeams = (req, res, next) => {
    const teams = team_1.default.find();
    if (!teams) {
        errorThrower('No teams in the database', 404);
    }
    res.status(200).json({
        message: 'List of teams successfully fetched',
        teams: teams
    });
};
exports.getTeams = getTeams;
const errorThrower = (err, code) => {
    const error = new Error(err);
    throw error;
};
// const errorForwarder = err => {
//     if (!err.statusCode) {
//         err.statusCode = 500
//     }
//     next(err)
// }
