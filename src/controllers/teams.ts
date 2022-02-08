import fs from "fs";

import { RequestHandler } from "express";
import csv from "csv-parser";

import { PlayerType } from "../models/player";
import { transformTeamData } from "../util/team-data-transformer";
import Team, { teamType } from "../models/team";
import { insertTeamIntoDb } from "../util/insert-into-db";

// Simply get list of all teams
export const getTeams: RequestHandler = async (req, res, next) => {
    const teams = await Team.find();
    if (!teams || teams.length === 0) {
        const error = new Error("No teams in the database");
        res.status(404);
        next(error);
    } else {
        res.status(200).json({
            message: "List of teams successfully fetched",
            teams: teams
        });
    }
};

// Get one team by ID and populate it by player data
export const getOneTeam: RequestHandler = async (req, res, next) => {
    if (!req.params) {
        const error = new Error("Invalid URL");
        res.status(400);
        next(error);
    }
    // TODO: This throws unhandled error if id wrong
    const team = await Team.findById(req.params.teamId);
    if (!team) {
        const error = new Error("Team not found");
        res.status(404);
        next(error);
    } else {
        const populatedTeam: teamType = await team.populate('players');
        res.status(200).json({
            message: "Team successfully fetched",
            team: populatedTeam
        });
    }
};

// Upload CSV exported from Hattrick - a lot more security and error handling stuff to do
export const uploadCsvFile: RequestHandler = async (req, res, next) => {
    if (!req.file) {
        const error = new Error("No file provided");
        res.status(404);
        next(error);
    }
    const teamRaw: Object[] = [];
    const fileUrl = req.file!.path.replace("\\", "/");
    fs.createReadStream(fileUrl)
        .pipe(csv())
        .on("data", (data) => {
            teamRaw.push(data);
        })
        .on("end", () => {
            fs.unlinkSync(fileUrl);
            if (teamRaw.length == 0) {
                res.status(204).json({
                    message: "No data found in provided file"
                });
            } else {
                const team: PlayerType[] = transformTeamData(teamRaw);
                insertTeamIntoDb(team);
                res.status(201).json({
                    message: "Csv File uploaded and processed successfully",
                    team: team
                });
            }
        });
};