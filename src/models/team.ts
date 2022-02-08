import mongoose from 'mongoose'
import { PlayerType } from './player'
const Schema = mongoose.Schema

export interface teamType {
    country: string;
    category: string;
    players: PlayerType[]
}

const teamSchema = new Schema<teamType>({
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
        ref: 'Player',
        default: []
    }]
})

export default mongoose.model<teamType>('Team', teamSchema)