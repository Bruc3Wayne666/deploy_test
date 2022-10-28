import React, {FC} from "react";
import {IGame} from "../models/IGame";


interface ITotalsDropdownProps {
    title: string;
    showDropdown: boolean;
    setShowDropdown: (v: any) => void;
    items: { id: string, kf: number, name: string }[];
    handleSetCurrentGame: (v: any) => void;
    handleSetCurrentBet: (v: any) => void;
    handleChangeShowModal: (v: any) => void;
    game: IGame;
}

interface IFilterDropdownProps {
    title: string
    showDropdown: boolean;
    setShowDropdown: (v: any) => void;
    items: { label: string, value: string, className: string }[];
    changeParams: (val: string) => void;
}

interface IBidsFilterDropdownProps {
    title: string;
    showDropdown: boolean;
    setShowDropdown: (v: any) => void;
    items: { label: string, value: string, className: string }[];
    handleChangePeriod: (v: string) => void;
    period: string;
}

export const TotalsDropdown: FC<ITotalsDropdownProps> = ({title, showDropdown, setShowDropdown, items, game, handleChangeShowModal, handleSetCurrentGame, handleSetCurrentBet}) => {
    return (
        <div className='dropdown-wrapper'>
            <button onClick={() => setShowDropdown(!showDropdown)} className="trigger-button">
                {title}
            </button>


            <div style={{display: 'flex', flexDirection: 'row'}}>

                <ul className={showDropdown ? "active" : ""}>
                    {items.map(({name, kf, id}, index) => {
                            return (
                                <li>
                                    <div
                                        onClick={() => {
                                            handleSetCurrentGame(game)
                                            handleChangeShowModal(true)
                                            handleSetCurrentBet({name, kf, id})
                                        }}
                                        style={{
                                            cursor: 'pointer',
                                            marginTop: 8,
                                            paddingLeft: 42,
                                            display: 'flex',
                                            justifyContent: 'center'
                                        }}
                                    >
                            <span
                                className='total'
                                style={{
                                    cursor: 'pointer',
                                    flex: 1
                                }}
                            >
                                {name}
                            </span>
                                        &nbsp;
                                        <span
                                            style={{
                                                cursor: 'pointer',
                                                flex: 1,
                                                backgroundColor: 'yellowgreen',
                                                padding: 3,
                                                borderRadius: 3,
                                                marginBottom: 4,
                                                margin: 3,
                                                color: '#222'
                                            }}
                                        >
                                {kf}
                            </span>
                                    </div>
                                </li>
                            )
                        }
                    )}
                </ul>
            </div>
        </div>
    );
};

export const FilterDropDown: FC<IFilterDropdownProps> = ({title, showDropdown, setShowDropdown, items, changeParams}) => {
    return (
        <div className='dropdown-wrapper' style={{width: 82}}>
            <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="trigger-button"
                style={{
                    border: '1px solid #E6E6E6',
                    background: '#087537',
                    padding: '6px 8px',
                    borderRadius: 5,
                    marginRight: 10,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    fontSize: 9,
                    width: 'auto'
                }}
            >
                {title}
            </button>


            <div style={{display: 'flex', flexDirection: 'row'}}>

                <ul
                    className={`${showDropdown ? "active" : ""}`}
                    style={{
                        position: 'absolute',
                        zIndex: 9,
                        fontSize: 14,
                        // backgroundColor: 'black',
                        // height: "auto",
                        maxHeight: 120,
                        // width: '80%',
                }}
                >


                    {items.map(({value, label}, index) => {
                            return (
                                <li>
                                    <div
                                        style={{
                                            backgroundColor: 'black',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            // marginTop: 8,
                                            fontSize: 12,
                                            height: 16,
                                            cursor: 'pointer',
                                            borderRadius: 2,
                                        }}
                                     >
                                        {label}
                                    </div>
                                </li>
                            )
                        }
                    )}
                </ul>

            </div>
        </div>
    );
}

export const BidsFilterDropDown: FC<IBidsFilterDropdownProps> = ({title, showDropdown, setShowDropdown, items, handleChangePeriod, period}) => {
    return (
        <div className='dropdown-wrapper'>
            <button
                onClick={() => setShowDropdown(!showDropdown)}
                    className="trigger-button"
                style={{
                    // width: "auto",
                    // fontSize:10,
                    // border: '1px solid #E6E6E6',
                    // background: '#087537',
                    // padding: '6px 8px',
                    // borderRadius: 5,
                    // marginRight: 10,
                    // display: 'flex',
                    // flexDirection: 'column',
                    // justifyContent: 'center',
                    // alignItems: 'center'
                    display: 'flex',
                    justifyContent: 'flex-start',
                    backgroundColor: 'transparent',
                    textTransform: 'uppercase',
                    fontSize: 10,
                    cursor: 'pointer'
                }}
            >
                {{
                    all: 'Показать все',
                    hour: 'Показать за последний час',
                    today: 'Показать за сегодня',
                    week: 'Показать за последнюю неделю',
                    month: 'Показать за последний месяц'
                }[period]}
            </button>


            <div style={{display: 'flex', flexDirection: 'row'}}>

                <ul className={showDropdown ? "active" : ""}
                    style={{
                        position: 'absolute',
                        zIndex: 9,
                        backgroundColor: 'black',
                        // padding: 4,
                        borderRadius: 8,
                        maxHeight: 100,
                        fontSize: 12,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-evenly',
                }}>
                    {items.map(item => {
                            return (
                                <li style={{cursor: 'pointer', fontSize: 10}} onClick={() => handleChangePeriod(item.value)}>
                                    {item.label}
                                </li>
                            )
                        }
                    )}
                </ul>
            </div>
        </div>
    )
}
