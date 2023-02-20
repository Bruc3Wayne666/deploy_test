const days = ['Сегодня в', 'Завтра в', 'Послезавтра в']

export const DateFormater = (date: string) => {
    const [date_YYYY_MM_DD, date_hh_mm] = date.split(' ')
    const gameDate = new Date(
        Number(date_YYYY_MM_DD.split('-')[0]),
        Number(date_YYYY_MM_DD.split('-')[1]) - 1,
        Number(date_YYYY_MM_DD.split('-')[2])
    )
    const currentDate = new Date()
    //@ts-ignore
    const diff = Math.abs(Math.ceil((gameDate - currentDate) / (86400 * 1000)))
    const day = diff === 0
        ? days[diff]
        : diff === 1
            ? days[diff]
            : diff === 2
                ? days[diff]
                : date_YYYY_MM_DD.split('-').join('.')
    return {
        day,
        time: date_hh_mm
    }
}
