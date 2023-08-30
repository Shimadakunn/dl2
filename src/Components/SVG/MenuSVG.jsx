import React from 'react'

function Menu({fill, width}) {
    return (
        <svg fill={fill||"#000000"} width={width||"800px"} height={width||"800px"} viewBox="0 0 64 64" data-name="Layer 1" id="Layer_1" xmlns="http://www.w3.org/2000/svg">
            <title/>
            <path d="M53,24.34H11.05a2,2,0,0,1,0-4H53a2,2,0,0,1,0,4Z"/>
            <path d="M53,43.66H41.5a2,2,0,0,1,0-4H53a2,2,0,0,1,0,4Z"/>
            <path d="M32.82,43.66H11.05a2,2,0,1,1,0-4H32.82a2,2,0,0,1,0,4Z"/>
        </svg>
    );
    }
export default Menu