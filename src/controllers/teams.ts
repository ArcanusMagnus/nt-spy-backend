import fs from "fs";

import { RequestHandler } from "express";
import csv from "csv-parser";
import { normalizeKeys } from "object-keys-normalizer";

import Player, { PlayerType } from "../models/player";
import Team from "../models/team";

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
            teamRaw.push(data)
        })
        .on("end", () => {
            const team: PlayerType[] = transformTeamData(teamRaw);
            res.status(201).json({
                message: "Csv File uploaded and processed successfully",
                team: team
            });
        });
};

function transformTeamData (inputTeam: object[]) {
    const team: PlayerType[] = []; // will store our result there
    for (let inputPlayer of inputTeam) {
        // Need to create an "empty" player so that it doesn't shout at me
        let player: PlayerType = {
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
                switch(key){
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
                        player.isInTeam = inputPlayer[key] as boolean;
                        break;
                }
            }
        }
        team.push(player);
    }
    return team;
}

// Googled function to make for-in loop above work, try to understand it later
function hasKey<O>(obj: O, key: PropertyKey): key is keyof O {
    return key in obj
}