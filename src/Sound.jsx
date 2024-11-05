import { useRef, useState, useEffect, forwardRef  } from 'react';
import { useThree, useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import { useAudio } from './AudioContext.jsx';


function Sound({ url, position, distance, loop, volume, playbackRate, play }) {
    const sound = useRef();
    const { camera } = useThree(); // For the positional audio
    const [listener] = useState(() => new THREE.AudioListener());
    const buffer = useLoader(THREE.AudioLoader, url);
    const { isMuted } = useAudio();


    useEffect(() => {
        const resumeAudioContext = () => {
            if (listener.context.state === 'suspended') {
                listener.context.resume();
            }
        };

        window.addEventListener('click', resumeAudioContext);
        window.addEventListener('keydown', resumeAudioContext);

        if (sound.current) {
            sound.current.setBuffer(buffer);
            sound.current.setRefDistance(distance);
            sound.current.setLoop(loop);
            sound.current.setVolume(isMuted ? 0 : volume);
            sound.current.setPlaybackRate(playbackRate);
            // sound.current.play();
            camera.add(listener);

            // if (play) { 
            //     sound.current.play();
            // } else {
            //     sound.current.pause();
            // }
        }

        return () => {
            camera.remove(listener);
            window.removeEventListener('click', resumeAudioContext);
            window.removeEventListener('keydown', resumeAudioContext);
        };
    }, [buffer, isMuted]);


    // Create play variable for the walking sound
    useEffect(() => {
        if (sound.current) {
            if (play) {
                sound.current.play();
            } else {
                sound.current.pause();
            }
        }
    }, [play]);


    return <positionalAudio ref={sound} args={[listener]} position={position} />;
}

export default Sound;

    




