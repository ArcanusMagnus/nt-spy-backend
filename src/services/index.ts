import DatabaseService from "./databaseService/DatabaseService";
import databaseServiceProvider from "./databaseService";
import PlayerService from "./playerService/PlayerService";
import playerServiceProvider from "./playerService";

export interface ServiceContainer {
    dbService: DatabaseService;
    playerService: PlayerService;

}

export default (): ServiceContainer => {
    const dbService = databaseServiceProvider();

    const playerService = playerServiceProvider(dbService);
    return {
        dbService,
        playerService,
    };
}