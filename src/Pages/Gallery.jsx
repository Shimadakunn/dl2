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
  overflow: hidden;
  &:hover ${OverlayText} {opacity: 1;}
  #${({ show }) => show}{
    background: inherit;
    transition: all 1s ease-in-out;
    position: fixed;
    z-index: 500;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
  }
  &.top{padding-bottom: 0.75vw;}
  &.mid{padding: 0.75vw 0;}
  &.bot{padding-top: 0.75vw;}
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
  transition: all 1s ease;
  #${({ show }) => show} {transform: scale(1.5);}
  &.portrait {aspect-ratio: 1/1.5;}
  &.portraitBis {aspect-ratio: 1/1.75;}
  &.paysage ${Text} {top: 70%; }
  &.paysage {aspect-ratio: 1.5/1;}
`
const Img = styled.img`
  position: relative;
  width: 100%;
  height: 100%;
  object-fit: cover;
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
    // window.scrollTo(0, 0);
  }, []);

  const location = useLocation();
  useEffect(() => {
    document.body.dataset.page = location.pathname;
  }, [location.pathname]);
  
  const [id, setId] = useState('');
  function handleClick(event) {
    const clickedId = event.target.id;
    setId(clickedId);
    console.log(`Clicked element id: ${clickedId}`);
  }

  const divRefs = useRef([]);
  useEffect(() => {
    const handleScroll = () => {
      const bodyHeight = document.body.offsetHeight;
      const pageHeight = window.innerHeight;
      divRefs.current.forEach(div => {
        if (div) {
          const divHeight = div.offsetHeight;
          const scrollPosition = window.scrollY;
          const posFinal = bodyHeight - divHeight;
          const factor = posFinal/(bodyHeight - pageHeight)*scrollPosition;
          div.style.transform = `translateY(${factor}px)`;
        }
      });
    };
    window.addEventListener('scroll', handleScroll); // Add scroll event listener
    return () => {
      window.removeEventListener('scroll', handleScroll); // Remove scroll event listener on component unmount
    };
  }, []);

  return (
    <Container>
      <Columns className={isLoaded ? 'loaded' : ''}>
        <Right>
          <Lane className = {isLoaded ? "left pc loaded" : "left pc"}>
            <Projet_container ref={el => (divRefs.current[0] = el)}>
              <Projet className = "portrait" onClick={() => {setTimeout(() => {navigate("/shoot");}, 2000);}}>
                <Overlay show={id} className="top" >
                  <Img src="./img/Anjeli/0.jpg" className="interactable" id="yes" onClick={handleClick}></Img>              
                  <OverlayText>Good Morning</OverlayText>
                </Overlay>
              </Projet>
              <Projet className = "paysage" onClick={() => {setTimeout(() => {navigate("/");}, 2000);}}>
                <Overlay show={id} className="mid">
                  <Img src="./img/Synda/0.jpg" className="interactable" id="ya" onClick={handleClick}></Img>
                  <OverlayText>Good Morning</OverlayText>
                </Overlay>
              </Projet>
              <Projet className = "portraitBis" onClick={() => {setTimeout(() => {navigate("/shoot");}, 2000);}}>
                <Overlay show={id} className="mid">
                  <Img src="./img/Eva Clem Clair/5.jpg" className="interactable" id="yes" onClick={handleClick}></Img>              
                  <OverlayText>Good Morning</OverlayText>
                </Overlay>
              </Projet>
              <Projet className = "paysage" onClick={() => {setTimeout(() => {navigate("/shoot");}, 2000);}}>
                <Overlay show={id} className="bot">
                  <Img src="./img/Egypte/0.JPG" className="interactable" id="yes" onClick={handleClick}></Img>              
                  <OverlayText>Good Morning</OverlayText>
                </Overlay>
              </Projet>
              <Projet className = "portraitBis" onClick={() => {setTimeout(() => {navigate("/shoot");}, 2000);}}>
                <Overlay show={id} className="bot">
                  <Img src="./img/Synda/2.jpg" className="interactable" id="yes" onClick={handleClick}></Img>              
                  <OverlayText>Good Morning</OverlayText>
                </Overlay>
              </Projet>
            </Projet_container>
          </Lane>
          <Lane className = {isLoaded ? "mid one pc loaded" : "mid one pc"}>
            <Projet_container ref={el => (divRefs.current[1] = el)}>
              <Projet className = "portraitBis" onClick={() => {setTimeout(() => {navigate("/shoot");}, 2000);}}>
                <Overlay show={id} className="top">
                  <Img src="./img/Eva Clem Sombre/0.JPG" className="interactable" id="yes" onClick={handleClick}></Img>              
                  <OverlayText>Good Morning</OverlayText>
                </Overlay>
              </Projet>
              <Projet className = "portrait" onClick={() => {setTimeout(() => {navigate("/shoot");}, 2000);}}>
                <Overlay show={id} className="mid">
                  <Img src="./img/Eva Dou/2.JPG" className="interactable" id="yes" onClick={handleClick}></Img>              
                  <OverlayText>Good Morning</OverlayText>
                </Overlay>
              </Projet>
              <Projet className = "paysage" onClick={() => {setTimeout(() => {navigate("/shoot");}, 2000);}}>
                <Overlay show={id} className="mid">
                  <Img src="./img/Eva 2/0.jpg" className="interactable" id="yes" onClick={handleClick}></Img>              
                  <OverlayText>Good Morning</OverlayText>
                </Overlay>
              </Projet>
              <Projet className = "portraitBis" onClick={() => {setTimeout(() => {navigate("/shoot");}, 2000);}}>
                <Overlay show={id} className="mid">
                  <Img src="./img/Eva Robot/12.JPG" className="interactable" id="yes" onClick={handleClick}></Img>              
                  <OverlayText>Good Morning</OverlayText>
                </Overlay>
              </Projet>
              <Projet className = "portrait" onClick={() => {setTimeout(() => {navigate("/shoot");}, 2000);}}>
                <Overlay show={id} className="bot">
                  <Img src="./img/Unborn/0.jpg" className="interactable" id="yes" onClick={handleClick}></Img>              
                  <OverlayText>Good Morning</OverlayText>
                </Overlay>
              </Projet>
            </Projet_container>
          </Lane>
          <Lane className = {isLoaded ? "left mobile loaded" : "left mobile"}>
          <Projet_container ref={el => (divRefs.current[4] = el)}>
              <Projet className = "portrait" onClick={() => {setTimeout(() => {navigate("/shoot");}, 2000);}}>
                <Overlay show={id} className="top" >
                  <Img src="./img/12.jpg" className="interactable" id="yes" onClick={handleClick}></Img>              
                  <OverlayText>Good Morning</OverlayText>
                </Overlay>
              </Projet>
              <Projet className = "paysage" onClick={() => {setTimeout(() => {navigate("/");}, 2000);}}>
                <Overlay show={id} className="mid">
                  <Img src="./img/2.jpg" className="interactable" id="ya" onClick={handleClick}></Img>
                  <OverlayText>Good Morning</OverlayText>
                </Overlay>
              </Projet>
              <Projet className = "portraitBis" onClick={() => {setTimeout(() => {navigate("/shoot");}, 2000);}}>
                <Overlay show={id} className="mid">
                  <Img src="./img/11.jpg" className="interactable" id="yes" onClick={handleClick}></Img>              
                  <OverlayText>Good Morning</OverlayText>
                </Overlay>
              </Projet>
              <Projet className = "portrait" onClick={() => {setTimeout(() => {navigate("/shoot");}, 2000);}}>
                <Overlay show={id} className="mid">
                  <Img src="./img/8.jpg" className="interactable" id="yes" onClick={handleClick}></Img>              
                  <OverlayText>Good Morning</OverlayText>
                </Overlay>
              </Projet>
              <Projet className = "portraitBis" onClick={() => {setTimeout(() => {navigate("/shoot");}, 2000);}}>
                <Overlay show={id} className="mid">
                  <Img src="./img/14.jpg" className="interactable" id="yes" onClick={handleClick}></Img>              
                  <OverlayText>Good Morning</OverlayText>
                </Overlay>
              </Projet>
              <Projet className = "paysage" onClick={() => {setTimeout(() => {navigate("/shoot");}, 2000);}}>
                <Overlay show={id} className="mid">
                  <Img src="./img/16.jpg" className="interactable" id="yes" onClick={handleClick}></Img>              
                  <OverlayText>Good Morning</OverlayText>
                </Overlay>
              </Projet>
              <Projet className = "portrait" onClick={() => {setTimeout(() => {navigate("/shoot");}, 2000);}}>
                <Overlay show={id} className="mid">
                  <Img src="./img/1.jpg" className="interactable" id="yes" onClick={handleClick}></Img>              
                  <OverlayText>Good Morning</OverlayText>
                </Overlay>
              </Projet>
              <Projet className = "portraitBis" onClick={() => {setTimeout(() => {navigate("/shoot");}, 2000);}}>
                <Overlay show={id} className="mid">
                  <Img src="./img/7.jpg" className="interactable" id="yes" onClick={handleClick}></Img>              
                  <OverlayText>Good Morning</OverlayText>
                </Overlay>
              </Projet>
              <Projet className = "portrait" onClick={() => {setTimeout(() => {navigate("/shoot");}, 2000);}}>
                <Overlay show={id} className="bot">
                  <Img src="./img/13.jpg" className="interactable" id="yes" onClick={handleClick}></Img>              
                  <OverlayText>Good Morning</OverlayText>
                </Overlay>
              </Projet>
            </Projet_container>
          </Lane>
        </Right>
        <Left>
          <Lane className = {isLoaded ? "mid two pc loaded" : "mid two pc"}>
            <Projet_container ref={el => (divRefs.current[3] = el)}>
              <Projet className = "portrait" onClick={() => {setTimeout(() => {navigate("/shoot");}, 2000);}}>
                <Overlay show={id} className="top">
                  <Img src="./img/Sarah/0.jpg" className="interactable" id="yes" onClick={handleClick}></Img>              
                  <OverlayText>Good Morning</OverlayText>
                </Overlay>
              </Projet>
              <Projet className = "portrait" onClick={() => {setTimeout(() => {navigate("/shoot");}, 2000);}}>
                <Overlay show={id} className="mid">
                  <Img src="./img/Eva Clem Clair/0.jpg" className="interactable" id="yes" onClick={handleClick}></Img>              
                  <OverlayText>Good Morning</OverlayText>
                </Overlay>
              </Projet>
              <Projet className = "paysage" onClick={() => {setTimeout(() => {navigate("/shoot");}, 2000);}}>
                <Overlay show={id} className="mid">
                  <Img src="./img/Douni/0.jpg" className="interactable" id="yes" onClick={handleClick}></Img>              
                  <OverlayText>Good Morning</OverlayText>
                </Overlay>
              </Projet>
              <Projet className = "portrait" onClick={() => {setTimeout(() => {navigate("/shoot");}, 2000);}}>
                <Overlay show={id} className="mid">
                  <Img src="./img/Anjeli/2.JPG" className="interactable" id="yes" onClick={handleClick}></Img>              
                  <OverlayText>Good Morning</OverlayText>
                </Overlay>
              </Projet>
              <Projet className = "paysage" onClick={() => {setTimeout(() => {navigate("/shoot");}, 2000);}}>
                <Overlay show={id} className="mid">
                  <Img src="./img/Eva Dou/0.jpg" className="interactable" id="yes" onClick={handleClick}></Img>              
                  <OverlayText>Good Morning</OverlayText>
                </Overlay>
              </Projet>
              <Projet className = "portraitBis" onClick={() => {setTimeout(() => {navigate("/shoot");}, 2000);}}>
                <Overlay show={id} className="bot">
                  <Img src="./img/Sarah/1.jpg" className="interactable" id="yes" onClick={handleClick}></Img>              
                  <OverlayText>Good Morning</OverlayText>
                </Overlay>
              </Projet>
            </Projet_container>
          </Lane>
          <Lane className = {isLoaded ? "right pc loaded" : "right pc"}>
            <Projet_container ref={el => (divRefs.current[2] = el)}>
              <Projet className = "portraitBis" onClick={() => {setTimeout(() => {navigate("/shoot");}, 2000);}}>
                <Overlay show={id} className="top">
                  <Img src="./img/Morgane/0.JPG" className="interactable" id="yes" onClick={handleClick}></Img>              
                  <OverlayText>Good Morning</OverlayText>
                </Overlay>
              </Projet>
              <Projet className = "paysage" onClick={() => {setTimeout(() => {navigate("/shoot");}, 2000);}}>
                <Overlay show={id} className="mid">
                  <Img src="./img/Eva Robot/0.JPG" className="interactable" id="yes" onClick={handleClick}></Img>              
                  <OverlayText>Good Morning</OverlayText>
                </Overlay>
              </Projet>
              <Projet className = "portraitBis" onClick={() => {setTimeout(() => {navigate("/shoot");}, 2000);}}>
                <Overlay show={id} className="mid">
                  <Img src="./img/Egypte/1.JPG" className="interactable" id="yes" onClick={handleClick}></Img>              
                  <OverlayText>Good Morning</OverlayText>
                </Overlay>
              </Projet>
              <Projet className = "portrait" onClick={() => {setTimeout(() => {navigate("/shoot");}, 2000);}}>
                <Overlay show={id} className="bot">
                  <Img src="./img/Eva Clem Sombre/4.JPG" className="interactable" id="yes" onClick={handleClick}></Img>              
                  <OverlayText>Good Morning</OverlayText>
                </Overlay>
              </Projet>
            </Projet_container>
          </Lane>
          <Lane className = {isLoaded ? "right mobile loaded" : "right mobile"}>
          <Projet_container ref={el => (divRefs.current[5] = el)}>
              <Projet className = "portrait" onClick={() => {setTimeout(() => {navigate("/shoot");}, 2000);}}>
                <Overlay show={id} className="top">
                  <Img src="./img/13.jpg" className="interactable" id="yes" onClick={handleClick}></Img>              
                  <OverlayText>Good Morning</OverlayText>
                </Overlay>
              </Projet>
              <Projet className = "portraitBis" onClick={() => {setTimeout(() => {navigate("/shoot");}, 2000);}}>
                <Overlay show={id} className="mid">
                  <Img src="./img/7.jpg" className="interactable" id="yes" onClick={handleClick}></Img>              
                  <OverlayText>Good Morning</OverlayText>
                </Overlay>
              </Projet>
              <Projet className = "portrait" onClick={() => {setTimeout(() => {navigate("/shoot");}, 2000);}}>
                <Overlay show={id} className="mid">
                  <Img src="./img/1.jpg" className="interactable" id="yes" onClick={handleClick}></Img>              
                  <OverlayText>Good Morning</OverlayText>
                </Overlay>
              </Projet>
              <Projet className = "paysage" onClick={() => {setTimeout(() => {navigate("/shoot");}, 2000);}}>
                <Overlay show={id} className="mid">
                  <Img src="./img/16.jpg" className="interactable" id="yes" onClick={handleClick}></Img>              
                  <OverlayText>Good Morning</OverlayText>
                </Overlay>
              </Projet>
              <Projet className = "portraitBis" onClick={() => {setTimeout(() => {navigate("/shoot");}, 2000);}}>
                <Overlay show={id} className="mid">
                  <Img src="./img/9.jpg" className="interactable" id="yes" onClick={handleClick}></Img>              
                  <OverlayText>Good Morning</OverlayText>
                </Overlay>
              </Projet>
              <Projet className = "portraitBis" onClick={() => {setTimeout(() => {navigate("/shoot");}, 2000);}}>
                <Overlay show={id} className="mid">
                  <Img src="./img/5.jpg" className="interactable" id="yes" onClick={handleClick}></Img>              
                  <OverlayText>Good Morning</OverlayText>
                </Overlay>
              </Projet>
              <Projet className = "portraitBis" onClick={() => {setTimeout(() => {navigate("/shoot");}, 2000);}}>
                <Overlay show={id} className="mid">
                  <Img src="./img/0.jpg" className="interactable" id="yes" onClick={handleClick}></Img>              
                  <OverlayText>Good Morning</OverlayText>
                </Overlay>
              </Projet>
              <Projet className = "paysage" onClick={() => {setTimeout(() => {navigate("/shoot");}, 2000);}}>
                <Overlay show={id} className="mid">
                  <Img src="./img/10.jpg" className="interactable" id="yes" onClick={handleClick}></Img>              
                  <OverlayText>Good Morning</OverlayText>
                </Overlay>
              </Projet>
              <Projet className = "portrait" onClick={() => {setTimeout(() => {navigate("/shoot");}, 2000);}}>
                <Overlay show={id} className="bot">
                  <Img src="./img/15.jpg" className="interactable" id="yes" onClick={handleClick}></Img>              
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
