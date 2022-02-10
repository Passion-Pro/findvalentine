import React, { useEffect, useState } from 'react';
import './Header.css';
import { useHistory } from 'react-router-dom';
import { useStateValue } from '../../StateProvider';
import Avatar from "@mui/material/Avatar";

function Header() {
    const [{ userInfo }, dispatch] = useStateValue();
    const history = useHistory();

    return (
        <>
            <div className='Loginheader' >
                <div className="Loginheader_In">
                    <div className="Loginheader__Logo">
                        Find Valentine
                    </div>

                    <div className="Loginheader__Icons">
                        {userInfo?.profilePhotoUrl && <div className={window.location.pathname=='/findvalentine'?"Loginheader__home__IconActive":"Loginheader__home__Icon"}>
                            <button onClick={() => history.push('/findvalentine')}>Find Valentine</button>
                        </div>}
                      {userInfo?.profilePhotoUrl && <div className="Loginheader__profile" onClick={() => {
                            history.push('/userProfile')
                        }}>
                            <Avatar src={userInfo?.profilePhotoUrl} />
                            <span className='Loginheader_profileName'>
                                {userInfo?.name && userInfo?.name?.length > 9 ? userInfo?.name.slice(0, 9) + '...' : userInfo?.name}
                            </span>
                        </div>}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Header
