import React, { useEffect, useState } from 'react';
import './FindValentine.css';
import Header from '../Header/Header'
import HeaderSecond from '../Header/HeaderSecond'
import ProfileCard from '../profilecard/ProfileCard';
import db from '../../firebase';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import { useStateValue } from '../../StateProvider';

function FindValentine() {
    const [{ userInfo, user }] = useStateValue();
    const [data, setData] = useState([]);
    const [inputSearch, setInputSearch] = useState('');
    const [emailSearch, setEmailSearch] = useState('');

    useEffect(() => {
        if (userInfo?.gender)
            db.collection(userInfo?.gender === 'male' ? 'girls' : 'boys')
                .orderBy('timestamp', 'asc')
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
                            {/* Find */}
                            {/* <div> */}
                                <input placeholder='Search by name' type="text" onChange={e => setInputSearch(e.target.value)} />
                                <input placeholder='Search by email' type="text" onChange={e => setEmailSearch(e.target.value)} />
                            {/* </div> */}
                        </div>
                        <div className="recommendPeople" id='box1'>
                            { emailSearch=='' ? data && data.filter(item => {return item?.data?.name.toLowerCase().includes(inputSearch.toLowerCase())
                            }).map((data) => (
                                <ProfileCard data={data} />
                            )):
                            data && data.filter(item => {return item?.data?.email.toLowerCase().includes(emailSearch.toLowerCase())
                            }).map((data) => (
                                <ProfileCard data={data} />
                            ))
                            
                            }
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