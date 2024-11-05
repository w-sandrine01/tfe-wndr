import './style.scss';
import { Canvas  } from '@react-three/fiber'
import { useState, Suspense, useEffect, useRef } from 'react';
import { PointerLockControls, Loader } from '@react-three/drei';
import { DepthOfField, EffectComposer, Vignette, Noise, SMAA } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'

import MuteButton from './MuteButton.jsx';
import FullscreenButton from './FullscreenButton.jsx';
import Experience from './Experience.jsx';
import Sound from './Sound.jsx'


export default function App()
{ 
    const containerStyles = {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#0d0d0d',
    };

    const barStyles = {
        width: '50%',
        height: '4px',
        backgroundColor: '#ebede4',
        borderRadius: '3px',
        overflow: 'hidden',
      };


    const dataStyles = {
        marginTop: '50px',
        margin: "auto",
        color: '#ebede4',
        fontFamily:  "obvia, sans-serif",
        fontSize: '14px',
    };


    // Fullscreen toggle /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }
        }
    };


    // Show/Hide welcome screen depending on pointerlock state /////////////////////////////////////////////////////////////////////////////////////////////
    const [showScreen, setShowInstructions] = useState(true)
    const [isPointerLocked, setIsPointerLocked] = useState(false);

    function pointerlockchange() {
        const isLocked = document.pointerLockElement !== null;
        setIsPointerLocked(isLocked);
        setShowInstructions(!showScreen)
    }

    useEffect(() => {
        document.addEventListener('pointerlockchange', pointerlockchange, false)

        return () => {
            document.removeEventListener('pointerlockchange', pointerlockchange, false)
        }
    })


    // Rotate element towards the mouse /////////////////////////////////////////////////////////////////////////////////////////////
    useEffect(() => {
        const mouseOverContainer = document.getElementById("containerAnim");
        const elements = document.getElementsByClassName("contentAnim");

        function transforms(x, y, el) {
            let box = el.getBoundingClientRect();
            const constrain = el.getAttribute('data-constrain');
            let calcX = -(y - box.y - (box.height / 2)) / constrain;
            let calcY = (x - box.x - (box.width / 2)) / constrain;

            calcX = Math.max(-1, Math.min(1, calcX));
            calcY = Math.max(-1, Math.min(1, calcY));
            
            return "perspective(100px) rotateX(" + calcX + "deg) rotateY(" + calcY + "deg)";
        };

        function transformElement(el, xyEl) {
            el.style.transform = transforms.apply(null, xyEl);
        }

        function handleMouseMove(e) {
            let xy = [e.clientX, e.clientY];
            Array.from(elements).forEach(el => {
                let position = xy.concat([el]);
                window.requestAnimationFrame(() => {
                    transformElement(el, position);
                });
            });
        }

        if (mouseOverContainer) {
            mouseOverContainer.addEventListener('mousemove', handleMouseMove);
        }

        return () => {
            if (mouseOverContainer) {
                mouseOverContainer.removeEventListener('mousemove', handleMouseMove);
            }
        };
    }, []);



    // Change text on hover //////////////////////////////////////////////////////////////////////////////////////////////////

    const welcomeText = useRef(null);
    const title = useRef(null); // remove title when hovering over links


    useEffect(() => {
        if (welcomeText.current) {
            welcomeText.current.innerHTML = `
                <p>Welcome.</p>
                <p>You have been invited to</p>
            `;
        }
        if (title.current) {
            title.current.innerHTML = `
                W<span class='faulty-letter'>A</span>ND<span class='faulty-letter'>E</span>R
            `;
        }
    }, []);

    // Set the content based on the hovered word
    const handleWordHover = (word) => {
        switch (word) {
          case `who`:
            welcomeText.current.innerHTML = `
            <div class="linkContent credit">
                <span class="singleMargin">
                    <span class="bold">Designed and developed</span>
                    by<br>
                    Sandrine Wij 
                </span>

                <span class="bold">Special thanks to </span>

                My web design teachers for their guidance<br>
                Bruno Simons for his ThreeJS Journey course<br>
                Friends and family for their support
                <span class="social marginTop">Find me on Instagram @sandrine_dwt</span/
            </div>`;
            title.current.innerHTML = '';
            break;
          case 'where':
            welcomeText.current.innerHTML = `
            <div class="linkContent where">
                <span class="bold">WNDR</span> is a digital environment designed to evoke intrigue and unease with rooms inspired by liminal spaces and human anxieties.
                Within these walls, purpose is a mere illusion leaving you free to wander.<br>
                <span class="bold marginTop">Let curiosity be your guide.</span>
            </div>
            `;
            title.current.innerHTML = '';
            break;
          case 'what':
            welcomeText.current.innerHTML = `
            <div class="linkContent why">
                <span class="bold">This experience was created as a final year of studies project.</span><br>
                While my major is Web Design, I wanted to expand my skill set beyond HTML, CSS, and JavaScript. 
                So, I decided to learn Blender, Three.JS and React Three Fiber to explore incorporating 3D elements into websites
                <span class="marginTop">…or make a 3D website altogether.</span>
            </div>
            `;
            title.current.innerHTML = '';
            break;
          default:
            welcomeText.current.innerHTML = `
              <div>
                <p>Welcome.</p>
                <p>You have been invited to</p>
              </div>`;
            title.current.innerHTML = '';
            break;
        }
      };

    // Reset the content when mouse leaves
    const handleMouseLeave = () => {
        welcomeText.current.innerHTML = `
            <p>Welcome.</p>
            <p>You have been invited to</p>
        `;   
        title.current.innerHTML = `
            W<span class='faulty-letter'>A</span>ND<span class='faulty-letter'>E</span>R        
        `; 
    };





      
    return(
    <>        
        <div id="containerAnim" className={`welcomeScreen ${showScreen ? 'show' : 'hide'}`}>

            <div className="links">
                <p className="link" onMouseEnter={() => handleWordHover(`who`)} onMouseLeave={handleMouseLeave}>
                    "&nbsp;Who's behind this&nbsp;?&nbsp;"
                </p>

                <p className="link" onMouseEnter={() => handleWordHover('where')} onMouseLeave={handleMouseLeave}>
                    "&nbsp;Where am I&nbsp;?&nbsp;"
                </p>

                <p className="link" onMouseEnter={() => handleWordHover('what')} onMouseLeave={handleMouseLeave}>
                    "&nbsp;What's the purpose&nbsp;?&nbsp;"
                </p>

            </div>
            


            <div className='contentAnim' data-constrain="600">

                <div ref={welcomeText} className="welcomeMsg" >
                    <p>Welcome.</p>
                    <p>You have been invited to</p>
                </div>
            
                <h2 ref={title} className='glowing-txt contentAnim' data-constrain="2500">
                    W<span className='faulty-letter'>A</span>ND<span className='faulty-letter'>E</span>R
                </h2>

                <button className="btnStart glowing-btn">ENTER</button>
                
            </div>     
            
            <div className="mobile">For the full experience, please visit on a desktop.</div>

            <div className="controlKeys">
                <span>
                    <p>Press <img className="imgESC" src={'./images/escb.png'} alt="Escape key"/> to exit the experience</p>                    
                    
                    <div>
                        <p>Use your mouse and control keys to move</p>
                        <img src={'./images/mouseb.png'} alt="Desktop mouse icon"/>
                        <img src={'./images/plusb.png'} alt="Plus sign icon"/>
                        <img src={'./images/wasdb.png'} alt="WASD keys"/>
                        <img src={'./images/zqsdb.png'} alt="ZQSD keys"/>
                        <img src={'./images/arrowsb.png'} alt="Arrow keys"/>
                    </div> 
                </span>
                
                <span>                                       
                    <MuteButton />  
                    <FullscreenButton/>
                </span>
            </div>
      </div>   


        <Canvas flat gl={{ antialias: true } } > 
     
            <EffectComposer disableNormalPass multisampling={ 0 }>               
                <DepthOfField focusDistance={0} focalLength={0.02} bokehScale={0.5} height={480} /> 
                <Noise opacity={0.03}/>
                <SMAA />
                <Vignette eskil={false} offset={0.01} darkness={0.9} blendFunction={ BlendFunction.NORMAL }/> 
                {/* <ToneMapping mode={ ToneMappingMode.ACES_FILMIC } /> */}
            </EffectComposer>

            <PointerLockControls 
                pointerSpeed={0.6}
                minPolarAngle={ Math.PI/4 }
                maxPolarAngle={ Math.PI/1.25 } 
                selector=".btnStart"                
            />

            <Suspense> 
                <Experience/>
                
                <Sound url="./sounds/breathing.mp3" position={[0, 1, 0]} distance = {20} loop={true} volume={0.7} playbackRate={1} play={isPointerLocked}/>
                <Sound url="./sounds/heartbeat.mp3" position={[0, 1, 0]} distance = {20} loop={true} volume={0.3} playbackRate={1} play={isPointerLocked}/>
                <Sound url="./sounds/Heartaches Burning Memory.mp3" position={[17, 4, -45]} distance = {0.01} loop={true} volume={5} playbackRate={1} play={isPointerLocked}/> 
            </Suspense>

        </Canvas>

        <Loader
            containerStyles={containerStyles}
            barStyles={barStyles}
            dataStyles={dataStyles}
            dataInterpolation={(p) => `Loading rooms`} 
        ></Loader>
    </>
    );
}



