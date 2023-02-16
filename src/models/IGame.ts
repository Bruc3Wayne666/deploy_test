export interface IGame {
    day_game: boolean;
    game_id: number;
    league: {
        id: string;
        name: string;
    };
    name: string;
    cc: string;
    quotes: {
        'Исход матча(основное время)': {
            id: number;
            kf: number;
            name: string;
        }[],
        'ТОТАЛ': {
            id: number;
            kf: number;
            name: string;
        }[]
    };
    score: string | null;
    time_start: number;
    beautiful_time_start: string;
    away_team: string;
    away_team_logo: string;
    home_team: string;
    home_team_logo: string;
}

export interface IPopEvent extends IGame {}
