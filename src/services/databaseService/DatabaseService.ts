import PlayerDbModel from "./models/PlayerDbModel";

export default class DatabaseService {
    public doSomething(): void {
        console.log("aaa");
    }

    getPlayerById(id: number): PlayerDbModel {
        return {
            player_id: -1,
        };
    }
}