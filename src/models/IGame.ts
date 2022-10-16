export interface IGame {
    game_id: number;
    league: {
        id: string;
        name: string
    };
    name: string;
    quotes?: {
        "main_time_res": {
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
}
