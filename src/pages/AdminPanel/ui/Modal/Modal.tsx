import React, {FC, useState} from "react";

const Modal: FC<ModalProps> = ({setIsOpen, userInfoBids, userTransfers, show}) => {
    const [option, setOption] = useState('input')

    return (
        <div className='admin-panel-modal'>
            <div className="window">
                <div onClick={() => setIsOpen(false)} className='close-btn'><span>&times;</span></div>
                {
                    show === 'transfer' &&
                    <button className='switchb' onClick={() => setOption(option === 'input' ? 'output' : 'input')}>
                        {option === 'input' ? 'Показать выводы' : 'Показать пополнения'}
                    </button>
                }
                <div className='bid-items'>
                    <div className='bid-items-header'>
                        {
                            (userInfoBids && show === 'bids') &&
                            <>
                                <div className="field">ID</div>
                                <div className="field" style={{flex: 0.3}}>Коэффициент</div>
                                <div className="field" style={{flex: 0.42}}>Название котировки</div>
                                <div className="field" style={{flex: 1}}>Имя события</div>
                                <div className="field" style={{flex: 0.6}}>Исход</div>
                                <div className="field" style={{flex: 0.2}}>Статус</div>
                                <div className="field" style={{flex: 0.3}}>Сумма</div>
                                <div className="field" style={{flex: 0.4}}>Время</div>
                            </>
                        }
                        {
                            (userTransfers && show === 'transfer' && option === 'input') &&
                            <>
                                <div className="field" style={{flex: 0.2}}>ID</div>
                                <div className="field" style={{flex: 0.2}}>Кол-во</div>
                                <div className="field" style={{flex: 0.35}}>Кол-во CWD</div>
                                <div className="field" style={{flex: 0.35}}>Кол-во USD</div>
                                <div className="field" style={{flex: 0.3}}>Статус</div>
                                <div className="field" style={{flex: 0.2}}>Валюта</div>
                                <div className="field" style={{flex: 0.6}}>Логин</div>
                                <div className="field" style={{flex: 0.4}}>Аккаунт</div>
                                <div className="field" style={{flex: 0.35}}>ID игрока</div>
                                <div className="field" style={{flex: 0.55}}>Кошелёк</div>
                                <div className="field" style={{flex: 0.4}}>Приватный ключ</div>
                                <div className="field" style={{flex: 0.3}}>Дата</div>
                            </>
                        }
                        {
                            (userTransfers && show === 'transfer' && option === 'output') &&
                            <>
                                <div className="field" style={{flex: 0.1}}>ID</div>
                                <div className="field" style={{flex: 0.2}}>Валюта</div>
                                <div className="field" style={{flex: 0.3}}>Статус</div>
                                <div className="field" style={{flex: 0.3}}>Наша валюта</div>
                                <div className="field" style={{flex: 0.3}}>ID игрока</div>
                                <div className="field" style={{flex: 0.4}}>Кошелёк</div>
                                <div className="field" style={{flex: 0.7}}>Дата</div>
                            </>
                        }
                    </div>
                    {
                        (userInfoBids && show === 'bids')
                        && userInfoBids.map(bid => <ModalBidItem show={show} bid={bid}/>)
                    }
                    {
                        (userTransfers && show === 'transfer' && option === 'input')
                        && userTransfers.input.map(transfer => <ModalBidItem option={option} show={show}
                                                                             transfer={transfer}/>)
                    }
                    {
                        (userTransfers && show === 'transfer' && option === 'output')
                        && userTransfers.output.map(transfer => <ModalBidItem option={option} show={show}
                                                                              transfer={transfer}/>)
                    }
                </div>
            </div>
        </div>
    )
}

const ModalBidItem: FC<ModalBidItemProps> = ({bid, transfer, show, option}) => {
    const statuses = {
        'in work': 'В процессе',
        'fail': 'Провал',
        'success': 'Успешно'
    }

    return (
        <div className='bid-item'>
            {
                (bid && show === 'bids') &&
                <>
                    <div className="field" style={{color: 'gold'}}>{bid.id}</div>
                    <div className="field" style={{flex: 0.3, color: 'skyblue', fontWeight: 600}}>{bid.kf}</div>
                    <div className="field" style={{flex: 0.42}}>{bid.name_kot}</div>
                    <div className="field" style={{flex: 1}}>{bid.name_sob}</div>
                    <div className="field" style={{flex: 0.6}}>{bid.name_ukot}</div>
                    <div className={`field ${bid.status === 'win' ? 'win' : 'lose'}`} style={{flex: 0.2}}>
                        {
                            bid.status === 'win' ? 'Выигрыш' : 'Проигрыш'
                        }
                    </div>
                    <div className="field" style={{flex: 0.3, color: 'lightgreen', fontWeight: 600}}>{bid.summa}</div>
                    <div className="field" style={{flex: 0.4}}>{bid.time_place}</div>
                </>
            }

            {
                (transfer && show === 'transfer' && option === 'input') &&
                <>
                    <div className="field" style={{flex: 0.2}}>{transfer.id}</div>
                    <div className="field" style={{flex: 0.2}}>{transfer.amount}</div>
                    <div className="field" style={{flex: 0.35}}>{transfer.amount_cwd}</div>
                    <div className="field" style={{flex: 0.35}}>{transfer.amount_usd}</div>
                    <div className="field" style={{flex: 0.3}}>{
                        //@ts-ignore
                        statuses[transfer.status]
                    }</div>
                    <div className="field" style={{flex: 0.2}}>{transfer.type}</div>
                    <div className="field" style={{flex: 0.6}}>{transfer.user_login}</div>
                    <div className="field" style={{flex: 0.4}}>{transfer.user_cwd_acccount}</div>
                    <div className="field" style={{flex: 0.35}}>{transfer.user_id}</div>
                    <div className="field"
                         style={{flex: 0.55}}>{transfer.wallet_adress === null ? '---' : transfer.wallet_adress}</div>
                    <div className="field"
                         style={{flex: 0.4}}>{transfer.wallet_private_key === null ? '---' : transfer.wallet_private_key}</div>
                    <div className="field"
                         style={{flex: 0.3}}>{transfer.beatifull_time.slice(4, 25)}</div>
                    {/*style={{flex: 0.3}}>{format(new Date(transfer.beatifull_time), 'dd-mm-yyyy')}</div>*/}
                </>
            }
            {
                (transfer && show === 'transfer' && option === 'output') &&
                <>
                    <div className="field" style={{flex: 0.1}}>{transfer.id}</div>
                    <div className="field" style={{flex: 0.2}}>{transfer.currency}</div>
                    <div className="field" style={{flex: 0.3}}>{
                        //@ts-ignore
                        statuses[transfer.status]
                    }</div>
                    <div className="field" style={{flex: 0.3}}>{transfer.our_currency}</div>
                    <div className="field" style={{flex: 0.3}}>{transfer.user_id}</div>
                    <div className="field"
                         style={{flex: 0.4}}>{transfer.wallet_name === null ? '---' : transfer.wallet_name}</div>
                    <div className="field"
                         style={{flex: 0.7}}>{transfer.beatifull_time.slice(4, 25)}</div>
                    {/*style={{flex: 0.7}}>{format(new Date(transfer.beatifull_time), 'dd-mm-yyyy')}</div>*/}
                </>
            }

        </div>
    )
}

interface ModalBidItemProps {
    bid?: IBidItem
    transfer?: {
        amount?: number,
        amount_cwd?: number,
        amount_usd?: number,
        beatifull_time: string,
        time?: number,
        type?: string,
        user_cwd_acccount?: string,
        user_id: number,
        user_login?: string,
        wallet_adress?: string | null,
        wallet_private_key?: string | null
        currency?: string
        id: number
        our_currency?: number
        status?: string
        time_stamp?: number
        wallet_name?: string
    }
    show: string
    option?: string
}

interface IBidItem {
    id: number
    kf: string
    name_kot: string
    name_sob: string
    name_ukot: string
    status: string
    summa: number
    time_place: string
    time_place_unix: number
}

interface ModalProps {
    setIsOpen: (v: boolean) => void
    userTransfer: any
    userInfoBids?: IBidItem[] | null
    userTransfers?: {
        input: {
            amount: number,
            amount_cwd: number,
            amount_usd: number,
            beatifull_time: string,
            id: number,
            status: string,
            time: number,
            type: string,
            user_cwd_acccount: string,
            user_id: number,
            user_login: string,
            wallet_adress: string | null,
            wallet_private_key: string | null
        }[]
        output: {
            beatifull_time: string
            currency: string
            id: number
            our_currency: number
            status: string
            time_stamp: number
            user_id: number
            wallet_name: string
        }[]
    } | null
    show: string
}

export default Modal
