import React, { useState } from 'react';
import './HeaderSecond.css';
import { useHistory } from 'react-router-dom';
import { useStateValue } from '../../StateProvider';
import HelpOutlineRoundedIcon from '@mui/icons-material/HelpOutlineRounded';

function HeaderSecond() {
    const [{ user, courseDiv, showExpandGroup, showMoreoption }, dispatch] = useStateValue();
    const history = useHistory();
    const [pathName, setPathName] = useState('');
    const [showhead, setShowhead] = useState(false);

    return (
        <>
            
            <div className='HeaderSecond_Out'>
                <div className='HeaderSecond'>
                    <div></div>
                    <div className="HeaderSecond__Div">
                        <div onClick={() => {
                            history.push('/')
                            setPathName('/')
                        }} className={window.location.pathname == '/' ? "followingCard__active" : "followingCard"}>
                            Your Prefrence
                        </div>
                        <div onClick={() => {
                            history.push('/homepreferedBy')
                            setPathName('/homepreferedBy')
                        }} className={window.location.pathname == '/homepreferedBy'  ? "followingCard__active" : "followingCard"}>
                            Prefered by
                        </div>
                        {/* public */}
                        {/* <div onClick={() => {
                            history.push('/public')
                            setPathName('/public')
                        }} className={window.location.pathname == '/public' ? "followingCard__active" : "followingCard"}>
                            Public
                        </div> */}
                        <div onClick={() => {
                            history.push('/chat')
                            setPathName('/chat')
                        }} className={window.location.pathname == '/chat' ? "followingCard__active" : "followingCard"}>
                            Chat
                        </div>
                        <div onClick={() => {
                            history.push('/help')
                            setPathName('/help')
                        }} className={window.location.pathname == '/help' ? "followingCard__active" : "followingCard"}>
                            Help{' '} <HelpOutlineRoundedIcon fontSize='small'/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HeaderSecond
