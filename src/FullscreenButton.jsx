import React from 'react';
import { useState } from 'react';

import './style.scss';



export default function FullscreenButton() {
    const [isFullscreen, setIsFullscreen] = useState(false);
    const handleFullScreen = () => {
        const docElm = document.documentElement;
        const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement || document.msFullscreenElement;

        if (!fullscreenElement) {
            if (docElm.requestFullscreen) {
                docElm.requestFullscreen();
            } else if (docElm.webkitRequestFullscreen) {
                docElm.webkitRequestFullscreen();
            } else if (docElm.msRequestFullscreen) {
                docElm.msRequestFullscreen();
            }
            setIsFullscreen(true);
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }
            setIsFullscreen(false);
        }
    };

    return (
        <button 
            className={`btnFullscreen ${isFullscreen ? 'fullscreen' : ''}`} 
            onClick={handleFullScreen}
        >                   

            {isFullscreen ? (                
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="30" viewBox="-3 2 20 20"><path fill="none" d="M0 0h24v24H0z"/><path fill="black" d="M18 7h4v2h-6V3h2v4zM8 9H2V7h4V3h2v6zm10 8v4h-2v-6h6v2h-4zM8 15v6H6v-4H2v-2h6z"/></svg>            
            ) : (                
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="30" viewBox="-3 2 20 20"><path fill="none" d="M0 0h24v24H0z"/><path fill="black" d="M20 3h2v6h-2V5h-4V3h4zM4 3h4v2H4v4H2V3h2zm16 16v-4h2v6h-6v-2h4zM4 19h4v2H2v-6h2v4z"/></svg>            
            )}
        </button>
    )
}
           