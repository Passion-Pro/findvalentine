import React from 'react'
import styled from "styled-components";
import Avatar from "@mui/material/Avatar";


function Name() {
  return (
    <Container>
        <Avatar className="student_avatar"
         src = "https://cdn.britannica.com/66/188766-050-38F1436A/Mark-Zuckerberg-2010.jpg"
        />
        <p className = "name">Ronak</p>
        <p style = {{
            textAlign : "right",
            width : "100%",
        }}
         className = "rate"
        >
            <span
             style = {{
                 width : "fit-content"
             }}
            >
            Your Valentine
            </span>
        </p>
    </Container>
  )
}



const Container = styled.div`
display : flex;
padding : 10px;
border : 1px solid lightgray;
margin-left : 10px;
width : 30%;
background-color : #fff;
min-width : 400px;

@media(max-width:500px) {
    width : 90%;
    min-width : 90%;
}



.student_avatar{
    width : 50px;
    height : 50px;
}

.name{
   margin-left : 20px;
}

.rate{
  span{
    border : 0;
    padding : 10px;
    border-radius : 20px;
    background-color : #e02985;
    color : white;
  }
}
`;

export default Name