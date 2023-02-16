export type SportList = Record<string, {
    count: number,
    ru_name: string
}>

export enum Sports {
    ALL = 'all',
    BASKETBALL = "basketball",
    ICEHOCKEY = "icehockey",
    SOCCER = "soccer",
}
