"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
;
const playerSchema = new Schema({
    nationality: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    ht_id: {
        type: Number,
        required: true
    },
    speciality: String,
    injury: Number,
    onTL: String,
    age_years: {
        type: Number,
        required: true
    },
    age_days: {
        type: Number,
        required: true
    },
    TSI: {
        type: Number,
        required: true
    },
    experience: {
        type: Number,
        required: true
    },
    leadership: {
        type: Number,
        required: true
    },
    form: [{
            type: Number,
            required: true
        }],
    stamina: [{
            type: Number,
            required: true
        }],
    NTmatches: {
        type: Number,
        required: true
    },
    U21matches: {
        type: Number,
        required: true
    },
    isInTeam: {
        type: Boolean,
        required: true
    },
    comment: String,
    goalkeeping: Number,
    defending: Number,
    playmaking: Number,
    winger: Number,
    passing: Number,
    scoring: Number,
    setPieces: Number,
    team: {
        type: Schema.Types.ObjectId,
        ref: 'Team',
        required: true
    }
}, {
    timestamps: true
});
exports.default = mongoose_1.default.model('Player', playerSchema);
