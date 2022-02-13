import React, { useState, useEffect } from 'react'
import './SignUp.css'
import Button from '@mui/material/Button';
import db, { auth, storage } from '../../firebase';
import { useStateValue } from "../../StateProvider"
import { actionTypes } from '../../reducer';
import { v4 as uuid } from "uuid"
import { useHistory } from "react-router-dom"
import firebase from 'firebase';
import Header from '../Header/Header';
import Loading from '../Loading/Loading';
import AddAPhotoRoundedIcon from '@mui/icons-material/AddAPhotoRounded';

function SignUp() {
    const [{ user }, dispatch] = useStateValue();

    const [image, setImage] = useState(null);
    const [gender, setGender] = useState();
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [verify, setVerify] = useState(false);
    const [loading, setLoading] = useState(false);
    const [runFunction, setRunFunction] = useState(false);
    const [college, setCollege] = useState('');
    const history = useHistory();

    const selectImage = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    }
    console.log("first", user);
    
    const createAccount = (e) => {
        setLoading(true);
        if (name && gender && image) {
            // auth
            // .createUserWithEmailAndPassword(email, password)
            // .then((auth) => {
            if (user?.uid && user?.email) {
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
                        await upload.snapshot.ref.getDownloadURL().then((url) => {
                            if (gender === 'male') {
                                db.collection('boys').doc(user.uid).set({
                                    name: name,
                                    email: user?.email,
                                    profilePhotoUrl: url,
                                    gender: gender,
                                    imageId: id,
                                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                                    uid: user.uid,
                                    college: college,
                                })
                            }
                            else {
                                db.collection('girls').doc(user.uid).set({
                                    name: name,
                                    email: user?.email,
                                    profilePhotoUrl: url,
                                    gender: gender,
                                    imageId: id,
                                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                                    uid: user.uid,
                                    college: college,
                                })
                            }
                        })
                            .then(() => {
                                history.push('/')
                            })
                    }
                )

            } else {
                alert('Please login again to create profile!')
            }
        } else {
            alert('Please fill all data and choose image.')
            setLoading(false);
        }
    }
    return (
        <>
            <Header />
            {loading ?
                <Loading /> :
                <div className="signUp">
                    <div className="signUp_in">
                        <label htmlFor="image">
                            <div style={{ display: "flex", alignItem: 'center' }}> <p style={{ paddingRight: "8px", color: 'gray' }}><AddAPhotoRoundedIcon /></p><p className='upload_photo'>Upload Your Photo</p>
                            </div>
                        </label>
                        <input
                            type="file" help__In
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
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <input type="text" placeholder='Enter Your College Name'
                                value={college}
                                onChange={(e) => setCollege(e.target.value)}
                            />
                            <div className="gender_div">
                                <span style={{ fontWeight: "bold" }}> You are</span>
                                <div className="gender_buttons">
                                    <button style={{
                                        backgroundColor: gender === "male" ? 'black' : 'white',
                                        color: gender === "male" ? 'white' : 'black',
                                    }}
                                        onClick={() => {
                                            setGender("male")
                                        }}
                                    >Boy</button>
                                    <button
                                        onClick={() => {
                                            setGender("female")
                                        }}
                                        style={{
                                            backgroundColor: gender === "female" ? 'black' : 'white',
                                            color: gender === "female" ? 'white' : 'black',
                                        }}
                                    >Girl</button>
                                </div>
                                <div>
                                </div>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', width: '100%', maxWidth: '500px', justifyContent: 'space-around', alignItems: "center" }}>
                                <Button variant="contained" style={{ width: '95%' }} onClick={createAccount}>Add Details</Button>
                                {/* <Button variant="contained" style={{ width: '45%' }} onClick={()=>"/signin"}>Sign in</Button> */}
                                <div style={{ display: "flex", padding: '6px 0' }} onClick={() => history.push('/signin')}>
                                    Enter details to complete profile.
                                    <br />
                                    Already entered <div style={{ paddingLeft: '8px', color: "blue", fontWeight: '600', cursor: "pointer" }} >Sign in</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default SignUp