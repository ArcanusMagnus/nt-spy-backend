import { nextTick } from "process";
import { PlayerType } from "../models/player";

export function transformTeamData(inputTeam: object[]) {
    const team: PlayerType[] = []; // will store our result there
    for (let inputPlayer of inputTeam) {
        // Need to create an "empty" player so that it doesn't shout at me
        let player: PlayerType = {
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
                    case 'Nationality':
                        player.nationality = inputPlayer[key];
                        break;
                    case 'Jméno':
                    case 'Name':
                        player.name = inputPlayer[key];
                        break;
                    case 'ID hráče':
                    case 'PlayerID':
                        player.ht_id = inputPlayer[key];
                        break;
                    case 'Specialita':
                    case 'Speciality':
                        player.speciality = inputPlayer[key];
                        break;
                    case 'Zranění ':
                    case 'Injuries ':
                        player.injury = +inputPlayer[key];
                        break;
                    case 'Na přestupové listině':
                    case 'Transfer-listed':
                        player.onTL = inputPlayer[key];
                        break;
                    case 'Věk':
                    case 'Age':
                        player.age_years = +inputPlayer[key];
                        break;
                    case 'dní':
                    case 'Days':
                        player.age_days = +inputPlayer[key];
                        break;
                    case 'TSI':
                        player.TSI = +inputPlayer[key];
                        break;
                    case 'Zkušenost':
                    case 'Experience':
                        player.experience = +inputPlayer[key];
                        break;
                    case 'Vůdcovství':
                    case 'Leadership':
                        player.leadership = +inputPlayer[key];
                        break;
                    case 'Forma':
                    case 'Form':
                        player.form.push(+inputPlayer[key]);
                        break;
                    case 'Kondice':
                    case 'Stamina':
                        player.stamina.push(+inputPlayer[key]);
                        break;
                    case 'Chytání':
                    case 'Keeper':
                        player.goalkeeping = +inputPlayer[key];
                        break;
                    case 'Bránění':
                    case 'Defending':
                        player.defending = +inputPlayer[key];
                        break;
                    case 'Tvorba hry':
                    case 'Playmaking':
                        player.playmaking = +inputPlayer[key];
                        break;
                    case 'Křídlo':
                    case 'Winger':
                        player.winger = +inputPlayer[key];
                        break;
                    case 'Přihrávky':
                    case 'Passing':
                        player.passing = +inputPlayer[key];
                        break;
                    case 'Zakončování':
                    case 'Scoring':
                        player.scoring = +inputPlayer[key];
                        break;
                    case 'Standardky':
                    case 'Set pieces':
                        player.setPieces = +inputPlayer[key];
                        break;
                    case 'Zápasy za Národní tým':
                    case 'Matches for the national team':
                        player.NTmatches = +inputPlayer[key];
                        break;
                    case 'Zápasy za NT U21':
                    case 'Matches for the national U21 team':
                        player.U21matches = +inputPlayer[key];
                        break;
                    case 'Hráč národního týmu!':
                    case 'National team player!':
                        player.isInTeam = inputPlayer[key] as boolean;
                        break;
                    default:
                        // For some reason, in some cases it doesn't accept "Vlast" as a key, even if I console.log it right here and it says "Vlast". Gave up on figuring out why.
                        player.nationality = inputPlayer[key];
                }
            }
        }
        // Here we assume we got a correct file - needs error handling
        team.push(player);
        // console.log(player);
        if (
            player.nationality === '' ||
            player.TSI === 0 ||
            player.ht_id === 0 ||
            player.age_years === 0 ||
            player.experience === 0 ||
            player.leadership === 0
        ) {
            console.log('Error - false data');
            throw new Error('Error - false data');
        }
    }
    return team;
}

// Googled function to make for-in loop above work, try to understand it later
function hasKey<O>(obj: O, key: PropertyKey): key is keyof O {
    return key in obj
}