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
import { useParams } from "react-router-dom";

function ValentinePopUp() {
    const [{ user, userInfo, showPop }, dispatch] = useStateValue();

    const { popId } = useParams();
    const history = useHistory();
    const [data, setData] = useState([])
    const [ratepopUp, setRatePopUp] = useState(false);
    const [alreadyRated, setAlreadyRated] = useState('');
    const [loading, setLoading] = useState(false);
   console.log("first oooo",showPop);
   
    useEffect(() => {
        if (!showPop) {
          history.push('/findvalentine')
        }
      }, [showPop]);
      
    useEffect(() => {
        if (userInfo?.gender) {
            setLoading(true)
            db.collection(userInfo?.gender != 'male' ? 'boys' : 'girls').doc(popId)
                .onSnapshot((snapshot) => {
                    setData(snapshot.data());
                })
            setLoading(false)
        }
    }, [userInfo?.gender])
    console.log("first", data)
    useEffect(() => {
        if (userInfo?.gender && data?.email) {
            db.collection(userInfo?.gender == 'male' ? 'boys' : 'girls').doc(user?.uid).collection("Preference").where('email', '==', data?.email).get()
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
    }, [ratepopUp, data?.email])

    const createChat = (e) => {
        e.preventDefault();

        db.collection(userInfo?.gender == "male" ? "boys" : "girls")
            .doc(user.uid)
            .collection("chats")
            .doc(data?.uid)
            .set({
                name: data?.name,
                email: data?.email,
            })
            .then(() => {
                history.push(`/chat/${data?.uid}`);
            });
    };

    const createChat_mobile = (e) => {
        e.preventDefault();

        db.collection(userInfo?.gender == "male" ? "boys" : "girls")
            .doc(user.uid)
            .collection("chats")
            .doc(data?.uid)
            .set({
                name: data?.name,
                email: data?.email,
            })
            .then(() => {
                history.push(`/chatMobile/${data?.uid}`);
            });
    };

    const yourValentine = () => {
        if (userInfo?.gender) {
            setLoading(true);
            db.collection(userInfo?.gender == 'male' ? 'boys' : 'girls').doc(user?.uid).collection("Preference").add({
                email: data?.email,
                gender: data?.gender,
                name: data?.name,
                rate: "My Valentine",
                rateN: 7,
                profilePhotoUrl: data?.profilePhotoUrl
            }).then(() => {
                db.collection(data?.gender == 'male' ? 'boys' : 'girls').doc(data?.uid).collection("Preferenceby").add({
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
                    dispatch({
                        type: actionTypes.SET_SHOW_POP,
                        showPop: false,
                    })
                    setLoading(false);
                })
            if (userInfo?.gender === "male") {
                db.collection("girls")
                    .doc(data?.uid)
                    .update({
                        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                    })
                    .then(() => {
                        dispatch({
                            type: actionTypes.SET_SHOW_POP,
                            showPop: false,
                        });
                    });
            } else {
                db.collection("boys")
                    .doc(data?.uid)
                    .update({
                        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                    })
                    .then(() => {
                        dispatch({
                            type: actionTypes.SET_SHOW_POP,
                            showPop: false,
                        });
                    });
            }
        } else {
            alert('Something went wrong!')
            dispatch({
                type: actionTypes.SET_SHOW_POP,
                showPop: false,
            })
            setLoading(false);
        }
    };
    const takeChance = () => {
        if (userInfo?.gender) {
            setLoading(true);
            db.collection(userInfo?.gender == 'male' ? 'boys' : 'girls').doc(user?.uid).collection("Preference").add({
                email: data?.email,
                gender: data?.gender,
                name: data?.name,
                rate: "Take a chance",
                rateN: 6,
                profilePhotoUrl: data?.profilePhotoUrl
            }).then(() => {
                db.collection(data?.gender == 'male' ? 'boys' : 'girls').doc(data?.uid).collection("Preferenceby").add({
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
                db.collection('boys').doc(data?.uid).update({
                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                }).then(() => {
                    dispatch({
                        type: actionTypes.SET_SHOW_POP,
                        showPop: false,
                    })
                    setLoading(false);
                })
            }
            else {
                db.collection('boys').doc(data?.uid).update({
                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                }).then(() => {
                    dispatch({
                        type: actionTypes.SET_SHOW_POP,
                        showPop: false,
                    })
                    setLoading(false);
                });
            }
        } else {
            alert('Something went wrong!')
            dispatch({
                type: actionTypes.SET_SHOW_POP,
                showPop: false,
            })
            setLoading(false);
        }
    };

    const bestfriend = () => {
        if (userInfo?.gender) {
            setLoading(true);
            db.collection(userInfo?.gender == 'male' ? 'boys' : 'girls').doc(user?.uid).collection("Preference").add({
                email: data?.email,
                gender: data?.gender,
                name: data?.name,
                rate: "Take a chance",
                rateN: 5,
                profilePhotoUrl: data?.profilePhotoUrl
            }).then(() => {
                db.collection(data?.gender == 'male' ? 'boys' : 'girls').doc(data?.uid).collection("Preferenceby").add({
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
                db.collection('girls').doc(data?.uid).update({
                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                }).then(() => {
                    dispatch({
                        type: actionTypes.SET_SHOW_POP,
                        showPop: false,
                    })
                    setLoading(false);
                })
            }
            else {
                db.collection('boys').doc(data?.uid).update({
                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                }).then(() => {
                    dispatch({
                        type: actionTypes.SET_SHOW_POP,
                        showPop: false,
                    })
                    setLoading(false);
                });
            }
        } else {
            alert('Something went wrong!')
            dispatch({
                type: actionTypes.SET_SHOW_POP,
                showPop: false,
            })
            setLoading(false);
        }
    };

    const friend = () => {
        if (userInfo?.gender) {
            setLoading(true);
            db.collection(userInfo?.gender == 'male' ? 'boys' : 'girls').doc(user?.uid).collection("Preference").add({
                email: data?.email,
                gender: data?.gender,
                name: data?.name,
                rate: "Friend",
                rateN: 4,
                profilePhotoUrl: data?.profilePhotoUrl
            }).then(() => {
                db.collection(data?.gender == 'male' ? 'boys' : 'girls').doc(data?.uid).collection("Preferenceby").add({
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
                db.collection('girls').doc(data?.uid).update({
                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                }).then(() => {
                    dispatch({
                        type: actionTypes.SET_SHOW_POP,
                        showPop: false,
                    });
                })
            }
            else {
                db.collection('boys').doc(data?.uid).update({
                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                }).then(() => {
                    dispatch({
                        type: actionTypes.SET_SHOW_POP,
                        showPop: false,
                    })
                });
            }
        } else {
            alert('Something went wrong!')
            dispatch({
                type: actionTypes.SET_SHOW_POP,
                showPop: false,
            })
        }
    };

    const meraBahi = () => {
        if (userInfo?.gender) {
            setRatePopUp(true)
            db.collection(userInfo?.gender == 'male' ? 'boys' : 'girls').doc(user?.uid).collection("Preference").add({
                email: data?.email,
                gender: data?.gender,
                rateN: 3,
                name: data?.name,
                rate: data?.gender ? "Mera Bhai" : "Meri Bahen",
                profilePhotoUrl: data?.profilePhotoUrl
            }).then(() => {
                db.collection(data?.gender == 'male' ? 'boys' : 'girls').doc(data?.uid).collection("Preferenceby").add({
                    rateN: 3,
                    email: user?.email,
                    gender: userInfo?.gender,
                    name: userInfo?.name,
                    profilePhotoUrl: userInfo?.profilePhotoUrl,
                    rate: data?.gender ? "Mera Bhai" : "Meri Bahen",
                }).then(() => {
                    setLoading(false);
                })
            })
            if (userInfo?.gender === 'male') {
                db.collection('girls').doc(data?.uid).update({
                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                }).then(() => {
                    dispatch({
                        type: actionTypes.SET_SHOW_POP,
                        showPop: false,
                    })
                    setLoading(false);
                })
            }
            else {
                db.collection('boys').doc(data?.uid).update({
                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                }).then(() => {
                    setLoading(false);
                    dispatch({
                        type: actionTypes.SET_SHOW_POP,
                        showPop: false,
                    })
                });
            }
        } else {
            alert("Something went wrong!");
            dispatch({
                type: actionTypes.SET_SHOW_POP,
                showPop: false,
            });
        }
    };

    const notInterested = () => {
        if (userInfo?.gender) {
            setLoading(true);
            db.collection(userInfo?.gender == 'male' ? 'boys' : 'girls').doc(user?.uid).collection("Preference").add({
                email: data?.email,
                gender: data?.gender,
                name: data?.name,
                rate: "Not Interested",
                rateN: 2,
                profilePhotoUrl: data?.profilePhotoUrl
            }).then(() => {
                db.collection(data?.gender == 'male' ? 'boys' : 'girls').doc(data?.uid).collection("Preferenceby").add({
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
                db.collection('girls').doc(data?.uid).update({
                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                }).then(() => {
                    dispatch({
                        type: actionTypes.SET_SHOW_POP,
                        showPop: false,
                    })
                })
            }
            else {
                db.collection('boys').doc(data?.uid).update({
                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                }).then(() => {
                    dispatch({
                        type: actionTypes.SET_SHOW_POP,
                        showPop: false,
                    })
                });
            }
        } else {
            alert('Something went wrong!');
            setLoading(false)
        }
    };
    const skip = () => {
        // console.log(data?.uid,"?????? skip",data?.id)
        if (userInfo?.gender) {
            setLoading(true)
            if (userInfo?.gender === 'male') {
                db.collection('girls').doc(data?.uid).update({
                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                }).then(() => {
                    dispatch({
                        type: actionTypes.SET_SHOW_POP,
                        showPop: false,
                    });
                    setLoading(false)
                })
            }
            else {
                db.collection('boys').doc(data?.uid).update({
                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                }).then(() => {
                    dispatch({
                        type: actionTypes.SET_SHOW_POP,
                        showPop: false,
                    })
                    setLoading(false)
                })
            }
        } else {
            alert('Something went wrong!')
            setLoading(false)
        }
    }
    return (
        <>
            {loading ?
                <Loading />
                :
                <>
                    <Container>
                        <div className="passionPopup" >
                            <div className="passion_list">
                                <div className="Card_popUp__list_V" onClick={alreadyRated != '' ? () => {
                                    alert("You already choose one.")
                                } : yourValentine}>
                                    My Valentine
                                </div>
                                <div className="Card_popUp__list_TC"
                                    onClick={alreadyRated != '' ? () => {
                                        alert("You already choose one.")
                                    } : takeChance}>
                                    Take a chance
                                </div>
                                <div className="Card_popUp__list_BF" onClick={alreadyRated != '' ? () => {
                                    alert("You already choose one.")
                                } : bestfriend}>
                                    Best Friend
                                </div>
                                <div className="Card_popUp__list_F" onClick={alreadyRated != '' ? () => {
                                    alert("You already choose one.")
                                } : friend}>
                                    Friend
                                </div>
                                {/* <div className="Card_popUp__list_MB" onClick={alreadyRated != '' ? () => {
                    alert("You already choose one.")
                  } : meraBahi}>
                    {data?.gender == "female" ? "Mera Bhai" : "Meri Bahen"}
                  </div> */}
                                <div className="Card_popUp__list_NI" onClick={alreadyRated != '' ? () => {
                                    alert("You already choose one.")
                                } : notInterested}>
                                    Not Interested
                                </div>
                                <div className="Card_popUp__list_S" onClick={skip}>
                                    Skip
                                </div>
                            </div>
                        </div>
                    </Container>
                </>
            }
        </>
    );
}

export default ValentinePopUp;

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
