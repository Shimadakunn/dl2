import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";

const IconText = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    font-size: 0.25vh;
    line-height: 1;
    font-weight: 900;
    letter-spacing: .1em;
    color: #fff;

    opacity: 0;
    transition: opacity 400ms ease;
`

const Trailer = styled.div`
    background-color: black;
    height: 1.75vh;
    width: 1.75vh;
    border-radius: 50%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    transition: transform 400ms ease;
    pointer-events: none;
    opacity: 0;
    body:hover & {opacity: 1;}
    &:not([data-type=""]) > ${IconText} {opacity: 1;}
    @media (max-width: 1350px) {display: none;}
`

function Mouse() {
    const trailerRef = useRef(null); // Ref for the trailer div element

    useEffect(() => {
        const handleMouseMove = (e, interacting) => {
            const x = e.clientX - trailerRef.current.offsetWidth / 2;
            const y = e.clientY - trailerRef.current.offsetHeight / 2;
            trailerRef.current.style.transform = `translate(${x}px, ${y}px)`;

            const keyframes = {
                transform: `translate(${x}px, ${y}px) scale(${interacting ? 2 : 1})`,
                backgroundColor: interacting ? "#ddead1" : "black",
            };
            trailerRef.current.animate(keyframes, {
                duration: 0,
                fill: "forwards",
            });

        };

        const handleWindowMouseMove = (e) => {
            const interactable = e.target.closest(".interactable");
            const interacting = interactable !== null;

            // const text = document.getElementById("text");

            handleMouseMove(e, interacting);

            trailerRef.current.dataset.type = interacting ? interactable.dataset.type : "";
            // if (interacting) {
            //     text.className = "text";
            // }
        };

        window.addEventListener("mousemove", handleWindowMouseMove); // Attach event listener

        return () => {
        window.removeEventListener("mousemove", handleWindowMouseMove); // Detach event listener on component unmount
        };
  }, []);
  return (
    <Trailer ref={trailerRef}>
        <IconText id="text">view</IconText>
    </Trailer>
  )
}
export default Mouse
