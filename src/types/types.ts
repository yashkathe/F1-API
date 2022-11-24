export type isConstructorStanding = {
    position: number;
    team: string;
    points: number;
};

export type isDriver = {
    name: string;
    team: string;
    rank: number;
    points: number;
    nationalityImage: string | undefined;
    driverImage: string | undefined;
};

export type isDriverStanding = {
    position: number;
    driver: string;
    nationality: string;
    team: string;
    points: number;
};

export type isTeam = {
    name: string;
    drivers: string[];
    points: number;
    rank: number;
    carLogo: string | undefined;
    carImage: string | undefined;
};

export type isHallOfFame = {
    name: string;
    years: number[];
};

export type isRaceResult = {
    grandPrix: string;
    date: Date;
    winner: string;
    car: string;
    laps: number;
    time: string;
};
