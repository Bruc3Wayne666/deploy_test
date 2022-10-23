export interface IGame {
    game_id: number;
    league: {
        id: string;
        name: string
    };
    name: string;
    quotes?: {
        "Исход матча(основное время)": {
            id: number;
            kf: number;
            name: string;
        }[],
        total: {
            id: number;
            kf: number;
            name: string;
        }[]
    };
    score: string | null;
    time_start: number;
    beautiful_time_start: string;
}
