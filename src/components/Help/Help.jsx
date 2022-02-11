import React from 'react';
import './Help.css'
import Header from '../Header/Header';
import HeaderSecond from '../Header/HeaderSecond';

function Help() {
    return (
        <>
            <Header />
            <HeaderSecond/>
            <div className="help">
                <div className="help__In">
                    <div style={{
                        display: 'flex', fontWeight: "600", fontSize: 'large',
                    }}>Help</div>
                    <p>Please feel free to express your thoughts at </p>
                    <div style={{display:"flex"}}>
                        Email : <div style={{paddingLeft:'8px'}}> {' '}passionultrapro@gmail.com</div>
                    </div>
                    <span style={{ display: 'flex', fontWeight: '600', fontFamily: "serif", padding: '12px 4px' }}>Created by Nishant and Ronak ❤️</span>
                </div>
            </div>
        </>
    )
}

export default Help