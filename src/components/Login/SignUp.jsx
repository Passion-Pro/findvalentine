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

function SignUp() {
    const [{ user}, dispatch] = useStateValue();

    const [image, setImage] = useState(null);
    const [gender, setGender] = useState();
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [verify, setVerify] = useState(false);
    const history = useHistory();

    const selectImage = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    }

    const createAccount = (e) => {
        var str = '.iitr.ac.in';
        for (var i = 0; i < 11; i++) {
            if (email[email.length - 1 - i] == str[str.length - 1 - i]) {
                setVerify(true);
            } else {
                setVerify(false);
                break;
            }
        }
        e.preventDefault();
        if (verify) {

            if (name && email && password && gender && image) {
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
                                    await upload.snapshot.ref.getDownloadURL().then((url) => {
                                        if (gender === 'male') {
                                            db.collection('boys').doc(auth.user.uid).set({
                                                name: name,
                                                email: email,
                                                password: password,
                                                profilePhotoUrl: url,
                                                gender: gender,
                                                imageId: id,
                                                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                                                uid: auth.user.uid
                                            })
                                        }
                                        else {
                                            db.collection('girls').doc(auth.user.uid).set({
                                                name: name,
                                                email: email,
                                                password: password,
                                                profilePhotoUrl: url,
                                                gender: gender,
                                                imageId: id,
                                                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                                                uid: auth.user.uid
                                            })
                                        }
                                    })
                                        .then(() => {
                                            history.push('/')
                                        })
                                }
                            )

                        }
                    })
                    .catch((error) => alert(error.message));
            } else {
                alert('Please enter complete details.')
            }
        } else {
            alert('Please enter IIT Roorkee email id')
        }
    }
    return (
        <>
            <Header />
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
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <input type="text" placeholder='Enter Your Email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input type="password" placeholder='Enter Your Password'
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value)
                            }}
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
                        <div>
                            <Button variant="contained" style={{ width: '95%' }} onClick={createAccount}>Create Account</Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SignUp