import React, { useState, useEffect } from 'react'
import './SignUp.css'
import Button from '@mui/material/Button';
import db ,  {auth , storage} from '../../firebase';
import firebase from "firebase"
import {useStateValue} from "../../StateProvider" 
import { actionTypes } from '../../reducer';
import {v4 as uuid} from "uuid"
import {useHistory} from "react-router-dom"


function SignUp() {
    const[{} , dispatch] = useStateValue();
    
    const [image, setImage] = useState(null);
    const[gender , setGender] = useState('');
    const[name , setName] = useState('');
    const[email , setEmail] = useState('');
    const[password , setPassword] = useState('');
    const history=useHistory();
    


    const selectImage = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    }

   const createAccount=(e)=>{
  e.preventDefault();
  if(name && email && password && gender && image){
    auth
    .createUserWithEmailAndPassword(email, password)
    .then((auth) => {
      if (auth) {
        dispatch({
          type: actionTypes.SET_USER,
          user: auth?.user,
        });
        const id = uuid();
          const upload = storage.ref(`images`).child(id).put(image);

          upload.on(
            "state_changed",
            (snapshot) => {
              const progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

              console.log(`Progress : ${progress}%`);
              if (snapshot.state === "RUNNING") {
                console.log(`Progress : ${progress}%`);
              }
            },
            (error) => console.log(error),
            async () => {
               await upload.snapshot.ref.getDownloadURL().then((url)=>{
                  db.collection('users').doc(auth.user.uid).set({
                      name : name,
                      email : email,
                      password : password,
                      profilePhotoUrl : url,
                      gender : gender,
                      imageId:id,
                  })
              })
              .then(()=>{
                 history.push('/')
              })
            }
          )
          
      }else{
          alert('Please enter complete details.')
      }
    })
    .catch((error) => alert(error.message));
  }
}
    return (
        <div className="signUp">
            <div className="signUp_in">
                <label htmlFor="image">
                    <p className='upload_photo'>Upload Your Photo</p>
                </label>
                <input
                    type="file"
                    style={{
                        display: "none",
                    }}
                    id="image"
                    onChange={selectImage}
                    accept="image/git , image/jpeg , image/png"
                />
                <div className="image_div">
                {image && (
                    <img src={URL.createObjectURL(image)} alt="" className='uploaded_image'
                    />
                )}
                </div>
                <div className="user_info">
                    <input type="text" placeholder='Enter Your Name' 
                     value = {name}
                     onChange={(e) => setName(e.target.value)}
                    />
                    <input type="text" placeholder='Enter Your Email' 
                     value = {email}
                     onChange={(e) => setEmail(e.target.value)}
                    />
                    <input type="password" placeholder='Enter Your Password' 
                     value = {password}
                     onChange={(e) => {
                         setPassword(e.target.value)
                     }}
                    />
                    <div className="gender_div">
                           <span style={{fontWeight:"bold"}}> You are</span> 
                            <div className="gender_buttons">
                              <button style ={{
                                  backgroundColor : gender === "male"? 'black' : 'white',
                                  color : gender === "male"? 'white' : 'black',
                              }}
                               onClick={() => {
                                   setGender("male")
                               }}
                              >Boy</button>
                              <button
                              onClick={() => {
                                setGender("female")
                            }}
                              style ={{
                                backgroundColor : gender === "female"? 'black' : 'white',
                                color : gender === "female"? 'white' : 'black',
                            }}
                              >Girl</button>
                            </div>
                        <div> 
                        </div>
                    </div>
                        <Button variant="contained" style={{width:'95%'}} onClick={createAccount}>Create Account</Button>
                </div>
            </div>
        </div>
    )
}

export default SignUp