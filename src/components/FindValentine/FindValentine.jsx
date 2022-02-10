import React, { useEffect, useState } from 'react';
import './FindValentine.css';
import Header from '../Header/Header'
import HeaderSecond from '../Header/HeaderSecond'
import ProfileCard from '../profilecard/ProfileCard';
import db from '../../firebase';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import { useStateValue } from '../../StateProvider';

function FindValentine() {
    const [{ userInfo, user}] = useStateValue();
    const [data, setData] = useState([]);

    useEffect(() => {
        if (userInfo?.gender)
            db.collection(userInfo?.gender === 'male' ? 'girls' : 'boys')
                .onSnapshot((snapshot) => {
                    setData(
                        snapshot.docs.map((doc) => ({
                            data: doc.data(),
                            id: doc.id,
                        }))
                    );
                })
    }, [userInfo?.gender, user]);

    const funct = () => {
        console.log("object")
        document.getElementById('box').scrollLeft += 900;
    }
    const funct1 = () => {
        console.log("object")
        document.getElementById('box1').scrollLeft += 900;
    }

    return (
        <>
            <Header />
            <HeaderSecond />
            <div className='home'>
                <div className="homeBody">
                    <div className="header__ProfileName">
                        <div className='header__ProfileName__Head'>
                            Find
                        </div>
                        <div className="recommendPeople" id='box1'>
                            {data.map((data) => (
                                <ProfileCard data={data} />
                            ))}
                            <div className="Arrow__showrecommendProfile" onClick={funct1}>
                                <ArrowForwardRoundedIcon className='Arrow__showrecommendInProfile' />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default FindValentine;