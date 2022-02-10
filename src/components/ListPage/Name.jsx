import React from 'react'
import styled from "styled-components";
import Avatar from "@mui/material/Avatar";


function Name({data}) {
  return (
    <Container>
      <Avatar className="student_avatar"
        src={data?.data?.profilePhotoUrl}
      />
      <p className="name">{data?.data?.name}</p>
      <div className="preference_div">
      <p className = "preference">{data?.data?.rate}</p>
      </div>
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
    margin-left : 0 !important;
}




.student_avatar{
    width : 50px;
    height : 50px;
}

.name{
   margin-left : 20px;
}


.preference_div{
  display : flex;
  justify-content : flex-end;
  width : 100%;
  p{
    background-color : #f1178f;
  width : 170px;
  text-align : center;
  color : white;
  padding-top : 7px;
  padding-bottom : 7px;
  border-radius : 20px;
  margin-bottom : auto;
  margin-top : auto;

  }
}

`;

export default Name