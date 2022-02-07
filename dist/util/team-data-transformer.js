"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformTeamData = void 0;
function transformTeamData(inputTeam) {
    const team = []; // will store our result there
    for (let inputPlayer of inputTeam) {
        // Need to create an "empty" player so that it doesn't shout at me
        let player = {
            nationality: '',
            name: '',
            ht_id: 0,
            age_years: 0,
            age_days: 0,
            TSI: 0,
            experience: 0,
            leadership: 0,
            form: [],
            stamina: [],
            NTmatches: 0,
            U21matches: 0,
            isInTeam: false
        };
        // Loop through all key and assign to the new "player" with normal key names
        for (let key in inputPlayer) {
            if (hasKey(inputPlayer, key)) {
                // console.log(key);
                switch (key) {
                    case 'Vlast':
                        player.nationality = inputPlayer[key];
                        break;
                    case 'Jméno':
                        player.name = inputPlayer[key];
                        break;
                    case 'ID hráče':
                        player.ht_id = inputPlayer[key];
                        break;
                    case 'Specialita':
                        player.speciality = inputPlayer[key];
                        break;
                    case 'Zranění ':
                        player.injury = +inputPlayer[key];
                        break;
                    case 'Na přestupové listině':
                        player.onTL = inputPlayer[key];
                        break;
                    case 'Věk':
                        player.age_years = +inputPlayer[key];
                        break;
                    case 'dní':
                        player.age_days = +inputPlayer[key];
                        break;
                    case 'TSI':
                        player.TSI = +inputPlayer[key];
                        break;
                    case 'Zkušenost':
                        player.experience = +inputPlayer[key];
                        break;
                    case 'Vůdcovství':
                        player.leadership = +inputPlayer[key];
                        break;
                    case 'Forma':
                        player.form.push(+inputPlayer[key]);
                        break;
                    case 'Kondice':
                        player.stamina.push(+inputPlayer[key]);
                        break;
                    case 'Chytání':
                        player.goalkeeping = +inputPlayer[key];
                        break;
                    case 'Bránění':
                        player.defending = +inputPlayer[key];
                        break;
                    case 'Tvorba hry':
                        player.playmaking = +inputPlayer[key];
                        break;
                    case 'Křídlo':
                        player.winger = +inputPlayer[key];
                        break;
                    case 'Přihrávky':
                        player.passing = +inputPlayer[key];
                        break;
                    case 'Zakončování':
                        player.scoring = +inputPlayer[key];
                        break;
                    case 'Standardky':
                        player.setPieces = +inputPlayer[key];
                        break;
                    case 'Zápasy za Národní tým':
                        player.NTmatches = +inputPlayer[key];
                        break;
                    case 'Zápasy za NT U21':
                        player.U21matches = +inputPlayer[key];
                        break;
                    case 'Hráč národního týmu!':
                        player.isInTeam = inputPlayer[key];
                        break;
                    default:
                        // For some reason, in some cases it doesn't accept "Vlast" as a key, even if I console.log it right here and it says "Vlast". Gave up on figuring out why.
                        player.nationality = inputPlayer[key];
                }
            }
        }
        // Here we assume we got a correct file - needs error handling
        team.push(player);
    }
    return team;
}
exports.transformTeamData = transformTeamData;
// Googled function to make for-in loop above work, try to understand it later
function hasKey(obj, key) {
    return key in obj;
}
