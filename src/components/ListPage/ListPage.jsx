import React , {useState , useEffect} from 'react'
import styled from "styled-components";
import Name from './Name';


function ListPage() {
  const[preference , setPreference] = useState("Preferences");

  return (
    <Container>
      <div className="list">
        <Name/>
        <Name/>
        <Name/>
    </div>    
    </Container>
  )
};

const Container = styled.div`
/* height : 100vh;
width : 100vw; */

.list{
    display : flex;
    flex-direction : column;
    justify-content : center; 
    margin-top : 20px;
    width : 100%;
    align-items : center;
}

.preferences_buttons{
    margin-top : 15px;
    
    

    @media(max-width: 500px){
       width : 90%;
       margin-left : auto;
       margin-right : auto; 
    }

    button{
       margin-right : 10px;
       padding : 7px;
       border-radius : 20px;
       border : 1px solid lightgray;
    }
}


`

export default ListPage