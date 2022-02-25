import PlayerService from "./PlayerService";
import DatabaseService from "../databaseService/DatabaseService";

export default (dbService: DatabaseService): PlayerService => {
    return new PlayerService(dbService);
}