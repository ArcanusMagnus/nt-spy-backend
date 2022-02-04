import Team from '../models/team'
import Player from '../models/player'
import { RequestHandler } from 'express';


export const getTeams: RequestHandler = (req, res, next) => {
    const teams = Team.find()
    if (!teams) {
        errorThrower('No teams in the database', 404);
    }
    res.status(200).json({
        message: 'List of teams successfully fetched',
        teams: teams
    });
}

const errorThrower = (err: string, code: number) => {
    const error = new Error(err)
    throw error
}

// const errorForwarder = err => {
//     if (!err.statusCode) {
//         err.statusCode = 500
//     }
//     next(err)
// }
