import React,{ useEffect, useRef, useState} from 'react'
import { useNavigate,useLocation } from 'react-router-dom'
import styled from "styled-components"
import "./Shoot1.css"

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    &.one {aspect-ratio: 16/15;max-width: 100%;margin: 0rem 0;}
    &.two {aspect-ratio: 16/11.5;max-width: 100%;margin: 0rem 0;}
    &.three {aspect-ratio: 16/10.75;max-width: 100%;margin: 0rem 0;}
`
const Right = styled.div`
    flex: 1;
    height: 100%;
    position: relative;
    transition: transform 500ms ease-out;
    // body[data-nav="true"] &{transform: translateX(35%);}
`
const Left = styled.div`
    flex: 1;
    height: 100%;
    position: relative;
    transition: transform 500ms ease-out;
    // body[data-nav="true"] &{transform: translateX(-35%);}
`
const ImgContainer = styled.div`
    position: absolute;
    &.paysage {aspect-ratio: 1.5/1;}
    &.portrait {aspect-ratio: 1/1.5;}
    &#first {width: 135%;top: 0%;left: 0%;body[data-nav="true"] &{transform: translateX(-48%);}}
    &#second {width: 135%;top: 35%;right: 0%;body[data-nav="true"] &{transform: translateX(50%);}}
    &#third {width: 50%;top: 60%;left: 0%;}
    &#four {width: 120%;top: 10%;left: 0%; z-index: 3;body[data-nav="true"] &{transform: translateX(-41.5%);}}
    &#five {width: 95%;top: 0%;right: 0%;body[data-nav="true"] &{transform: translateX(29%);}}
    &#six {width: 90%;top: 0%;left: 0%;body[data-nav="true"] &{transform: translateX(-22.5%);}}
    &#seven {width: 120%;top: 10%;right: 0%;body[data-nav="true"] &{transform: translateX(44%);}}
    z-index: 2;
    opacity: 0;
    transition: transform 500ms ease-out;
    transition: opacity 1s ease-out, transform 1s ease-out;
    transform: translateY(10%);
    &.fade-in {opacity: 1;transform: translateY(0);}
`
const Page = styled.div`
    overflow: hidden;
`
const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`
const Text = styled.div`
    font-family: 'Jandy';
    font-size: 2vw;
    font-weight: 1000;
    color: black;
    opacity: 0;
    transition: opacity 1s ease-out, transform 1s ease-out;
    transform: translateY(50%);
    &.fade-in {opacity: 1;transform: translateY(0);}
  `

function Shoot1() {
    const location = useLocation();
  useEffect(() => {
    document.body.dataset.page = location.pathname;
  }, [location.pathname]);
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true);
    }, 5000);
  }, []);

  const [isVisible, setIsVisible] = useState({});
  const componentRefs = [useRef(), useRef(), useRef(),useRef(), useRef(), useRef(),useRef(), useRef()];
  useEffect(() => {
    const observerOptions = { threshold: 0 };
    const observers = componentRefs.map((ref, index) => {
    const observer = new IntersectionObserver(([entry], observer) => {
    if (entry.isIntersecting) {
      setIsVisible(prevState => ({
        ...prevState,
        [index]: true
    }));
    observer.disconnect();
  }
  }, observerOptions);
  if (ref.current) {observer.observe(ref.current);}
  return observer;
  });
  return () => {observers.forEach(observer => observer.disconnect());};
  }, []);
return (
    <Page>
      <div class="sliced-img">
        <img src='./img/Eva Dou/0.webp' class='img-responsive hidden'></img>
        <div class="slice s1"></div>
        <div class="slice s2"> </div>
      </div>
      <Text ref={componentRefs[0]} className={isVisible[0] ? 'fade-in' : ''}>
        Shoot Bain
      </Text>
      <Container className ="one">
          <Left>
              <ImgContainer ref={componentRefs[1]} className={isVisible[1] ? 'paysage fade-in' : 'paysage'} id="first">
                  <Img src="./img/Synda/0.webp"></Img>
              </ImgContainer>
              <ImgContainer ref={componentRefs[2]} className={isVisible[2] ? 'portrait fade-in' : 'portrait'} id="third">
                  <Img src="./img/Anjeli/0.webp"></Img>
              </ImgContainer>
          </Left>
          <Right>
            <ImgContainer ref={componentRefs[3]} className={isVisible[3] ? 'paysage fade-in' : 'paysage'} id="second">
              <Img src="./img/Eva Robot/0.webp"></Img>
            </ImgContainer>
          </Right>
      </Container>
      <Container className ="two">
          <Left>
            <ImgContainer ref={componentRefs[4]} className={isVisible[4] ? 'paysage fade-in' : 'paysage'} id="four">
              <Img src="./img/Eva 2/0.webp"></Img>
            </ImgContainer>
          </Left>
          <Right>
            <ImgContainer ref={componentRefs[5]} className={isVisible[5] ? 'portrait fade-in' : 'portrait'} id="five">
              <Img src="./img/Eva Clem Sombre/0.webp"></Img>
            </ImgContainer>
          </Right>
      </Container>
      <Container className ="three">
          <Left>
            <ImgContainer ref={componentRefs[6]} className={isVisible[6] ? 'portrait fade-in' : 'portrait'} id="six">
              <Img src="./img/Eva Clem Clair/0.webp"></Img>
            </ImgContainer>
          </Left>
          <Right>
            <ImgContainer ref={componentRefs[7]} className={isVisible[7] ? 'paysage fade-in' : 'paysage'} id="seven">
              <Img src="./img/Egypte/0.webp"></Img>
            </ImgContainer>
          </Right>
      </Container>
    </Page>
);
}
export default Shoot1