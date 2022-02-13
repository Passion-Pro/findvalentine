import * as React from 'react';
import './UserProfile.css';
import './ProfileCard.css'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { useHistory } from 'react-router-dom';
import { useStateValue } from '../../StateProvider';
import Button from '@mui/material/Button';
import Header from '../Header/Header';
import firebase from 'firebase';
import db, { auth } from '../../firebase';
import AddAPhotoRoundedIcon from '@mui/icons-material/AddAPhotoRounded';
import HeaderSecond from '../Header/HeaderSecond';
import Loading from '../Loading/Loading';

function UpdateUserProfile() {
    const [{ userInfo, user }] = useStateValue();
    const [name, setName] = React.useState('')
    const [image, setImage] = React.useState(null);
    const [college, setCollege] = React.useState('');
    const [loading, setLoading] = React.useState(false)

    const history = useHistory();
    const selectImage = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    }

    const updateAccount = async () => {
        if (userInfo &&name && image) {
            setLoading(true)
            const imagesRefforImage = firebase.storage().ref('images').child(userInfo.imageId);
            imagesRefforImage.delete().then(async () => {
                const imagesRef = firebase.storage().ref("images").child(userInfo.imageId);
                await imagesRef.put(image);
                imagesRef.getDownloadURL().then((url) => {
                    if (userInfo?.gender === 'male') {
                        if (userInfo?.college) {
                            db.collection('boys').doc(user.uid).update({
                                profilePhotoUrl: url,
                                name: name,
                            }).then(() => {
                                alert("Update successfully");
                                setLoading(false)
                                history.push('/userProfile')
                            })
                        } else {
                            db.collection('boys').doc(user.uid).update({
                                profilePhotoUrl: url,
                                college: college,
                                name: name,
                            }).then(() => {
                                alert("Update successfully")
                                setLoading(false)
                                history.push('/userProfile')
                            })
                        }
                    }
                    else {
                        if (userInfo?.college) {
                            db.collection('girls').doc(user.uid).update({
                                profilePhotoUrl: url,
                                name: name,
                                college: college,
                            }).then(() => {
                                alert("Update successfully")
                                setLoading(false)
                                history.push('/userProfile')
                            })
                        } else {
                            db.collection('girls').doc(user.uid).update({
                                profilePhotoUrl: url,
                                name: name,
                                college: college,
                            }).then(() => {
                                alert("Update successfully")
                                setLoading(false)
                                history.push('/userProfile')
                            })
                        }
                    }
                })
            })
        } else if(name){
            if (userInfo?.gender === 'male') {
                setLoading(true)
                if (userInfo?.college) {
                    db.collection('boys').doc(user.uid).update({
                        name: name,
                    }).then(() => {
                        alert("Update successfully");
                        setLoading(false)
                        history.push('/userProfile')
                    })
                } else {
                    db.collection('boys').doc(user.uid).update({
                        college: college,
                        name: name,
                    }).then(() => {
                        alert("Update successfully")
                        setLoading(false)
                        history.push('/userProfile')
                    })
                }
            }
            else {
                if (userInfo?.college) {
                    db.collection('girls').doc(user.uid).update({
                        name: name,
                        college: college,
                    }).then(() => {
                        alert("Update successfully")
                        setLoading(false)
                        history.push('/userProfile')
                    })
                } else {
                    db.collection('girls').doc(user.uid).update({
                        name: name,
                        college: college,
                    }).then(() => {
                        alert("Update successfully")
                        setLoading(false)
                        history.push('/userProfile')
                    })
                }
            }
        }else{
            alert("Enter something to update. Enter image to update image")
        }
    }
    return (
        <>
            <Header />
            <HeaderSecond />
            {loading ?
                <Loading /> : <div className='profilecardUser'>
                    <div className="signUp_in">
                        <label htmlFor="image">
                            <div style={{ display: "flex", alignItem: 'center' }}>
                                <p style={{ paddingRight: "8px", color: 'gray' }}><AddAPhotoRoundedIcon /></p> <p className='upload_photo'>Choose a image</p>
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
                            <>
                                <CardContent>
                                    <Typography variant="div" color="#0a2540" style={{ fontWeight: 'bold', margin: "0" }}>
                                        <input style={{ display: "flex", borderRadius: "6px", padding: '6px' }} type="text" placeholder='Update Name'
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                    </Typography>
                                </CardContent>
                                {userInfo?.college ? <Typography variant="div" color="#0a2540" style={{ fontWeight: 'bold' }}>
                                    College Name :  {userInfo?.college}
                                </Typography> :
                                    <Typography variant="div" color="#0a2540" style={{ fontWeight: 'bold', margin: "0" }}>
                                        <input style={{ display: "flex", borderRadius: "6px", padding: '6px' }} type="text" placeholder='Enter Your College Name'
                                            value={college}
                                            onChange={(e) => setCollege(e.target.value)}
                                        />
                                    </Typography>}
                            </>
                        </CardActionArea>
                        <div style={{ display: 'flex', width: '100%', maxWidth: '500px', paddingTop: '12px', justifyContent: 'space-around' }}>
                            <Button variant="contained" className='UserProfile__button' style={{ margin: '0', width: "35%" }} fontSize="small" onClick={updateAccount}>Update</Button>
                            <Button variant="outlined" fontSize="small" style={{ margin: '0', width: "35%" }} onClick={() => {
                                history.push("/userProfile")
                            }}>Back</Button>
                        </div>
                    </div>
                </div>}
        </>
    );
}

export default UpdateUserProfile;