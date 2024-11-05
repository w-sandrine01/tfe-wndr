import { RigidBody } from '@react-three/rapier'
import { useFrame, useThree } from '@react-three/fiber'
import { useKeyboardControls } from '@react-three/drei'
import { useState, useEffect, useRef } from 'react'
import * as THREE from 'three'

import Sound from './Sound.jsx'


// function Sound({ url, position, distance, volume, playbackRate }) {
//     const sound = useRef();
//     const { camera } = useThree();
//     const [listener] = useState(() => new THREE.AudioListener());
//     const buffer = useLoader(THREE.AudioLoader, url);

//     useEffect(() => {
//         const resumeAudioContext = () => {
//             if (listener.context.state === 'suspended') {
//                 listener.context.resume();
//             }
//         };

//         window.addEventListener('click', resumeAudioContext);
//         window.addEventListener('keydown', resumeAudioContext);

//         if (sound.current) {
//             sound.current.setBuffer(buffer);
//             sound.current.setRefDistance(distance);
//             sound.current.setLoop(true);
//             sound.current.setVolume(volume);
//             sound.current.setPlaybackRate(playbackRate);
//             sound.current.play();
//             camera.add(listener);
//         }

//         return () => {
//             camera.remove(listener);
//             window.removeEventListener('click', resumeAudioContext);
//             window.removeEventListener('keydown', resumeAudioContext);
//         };
//     }, [buffer]);

//     return <positionalAudio ref={sound} args={[listener]} position={position} />;
// }



export default function Player() { 
    const body = useRef()
    const [subscribeKeys, getKeys] = useKeyboardControls()
    const [smoothedCameraPosition] = useState(() => new THREE.Vector3())
    const flashlight = useRef()
    const { camera } = useThree()
    const [isWalking, setIsWalking] = useState(false);


    useEffect(() => {
        camera.rotation.y = -Math.PI / 2 // Rotate cam 90 degrees to the right

        // const audio = new Audio('./sounds/walking steps.mp3'); // Simplified name
        // audio.volume = 0.1; // Set volume
        // audio.loop = true; // Set loop
        // audio.playbackRate = 1.2;
        // walkingStepsSound.current = audio;
    }, [camera])

    camera.fov = 50
    camera.updateProjectionMatrix()


    useFrame((state, delta) => {              

        let cameraDirection = state.camera.getWorldDirection(new THREE.Vector3())
        cameraDirection.normalize()

        // Make the ball move /////////////////////////////////////////////////////////////////////////////////////////////////////////
        const { forward, backward, leftward, rightward } = getKeys()
        const impulse = { x: 0, y: 0, z: 0 }
        const impulseStrength = 1.3 * delta

        if (forward) { 
            impulse.x += cameraDirection.x * impulseStrength
            impulse.z += cameraDirection.z * impulseStrength
        }
        if (backward) {
            impulse.x -= cameraDirection.x * impulseStrength
            impulse.z -= cameraDirection.z * impulseStrength
        }
        if (leftward) {
            impulse.x += cameraDirection.z * impulseStrength
            impulse.z -= cameraDirection.x * impulseStrength
        }
        if (rightward) {
            impulse.x -= cameraDirection.z * impulseStrength
            impulse.z += cameraDirection.x * impulseStrength
        }

        body.current.applyImpulse(impulse)

        const bodyPosition = body.current.translation()
        const cameraPosition = new THREE.Vector3()
        cameraPosition.copy(bodyPosition)
        cameraPosition.y += 1
         
        smoothedCameraPosition.lerp(cameraPosition, 0.1)
        state.camera.position.copy(cameraPosition, 5 * delta)


        // Head bobbing /////////////////////////////////////////////////////////////////////////////////////////////////////////
        const amplitudeZ = 0.00005
        const frequencyZ = 3

        const amplitudeY = 0.03
        const frequencyY = 9

        const amplitudeYStill = 0.002
        const frequencyYStill = 4
         
        const time = state.clock.getElapsedTime()
        camera.rotation.z += Math.sin(time * frequencyZ) * amplitudeZ

        if (forward || backward || leftward || rightward) {          
            camera.position.y += Math.sin(time * frequencyY) * amplitudeY

        } else {
            camera.position.y += Math.sin(time * frequencyYStill) * amplitudeYStill
        }

        // Add Flashlight to camera /////////////////////////////////////////////////////////////////////////////////////////////////////////
        const flashlightPosition = new THREE.Vector3()
        flashlightPosition.copy(cameraPosition)
        flashlight.current.position.copy(flashlightPosition)   

        
        // Set play{isWalking} to true when moving /////////////////////////////////////////////////////////////////////////////////////////////////////////
        const walking = forward || backward || leftward || rightward; // True if this-or-or-or
        setIsWalking(walking);

    })


    
    return (
    <>
        <RigidBody 
            ref={body} 
            colliders="ball" 
            restitution={0} 
            friction={10}             
            canSleep={false} 
            linearDamping={3} 
            angularDamping={15} 
            position={[0, 1, 0]} 
        >
            <mesh>
                <sphereGeometry args={[0.3]} />
                <meshStandardMaterial transparent opacity={0}/>
            </mesh>
        </RigidBody> 

        <pointLight
            ref={flashlight}
            intensity={2}
            distance={4}
            decay={2}
            color="#f4f5e6"
            castShadow
        />

        <Sound url="./sounds/walking steps.mp3" position={[0, 1, 0]} distance={20} loop={true} volume={0.5} playbackRate={1} play={isWalking}/> 
    </>
    )
}


