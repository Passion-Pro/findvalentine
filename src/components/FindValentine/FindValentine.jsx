import React, { useEffect, useState } from 'react';
import './FindValentine.css';
import Header from '../Header/Header'
import HeaderSecond from '../Header/HeaderSecond'
import ProfileCard from '../profilecard/ProfileCard';
import db from '../../firebase';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';

function HomeWithAllProfile() {

    const [data, setData] = useState([
        {
            name: 'nishant'
        },
        {
            name: 'nishant'
        }
    ]);

    // useEffect(() => {
    //     db.collection('users')
    //         .onSnapshot((snapshot) => {
    //             setData(
    //                 snapshot.docs.map((doc) => ({
    //                     data: doc.data(),
    //                     id: doc.id,
    //                 }))
    //             );
    //         })
    // }, []);

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
                            Find Find
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

export default HomeWithAllProfile;