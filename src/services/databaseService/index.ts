import DatabaseService from "./DatabaseService";

export default (): DatabaseService => {
    return new DatabaseService();
}