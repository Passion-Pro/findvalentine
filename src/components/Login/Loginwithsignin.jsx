import React from 'react'
import { useHistory } from 'react-router-dom';
import styled from "styled-components";
import { auth, provider } from '../../firebase';
import { actionTypes } from '../../reducer';
import { useStateValue } from '../../StateProvider';
import Header from '../Header/Header';
import Loading from '../Loading/Loading';
// import  {provider} from '../../firebase'
function Loginwithsignin() {

    const [{ user, showPop, showPopIn }, dispatch] = useStateValue();
    const history=useHistory();
    const signIn = () => {
        auth
            .signInWithPopup(provider)
            .then((result) => {
                dispatch({
                    type: actionTypes.SET_USER,
                    user: result.user,
                });
            })
            .catch((error) => alert(error.message));
    };

    return (
        <>
            {/* <Header /> */}
                <div className="signUp" style={{alignItems:"center",justifyContent:'center'}}>
                    
                    <div style={{display:'flex',flexDirection:"column",alignItems:"center",justifyContent:'center',marginBottom:"10px",height:"fit-content",border:'1px solid lightgray',padding:'50px',borderRadius:'8px'}}>

                        <div  style={{display:'flex',border:"0",color:'',padding:"10px",margin:"10px",marginBottom:"20px",color:"#4c4545",fontSize:'large',fontWeight:"bold",borderBottom:'1px solid #ff0606'}}>
                          Find Valentine
                        </div>
                     <button style={{display:'flex',border:"0",borderRadius:'20px',backgroundColor:'#ff0606',padding:"12px",fontWeight:'bold',color:"white",width:'200px',alignItems:"center",justifyContent:"center"}} onClick={signIn}>Sign up with google</button>

                     <button style={{display:'flex',border:"0",borderRadius:'20px',backgroundColor:'#1357d4',padding:"12px",fontWeight:'bold',color:"white",width:'200px',alignItems:"center",justifyContent:"center",margin:"12px 0"}} onClick={()=>history.push('/signin')}>Sign in </button>
                    </div>
                </div>
        </>
    )
}

export default Loginwithsignin