import React, { useEffect, useState } from 'react'
import db from '../../firebase';
import { useStateValue } from '../../StateProvider';
import Header from '../Header/Header'
import HeaderSecond from '../Header/HeaderSecond'
import ListPage from '../ListPage/ListPage'
import Nodata from '../Nodata/Nodata';

function HomePreferedBy() {
    const [{ user, userInfo }] = useStateValue();
    const [data, setData] = useState([]);
      
    useEffect(() => {
        if (userInfo?.gender && user?.uid) {
            db.collection(userInfo?.gender == 'male' ? 'boys' : 'girls').doc(user?.uid).collection('Preferenceby').onSnapshot((snapshot) => {
                setData(
                    snapshot.docs.map((doc) => ({
                        data: doc.data(),
                        id: doc.id,
                    }))
                );
            })
        }
    }, [userInfo?.gender]);

    return (
        <div>
            <Header />
            <HeaderSecond />
            <div>
               {
                   data.length!=0 ? data.map((data)=>(
                    <ListPage data={data} />
                   )):
                  <Nodata/>
               }
            </div>
        </div>
    )
}

export default HomePreferedBy