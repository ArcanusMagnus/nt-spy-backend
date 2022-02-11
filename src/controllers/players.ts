import { RequestHandler } from "express";

import Player, { PlayerType, Position } from "../models/player";
import Team from '../models/team';
import { calculateAge } from "../util/actual-age";
import { validatePosition } from "../util/validation";

export const getPlayer: RequestHandler = async (req, res, next) => {
    if (!req.params) {
        const error = new Error("Invalid URL");
        res.status(404);
        return next(error);
    }
    const player = await Player.findById(req.params.playerId);
    if (!player) {
        const error = new Error("Player not found");
        res.status(404);
        return next(error);
    }
    calculateAge(player);
    res.status(200).json({
        message: 'Player successfully fetched',
        player: player
    });
}

export const updatePlayer: RequestHandler = async (req, res, next) => {
    // Update custom player note; playerId got in URL, updated note in request body
    if (!req.params.playerId  || !req.params.playerId.match(/^[0-9a-fA-F]{24}$/)) {
        const error = new Error("Invalid URL");
        res.status(404);
        return next(error);
    }
    if (!req.body) {
        const error = new Error("Nothing passed in the request");
        res.status(404);
        return next(error);
    }
    // Add validation
    const player = await Player.findById(req.params.playerId);
    if (!player) {
        const error = new Error("Player not found");
        res.status(404);
        return next(error);
    }
    if (req.body.position) {
        const position: boolean = validatePosition(req.body.position);
        if (position) {
            player.position = req.body.position as Position;
        } else {
            const error = new Error("Assigned position doesn't exist.");
            res.status(403);
            return next(error);
        }
    }
    // TODO: #3 cases bellow need some validation - maybe add later as middleware
    if (req.body.note) {
        player.comment = req.body.note as string;
    }
    if (req.body.salary) {
        player.salary = req.body.salary as number;
    }
    if (req.body.hidden) {
        player.hidden = req.body.hidden as boolean;
    }
    if (req.body.goalkeeping) {
        player.goalkeeping = req.body.goalkeeping as number;
    }
    if (req.body.defending) {
        player.defending = req.body.defending as number;
    }
    if (req.body.playmaking) {
        player.playmaking = req.body.playmaking as number;
    }
    if (req.body.winger) {
        player.winger = req.body.winger as number;
    }
    if (req.body.passing) {
        player.passing = req.body.passing as number;
    }
    if (req.body.scoring) {
        player.scoring = req.body.scoring as number;
    }
    if (req.body.setPieces) {
        player.setPieces = req.body.setPieces as number;
    }
    // add more editables later

    // This could have been an intelligent solution, but doesn't work because fuck Mongoose
    // for (let key in req.body) {
    //     if (key in player){
    //         player[key] = req.body[key];
    //     }
    // }

    player.save();
    // maybe change to 204 later
    res.status(200).json({
        message: "Player updated",
        player: player
    });
}

export const deletePlayer: RequestHandler = async (req, res, next) => {
    if (!req.params.playerId   || !req.params.playerId.match(/^[0-9a-fA-F]{24}$/)) {
        const error = new Error("Invalid URL");
        res.status(404);
        return next(error);
    }
    const player = await Player.findById(req.params.playerId);
    if (!player) {
        const error = new Error("Player not found");
        res.status(404);
        return next(error);
    }
    const nation = await Team.findById(player.team);
    if (!nation) {
        // this shouldn't ever happen, but still
        const error = new Error("Player's nation not found");
        res.status(404);
        return next(error);
    }
    // Stupid solution, but didn't find better that works
    for (let playerRef in nation.players) {
        if (nation.players[playerRef].toString() === player._id.toString()) {
            nation.players.splice(+playerRef, 1)
            break;
        }
    }
    await nation.save();
    await Player.findByIdAndRemove(req.params.playerId);
    res.status(200).json({
        message: "Player deleted successfully"
    });

}