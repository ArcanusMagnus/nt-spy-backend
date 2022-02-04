import mongoose from 'mongoose'
const Schema = mongoose.Schema

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
})

export default mongoose.model('Team', teamSchema)