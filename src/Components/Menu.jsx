import styled from 'styled-components';
import React, { useRef, useEffect, useState } from "react";
import { useNavigate,useLocation} from 'react-router-dom';

const MenuButtonContainer = styled.div`
    position: fixed;
    z-index: 2;
    top: 50%;
    left: 49.9%;
    transform: translate(-50%, -50%);
    @media (max-width: 1350px) {left: 50%;}
    transition: opacity 1s ease-out;
    opacity: 0;
    &.{isLoaded} {opacity: 1;}
    body[data-page="/"] &{display: none;}
`
const MenuButton = styled.div`
    font-family: 'Jandy';
    font-size: 2.25rem;
    @media (max-width: 1025px) {font-size: 2rem;}
    @media (max-width: 650px) {font-size: 1.25rem;}
    font-weight: 1000;
    font-color: black;
    transform: rotate(90deg);
    transition: transform 0.5s ease;
    body[data-page="/shoot"] &{transform: rotate(0deg); font-size: 2.5rem;}
    body[data-page="/contact"] &{font-size: 2.5rem; @media (max-width: 1025px) {font-size: 1.25rem;transform: rotate(0deg);}
`
const NavBar = styled.div`
    position: fixed;
    z-index: 1;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: 75vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    body[data-page="/"] &{display: none;}
`
const NavFlex = styled.div`
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
`
const Navlink = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: 'Aesthetique';
    font-size: 1.5rem;
    @media (max-width: 1025px) {font-size: 1.25rem2}
    font-weight: 1000;
    body[data-nav="true"] &{opacity: 1;
        &.home{transform: translateX(0%);}
        &.gallery{transform: translateX(0%);}
        &.pricing{transform: translateX(0%);}
        &.contact{transform: translateX(0%);}
        transition: opacity 0.5s ease, transform 0.5s ease;}
    body[data-nav="false"] &{opacity: 0;
        &.home{transform: translateX(200%);}
        &.gallery{transform: translateX(-200%);}
        &.pricing{transform: translateX(200%);}
        &.contact{transform: translateX(-200%);}
        transition: opacity 0.5s ease 0s, transform 0.5s ease 0.5s;}
    
`

function Menu() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [isNav, setIsNav] = useState(document.body.dataset.nav === 'true');
  useEffect(() => {
    const handleNavChange = () => {
      setIsNav(document.body.dataset.nav === 'true');
    };
    document.body.addEventListener('click', handleNavChange);
    return () => {
      document.body.removeEventListener('click', handleNavChange);
    };
  }, []);
  useEffect(() => {
    document.documentElement.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant"
    });
  }, [pathname]);
    return (
        <>
        <MenuButtonContainer>
          <MenuButton className="interactable" onClick={() => {document.body.dataset.nav = document.body.dataset.nav === "true" ? "false" : "true";}}>Menu</MenuButton>
        </MenuButtonContainer>
        <NavBar>
          <NavFlex>
            <Navlink className="interactable home" onClick={() => {document.body.dataset.nav = document.body.dataset.nav === "true" ? "false" : "true";navigate("/");}}>Home</Navlink>
          </NavFlex>
          <NavFlex>
            <Navlink className="interactable gallery" onClick={() => {document.body.dataset.nav = document.body.dataset.nav === "true" ? "false" : "true";navigate("/gallery");}}>Gallery</Navlink>
          </NavFlex>
          <NavFlex>
            <Navlink className="interactable pricing" onClick={() => {document.body.dataset.nav = document.body.dataset.nav === "true" ? "false" : "true";navigate("/pricing");}}>Pricing</Navlink>
          </NavFlex>
          <NavFlex>
            <Navlink className="interactable contact" onClick={() => {document.body.dataset.nav = document.body.dataset.nav === "true" ? "false" : "true";navigate("/contact");}}>Contact</Navlink>
          </NavFlex>
        </NavBar>
        </>
    );
}
export default Menu