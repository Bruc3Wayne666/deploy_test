import React, {FC} from "react";

const InWork: FC = () => {
    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            flexDirection: 'column'
        }}>
            <img
                width={200}
                // src={require('./assets/svg/repair.svg').default}
                src='https://images.squarespace-cdn.com/content/v1/5a9491275ffd20adbfc1b276/1520298034213-3A61XFIYH7SHL9HCD9RF/repair.gif'
                alt=""
            />
            <br/>
            <br/>
            <h2>Ведутся технические работы</h2>
            <br/>
            <h4>Приносим свои извинения, тех. поддержка работает. Скоро всё будет!</h4>
        </div>
    )
}

export default InWork
