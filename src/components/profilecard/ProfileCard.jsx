import React, { useState, useEffect } from "react";
import './ProfileCard.css'
import styled from "styled-components";
import CloseIcon from "@mui/icons-material/Close";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Avatar, CardActionArea } from '@mui/material';
import { useHistory } from 'react-router-dom';
import { useStateValue } from "../../StateProvider";
import db from "../../firebase";
import firebase from "firebase";
// import PassionPopup from './PassionPopup'
// import { useStateValue } from '../../StateProvider';

function ProfileCard({ data }) {
  const [{ user, userInfo }, dispatch] = useStateValue();

  const history = useHistory();
  const [ratepopUp, setRatePopUp] = useState(false)

  const yourValentine = () => {
    if (userInfo?.gender) {
      db.collection(userInfo?.gender == 'male' ? 'boys' : 'girls').doc(user?.uid).collection("Preference").add({
        email: email,
        gender: data?.data?.gender,
        name: data?.data?.name,
        rate: "Your Valentine",
        profilePhotoUrl: data?.data?.profilePhotoUrl
      }).then(() => {
        db.collection(data?.data?.gender == 'male' ? 'boys' : 'girls').doc(data?.data?.uid).collection("Preferenceby").add({
          email: email,
          gender: data?.data?.gender,
          name: data?.data?.name,
          rate: "Your Valentine",
          profilePhotoUrl: data?.data?.profilePhotoUrl
        })
      })
        .catch(() => {
          alert('Error', error.message)
        })
      if (userInfo?.gender === 'male') {
        db.collection('boys').doc(user.uid).update({
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })
      }
      else {
        db.collection('girls').doc(user.uid).update({
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })
      }

    } else {
      alert('Something went wrong!')
    }
  }
  const takeChance = () => {
    if (userInfo?.gender) {
      db.collection(userInfo?.gender == 'male' ? 'boys' : 'girls').doc(user?.uid).collection("Preference").add({
        email: email,
        gender: data?.data?.gender,
        name: data?.data?.name,
        rate: "Take a chance",
        profilePhotoUrl: data?.data?.profilePhotoUrl
      }).then(() => {
        db.collection(data?.data?.gender == 'male' ? 'boys' : 'girls').doc(data?.data?.uid).collection("Preferenceby").add({
          email: email,
          gender: data?.data?.gender,
          name: data?.data?.name,
          rate: "Take a chance",
          profilePhotoUrl: data?.data?.profilePhotoUrl
        })
      })
      if (userInfo?.gender === 'male') {
        db.collection('boys').doc(user.uid).update({
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })
      }
      else {
        db.collection('girls').doc(user.uid).update({
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })
      }
    } else {
      alert('Something went wrong!')
    }
  }
  const bestfriend = () => {
    if (userInfo?.gender) {
      db.collection(userInfo?.gender == 'male' ? 'boys' : 'girls').doc(user?.uid).collection("Preference").add({
        email: email,
        gender: data?.data?.gender,
        name: data?.data?.name,
        rate: "Take a chance",
        profilePhotoUrl: data?.data?.profilePhotoUrl
      }).then(() => {
        db.collection(data?.data?.gender == 'male' ? 'boys' : 'girls').doc(data?.data?.uid).collection("Preferenceby").add({
          email: email,
          gender: data?.data?.gender,
          name: data?.data?.name,
          rate: "Take a chance",
          profilePhotoUrl: data?.data?.profilePhotoUrl
        })
      })
      if (userInfo?.gender === 'male') {
        db.collection('boys').doc(user.uid).update({
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })
      }
      else {
        db.collection('girls').doc(user.uid).update({
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })
      }
    } else {
      alert('Something went wrong!')
    }
  }
  const friend = () => {
    if (userInfo?.gender) {
      db.collection(userInfo?.gender == 'male' ? 'boys' : 'girls').doc(user?.uid).collection("Preference").add({
        email: email,
        gender: data?.data?.gender,
        name: data?.data?.name,
        rate: "Friend",
        profilePhotoUrl: data?.data?.profilePhotoUrl
      }).then(() => {
        db.collection(data?.data?.gender == 'male' ? 'boys' : 'girls').doc(data?.data?.uid).collection("Preferenceby").add({
          email: email,
          gender: data?.data?.gender,
          name: data?.data?.name,
          rate: "Friend",
          profilePhotoUrl: data?.data?.profilePhotoUrl
        })
      })
      if (userInfo?.gender === 'male') {
        db.collection('boys').doc(user.uid).update({
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })
      }
      else {
        db.collection('girls').doc(user.uid).update({
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })
      }
    } else {
      alert('Something went wrong!')
    }
  }
  const meraBahi = () => {
    if (userInfo?.gender) {
      db.collection(userInfo?.gender == 'male' ? 'boys' : 'girls').doc(user?.uid).collection("Preference").add({
        email: email,
        gender: data?.data?.gender,
        name: data?.data?.name,
        rate: data?.data?.gender ? "Mera Bhai" : "Meri Bahen",
        profilePhotoUrl: data?.data?.profilePhotoUrl
      }).then(() => {
        db.collection(data?.data?.gender == 'male' ? 'boys' : 'girls').doc(data?.data?.uid).collection("Preferenceby").add({
          email: email,
          gender: data?.data?.gender,
          name: data?.data?.name,
          rate: data?.data?.gender ? "Mera Bhai" : "Meri Bahen",
          profilePhotoUrl: data?.data?.profilePhotoUrl
        })
      })
      if (userInfo?.gender === 'male') {
        db.collection('boys').doc(user.uid).update({
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })
      }
      else {
        db.collection('girls').doc(user.uid).update({
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })
      }
    } else {
      alert('Something went wrong!')
    }
  }
  const notInterested = () => {
    if (userInfo?.gender) {
      db.collection(userInfo?.gender == 'male' ? 'boys' : 'girls').doc(user?.uid).collection("Preference").add({
        email: email,
        gender: data?.data?.gender,
        name: data?.data?.name,
        rate: "Not Interested",
        profilePhotoUrl: data?.data?.profilePhotoUrl
      }).then(() => {
        db.collection(data?.data?.gender == 'male' ? 'boys' : 'girls').doc(data?.data?.uid).collection("Preferenceby").add({
          email: email,
          gender: data?.data?.gender,
          name: data?.data?.name,
          rate: "Not Interested",
          profilePhotoUrl: data?.data?.profilePhotoUrl
        })
      })
      if (userInfo?.gender === 'male') {
        db.collection('boys').doc(user.uid).update({
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })
      }
      else {
        db.collection('girls').doc(user.uid).update({
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })
      }
    } else {
      alert('Something went wrong!')
    }
  }
  const skip = () => {

  }
  return (
    <>
      {
        ratepopUp &&
        <Container>
          <div className="passionPopup">
            <div className="passion_list">
              <div className="Card_popUp__list_V" onClick={yourValentine}>
                Your Valentine
              </div>
              <div className="Card_popUp__list_TC" onClick={takeChance}>
                Take a chance
              </div>
              <div className="Card_popUp__list_BF" onClick={bestfriend}>
                Best Friend
              </div>
              <div className="Card_popUp__list_F" const={friend}>
                Friend
              </div>
              <div className="Card_popUp__list_MB" const={meraBahi}>
                {data?.data?.gender ? "Mera Bhai" : "Meri Bahen"}
              </div>
              <div className="Card_popUp__list_NI" const={notInterested}>
                Not Interested
              </div>
              <div className="Card_popUp__list_S" onClick={skip}>
                Skip
              </div>
            </div>
            {/* <div className="add_passion"> */}
            {/* <p>Add your passion</p> */}
            {/* <input type="text" placeholder = "Enter your passion" value = {input} onChange={e => setInput(e.target.value)} /> */}
            {/* <div className="add_passion_button"> */}
            {/* <button onClick = {add_passion}>Add</button> */}
            {/* </div> */}
            {/* </div> */}
          </div>
        </Container>
      }
      <Card className='profilecard'>
        <CardActionArea>
          <CardMedia
            component="img"
            height="240"
            image={data?.data?.profilePhotoUrl}
            alt="Image"
          />

          <CardContent>
            <Typography gutterBottom variant="div" component="div" style={{ color: '#0a2540', fontWeight: "bold", paddingBottom: '6px' }}>
              {data?.data?.name}<br />
            </Typography>
            <div className="card__Button">
              <button onClick={() => {
                setRatePopUp(true);
              }}>
                Rate
              </button>
              <button>
                Chat
              </button>
            </div>
          </CardContent>
        </CardActionArea>
      </Card>
    </>
  );
}

export default ProfileCard;

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  color: black;
  background-color: #858484cc;
  display: flex;
  justify-content: center;
  animation: fadeIn 0.7s;

  .passionPopup {
    background-color: #fff;
    max-width: 400px;
    width:90vw;
    height: fit-content;
    margin: auto;
    border-radius: 7px;
    display: flex;
    flex-direction: column;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.24);
    padding: 10px;

    .passionPopup_header{
      display: flex;
      width: 100%;
      justify-content: flex-end;
      p {
        margin-bottom: 10px;
        margin-top: 0;
        width: 100%;
      }
    }

    .close_icon {
      margin-right: 5px;
      &:hover {
        color: #6d6969;
        cursor: pointer;
      }
    }

    .add_passion {
      border: 1px solid lightgray;
      padding: 5px;
      border-radius: 5px;
      background-color: white;

      p {
        margin-bottom: 2px;
        margin-top: 5px;
      }

      .add_passion_button{
          display : flex;
          justify-content: flex-end;
          width : 100%;
          button{
            width : 60px;
            background-color : #479dee;
            border-radius : 20px;
            color : white;
            border : 1px solid lightgray; 
            height : 30px;

            &:hover {
                cursor : pointer;
                background-color : #61a9ec
            }
          }
      }

      input{
              border-radius : 5px;
              margin-top : 5px;
              padding-top : 3px;
              padding-bottom : 3px;
              padding-left : 4px;
              padding-right : 5px;
          }
    }
  }
`;