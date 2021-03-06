import Team from "../models/team";
import Player, { PlayerType } from "../models/player";
import { CountryTranslation } from "./translate-countries";
import { calculateExpiry } from "./actual-age";

export const insertTeamIntoDb = async (team: PlayerType[]) => {
    // Decide team category, refactor into separate function maybe later
    let category: String = 'U21';
    let averageAge: number = 0;
    for(let player of team){
        if(player.NTmatches > 0){
            category = 'NT';
            break;
        }
        averageAge += (player.age_years * 112 + player.age_days);
    }
    averageAge = (averageAge / 112) / team.length;
    if( averageAge > 22 && category === 'U21'){
        category = 'NT';
    };
    
    // If nation already in the db, find and update
    let nationality = team[0].nationality;
    // Translate country name to English (works only for Czech lang. now)
    if(CountryTranslation[nationality]){
        nationality = CountryTranslation[nationality];
    }

    const existingTeam = await Team.findOne({country: nationality, category: category});
    // console.log(existingTeam);
    if(existingTeam){
        for(let player of team){
            let oldPlayerData = await Player.findOne({ht_id: player.ht_id});
            if(oldPlayerData){
                const date = new Date();
                // If player was created or updated at least one hour ago - protection against accidental multiple upload
                if(
                    date.valueOf() - oldPlayerData.createdAt!.valueOf() > 3600000 &&
                    date.valueOf() - oldPlayerData.updatedAt!.valueOf() > 3600000
                ){
                    // update old player
                    oldPlayerData.injury = player.injury;
                    oldPlayerData.onTL = player.onTL;
                    oldPlayerData.TSI.push(player.TSI[0]);
                    oldPlayerData.experience = player.experience;
                    oldPlayerData.form.push(player.form[0]);
                    oldPlayerData.stamina.push(player.stamina[0]);
                    oldPlayerData.updates.push(player.updates[0]);
                    oldPlayerData.NTmatches = player.NTmatches;
                    oldPlayerData.U21matches = player.U21matches;
                    oldPlayerData.isInTeam = player.isInTeam;
                    oldPlayerData.goalkeeping = player.goalkeeping;
                    oldPlayerData.defending = player.defending;
                    oldPlayerData.playmaking = player.playmaking;
                    oldPlayerData.winger = player.winger;
                    oldPlayerData.passing = player.passing;
                    oldPlayerData.scoring = player.scoring;
                    oldPlayerData.setPieces = player.setPieces;
                    oldPlayerData.save();
                } else {
                    console.log("Recent player data present, updating stopped.");
                }
            } else {
                // create a new player
                let newPlayer = new Player({
                    nationality: nationality,
                    name: player.name,
                    ht_id: player.ht_id,
                    speciality: player.speciality,
                    injury: player.injury,
                    onTL: player.onTL,
                    age_days: player.age_days,
                    age_years: player.age_years,
                    TSI: player.TSI,
                    experience: player.experience,
                    leadership: player.leadership,
                    form: player.form,
                    stamina: player.stamina,
                    NTmatches: player.NTmatches,
                    U21matches: player.U21matches,
                    isInTeam: player.isInTeam,
                    goalkeeping: player.goalkeeping,
                    defending: player.defending,
                    playmaking: player.playmaking,
                    winger: player.winger,
                    passing: player.passing,
                    scoring: player.scoring,
                    setPieces: player.setPieces,
                    updates: player.updates,
                    expiry: calculateExpiry(player.age_years,player.age_days),
                    team: existingTeam._id
                });
                newPlayer.save();
                existingTeam.players.push(newPlayer);
            }
        }
        existingTeam.save();
        // console.log('This team already exists');
        // Update players and team solution to be done
    } else{
        // Create team
        const newTeam = new Team({
            country: nationality,
            category: category
        });
        // Create players
        for(let player of team){
            let newPlayer = new Player({
                nationality: nationality,
                name: player.name,
                ht_id: player.ht_id,
                speciality: player.speciality,
                injury: player.injury,
                onTL: player.onTL,
                age_days: player.age_days,
                age_years: player.age_years,
                TSI: player.TSI,
                experience: player.experience,
                leadership: player.leadership,
                form: player.form,
                stamina: player.stamina,
                NTmatches: player.NTmatches,
                U21matches: player.U21matches,
                isInTeam: player.isInTeam,
                goalkeeping: player.goalkeeping,
                defending: player.defending,
                playmaking: player.playmaking,
                winger: player.winger,
                passing: player.passing,
                scoring: player.scoring,
                setPieces: player.setPieces,
                updates: player.updates,
                expiry: calculateExpiry(player.age_years,player.age_days),
                team: newTeam._id
            });
            // Store players and their reference into the team
            newTeam.players.push(newPlayer);
            await newPlayer.save();
        }
        await newTeam.save();
    }
};