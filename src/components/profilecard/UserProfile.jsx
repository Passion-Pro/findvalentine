import * as React from 'react';
import './UserProfile.css';
import './ProfileCard.css'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {CardActionArea } from '@mui/material';
import { useHistory } from 'react-router-dom';
import { useStateValue } from '../../StateProvider';
import Button from '@mui/material/Button';
import Header from '../Header/Header';
import firebase from 'firebase';
import db, { auth } from '../../firebase';
import AddAPhotoRoundedIcon from '@mui/icons-material/AddAPhotoRounded';

function UserProfile() {
    const [{ userInfo, user }] = useStateValue();
    const [image, setImage] = React.useState(null);

    const history = useHistory();
    const selectImage = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    }

    const updateAccount = async () => {
        if (userInfo && image) {
            const imagesRefforImage = firebase.storage().ref('images').child(userInfo.imageId);
            imagesRefforImage.delete().then(async () => {
                const imagesRef = firebase.storage().ref("images").child(userInfo.imageId);
                await imagesRef.put(image);
                imagesRef.getDownloadURL().then((url) => {
                    if (userInfo?.gender === 'male') {
                        db.collection('boys').doc(user.uid).update({
                            profilePhotoUrl: url,
                        }).then(()=>{
                            alert("Update successfully")
                        })
                    }
                    else {
                        db.collection('girls').doc(user.uid).update({
                            profilePhotoUrl: url,
                        }).then(()=>{
                            alert("Update successfully")
                        })
                    }
                })
            })
        } else {
            alert('Please choose image')
        }
    }
    return (
        <>
            <Header />
            <div className='profilecardUser'>
                <div className="signUp_in">
                    <label htmlFor="image">
                    <div style={{display:"flex",alignItem:'center'}}>
                    <p style={{paddingRight:"8px",color:'gray'}}><AddAPhotoRoundedIcon/></p> <p className='upload_photo'>Choose a image</p>
                    </div>
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
                
                <CardActionArea style={{ display: "flex", flexDirection: "column", maxWidth: '500px', justifyContent: 'center' }}>
                    <CardMedia
                        component="img"
                        height="340"
                        image={image ? URL.createObjectURL(image) : userInfo?.profilePhotoUrl}
                        alt="Image"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="div" component="h3" style={{display:"flex", color: '#0a2540',justifyContent:"flex-start",alignItems:"flex-start" }}>
                            {userInfo?.name}
                        </Typography>
                        <Typography variant="div" color="#0a2540" style={{ fontWeight: 'bold' }}>
                            {userInfo?.email}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <div style={{display:'flex',width:'100%',maxWidth:'500px',paddingTop:'12px',justifyContent:'space-around'}}>
                    <Button variant="contained" className='UserProfile__button' style={{margin:'0',width:"35%"}} fontSize="small" onClick={updateAccount}>Update</Button>
                    <Button variant="outlined" fontSize="small" style={{margin:'0',width:"35%"}} onClick={() => {
                        if (user) {
                            auth.signOut().then(() => {
                                window.location.reload()
                            });
                            history.push("/")
                        }
                    }}>Logout</Button>
                </div>
                </div>
            </div>
        </>
    );
}

export default UserProfile;