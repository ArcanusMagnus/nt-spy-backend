import { RequestHandler } from "express";

import Player, { PlayerType } from "../models/player";

export const updateNote: RequestHandler = async (req, res, next) => {
    // Update custom player note; playerId got in URL, updated note in request body
    if (!req.params) {
        const error = new Error("Invalid URL");
        res.status(400);
        next(error);
    }
    if(!req.body.note){
        const error = new Error("No note passed in the request");
        res.status(404);
        next(error);
    }
    const note = req.body.note as string;
    const player = await Player.findById(req.params.playerId);
    if(!player){
        const error = new Error("Team not found");
        res.status(404);
        next(error);
    } else {
        player.comment = note;
        player.save();
        res.status(200).json({
            message: "Player comment updated",
            comment: note
        });
    }
}