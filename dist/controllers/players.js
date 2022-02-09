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
exports.deletePlayer = exports.updatePlayer = void 0;
const player_1 = __importDefault(require("../models/player"));
const team_1 = __importDefault(require("../models/team"));
const updatePlayer = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
    const player = yield player_1.default.findById(req.params.playerId);
    if (!player) {
        const error = new Error("Player not found");
        res.status(404);
        next(error);
    }
    else {
        if (req.body.position) {
            player.position = req.body.position;
        }
        if (req.body.note) {
            player.comment = req.body.note;
        }
        if (req.body.salary) {
            player.salary = req.body.salary;
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
});
exports.updatePlayer = updatePlayer;
const deletePlayer = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.params.playerId) {
        const error = new Error("Invalid URL");
        res.status(404);
        return next(error);
    }
    const player = yield player_1.default.findById(req.params.playerId);
    if (!player) {
        const error = new Error("Player not found");
        res.status(404);
        return next(error);
    }
    const nation = yield team_1.default.findById(player.team);
    if (!nation) {
        // this shouldn't ever happen, but still
        const error = new Error("Player's nation not found");
        res.status(404);
        return next(error);
    }
    // Stupid solution, but didn't find better that works
    for (let playerRef in nation.players) {
        if (nation.players[playerRef].toString() === player._id.toString()) {
            nation.players.splice(+playerRef, 1);
            break;
        }
    }
    yield nation.save();
    yield player_1.default.findByIdAndRemove(req.params.playerId);
    res.status(200).json({
        message: "Player deleted successfully"
    });
});
exports.deletePlayer = deletePlayer;
