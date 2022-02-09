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
exports.updateNote = void 0;
const player_1 = __importDefault(require("../models/player"));
const updateNote = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // Update custom player note; playerId got in URL, updated note in request body
    if (!req.params) {
        const error = new Error("Invalid URL");
        res.status(400);
        next(error);
    }
    if (!req.body.note) {
        const error = new Error("No note passed in the request");
        res.status(404);
        next(error);
    }
    const note = req.body.note;
    const player = yield player_1.default.findById(req.params.playerId);
    if (!player) {
        const error = new Error("Team not found");
        res.status(404);
        next(error);
    }
    else {
        player.comment = note;
        player.save();
        res.status(200).json({
            message: "Player comment updated",
            comment: note
        });
    }
});
exports.updateNote = updateNote;
