import React,{ useEffect, useRef,useState} from 'react'
import { useNavigate,useLocation } from 'react-router-dom'
import styled from "styled-components"

const Container = styled.div`
  z-index: 1;
  transition: transform 500ms ease-out;
  body[data-nav="true"] &{transform: translateX(-20%);}
  overflow: hidden;
`
const CoverContainer = styled.div`
    position: relative;
    height: 100vh;
    width: 100vw;
`
const Cover = styled.img`
    height: 100%;
    width: 100%;
    object-fit: cover;
    opacity: 0.25;
  transition: opacity 2s ease-in-out;
  &.loaded {
    opacity: 1;
  }
`
const TitleContainer = styled.div`
    position: absolute;
    top: 25%;
    left: 10%;
    opacity: 0;
  transition: opacity 2s ease-in-out;
  &.loaded {
    opacity: 1;
  }
`
const Title = styled.div`
color: white;
`
const Subtitle = styled.div`
color: white;
`
const Button = styled.button`
  opacity: 0;
  transition: opacity 2s ease-in-out 1s;
  &.loaded {opacity: 1;}
  position: absolute;
  bottom: 18%;
  left: 48%;
  transform: translate(-50%, -50%);
  border: none;
  background: none;

  span {
    padding-bottom: 7px;
    letter-spacing: 4px;
    font-size: 17.5px;
    padding-right: 15px;
    text-transform: uppercase;
    position: relative;
    color: black;
    padding-bottom: 5px;

    &:after {
      content: "";
      position: absolute;
      width: 115%;
      transform: scaleX(0);
      height: 2px;
      bottom: 0;
      left: 0;
      background-color: #000000;
      transform-origin: bottom right;
      transition: transform 0.25s ease-out;
    }
  }
  svg {
    transform: translateX(-8px);
    transition: all 0.3s ease;
    @media (max-width: 675px) {display: none;}
  }
  &:hover svg {
    transform: translateX(0);
  }
  &:active svg {
    transform: scale(0.9);
  }
  &:hover span:after {
    transform: scaleX(1);
    transform-origin: bottom left;
  }
`;
const Description = styled.div`
`

function Home() {
    const location = useLocation();
    const navigate = useNavigate();
  useEffect(() => {
    document.body.dataset.page = location.pathname;
  }, [location.pathname]);
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    setIsLoaded(true);
  }, []);
    return (
        <Container>
            <CoverContainer>
                <Cover src="./img/Douni/0.webp" className={isLoaded ? 'loaded' : ''}></Cover>
                <TitleContainer className={isLoaded ? 'loaded' : ''}>
                    <Title id="yes">title</Title>
                    <Subtitle>subtitle</Subtitle>
                </TitleContainer>
                <Button onClick={() => {navigate("/gallery")}} className={isLoaded ? 'loaded' : ''}>
                    <span style={{fontFamily:'Aesthetique'}}>Enter Gallery</span>
                    <svg viewBox="0 0 46 16" height="15" width="35" xmlns="http://www.w3.org/2000/svg" id="arrow-horizontal">
                        <path transform="translate(30)" d="M8,0,6.545,1.455l5.506,5.506H-30V9.039H12.052L6.545,14.545,8,16l8-8Z" data-name="Path 10" id="Path_10"></path>
                    </svg>
                </Button>
            </CoverContainer>
        </Container>
    );
}
export default Home