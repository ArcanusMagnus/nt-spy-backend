import { PlayerType } from "../models/player";

// Basic constants for multiple functions
const defaultCycle = 33;
const defaultCycleStartDate = new Date("2021-08-23");
const today = new Date();

export const calculateAge = (player: PlayerType): void => {
    const today = new Date();
    // TODO: #2 needs more sophisticated solution that takes in account Hattrick midnight birthday, to be more precise
    const diffDays = Math.round((today.valueOf() - player.updatedAt!.valueOf()) / (3600000 * 24));
    // Hattrick year has 112 days
    if (player.age_days + diffDays < 112) {
        player.age_days += diffDays;
    } else {
        player.age_days = (player.age_days + diffDays) % 112;
        player.age_years += Math.floor((player.age_days + diffDays) / 112);
    }
}

export const calculateExpiry = (playerAgeYears: number, playerAgeDays: number): string => {
    const cyclePhases: object = {
        4: "Friendly-1",
        11: "Friendly-2",
        18: "CC-M1",
        21: "CC-M2",
        25: "CC-M3",
        28: "CC-M4",
        32: "CC-M5",
        39: "CC-M6",
        46: "CC-M7",
        53: "CC-M8",
        60: "CC-M9",
        67: "CC-M10",
        74: "CC-QF",
        77: "CC-SF",
        81: "CC-F",
        88: "WC-I-M1",
        91: "WC-I-M2",
        95: "WC-I-M3",
        102: "WC-I-M4",
        109: "WC-I-M5",
        116: "WC-I-M6",
        123: "WC-I-M7",
        130: "WC-I-M8",
        137: "WC-I-M9",
        144: "WC-I-M10",
        151: "WC-II-M1",
        154: "WC-II-M2",
        158: "WC-II-M3",
        161: "WC-II-M4",
        165: "WC-II-M5",
        172: "WC-II-M6",
        179: "WC-III-M1",
        182: "WC-III-M2",
        186: "WC-III-M3",
        193: "WC-IV-M1",
        196: "WC-IV-M2",
        200: "WC-IV-M3",
        207: "WC-V-M1",
        210: "WC-V-M2",
        214: "WC-V-M3",
        217: "WC-SF",
        221: "WC-F"
    };
    
    // Player related constants
    const playerAgeInDays = playerAgeDays + 112 * playerAgeYears;
    const playerExpiryDate = new Date(today.valueOf() + (22 * 112 - playerAgeInDays) * 24 * 3600000);
    // This should yield the epiry phase
    const playerExpiryDiff = (Math.floor((playerExpiryDate.valueOf() - defaultCycleStartDate.valueOf()) / (24 * 3600000))) % 224;
    let expiry: string = 'undefined';
    let cycleBeginning: boolean = false;

    // If player older then 22, return "OUT" straight away
    if(playerAgeInDays >= 22 * 112){
        return "OUT";
    }
    // truly idiotic solution bellow, I know that
    else if(playerExpiryDiff < 4) {
        expiry = "WC-F";
        cycleBeginning = true;
    } else{
        for(let phase in cyclePhases){
            if(hasKey(cyclePhases, phase)){
                let numPhase = +phase;
                if(playerExpiryDiff < numPhase){
                    break;
                }
                expiry = cyclePhases[phase];
            }
        }
    }
    
    // Calculate world cup cycle number and insert it into existing cycle phase string (we know it exists here)
    const cycleDiffDays = Math.floor((playerExpiryDate.valueOf() - defaultCycleStartDate.valueOf()) / (24 * 3600000));
    const cyclesDiff = Math.floor(cycleDiffDays / 224);
    const expiryCycle = cycleBeginning ? defaultCycle + cyclesDiff - 1 : defaultCycle + cyclesDiff;
    // what a crap! But it works somehow.
    expiry = expiry.slice(0,2) + expiryCycle + expiry.slice(2);

    return expiry;
}

export const nextCyclesOverview = () => {
    // TODO: #4 table with ideal ages for next phases & time remaining to them
}

function hasKey<O>(obj: O, key: PropertyKey): key is keyof O {
    return key in obj
}