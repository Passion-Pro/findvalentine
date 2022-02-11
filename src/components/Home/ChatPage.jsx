import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import HeaderSecond from "../Header/HeaderSecond";
import styled from "styled-components";
import ChatName from "./ChatName";
import Avatar from "@mui/material/Avatar";
import SendIcon from "@mui/icons-material/Send";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import { useParams, useHistory } from "react-router-dom";
import Picker from "emoji-picker-react";
import db from "../../firebase";
import { useStateValue } from "../../StateProvider";
import { actionTypes } from "../../reducer";
import firebase from "firebase";
import Message from "./Message";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';



function ChatPage() {
    const [chosenEmoji, setChosenEmoji] = useState(null);
    const [openEmojis, setOpenEmojis] = useState(false);
    const history = useHistory();
    const [input, setInput] = useState("");
    const [{ user, userInfo }, dispatch] = useStateValue();
    const [messages, setMessages] = useState([]);
    const [chats, setChats] = useState([]);
    const [mesages, setMesages] = useState([]);
    const { chatId } = useParams();
    const[chatInfo , setChatInfo] = useState([]);
    const[profilePhotoUrl ,setProfilePhotoUrl] = useState();

    useEffect(() => {
        if (user?.uid && userInfo?.gender && chatId) {
          db.collection(userInfo?.gender === "male" ? "boys" : "girls")
            .doc(user?.uid)
            .collection("chats")
            .doc(chatId)
            .collection("messages")
            .orderBy("timestamp", "desc")
            .onSnapshot((snapshot) =>
              setMessages(
                snapshot.docs.map((doc) => ({
                  id: doc.id,
                  data: doc.data(),
                }))
              )
            );


    
            db.collection(userInfo?.gender === "male" ? "boys" : "girls")
            .doc(user?.uid)
            .collection("chats")
            .doc(chatId).onSnapshot((snapshot) => {
              setChatInfo(snapshot.data());
            })


        }
      }, [chatId, user?.uid, userInfo?.gender]);

      useEffect(() => {
          console.log("ChatInfo is " , chatInfo);
      } , [chatInfo]);

      useEffect(() => {
         if(chatId){
           db.collection(userInfo?.gender === "female" ? "boys" : "girls").doc(chatId).onSnapshot((snapshot) => {
             setProfilePhotoUrl(snapshot.data().profilePhotoUrl)
           })
         }
      } , [chatId])

const onEmojiClick = (event, emojiObject) => {
        setChosenEmoji(emojiObject);
        setInput(input + emojiObject?.emoji);
      };

      const send_message = (e) => {
        e.preventDefault();
         console.log("ChatId is " , chatId);
         console.log("My Id is" , user?.uid)
        if (messages?.length === 0 && chatId && user?.uid && input!== '') {
          console.log("done1"); 
          db.collection(userInfo?.gender === "female" ? "boys" : "girls")
            .doc(chatId)
            .collection("chats")
            .doc(user?.uid)
            .set({
              name: userInfo?.name,
              email: userInfo?.email,
            })
            .then(() => {
              console.log("done2");
              db.collection(userInfo?.gender === "female" ? "boys" : "girls")
                .doc(chatId)
                .collection("chats")
                .doc(user?.uid)
                .collection("messages")
                .add({
                  message: input,
                  name: userInfo?.name,
                  timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                  email : userInfo?.email,
                  gender : userInfo?.gender
                });
            });
    
          db.collection(userInfo?.gender === "male" ? "boys" : "girls")
            .doc(user?.uid)
            .collection("chats")
            .doc(chatId)
            .collection("messages")
            .add({
              message: input,
              name: userInfo?.name,
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              email : userInfo?.email,
              gender : userInfo?.gender
            });
            setInput('')
        } else if(chatId && user?.uid && input!== '') {
          db.collection(userInfo?.gender === "male" ? "boys" : "girls")
            .doc(user?.uid)
            .collection("chats")
            .doc(chatId)
            .collection("messages")
            .add({
              message: input,
              name: userInfo?.name,
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              email : userInfo?.email,
              gender : userInfo?.gender
            });
    
          db.collection(userInfo?.gender === "female" ? "boys" : "girls")
            .doc(chatId)
            .collection("chats")
            .doc(user?.uid)
            .collection("messages")
            .add({
              message: input,
              name: userInfo?.name,
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              email : userInfo?.email,
              gender : userInfo?.gender
            });
            setInput('');
    
        }
    
      };


  return (
    <Container>
        <div className="messages_header">
              <ArrowBackIcon onClick={() => {
                  history.goBack()
              }}
               style = {{
                   marginRight : '10px',
                   marginTop : 'auto',
                   marginBottom : 'auto',
               }}
              />
              <Avatar
                className="student_avatar"
                src= {profilePhotoUrl}
              />
              <p className="name">{chatInfo?.name}</p>
            </div>
            <div className="messages_messages">
               {messages.map((message) => (
                 <Message message = {message?.data}/>
               ))}
            </div>
            <div className="chat_section_footer">
              <div className="message_input">
                <InsertEmoticonIcon
                  className="emoji_icon"
                  onClick={(e) => setOpenEmojis(!openEmojis)}
                />
                <input
                  type="text"
                  value={input}
                  onChange={(e) => {
                    setInput(e.target.value);
                  }}
                />
              </div>
              <SendIcon className="send_icon" onClick={send_message} />
            </div>
            {openEmojis === true && <Picker onEmojiClick={onEmojiClick} />}
    </Container>

  )
};

const Container = styled.div`
  height : 95vh;
  display : flex;
  flex-direction : column;

  .chat_header {
    border-bottom: 1px solid lightgray;
    padding-left: 10px;
  }

  .messages_header {
    display: flex;
    padding: 7px;
    border-bottom: 1px solid lightgray;

    p {
      margin-top: 10px;
      margin-left: 10px;
      margin-bottom: 0;
    }
  }

  .messages_messages {
    flex: 1;
    display: flex;
    flex-direction: column-reverse;
    overflow-y : scroll;

    ::-webkit-scrollbar {
      display: none;
    }


    

  }

  .chat_section_footer {
    padding: 10px;
    display: flex;

    .message_input {
      border: 1px solid lightgray;
      width: 95%;
      border-radius: 20px;
      display: flex;
      padding: 3px;
    }

    input {
      outline: 0;
      border: 0;
      height: inherit;
      margin-left: 5px;
      padding: 0;
      font-size: 18px;
      width: 100%;
      padding-right: 10px;
    }

    .emoji_icon {
      font-size: 25px;
      color: #686868;

      &:hover {
        cursor: pointer;
        color: gray;
      }
    }
  }

  .send_icon {
    margin-left: 10px;
    margin-top: auto;
    margin-bottom: auto;
    color: #686868;

    &:hover {
      cursor: pointer;
      color: gray;
    }
  }

  .emoji-picker-react {
    width: 100%;
  }


`;

export default ChatPage