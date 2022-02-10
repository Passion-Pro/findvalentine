import React, { useEffect, useState } from 'react'
import db from '../../firebase';
import { useStateValue } from '../../StateProvider';
import Header from '../Header/Header'
import HeaderSecond from '../Header/HeaderSecond'
import ListPage from '../ListPage/ListPage'

function Home() {

    const [{ user, userInfo }] = useStateValue();
    const [data, setData] = useState([]);
    useEffect(() => {
        if (userInfo?.gender && user?.uid) {
            db.collection(userInfo?.gender == 'male' ? 'boys' : 'girls').doc(user?.uid).collection('Preference')
            .orderBy('rateN','desc').onSnapshot((snapshot) => {
                setData(
                    snapshot.docs.map((doc) => ({
                        data: doc.data(),
                        id: doc.id,
                    }))
                );
            })
        }
    }, [userInfo?.gender]);
    console.log("first",data)

  return (
    <div>
    <Header/>
    <HeaderSecond />
     
     {data && data.map((data)=>(
         <ListPage data={data}/>
     ))}
    </div>
  )
}

export default Home