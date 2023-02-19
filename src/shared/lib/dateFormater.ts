export const DateFormater = (date: string) => {
    const [date_YYYY_MM_DD, date_hh_mm] = date.split(' ')
    const gameDate = new Date(
        Number(date_YYYY_MM_DD.split('-')[0]),
        Number(date_YYYY_MM_DD.split('-')[1]) - 1,
        Number(date_YYYY_MM_DD.split('-')[2])
    )
    const currentDate = new Date()
    //@ts-ignore
    const diff = Math.abs(Math.round((gameDate - currentDate) / (86400 * 1000)))
    const day = diff === 0
        ? 'Сегодня в'
        : diff === 1
            ? 'Завтра в'
            : diff === 2
                ? 'Послезавтра в'
                : date_YYYY_MM_DD.split('-').join('.')
    return {
        day,
        time: date_hh_mm
    }
}
