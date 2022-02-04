import mongoose from 'mongoose'
const Schema = mongoose.Schema

const playerSchema = new Schema({
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
},{
    timestamps: true
})

export default mongoose.model('Player', playerSchema)