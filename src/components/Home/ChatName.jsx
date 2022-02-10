import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Avatar from "@mui/material/Avatar";
import db from "../../firebase";
import { useStateValue } from "../../StateProvider";
import { useHistory } from "react-router-dom";

function ChatName({ chat }) {
  const [{ user, userInfo }, dispatch] = useStateValue();
  const history = useHistory();

  const openChat = (e) => {
    db.collection(userInfo?.gender === "female" ? "boys" : "girls")
      .where("email", "==", chat?.data?.email)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());

          history.push(`/chat/${doc.id}`);

         

        });
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  };

  const openChatPage = (e) => {
    db.collection(userInfo?.gender === "female" ? "boys" : "girls")
      .where("email", "==", chat?.data?.email)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());

          history.push(`/chatMobile/${doc?.id}`)

        });
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  }

  return (
    <>
     <Container onClick={openChat} >
       <div className="name_laptop" >
       <Avatar
        className="student_avatar"
        src="https://cdn.britannica.com/66/188766-050-38F1436A/Mark-Zuckerberg-2010.jpg"
      />
      <p className="name">{chat?.data?.name}</p>
       </div>
    </Container>
    <Container onClick={openChatPage} className="name_mobile">
     <div className="name_mobile">
     <Avatar
        className="student_avatar"
        src="https://cdn.britannica.com/66/188766-050-38F1436A/Mark-Zuckerberg-2010.jpg"
      />
      <p className="name">{chat?.data?.name}</p>
     </div>
    </Container>
    </>
  );
}

const Container = styled.div`
  @media(max-width: 500px){
      width : 100%;
  }


  &:hover {
       cursor: pointer;
       background-color: lightgray;
  }

  /* @media (max-width: 500px) {
    width: 90%;
    min-width: 90%;
    margin-left: 0 !important;
  } */

  .student_avatar {
    width: 50px;
    height: 50px;
    margin-left : 10px;
  }

  .name {
    margin-left: 20px;
  }

  .rate {
    span {
      border: 0;
      padding: 10px;
      border-radius: 20px;
      background-color: #e02985;
      color: white;
    }
  }
  .name_laptop{
    display : flex;
    padding: 10px 0;
  border-bottom: 1px solid lightgray;
  background-color: #fff;

      @media(max-width: 500px){
          display : none ;
      }
  }

  .name_mobile{
    display : flex ;
    padding: 10px 0;
  border-bottom: 1px solid lightgray;
  background-color: #fff;

    @media(min-width: 500px){
          display : none ;
      }
  }
`;

export default ChatName;
