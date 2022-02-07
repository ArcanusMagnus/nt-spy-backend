import fs from "fs";

import { RequestHandler } from "express";
import csv from "csv-parser";

import Player, { PlayerType } from "../models/player";
import { transformTeamData } from "../util/team-data-transformer";
import Team from "../models/team";
import team from "../models/team";

export const getTeams: RequestHandler = async (req, res, next) => {
    const teams = Team.find();
    if (!teams) {
        const error = new Error("No teams in the database");
        res.status(404);
        next(error);
    }
    res.status(200).json({
        message: "List of teams successfully fetched",
        teams: teams,
    });
};

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
            console.log(data);
        })
        .on("end", () => {
            if(teamRaw.length == 0){
                res.status(204).json({
                    message: "No data found in provided file"
                });
            } else {
                const team: PlayerType[] = transformTeamData(teamRaw);
                insertPlayersIntoDb(team);
                fs.unlinkSync(fileUrl);
                res.status(201).json({
                    message: "Csv File uploaded and processed successfully",
                    team: team
                });
            }
        });
};

async function insertPlayersIntoDb(team: PlayerType[]){
    // Decide team category, refactor into separate function maybe later
    let category: String = 'U21';
    let averageAge: number = 0;
    for(let player of team){
        if(player.NTmatches > 0){
            category = 'NT';
            break;
        }
        averageAge += (player.age_years * 112 + player.age_days);
    }
    averageAge = (averageAge / 112) / team.length;
    if( averageAge > 22 && category === 'U21'){
        category = 'NT';
    };
    
    // If nation already in the db, find and update
    const nationality = team[0].nationality;
    const existingTeam = await Team.find({country: nationality, category: category});
    console.log(existingTeam);
    if(existingTeam.length > 0){
        console.log('This team already exists');
        // Update players and team solution to be done
    } else{
        // Create & insert into db
        //Need to create players first
        // console.log(nationality + '' + category);
        const newTeam = new Team({
            country: nationality,
            category: category
        });
        await newTeam.save();
    }

};