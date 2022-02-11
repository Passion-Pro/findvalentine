import React, { useState, useEffect } from "react";
import "./ProfileCard.css";
import styled from "styled-components";
import CloseIcon from "@mui/icons-material/Close";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Avatar, CardActionArea } from "@mui/material";
import { useHistory } from "react-router-dom";
import { useStateValue } from "../../StateProvider";
import db from "../../firebase";
import firebase from "firebase";
import Loading from "../Loading/Loading";
import { actionTypes } from "../../reducer";

function ProfileCard({ data }) {
  const [{ user, userInfo,showPop,showPopIn }, dispatch] = useStateValue();

  const history = useHistory();
  const [ratepopUp, setRatePopUp] = useState(false);
  const [alreadyRated, setAlreadyRated] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (userInfo?.gender) {
      db.collection(userInfo?.gender == 'male' ? 'boys' : 'girls').doc(user?.uid).collection("Preference").where('email', '==', data?.data?.email).get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            setAlreadyRated(doc?.id)
            // console.log(doc?.id)
          });
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });
    }
  }, [ratepopUp])

  const createChat = (e) => {
    e.preventDefault();

    db.collection(userInfo?.gender == "male" ? "boys" : "girls")
      .doc(user.uid)
      .collection("chats")
      .doc(data?.data?.uid)
      .set({
        name: data?.data?.name,
        email: data?.data?.email,
      })
      .then(() => {
        history.push(`/chat/${data?.data?.uid}`);
      });
  };

  const createChat_mobile = (e) => {
    e.preventDefault();

    db.collection(userInfo?.gender == "male" ? "boys" : "girls")
      .doc(user.uid)
      .collection("chats")
      .doc(data?.data?.uid)
      .set({
        name: data?.data?.name,
        email: data?.data?.email,
      })
      .then(() => {
        history.push(`/chatMobile/${data?.data?.uid}`);
      });
  };

  const yourValentine = () => {
    if (userInfo?.gender) {
      setLoading(true);
      db.collection(userInfo?.gender == 'male' ? 'boys' : 'girls').doc(user?.uid).collection("Preference").add({
        email: data?.data?.email,
        gender: data?.data?.gender,
        name: data?.data?.name,
        rate: "My Valentine",
        rateN: 7,
        profilePhotoUrl: data?.data?.profilePhotoUrl
      }).then(() => {
        db.collection(data?.data?.gender == 'male' ? 'boys' : 'girls').doc(data?.data?.uid).collection("Preferenceby").add({
          email: user?.email,
          gender: userInfo?.gender,
          name: userInfo?.name,
          profilePhotoUrl: userInfo?.profilePhotoUrl,
          rate: "My Valentine",
          rateN: 7,
        }).then(() => {
          setLoading(false);
        })
      })
        .catch((error) => {
          alert('Error', error.message)
          setRatePopUp(false)
          setLoading(false);
        })
      if (userInfo?.gender === "male") {
        db.collection("boys")
          .doc(user.uid)
          .update({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          })
          .then(() => {
            setRatePopUp(false);
          });
      } else {
        db.collection("girls")
          .doc(user.uid)
          .update({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          })
          .then(() => {
            setRatePopUp(false);
          });
      }
    } else {
      alert('Something went wrong!')
      setRatePopUp(false)
      setLoading(false);
    }
  };
  const takeChance = () => {
    if (userInfo?.gender) {
      setLoading(true);
      db.collection(userInfo?.gender == 'male' ? 'boys' : 'girls').doc(user?.uid).collection("Preference").add({
        email: data?.data?.email,
        gender: data?.data?.gender,
        name: data?.data?.name,
        rate: "Take a chance",
        rateN: 6,
        profilePhotoUrl: data?.data?.profilePhotoUrl
      }).then(() => {
        db.collection(data?.data?.gender == 'male' ? 'boys' : 'girls').doc(data?.data?.uid).collection("Preferenceby").add({
          email: user?.email,
          gender: userInfo?.gender,
          name: userInfo?.name,
          profilePhotoUrl: userInfo?.profilePhotoUrl,
          rateN: 6,
          rate: "Take a chance",
        }).then(() => {
          setLoading(false);
        })
      })
      if (userInfo?.gender === 'male') {
        db.collection('boys').doc(user.uid).update({
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        }).then(() => {
          setRatePopUp(false)
          setLoading(false);
        })
      }
      else {
        db.collection('girls').doc(user.uid).update({
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        }).then(() => {
          setRatePopUp(false)
          setLoading(false);
        });
      }
    } else {
      alert('Something went wrong!')
      setRatePopUp(false)
      setLoading(false);
    }
  };

  const bestfriend = () => {
    if (userInfo?.gender) {
      setLoading(true);
      db.collection(userInfo?.gender == 'male' ? 'boys' : 'girls').doc(user?.uid).collection("Preference").add({
        email: data?.data?.email,
        gender: data?.data?.gender,
        name: data?.data?.name,
        rate: "Take a chance",
        rateN: 5,
        profilePhotoUrl: data?.data?.profilePhotoUrl
      }).then(() => {
        db.collection(data?.data?.gender == 'male' ? 'boys' : 'girls').doc(data?.data?.uid).collection("Preferenceby").add({
          rateN: 5,
          email: user?.email,
          gender: userInfo?.gender,
          name: userInfo?.name,
          profilePhotoUrl: userInfo?.profilePhotoUrl,
          rate: "Take a chance",
        }).then(() => {
          setLoading(false);
        })
      })
      if (userInfo?.gender === 'male') {
        db.collection('boys').doc(user.uid).update({
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        }).then(() => {
          setRatePopUp(false)
          setRatePopUp(false)
        })
      }
      else {
        db.collection('girls').doc(user.uid).update({
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        }).then(() => {
          setRatePopUp(false)
          setRatePopUp(false)
        });
      }
    } else {
      alert('Something went wrong!')
      setRatePopUp(false)
      setRatePopUp(false)
    }
  };
  
  const friend = () => {
    if (userInfo?.gender) {
      setLoading(true);
      db.collection(userInfo?.gender == 'male' ? 'boys' : 'girls').doc(user?.uid).collection("Preference").add({
        email: data?.data?.email,
        gender: data?.data?.gender,
        name: data?.data?.name,
        rate: "Friend",
        rateN: 4,
        profilePhotoUrl: data?.data?.profilePhotoUrl
      }).then(() => {
        db.collection(data?.data?.gender == 'male' ? 'boys' : 'girls').doc(data?.data?.uid).collection("Preferenceby").add({
          rateN: 4,
          email: user?.email,
          gender: userInfo?.gender,
          name: userInfo?.name,
          profilePhotoUrl: userInfo?.profilePhotoUrl,
          rate: "Friend",
        }).then(() => {
          setLoading(false);
        })
      })
      if (userInfo?.gender === 'male') {
        db.collection('boys').doc(user.uid).update({
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        }).then(() => {
          setRatePopUp(false);
        })
      }
      else {
        db.collection('girls').doc(user.uid).update({
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        }).then(() => {
          setRatePopUp(false)
        });
      }
    } else {
      alert('Something went wrong!')
      setRatePopUp(false)
    }
  };
  
  const meraBahi = () => {
    if (userInfo?.gender) {
      setRatePopUp(true)
      db.collection(userInfo?.gender == 'male' ? 'boys' : 'girls').doc(user?.uid).collection("Preference").add({
        email: data?.data?.email,
        gender: data?.data?.gender,
        rateN: 3,
        name: data?.data?.name,
        rate: data?.data?.gender ? "Mera Bhai" : "Meri Bahen",
        profilePhotoUrl: data?.data?.profilePhotoUrl
      }).then(() => {
        db.collection(data?.data?.gender == 'male' ? 'boys' : 'girls').doc(data?.data?.uid).collection("Preferenceby").add({
          rateN: 3,
          email: user?.email,
          gender: userInfo?.gender,
          name: userInfo?.name,
          profilePhotoUrl: userInfo?.profilePhotoUrl,
          rate: data?.data?.gender ? "Mera Bhai" : "Meri Bahen",
        }).then(() => {
          setLoading(false);
        })
      })
      if (userInfo?.gender === 'male') {
        db.collection('boys').doc(user.uid).update({
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        }).then(() => {
          setRatePopUp(false)
          setLoading(false);
        })
      }
      else {
        db.collection('girls').doc(user.uid).update({
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        }).then(() => {
          setLoading(false);
          setRatePopUp(false)
        });
      }
    } else {
      alert("Something went wrong!");
      setRatePopUp(false);
    }
  };
  
  const notInterested = () => {
    if (userInfo?.gender) {
      setLoading(true);
      db.collection(userInfo?.gender == 'male' ? 'boys' : 'girls').doc(user?.uid).collection("Preference").add({
        email: data?.data?.email,
        gender: data?.data?.gender,
        name: data?.data?.name,
        rate: "Not Interested",
        rateN: 2,
        profilePhotoUrl: data?.data?.profilePhotoUrl
      }).then(() => {
        db.collection(data?.data?.gender == 'male' ? 'boys' : 'girls').doc(data?.data?.uid).collection("Preferenceby").add({
          email: user?.email,
          gender: userInfo?.gender,
          name: userInfo?.name,
          profilePhotoUrl: userInfo?.profilePhotoUrl,
          rateN: 2,
          rate: "Not Interested",
        }).then(() => {
          setLoading(false);
        })
      })
      if (userInfo?.gender === 'male') {
        db.collection('boys').doc(user.uid).update({
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        }).then(() => {
          setRatePopUp(false)
        })
      }
      else {
        db.collection('girls').doc(user.uid).update({
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        }).then(() => {
          setRatePopUp(false)
        });
      }
    } else {
      alert('Something went wrong!');
      setLoading(false)
    }
  };
  const skip = () => {
    console.log(data?.data?.uid,"?????? skip",data?.id)
    if (userInfo?.gender) {
      setLoading(true)
      if (userInfo?.gender === 'male') {
        db.collection('girls').doc(data?.data?.uid).update({
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        }).then(() => {
          setRatePopUp(false);
          setLoading(false)
        })
      }
      else {
        db.collection('boys').doc(data?.data?.uid).update({
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        }).then(() => {
          setRatePopUp(false)
          setLoading(false)
        })
      }
    } else {
      alert('Something went wrong!')
      setLoading(false)
    }
  }
  useEffect(()=>{
    dispatch({
      type: actionTypes.SET_SHOW_POP,
      showPop: true,
    })
    dispatch({
      type: actionTypes.SET_SHOW_POP_IN,
      showPopIn: false,
    })
  },[])

  return (
    <>
      {loading ?
       <Loading/>
        :
        <>
          <Card className='profilecard'>
            <CardActionArea>
              <CardMedia
                component="img"
                height="240"
                image={data?.data?.profilePhotoUrl ? data?.data?.profilePhotoUrl:"https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/694px-Unknown_person.jpg"}
                alt="Image"
              />

              <CardContent>
                <Typography gutterBottom variant="div" component="div" style={{ color: '#0a2540', fontWeight: "bold", paddingBottom: '6px' }}>
                  {data?.data?.name}<br />
                </Typography>
                <div className="card__Button">
                  <button onClick={() => {
                    dispatch({
                      type: actionTypes.SET_SHOW_POP_IN,
                      showPopIn: true,
                    })
                    console.log("/////",showPopIn)
                    history.push(`/profilePop/${data?.id}`)
                  }}>
                    Preference
                  </button>
                  <button onClick = {createChat_mobile}
                   className = "chat_mobile"
                  >
                    Chat
                  </button>
                  <button  onClick = {createChat}
                  className = "chat_laptop"
                  >
                    Chat
                  </button>
                </div>
              </CardContent>
            </CardActionArea>
          </Card>
        </>
      }
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
    width: 90vw;
    height: fit-content;
    margin: auto;
    border-radius: 7px;
    display: flex;
    flex-direction: column;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.24);
    padding: 10px;

    .passionPopup_header {
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

      .add_passion_button {
        display: flex;
        justify-content: flex-end;
        width: 100%;
        button {
          width: 60px;
          background-color: #479dee;
          border-radius: 20px;
          color: white;
          border: 1px solid lightgray;
          height: 30px;

          &:hover {
            cursor: pointer;
            background-color: #61a9ec;
          }
        }
      }

      input {
        border-radius: 5px;
        margin-top: 5px;
        padding-top: 3px;
        padding-bottom: 3px;
        padding-left: 4px;
        padding-right: 5px;
      }
    }
  }
`;


// {showPop &&
//   <Container>
//     <div className="passionPopup">
//       <div className="passion_list">
//         <div className="Card_popUp__list_V" onClick={alreadyRated != '' ? () => {
//           alert("You already choose one.")
//         } : yourValentine}>
//           My Valentine
//         </div>
//         <div className="Card_popUp__list_TC"
//           onClick={alreadyRated != '' ? () => {
//             alert("You already choose one.")
//           } : takeChance}>
//           Take a chance
//         </div>
//         <div className="Card_popUp__list_BF" onClick={alreadyRated != '' ? () => {
//           alert("You already choose one.")
//         } : bestfriend}>
//           Best Friend
//         </div>
//         <div className="Card_popUp__list_F" onClick={alreadyRated != '' ? () => {
//           alert("You already choose one.")
//         } : friend}>
//           Friend
//         </div>
//         {/* <div className="Card_popUp__list_MB" onClick={alreadyRated != '' ? () => {
//           alert("You already choose one.")
//         } : meraBahi}>
//           {data?.data?.gender == "female" ? "Mera Bhai" : "Meri Bahen"}
//         </div> */}
//         <div className="Card_popUp__list_NI" onClick={alreadyRated != '' ? () => {
//           alert("You already choose one.")
//         } : notInterested}>
//           Not Interested
//         </div>
//         <div className="Card_popUp__list_S" onClick={skip}>
//           Skip
//         </div>
//       </div>
//     </div>
//   </Container>
// }