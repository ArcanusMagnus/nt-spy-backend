import { timingSafeEqual } from "crypto";
import { RequestHandler } from "express";

import Player, { PlayerType } from "../models/player";
import Team from '../models/team';

export const updatePlayer: RequestHandler = async (req, res, next) => {
    // Update custom player note; playerId got in URL, updated note in request body
    if (!req.params) {
        const error = new Error("Invalid URL");
        res.status(404);
        next(error);
    }
    if (!req.body) {
        const error = new Error("Nothing passed in the request");
        res.status(404);
        next(error);
    }
    // Add validation
    const player = await Player.findById(req.params.playerId);
    if (!player) {
        const error = new Error("Player not found");
        res.status(404);
        next(error);
    } else {
        if (req.body.position) {
            player.position = req.body.position as string;
        }
        if (req.body.note) {
            player.comment = req.body.note as string;
        }
        if (req.body.salary) {
            player.salary = req.body.salary as number;
        }
        // add more editables later

        // This could have been an intelligent solution, but doesn't work because fuck Mongoose
        // for (let key in req.body) {
        //     if (key in player){
        //         player[key] = req.body[key];
        //     }
        // }

        player.save();
        res.status(200).json({
            message: "Player updated",
            player: player
        });
    }
}

export const deletePlayer: RequestHandler = async (req, res, next) => {
    if (!req.params.playerId) {
        const error = new Error("Invalid URL");
        res.status(404);
        return next(error);
    }
    const player = await Player.findById(req.params.playerId);
    if(!player){
        const error = new Error("Player not found");
        res.status(404);
        return next(error);
    }
    const nation = await Team.findById(player.team);
    if(!nation){
        // this shouldn't ever happen, but still
        const error = new Error("Player's nation not found");
        res.status(404);
        return next(error);
    }
    // Stupid solution, but didn't find better that works
    for(let playerRef in nation.players){
        if(nation.players[playerRef].toString() === player._id.toString()){
            nation.players.splice(+playerRef,1)
            break;
        }
    }
    await nation.save();
    await Player.findByIdAndRemove(req.params.playerId);
    res.status(200).json({
        message: "Player deleted successfully"
    });

}