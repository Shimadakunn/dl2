import React,{ useEffect, useRef,useState} from 'react'
import { useNavigate,useLocation } from 'react-router-dom'
import styled from "styled-components"

const Container = styled.div`
overflow: hidden;
`
const Columns = styled.div`
  overflow: hidden;
  background-color: white;
  display: flex;
  opacity: 0;
  transition: opacity 1s ease-in-out;
  &.loaded {opacity: 1;}
`
const Lane = styled.div`
  flex: 1;
  transition: transform 1s ease-out;
  &.left {padding-right: 0.75vw;transform: translateY(10%);@media (max-width: 850px) {padding-right: 1.5vw;}}
  &.mid {padding: 0 0.75vw;}
  &.one {transform: translateY(-10%);}
  &.two {transform: translateY(10%);}
  &.right {padding-left: 0.75vw;transform: translateY(-10%);@media (max-width: 850px) {padding-left: 1.5vw;}}
  &.loaded.left, &.loaded.one, &.loaded.two, &.loaded.right{transform: translateY(0%);}
  &.mobile {display: none;}
  @media (max-width: 1025px) {
    &.mobile {display: block;}
    &.pc {display: none;}
  }
`	
const OverlayText = styled.div`
  position: absolute;
  bottom: 5%;
  left: 5%;
  opacity: 0;
  transition: opacity 1s ease-in-out;
  font-size: 2.5em;
  color: #ddead1;
  pointer-events: none;
  font-family: 'Aesthetique';
`
const Overlay = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  &:hover ${OverlayText} {opacity: 1;}
  transition: all 0.5s cubic-bezier(0,0,.19,1);
  overflow: hidden;
  &:hover {
    border: 2px solid #75975e;
    transform: scale(1.02);
    box-shadow: 10px 10px 15px 10px rgba(0,0,0,0.85);
    border-radius: 50px;
  }
`
const Projet_container = styled.div`

`
const Text = styled.div`
  position: absolute;
  top: 85%;
  left: 90%;
  transform: rotate(90deg);
  font-size: 1.25em;
`
const Projet = styled.div`
  position: relative;
  box-sizing: border-box;
  width: 100%;
  transition: all 0.5s cubic-bezier(0,0,.19,1);
  &.portrait {aspect-ratio: 1/1.5;}
  &.portraitBis {aspect-ratio: 1/1.75;}
  &.paysage ${Text} {top: 70%; }
  &.paysage {aspect-ratio: 1.5/1;}
  &.top{padding-bottom: 0.75vw;}
  &.mid{padding: 0.75vw 0;}
  &.bot{padding-top: 0.75vw;}
`
const Img = styled.img`
  position: relative;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: all 0.5s cubic-bezier(0,0,.19,1);
  &:hover {
    transform: scale(1.10);
    border-radius: 50px;
  }
`
const Right = styled.div`
  flex: 1;
  display: flex;
  z-index: 1;
  transition: transform 500ms ease-out;
  body[data-nav="true"] &{transform: translateX(-35%);}
`
const Left = styled.div`
  flex: 1;
  display: flex;
  z-index: 1;
  transition: transform 500ms ease-out;
  body[data-nav="true"] &{transform: translateX(35%);}
`

function Gallery() {
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const location = useLocation();
    useEffect(() => {
        document.body.dataset.page = location.pathname;
    }, [location.pathname]);

  const divRefs = useRef([]);
  useEffect(() => {
    const handleScroll = () => {
      const bodyHeight = document.body.offsetHeight;
      const pageHeight = window.innerHeight;
      divRefs.current.forEach(div => {
          const divHeight = div.offsetHeight;
          const scrollPosition = window.scrollY;
          const posFinal = bodyHeight - divHeight;
          const factor = posFinal/(bodyHeight - pageHeight)*scrollPosition;
          div.style.transform = `translateY(${factor}px)`;
      });
    };
    window.addEventListener('scroll', handleScroll); // Add scroll event listener
    return () => {
      window.removeEventListener('scroll', handleScroll); // Remove scroll event listener on component unmount
    };
  }, []);

  return (
    <Container decelerationRate={0.5}>
      <Columns className={isLoaded ? 'loaded' : ''}>
        <Right>
          <Lane className = {isLoaded ? "left pc loaded" : "left pc"}>
            <Projet_container ref={el => (divRefs.current[0] = el)}>
              <Projet className = "portrait top" onClick={() => {navigate("/shoot");}}>
                <Overlay>
                  <Img src="./img/Anjeli/0.webp" className="interactable" id="yes"></Img>              
                  <OverlayText>Good Morning</OverlayText>
                </Overlay>
              </Projet>
              <Projet className = "paysage mid" onClick={() => {setTimeout(() => {navigate("/");}, 2000);}}>
                <Overlay>
                  <Img src="./img/Synda/0.webp" className="interactable" id="ya"></Img>
                  <OverlayText>Good Morning</OverlayText>
                </Overlay>
              </Projet>
              <Projet className = "portraitBis mid" onClick={() => {navigate("/shoot");}}>
                <Overlay>
                  <Img src="./img/Eva Clem Clair/5.webp" className="interactable" id="yes"></Img>              
                  <OverlayText>Good Morning</OverlayText>
                </Overlay>
              </Projet>
              <Projet className = "portraitBis bot" onClick={() => {navigate("/shoot");}}>
                <Overlay>
                  <Img src="./img/Synda/2.webp" className="interactable" id="yes"></Img>              
                  <OverlayText>Good Morning</OverlayText>
                </Overlay>
              </Projet>
            </Projet_container>
          </Lane>
          <Lane className = {isLoaded ? "mid one pc loaded" : "mid one pc"}>
            <Projet_container ref={el => (divRefs.current[1] = el)}>
              <Projet className = "portraitBis top" onClick={() => {navigate("/shoot");}}>
                <Overlay>
                  <Img src="./img/Eva Clem Sombre/0.webp" className="interactable" id="yes"></Img>              
                  <OverlayText>Good Morning</OverlayText>
                </Overlay>
              </Projet>
              <Projet className = "portrait mid" onClick={() => {navigate("/shoot");}}>
                <Overlay>
                  <Img src="./img/Eva Dou/2.webp" className="interactable" id="yes"></Img>              
                  <OverlayText>Good Morning</OverlayText>
                </Overlay>
              </Projet>
              <Projet className = "paysage mid" onClick={() => {navigate("/shoot");}}>
                <Overlay>
                  <Img src="./img/Eva 2/0.webp" className="interactable" id="yes"></Img>              
                  <OverlayText>Good Morning</OverlayText>
                </Overlay>
              </Projet>
              <Projet className = "portraitBis mid" onClick={() => {navigate("/shoot");}}>
                <Overlay>
                  <Img src="./img/Eva Robot/12.webp" className="interactable" id="yes"></Img>              
                  <OverlayText>Good Morning</OverlayText>
                </Overlay>
              </Projet>
              <Projet className = "paysage mid" onClick={() => {navigate("/shoot");}}>
                <Overlay>
                  <Img src="./img/Egypte/0.webp" className="interactable" id="yes"></Img>              
                  <OverlayText>Good Morning</OverlayText>
                </Overlay>
              </Projet>
              <Projet className = "portrait bot" onClick={() => {navigate("/shoot");}}>
                <Overlay>
                  <Img src="./img/Unborn/0.webp" className="interactable" id="yes"></Img>              
                  <OverlayText>Good Morning</OverlayText>
                </Overlay>
              </Projet>
            </Projet_container>
          </Lane>
          <Lane className = {isLoaded ? "left mobile loaded" : "left mobile"}>
          <Projet_container ref={el => (divRefs.current[4] = el)}>
              <Projet className = "portraitBis top" onClick={() => {navigate("/shoot");}}>
                <Overlay>
                  <Img src="./img/Anjeli/0.webp" className="interactable" id="yes"></Img>              
                  <OverlayText>Good Morning</OverlayText>
                </Overlay>
              </Projet>
              <Projet className = "paysage mid" onClick={() => {navigate("/shoot");}}>
                <Overlay>
                  <Img src="./img/Synda/0.webp" className="interactable" id="ya"></Img>
                  <OverlayText>Good Morning</OverlayText>
                </Overlay>
              </Projet>
              <Projet className = "portraitBis mid" onClick={() => {navigate("/shoot");}}>
                <Overlay>
                  <Img src="./img/Eva Clem Clair/5.webp" className="interactable" id="yes"></Img>              
                  <OverlayText>Good Morning</OverlayText>
                </Overlay>
              </Projet>
              <Projet className = "paysage mid" onClick={() => {navigate("/shoot");}}>
                <Overlay>
                  <Img src="./img/Egypte/0.webp" className="interactable" id="yes"></Img>              
                  <OverlayText>Good Morning</OverlayText>
                </Overlay>
              </Projet>
              <Projet className = "portraitBis mid" onClick={() => {navigate("/shoot");}}>
                <Overlay>
                  <Img src="./img/Synda/2.webp" className="interactable" id="yes"></Img>              
                  <OverlayText>Good Morning</OverlayText>
                </Overlay>
              </Projet>
              <Projet className = "portraitBis mid" onClick={() => {navigate("/shoot");}}>
                <Overlay>
                  <Img src="./img/Eva Clem Sombre/0.webp" className="interactable" id="yes"></Img>              
                  <OverlayText>Good Morning</OverlayText>
                </Overlay>
              </Projet>
              <Projet className = "portrait mid" onClick={() => {navigate("/shoot");}}>
                <Overlay>
                  <Img src="./img/Eva Dou/2.webp" className="interactable" id="yes"></Img>              
                  <OverlayText>Good Morning</OverlayText>
                </Overlay>
              </Projet>
              <Projet className = "paysage mid" onClick={() => {navigate("/shoot");}}>
                <Overlay>
                  <Img src="./img/Eva 2/0.webp" className="interactable" id="yes"></Img>              
                  <OverlayText>Good Morning</OverlayText>
                </Overlay>
              </Projet>
              <Projet className = "portraitBis mid" onClick={() => {navigate("/shoot");}}>
                <Overlay>
                  <Img src="./img/Eva Robot/12.webp" className="interactable" id="yes"></Img>              
                  <OverlayText>Good Morning</OverlayText>
                </Overlay>
              </Projet>
              <Projet className = "portrait bot" onClick={() => {navigate("/shoot");}}>
                <Overlay>
                  <Img src="./img/Unborn/0.webp" className="interactable" id="yes"></Img>              
                  <OverlayText>Good Morning</OverlayText>
                </Overlay>
              </Projet>
            </Projet_container>
          </Lane>
        </Right>
        <Left>
          <Lane className = {isLoaded ? "mid two pc loaded" : "mid two pc"}>
            <Projet_container ref={el => (divRefs.current[3] = el)}>
              <Projet className = "portrait top" onClick={() => {navigate("/shoot");}}>
                <Overlay>
                  <Img src="./img/Sarah/0.webp" className="interactable" id="yes"></Img>              
                  <OverlayText>Good Morning</OverlayText>
                </Overlay>
              </Projet>
              <Projet className = "portrait mid" onClick={() => {navigate("/shoot");}}>
                <Overlay>
                  <Img src="./img/Eva Clem Clair/0.webp" className="interactable" id="yes"></Img>              
                  <OverlayText>Good Morning</OverlayText>
                </Overlay>
              </Projet>
              <Projet className = "paysage mid" onClick={() => {navigate("/shoot");}}>
                <Overlay>
                  <Img src="./img/Douni/0.webp" className="interactable" id="yes"></Img>              
                  <OverlayText>Good Morning</OverlayText>
                </Overlay>
              </Projet>
              <Projet className = "portrait mid" onClick={() => {navigate("/shoot");}}>
                <Overlay>
                  <Img src="./img/Anjeli/2.webp" className="interactable" id="yes"></Img>              
                  <OverlayText>Good Morning</OverlayText>
                </Overlay>
              </Projet>
              <Projet className = "paysage mid" onClick={() => {navigate("/shoot");}}>
                <Overlay>
                  <Img src="./img/Eva Dou/0.webp" className="interactable" id="yes"></Img>              
                  <OverlayText>Good Morning</OverlayText>
                </Overlay>
              </Projet>
              <Projet className = "portraitBis mid" onClick={() => {navigate("/shoot");}}>
                <Overlay>
                  <Img src="./img/Egypte/1.webp" className="interactable" id="yes"></Img>              
                  <OverlayText>Good Morning</OverlayText>
                </Overlay>
              </Projet>
              <Projet className = "portraitBis bot" onClick={() => {navigate("/shoot");}}>
                <Overlay>
                  <Img src="./img/Sarah/1.webp" className="interactable" id="yes"></Img>              
                  <OverlayText>Good Morning</OverlayText>
                </Overlay>
              </Projet>
            </Projet_container>
          </Lane>
          <Lane className = {isLoaded ? "right pc loaded" : "right pc"}>
            <Projet_container ref={el => (divRefs.current[2] = el)}>
              <Projet className = "portraitBis top" onClick={() => {navigate("/shoot");}}>
                <Overlay>
                  <Img src="./img/Morgane/0.webp" className="interactable" id="yes"></Img>              
                  <OverlayText>Good Morning</OverlayText>
                </Overlay>
              </Projet>
              <Projet className = "paysage mid" onClick={() => {navigate("/shoot");}}>
                <Overlay>
                  <Img src="./img/Eva Robot/0.webp" className="interactable" id="yes"></Img>              
                  <OverlayText>Good Morning</OverlayText>
                </Overlay>
              </Projet>
              <Projet className = "portrait bot" onClick={() => {navigate("/shoot");}}>
                <Overlay>
                  <Img src="./img/Eva Clem Sombre/4.webp" className="interactable" id="yes"></Img>              
                  <OverlayText>Good Morning</OverlayText>
                </Overlay>
              </Projet>
            </Projet_container>
          </Lane>
          <Lane className = {isLoaded ? "right mobile loaded" : "right mobile"}>
            <Projet_container ref={el => (divRefs.current[5] = el)}>
              <Projet className = "portrait top" onClick={() => {navigate("/shoot");}}>
                <Overlay>
                  <Img src="./img/Sarah/0.webp" className="interactable" id="yes"></Img>              
                  <OverlayText>Good Morning</OverlayText>
                </Overlay>
              </Projet>
              <Projet className = "portraitBis mid" onClick={() => {navigate("/shoot");}}>
                <Overlay>
                  <Img src="./img/Eva Clem Clair/0.webp" className="interactable" id="yes"></Img>              
                  <OverlayText>Good Morning</OverlayText>
                </Overlay>
              </Projet>
              <Projet className = "paysage mid" onClick={() => {navigate("/shoot");}}>
                <Overlay>
                  <Img src="./img/Douni/0.webp" className="interactable" id="yes"></Img>              
                  <OverlayText>Good Morning</OverlayText>
                </Overlay>
              </Projet>
              <Projet className = "portrait mid" onClick={() => {navigate("/shoot");}}>
                <Overlay>
                  <Img src="./img/Anjeli/2.webp" className="interactable" id="yes"></Img>              
                  <OverlayText>Good Morning</OverlayText>
                </Overlay>
              </Projet>
              <Projet className = "paysage mid" onClick={() => {navigate("/shoot");}}>
                <Overlay>
                  <Img src="./img/Eva Dou/0.webp" className="interactable" id="yes"></Img>              
                  <OverlayText>Good Morning</OverlayText>
                </Overlay>
              </Projet>
              <Projet className = "portraitBis mid" onClick={() => {navigate("/shoot");}}>
                <Overlay>
                  <Img src="./img/Sarah/1.webp" className="interactable" id="yes"></Img>              
                  <OverlayText>Good Morning</OverlayText>
                </Overlay>
              </Projet>
              <Projet className = "portrait mid" onClick={() => {navigate("/shoot");}}>
                <Overlay>
                  <Img src="./img/Morgane/0.webp" className="interactable" id="yes"></Img>              
                  <OverlayText>Good Morning</OverlayText>
                </Overlay>
              </Projet>
              <Projet className = "paysage mid" onClick={() => {navigate("/shoot");}}>
                <Overlay>
                  <Img src="./img/Eva Robot/0.webp" className="interactable" id="yes"></Img>              
                  <OverlayText>Good Morning</OverlayText>
                </Overlay>
              </Projet>
              <Projet className = "portrait mid" onClick={() => {navigate("/shoot");}}>
                <Overlay>
                  <Img src="./img/Egypte/1.webp" className="interactable" id="yes"></Img>              
                  <OverlayText>Good Morning</OverlayText>
                </Overlay>
              </Projet>
              <Projet className = "portraitBis bot" onClick={() => {navigate("/shoot");}}>
                <Overlay>
                  <Img src="./img/Eva Clem Sombre/4.webp" className="interactable" id="yes"></Img>              
                  <OverlayText>Good Morning</OverlayText>
                </Overlay>
              </Projet>
            </Projet_container>
          </Lane>
        </Left>
      </Columns>
    </Container>
  )
}
export default Gallery
