import React,{ useEffect, useRef, useState} from 'react'
import { useNavigate,useLocation } from 'react-router-dom'
import Mail from '../Components/SVG/MailSVG'
import Phone from '../Components/SVG/PhoneSVG'
import Instagram from '../Components/SVG/InstagramSVG'
import styled from "styled-components"

const Container = styled.div`
    height: 298vh;
    position: relative;
    @media (max-width: 1350px) { height: 100vh;display: flex;}
    @media (max-width: 675px) {flex-direction: column;}
    background-color: white;
    // overflow: hidden;
    
`
const InfoColumn = styled.form`
    height: 100vh;
    @media (max-width: 675px) {height: 50vh;width: 100vw;font-size: 1rem;}
    width: 50vw;
    @media (min-width: 1350px) {position: sticky;}
    pointer-events: auto;
    top: 0;
    left: 47.5%;
    display: flex;
    align-items: center;
    justify-content: center;
    &.mobile {display: none;}
    @media (max-width: 1350px) {left:0%;&.mobile {display: block;};&.pc {display: none;}}
`
const InfoContainer = styled.div`
    height: 65vh;
    @media (max-width: 675px) {height: 50vh;}
    width: 40vw;
    display: flex;
    align-items: left;
`
const Informations = styled.div`
    left: 10%;
    flex: 1;
    position: relative;
    @media (max-width: 1350px) {top:25%;left:35%;}
    @media (max-width: 675px) {top:0%;left:90%;}
    *{font-family: 'Aesthetique';position: absolute;}
    h1{top: 15%;@media (max-width: 675px) {width:150%;left:-27.5%;}}
    .Hmail{top: 40%;@media (max-width: 675px) {top: 30%;}}
    .mail{
        font-family: Arial, Helvetica, sans-serif;
        text-decoration: none;
        color: black;
        top: 45%;
        @media (max-width: 675px) {top: 40%;left: -20%}
        transition: 250ms ease-in-out;
        &:hover{
            transform: translateX(1.1vw);
            + .SVGmail{
                opacity: 1;
                transform: translateX(-0.5vw);
                @media (max-width: 675px) {transform: translateX(-4vw)};
            }
        }
    }
    .SVGmail{
        top: 45%;
        @media (max-width: 675px) {top: 40%;left: -20%;}
        left: 0.5vw;
        opacity:0;
        transition: 250ms ease-in-out;
    }
    .Hphone{top: 60%;@media (max-width: 675px) {top: 50%;}}
    .phone{
        font-family: Arial, Helvetica, sans-serif;
        text-decoration: none;
        color: black;
        top: 65%;
        @media (max-width: 675px) {top: 60%;left: -10%;}
        transition: 250ms ease-in-out;
        &:hover{
            transform: translateX(1vw);
            + .SVGphone{
                opacity: 1;
                transform: translateX(-0.5vw);
                @media (max-width: 675px) {transform: translateX(-4vw)};
            }
        }
    }
    .SVGphone{
        top: 65%;
        left: 0.5vw;
        @media (max-width: 675px) {top: 60%;left: -10%;}
        opacity:0;
        transition: 250ms ease-in-out;
    }
    .Hinsta{top: 80%;@media (max-width: 675px) {top: 70%;left: -10%;}}
    .insta{
        font-family: Arial, Helvetica, sans-serif;
        text-decoration: none;
        color: black;
        top: 85%;
        @media (max-width: 675px) {top: 80%;left: 8%;}
        transition: 250ms ease-in-out;
        &:hover{
            transform: translateX(1.1vw);
            + .SVGinsta{
                opacity: 1;
                transform: translateX(-0.5vw);
                @media (max-width: 675px) {transform: translateX(-1vw)};
            }
        }
    } 
    .SVGinsta{
        top: 85%;
        left: 0.5vw;
        opacity:0;
        transition: 250ms ease-in-out;
        @media (max-width: 675px) {top: 80%;}
    } 
`
const Form = styled.div`
    flex: 1;
    position: relative;
    @media (max-width: 1350px) {top:25%;right:5%;
        body[data-nav="true"] &{
            .or{opacity: 0;transition: 0ms ease-in-out;}
            .interactable{opacity: 0;transition: 0ms ease-in-out;}}
        body[data-nav="false"] &{
            .or{opacity: 1;transition: 250ms ease-in-out 0.5s;}
            .interactable{opacity: 1;transition: 250ms ease-in-out 0.5s;}}
    }
    @media (max-width: 675px) {top:0%;left:90%;}
    *{font-family: 'Aesthetique';position: absolute;right: 0;}
    .or{top: 15%;left: 0;@media (max-width: 675px) {display: none;}}
    .send{top: 15%;@media (max-width: 675px) {width:150%;left:-30%;top:10%}}
    .Hname{top: 40%;@media (max-width: 675px) {top: 25%;left: -10%;}}
    .Iname{top: 45%;cursor: text;font-family: Arial, Helvetica, sans-serif;@media (max-width: 675px) {top:35%;left: -25%;}}
    .Hmail{top: 60%;@media (max-width: 675px) {top: 45%;left: -5%;}}
    .Imail{top: 65%;cursor: text;font-family: Arial, Helvetica, sans-serif;@media (max-width: 675px) {top: 55%;left: -25%;}}
    .Hmessage{top: 80%;@media (max-width: 675px) {width:150%; top: 65%;left: -20%;}}
    .Imessage{top: 85%;cursor: text;font-family: Arial, Helvetica, sans-serif;@media (max-width: 675px) {width:150%; top: 72.5%;left: -37.5%;}}  
`
const Button = styled.div`
    text-align: center;
    position: absolute;
    top: 86%;
    left:7%;
    @media (max-width: 675px) {top: 90%;left: 35%;}
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
            @media (min-width: 1350px){width: 132.5%;}
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
        @media (max-width: 1800px){opacity: 0;}
        transform: translateX(-100px);
        transition: all 0.3s ease;
    }
    &:hover svg {
        transform: translateX(-250%);
    }
    &:active svg {
        transform: scale(0.25);
    }
    &:hover span:after {
        transform: scaleX(1);
        transform-origin: bottom left;
    }
`
const Gallery = styled.div`
    @media (max-width: 1350px) {display: none;}
    background-color: white;
    position: absolute;
    width: 47.5%;
    display: flex;
    opacity: 0;
    transition: opacity 1s ease-in-out;
    &.loaded {opacity: 1;}
`
const Lane = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    transition: transform 1s ease-out;
    &.left{padding-right: 0.75vw;transform: translateY(-10%);}
    &.right{padding-left: 0.75vw;transform: translateY(10%);}
    &.loaded.left, &.loaded.right{transform: translateY(0%);}
`
const Project = styled.div`
  &.portrait {aspect-ratio: 1/1.5;}
  &.portraitBis {aspect-ratio: 1/1.75;}
  &.top{padding-bottom: 0.75vw;}
  &.mid{padding: 0.75vw 0;}
  &.bot{padding-top: 0.75vw;}
`
const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`
const Left = styled.div`
  flex: 1;
  display: flex;
  z-index: 1;
  transition: transform 500ms ease-out;
  body[data-nav="true"] &{transform: translateX(-20%);
    @media (max-width: 675px) {transform: translateY(-100%);}}
`
const Right = styled.div`
  flex: 1;
  position: sticky;
  top: 0;
  pointer-events: none;
  z-index: 1;
  display: flex;
  transition: transform 500ms ease-out;
  body[data-nav="true"] &{transform: translateX(15%);
    @media (max-width: 675px) {transform: translateY(100%);}}
`

function Contact(){
    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {
        setIsLoaded(true);
        window.scrollTo(0, 0);
    }, []);

    const location = useLocation();
    useEffect(() => {
        document.body.dataset.page = location.pathname;
    }, [location.pathname]);

    const divRefs = useRef([]);
    useEffect(() => {
        const handleScroll = () => {
        const bodyHeight = 3000;
        const pageHeight = window.innerHeight;
        divRefs.current.forEach(div => {
            const divHeight = div.offsetHeight;
            const scrollPosition = window.scrollY;
            const posFinal = bodyHeight - divHeight;
            const factor = posFinal/(bodyHeight - pageHeight)*scrollPosition;
            div.style.transform = `translateY(${factor}px)`;
            // console.log("Body:"+bodyHeight+" Page:"+pageHeight+" Div:"+divHeight+" Scroll:"+scrollPosition+" Factor:"+factor);
        });
        };

        window.addEventListener('scroll', handleScroll); // Add scroll event listener
        
        return () => {
        window.removeEventListener('scroll', handleScroll); // Remove scroll event listener on component unmount
        };
    }, []);
    function sendMail(){
        const serviceID = 'service_qiv64ci';
        const templateID = 'template_e7swohr';
        const privateKey = 'MbO4swYDQQEn9wQmR';
        var nameInput = document.getElementById("name");
        var mailInput = document.getElementById("mail");
        var messageInput = document.getElementById("message");
        if (nameInput && mailInput && messageInput) {
            var params = {
                name: nameInput.value,
                mail: mailInput.value,
                message: messageInput.value
            };
        }
        if(!nameInput.value === false && !mailInput.value === false && !messageInput.value === false){
            emailjs.send(serviceID, templateID, params, privateKey)
            .then(
                res => {
                    document.getElementById("name").value = "";
                    document.getElementById("mail").value = "";
                    document.getElementById("message").value = "";
                    console.log(res);
                    alert("Message sent successfully!");
                }
            )
            .catch((err) => console.log(err));
        }else{
            console.log("Name:"+nameInput.value+" Mail:"+mailInput.value+" Message:"+messageInput.value);
            console.log("Name:"+!nameInput.value+" Mail:"+!mailInput.value+" Message:"+!messageInput.value);
            alert("Please fill all the fields!");
        }
    }
    return(
        <Container>
            <Left>
                <Gallery className = {isLoaded ? 'loaded' : ''} >
                    <Lane className={isLoaded ? "loaded left" : "left"} >
                        <div ref={el => (divRefs.current[0] = el)}>
                            <Project className="portrait top" >
                                <Image src="../img/Synda/2.jpg"></Image>
                            </Project>
                            <Project className="portrait mid">
                                <Image src="../img/Eva Clem Clair/0.jpg"></Image>
                            </Project>
                            <Project className="portrait bot">
                                <Image src="../img/Eva Clem Sombre/0.JPG"></Image>
                            </Project>
                        </div>
                    </Lane>
                    <Lane className={isLoaded ? "loaded right" : "right"}>
                        <div ref={el => (divRefs.current[1] = el)}>
                            <Project className="portraitBis top">
                                <Image src="../img/Eva Robot/12.JPG"></Image>
                            </Project>
                            <Project className="portraitBis mid">
                                <Image src="../img/Anjeli/0.jpg"></Image>
                            </Project>
                            <Project className="portraitBis bot">
                                <Image src="../img/Morgane/0.JPG"></Image>
                            </Project>
                        </div>
                    </Lane>
                </Gallery>
                <InfoColumn className="mobile">
                    <InfoContainer>
                        <Informations className="Info">
                            <h1>Get in touch</h1>
                            <h2 className="Hmail">Write me</h2>
                            <a href="mailto:example@example.com" className = "mail interactable">dounia.limam@gmail.com</a>
                            <div className = "SVGmail"><Mail fill="#a3c585" width="17.5"/></div>
                            <h2 className = "Hphone">Call me</h2>
                            <a href="tel:+1234567890" className = "phone interactable">+33 6 50 50 50 50</a>
                            <div className = "SVGphone"><Phone fill="#a3c585" width="15"/></div>
                            <h2 className = "Hinsta">Follow me</h2>
                            <a href="https://www.instagram.com/yakamuzoseiya"  target="_blank" className = "insta interactable">Instagram</a>
                            <div className ="SVGinsta"><Instagram fill ="#a3c585" width="15"/></div>
                        </Informations>
                    </InfoContainer>
                </InfoColumn>
            </Left>
            <Right>
                <InfoColumn className="pc">
                    <InfoContainer>
                        <Informations className="Info">
                            <h1>Get in touch</h1>
                            <h2 className="Hmail">Write me</h2>
                            <a href="mailto:example@example.com" className = "mail interactable">dounia.limam@gmail.com</a>
                            <div className = "SVGmail"><Mail fill="#a3c585" width="17.5"/></div>
                            <h2 className = "Hphone">Call me</h2>
                            <a href="tel:+1234567890" className = "phone interactable">+33 6 50 50 50 50</a>
                            <div className = "SVGphone"><Phone fill="#a3c585" width="15"/></div>
                            <h2 className = "Hinsta">Follow me</h2>
                            <a href="https://www.instagram.com/yakamuzoseiya"  target="_blank" className = "insta interactable">Instagram</a>
                            <div className ="SVGinsta"><Instagram fill ="#a3c585" width="15"/></div>
                        </Informations>
                        <Form className="Form">
                            <h1 className ="or">Or</h1>
                            <h1 className ="send">Send me Mail</h1>
                            <h2 className="Hname">Your name</h2>
                            <input type="text" className = "Iname" id = "name" placeholder="Name"/>
                            <h2 className = "Hmail">Your mail</h2>
                            <input type="mail" className = "Imail" id = "mail" placeholder="Mail"/>
                            <h2 className = "Hmessage">Your message</h2>
                            <textarea type="text" className = "Imessage" id = "message" placeholder="Message"/>
                            <Button className="interactable" onClick={sendMail}>
                                <span>Submit</span>
                                <svg viewBox="0 0 60 16" height="15" width="35" xmlns="http://www.w3.org/2000/svg" id="arrow-horizontal">
                                    <path transform="translate(30)" d="M8,0,6.545,1.455l5.506,5.506H-30V9.039H12.052L6.545,14.545,8,16l8-8Z" data-name="Path 10" id="Path_10"></path>
                                </svg>
                            </Button>
                        </Form>
                    </InfoContainer>
                </InfoColumn>
                <InfoColumn className="mobile">
                    <InfoContainer>
                        <Form className="Form">
                            <h1 className ="or">Or</h1>
                            <h1 className ="send">Send me Mail</h1>
                            <h2 className="Hname">Your name</h2>
                            <input type="text" className = "Iname" id = "name" placeholder="Name"/>
                            <h2 className = "Hmail">Your mail</h2>
                            <input type="mail" className = "Imail" id = "mail" placeholder="Mail"/>
                            <h2 className = "Hmessage">Your message</h2>
                            <textarea type="text" className = "Imessage" id = "message" placeholder="Message"/>
                            <Button className="interactable" onClick={sendMail}>
                                <span>Submit</span>
                                <svg viewBox="0 0 60 16" height="15" width="35" xmlns="http://www.w3.org/2000/svg" id="arrow-horizontal">
                                    <path transform="translate(30)" d="M8,0,6.545,1.455l5.506,5.506H-30V9.039H12.052L6.545,14.545,8,16l8-8Z" data-name="Path 10" id="Path_10"></path>
                                </svg>
                            </Button>
                        </Form>
                    </InfoContainer>
                </InfoColumn>
            </Right>
        </Container>
    );
}
export default Contact