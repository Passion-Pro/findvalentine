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

  return (
    <Container onClick={openChat}>
      <Avatar
        className="student_avatar"
        src="https://cdn.britannica.com/66/188766-050-38F1436A/Mark-Zuckerberg-2010.jpg"
      />
      <p className="name">{chat?.data?.name}</p>
      <p
        style={{
          textAlign: "right",
          width: "100%",
        }}
        className="rate"
      >
        <span
          style={{
            width: "fit-content",
          }}
        >
          Your Valentine
        </span>
      </p>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  padding: 10px;
  border-bottom: 1px solid lightgray;
  width: 30%;
  background-color: #fff;
  min-width: 400px;

  @media (max-width: 500px) {
    width: 90%;
    min-width: 90%;
    margin-left: 0 !important;
  }

  .student_avatar {
    width: 50px;
    height: 50px;
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
`;

export default ChatName;
