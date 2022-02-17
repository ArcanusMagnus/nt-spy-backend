import DatabaseService from "../databaseService/DatabaseService";
import PlayerModel from "./models/PlayerModel";

export default class PlayerService {
    constructor(private readonly dbService: DatabaseService) {}

    public doSomething(): void {
        console.log("aaa");
    }

    getPlayerModel(id: number): PlayerModel | undefined {
        try {
            const player = this.dbService.getPlayerById(id);
            return {
                id: player.player_id,
            };
        } catch (err) {
            return undefined;
        }
    }
}