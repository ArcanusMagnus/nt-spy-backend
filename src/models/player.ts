import mongoose from 'mongoose'
const Schema = mongoose.Schema

export interface PlayerType {
    nationality: string;
    name: string;
    ht_id: number;
    speciality?: string;
    injury?: number;
    onTL?: string;
    age_years: number;
    age_days: number;
    TSI: number;
    experience: number;
    leadership: number;
    form: number[];
    stamina: number[];
    NTmatches: number;
    U21matches: number;
    isInTeam: boolean;
    comment?: string;
    goalkeeping?: number;
    defending?: number;
    playmaking?: number;
    winger?: number;
    passing?: number;
    scoring?: number;
    setPieces?: number;
    team?: object;
    position?: string;
    salary?: number;
    updatedAt?: Date;
    createdAt?: Date;
};

const playerSchema = new Schema<PlayerType>({
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
    // need to store all update times
    team: {
        type: Schema.Types.ObjectId,
        ref: 'Team',
        required: true
    },
    salary: Number,
    position: String
},{
    timestamps: true
});

export default mongoose.model<PlayerType>('Player', playerSchema);