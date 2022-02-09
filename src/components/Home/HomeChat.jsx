import React from "react";
import Header from "../Header/Header";
import HeaderSecond from "../Header/HeaderSecond";
import styled from "styled-components";

function HomeChat() {
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
              <ChatName/>
            </div>
          </div>
          <div className="chat_messages"></div>
        </div>
      </Container>
    </div>
  );
}

const Container = styled.div`
  display: flex;
  height: 86vh;
  width: 100vw;
  justify-content: center;
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
  }

  .chat_messages {
    flex: 0.65;
  }

  .chat_header {
     border-bottom: 1px solid lightgray;
     padding-left : 10px;
  }
`;

export default HomeChat;
