"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const teamSchema = new Schema({
    country: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    players: [{
            type: Schema.Types.ObjectId,
            ref: 'Player'
        }]
});
exports.default = mongoose_1.default.model('Team', teamSchema);
