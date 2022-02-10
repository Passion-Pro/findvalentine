import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import HeaderSecond from "../Header/HeaderSecond";
import styled from "styled-components";
import ChatName from "./ChatName";
import Avatar from "@mui/material/Avatar";
import SendIcon from "@mui/icons-material/Send";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { useParams, useHistory } from "react-router-dom";
import Picker from "emoji-picker-react";
import db from "../../firebase";
import { useStateValue } from "../../StateProvider";
import { actionTypes } from "../../reducer";
import firebase from "firebase";
import Message from "./Message";

function HomeChat() {
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

  useEffect(() => {
    console.log(userInfo);
    if (user?.uid && userInfo?.gender) {
      console.log("Gender is ", userInfo?.gender);
      db.collection(userInfo?.gender === "male" ? "boys" : "girls")
        .doc(user?.uid)
        .collection("chats")
        .onSnapshot((snapshot) =>
          setChats(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          )
        );
    }
  }, [user?.uid, userInfo?.gender]);

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
    <div>
      <Header />
      <HeaderSecond />
      <Container>
        <div className="chatIN">
          <div className="chat_names">
            <div className="chat_header">
              <p>Chats</p>
            </div>
            <div className="names">
              {chats.map((chat) => (
                <>
                <ChatName chat={chat} />
                </>
              ))}
            </div>
          </div>
          <div className="chat_messages">
            <div className="messages_header">
              <Avatar
                className="student_avatar"
                src="https://cdn.britannica.com/66/188766-050-38F1436A/Mark-Zuckerberg-2010.jpg"
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
          </div>
        </div>
      </Container>
    </div>
  );
}

const Container = styled.div`
  display: flex;
  height: 85vh;
  width: 100vw;
  justify-content: center;
  border-bottom: 1px solid lightgray;
  .chatIN {
    display: flex;
    max-width: 1200px;
    width: 100%;
  }
  .chat_names {
    display: flex;
    flex-direction: column;
    flex: 0.25 !important;
    border-right: 1px solid lightgray;
    border-left: 1px solid lightgray;
    overflow-y : scroll;

    @media(max-width: 500px){
      flex : 1 !important;
    }

    ::-webkit-scrollbar{
      display : none;
    }
  }

  .chat_messages {
    flex: 0.75;
    border-right: 1px solid lightgray;
    display: flex;
    flex-direction: column;


    @media(max-width: 500px){
      display : none;
    }
  }

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

export default HomeChat;
