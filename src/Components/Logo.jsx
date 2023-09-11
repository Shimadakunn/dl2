import styled from 'styled-components';
import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
import HeartEye from './SVG/HeartEyeSVG.jsx'

const Container = styled.div`
    position: fixed;
    z-index: 5;
    top: 0;
    left: 0;
    margin-top: 1vh;
    margin-left: 0.75vw;
    height: 7.5vh;
    width: 15vw;
    @media (max-width: 1025px) {width: 30vw;}
    @media (max-width: 540px) {width: 60vw;}
`
const Content = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const SvgContainer = styled.div`
  flex: 1;
  width: 100%;
  height: 100%;
  position: relative;
  transition: transform 400ms ease; 
  &:hover{transform: scale(1.2);}
  &:active{transform: scale(0.95);}
`
const Svg = styled.div`
  position: absolute;
  left: 5%;
  top: 10%; 
  opacity: ${({ show }) => (show ? 1 : 0)};
  transition: opacity 500ms ease;
  @media (max-width: 1025px) {width: 75%;left:30%}
  @media (max-width: 540px) {width: 75%;left:30%}
`
const NameContainer = styled.div`
  flex: 3.5;
  width: 100%;
  height: 100%;
  position: relative;
`
const Name = styled.div`
  font-family: 'Jandy';
  font-size: 1.5vw;
  font-weight: 1000;
  position: absolute;
  left: 10%;
  top: 10%;
  opacity: ${({ show }) => (show ? 1 : 0)};
  transition: opacity 500ms ease;
  body[data-page="/gallery"] &{color: white;}
  body[data-page="/shoot"] &{color: white;}
  @media (max-width: 1025px) {font-size: 1.5rem;}
  @media (max-width: 540px) {left:5%;font-size: 1.25rem;}
`

function Logo() {
  const navigate = useNavigate();
  const [showNewDiv, setShowNewDiv] = useState(false);
  useEffect(() => {
    function handleScroll() {
      if (window.pageYOffset > 25) {setShowNewDiv(true);}
      else {setShowNewDiv(false);}
    }
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
    return (
        <Container>
          <Content>
            <SvgContainer className="interactable" onClick={() =>{navigate('/')}}>
              <Svg show={!showNewDiv}><HeartEye fill = "#a3c585" width="100%"/></Svg>
              <Svg show={showNewDiv}><HeartEye fill = "#75975e" width="100%"/></Svg>
            </SvgContainer>
            <NameContainer>
              <Name show={!showNewDiv}>Dounia Limam</Name>
            </NameContainer>
          </Content>
        </Container>
    );
}
export default Logo