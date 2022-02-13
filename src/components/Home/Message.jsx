import React , {useEffect , useState} from 'react'
import styled from 'styled-components'
import Avatar from "@mui/material/Avatar";
import db from '../../firebase';
import { useStateValue } from '../../StateProvider';



function Message({message}) {
  const[profilePhotoUrl , setProfilePhotoUrl] = useState("");
  const[{userInfo , user} , dispatch] = useStateValue();


  useEffect(() => {
    console.log("Email is" , message?.email)
    if(message?.email !== userInfo?.email){
        db.collection(message?.gender === 'male' ? 'boys' : 'girls')
            .where("email", "==", message?.email)
            .get()
            .then((querySnapshot) => {
              querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data());
                
                setProfilePhotoUrl(doc.data().profilePhotoUrl)
               
              });
            })
            .catch((error) => {
              console.log("Error getting documents: ", error);
            });
    }


  } , [message?.email , userInfo?.email])

  return (
    <Container>
        <div className= {message?.email === user?.email ?'user_message':'message'}>
        <Avatar 
       className = "user_message_avatar"
       src = {userInfo?.profilePhotoUrl}
       style = {{
          display :  message?.email !== user?.email && 'none',
          marginRight : '10px'
       }}
       />
        <div className="message_info">
         <p className="info_message">
         {message?.message}
         </p>
         <div className="info_timestamp">
          
         </div>
        </div>
        <Avatar 
        className = "message_avatar"
        src = {profilePhotoUrl}
        style = {{
            display :  message?.email === user?.email && 'none',
            marginLeft : '10px',
         }}
       />
        </div>
    </Container>
  )
};

const Container = styled.div`
.user_message{
display : flex;
margin-top : 10px;
margin-bottom : 10px;
max-width : 70%;
margin-left : auto;
margin-right : 10px;
justify-content : flex-end;

@media(max-width : 500px){
  width : 70%;
}

}

.message{
display : flex;
margin-top : 10px;
margin-bottom : 10px;
width : 50%;
margin-right : auto;
margin-left : 10px;

@media(max-width : 500px){
  width : 70%;
}
}





.message_info{
  display : flex;
  flex-direction : column;
}

.info_message{
    margin-top : 0;
    
    border-radius : 10px;
    padding : 10px;
    background-color : #9933ec;
color : #fff;
}

`

export default Message