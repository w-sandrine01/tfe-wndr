import { KeyboardControls} from '@react-three/drei'
import { Physics } from '@react-three/rapier' 

import Player from './Player.jsx'
import Model from './Model.jsx'



export default function Experience()
{   
    console

    return <>  

        <KeyboardControls map={ [
            { name: 'forward', keys: [ 'ArrowUp', 'KeyW' ] },
            { name: 'backward', keys: [ 'ArrowDown', 'KeyS' ] },
            { name: 'leftward', keys: [ 'ArrowLeft', 'KeyA' ] },
            { name: 'rightward', keys: [ 'ArrowRight', 'KeyD' ] },
        ] }>


        {/* <Physics debug> */}
        <Physics>
                <Model />            
                <Player />
        </Physics> 

        </KeyboardControls>
    </>
}









