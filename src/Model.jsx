import { useGLTF, useTexture, Outlines} from '@react-three/drei'
import { RigidBody} from "@react-three/rapier";
import { useEffect, useState } from 'react';

import * as THREE from 'three'

import CustomMatcapMesh from './CustomShader.jsx'



export default function Model()
{
    const model = useGLTF('./models/WNDR2.glb');

    // Textures /////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Rooms //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    const textureArch = useTexture({
        map: './models/ArchHallwayDiffuse.jpg',
        roughnessMap: './models/ArchHallwayRoughness.png',
        lightMap: './models/ArchHallwayLightMap.jpg',
    });
    textureArch.map.flipY = false
    textureArch.roughnessMap.flipY = false
    textureArch.roughness = 20
    textureArch.lightMap.flipY = false
    textureArch.lightMapIntensity = 3


    const textureEntrance = useTexture({
        map: './models/EntranceDiffuse.jpg',
        roughnessMap: './models/EntranceRoughness.jpg',
        normalMap: './models/EntranceNormal.jpg',
        lightMap: './models/EntranceLightMap.jpg',
    })
    textureEntrance.map.flipY = false
    textureEntrance.roughnessMap.flipY = false
    textureEntrance.roughness = 15
    textureEntrance.normalMap.flipY = false
    textureEntrance.lightMap.flipY = false
    textureEntrance.lightMapIntensity = 2


    const textureOpen = useTexture({
        map: './models/OpenDiffuse.jpg',
        roughnessMap: './models/OpenRoughness.png',
        normalMap: './models/OpenNormal.jpg',
        lightMap: './models/OpenLightMapb.jpg',
    })
    textureOpen.map.flipY = false
    textureOpen.roughnessMap.flipY = false
    textureOpen.roughness = 3
    textureOpen.normalMap.flipY = false
    textureOpen.lightMap.flipY = false
    textureOpen.lightMapIntensity = 3


    const textureTrypo = useTexture({
        map: './models/TrypoDiffuse.jpg',
        roughnessMap: './models/TrypoRoughness.png',
        normalMap: './models/TrypoNormal.jpg',
        lightMap: './models/TrypoLightMap.jpg',
    })
    textureTrypo.map.flipY = false
    textureTrypo.roughnessMap.flipY = false
    textureTrypo.normalMap.flipY = false
    textureTrypo.lightMap.flipY = false
    textureTrypo.lightMapIntensity = 2


    const textureMegaRoom = useTexture({
        map: './models/MegaDiffuse.jpg',
        // roughnessMap: './models/ArchHallwayRoughness.png',
        // normalMap: './models/ArchHallwayNormal.png',
        lightMap: './models/MegaLightMap.jpg',
    })
    textureMegaRoom.map.flipY = false
    textureMegaRoom.lightMap.flipY = false
    textureMegaRoom.lightMapIntensity = 4


    const textureMegaWalls = useTexture({
        map: './models/MegaWallsDiffuse.jpg',
        // roughnessMap: './models/ArchHallwayRoughness.png',
        // normalMap: './models/ArchHallwayNormal.png',
        lightMap: './models/MegaWallsLightMap.jpg',
    })
    textureMegaWalls.map.flipY = false
    textureMegaWalls.lightMap.flipY = false
    textureMegaWalls.lightMapIntensity = 4

    const textureMegaFloor = useTexture({
        map: './models/MegaFloorDiffuse.jpg',
        // roughnessMap: './models/ArchHallwayRoughness.png',
        lightMap: './models/MegaFloorLightMap.jpg',
    })
    textureMegaFloor.map.flipY = false
    textureMegaFloor.lightMap.flipY = false
    textureMegaFloor.lightMapIntensity = 4


    const textureMaze = useTexture({
        map: './models/MazeDiffuse.jpg',
        roughnessMap: './models/MazeRoughness.png',
        // normalMap: './models/ArchHallwayNormal.png',
        lightMap: './models/MazeLightMap.jpg',
    })
    textureMaze.map.flipY = false
    textureMaze.roughnessMap.flipY = false
    textureMaze.lightMap.flipY = false
    textureMaze.lightMapIntensity = 5


    const textureLevelsHalls = useTexture({
        map: './models/LevelsHallsDiffuse.jpg',
        // roughnessMap: './models/ArchHallwayRoughness.png',
        // normalMap: './models/ArchHallwayNormal.png',
        lightMap: './models/LevelsHallsLightMap.jpg',
    })
    textureLevelsHalls.map.flipY = false
    textureLevelsHalls.lightMap.flipY = false
    textureLevelsHalls.lightMapIntensity = 3

    const textureLevelsWalls = useTexture({
        map: './models/LevelsWallsDiffuse.jpg',
        // roughnessMap: './models/ArchHallwayRoughness.png',
        // normalMap: './models/ArchHallwayNormal.png',
        lightMap: './models/LevelsWallsLightMap.jpg',
    })
    textureLevelsWalls.map.flipY = false
    textureLevelsWalls.lightMap.flipY = false
    textureLevelsWalls.lightMapIntensity = 3



    // Deco //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    
    const textureSmileys = useTexture({
        map: './models/SmileysDiffuse.jpg',
        lightMap: './models/SmileysLightMap.jpg',
    })
    textureSmileys.map.flipY = false
    textureSmileys.lightMap.flipY = false
    textureSmileys.lightMapIntensity = 3

    const textureChairs = useTexture({
        map: './models/ChairsDiffuse.jpg',
        roughnessMap: './models/ChairsRoughness.jpg',
    })
    textureChairs.map.flipY = false
    textureChairs.roughnessMap.flipY = false


    const textureChairs2 = useTexture({
        map: './models/Chairs2Diffuse.jpg',
        roughnessMap: './models/Chairs2Roughness.jpg',
        lightMap: './models/Chairs2LightMap.jpg',
    })
    textureChairs2.map.flipY = false
    textureChairs2.lightMap.flipY = false
    textureChairs2.lightMapIntensity = 2   
    textureChairs2.roughnessMap.flipY = false


    const textureChairs3 = useTexture({
        map: './models/Chairs3Diffuse.jpg',
        roughnessMap: './models/Chairs3Roughness.jpg',
        lightMap: './models/Chairs3LightMap.jpg',
    })
    textureChairs3.map.flipY = false
    textureChairs3.lightMap.flipY = false
    textureChairs3.lightMapIntensity = 1  
    textureChairs3.roughnessMap.flipY = false


    const textureTable = useTexture({
        map: './models/TableDiffuse.jpg',
        roughnessMap: './models/TableRoughness.jpg',
        lightMap: './models/TableLightMap.jpg',
    })
    textureTable.map.flipY = false
    textureTable.lightMap.flipY = false
    textureTable.lightMapIntensity = 10
    textureTable.roughnessMap.flipY = false



    // Plants //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    const textureEntranceLeafs = useTexture({
        map: './models/EntranceLeafsDiffuse.jpg',
        roughnessMap: './models/EntranceLeafsRoughness.jpg',
        normalMap: './models/EntranceLeafsNormal.jpg',
        lightMap: './models/EntranceLeafsLightMap.jpg',
    })
    textureEntranceLeafs.map.flipY = false    
    textureEntranceLeafs.roughnessMap.flipY = false
    textureEntranceLeafs.roughness = 4
    textureEntranceLeafs.normalMap.flipY = false
    textureEntranceLeafs.lightMap.flipY = false
    textureEntranceLeafs.lightMapIntensity = 3

    
    const textureEntrancePlants = useTexture({
        map: './models/EntrancePlantsDiffuse.jpg',
        lightMap: './models/EntrancePlantsLightMap.jpg',
    })
    textureEntrancePlants.map.flipY = false
    textureEntrancePlants.lightMap.flipY = false
    textureEntrancePlants.lightMapIntensity = 2


    const textureMazeLeafs = useTexture({
        map: './models/EntranceLeafsDiffuse.jpg',
        roughnessMap: './models/EntranceLeafsRoughness.jpg',
        normalMap: './models/EntranceLeafsNormal.jpg',
        lightMap: './models/MazeLeafsLightMap.jpg',
    })
    textureMazeLeafs.map.flipY = false    
    textureMazeLeafs.roughnessMap.flipY = false
    textureMazeLeafs.roughness = 4
    textureMazeLeafs.normalMap.flipY = false
    textureMazeLeafs.lightMap.flipY = false
    textureMazeLeafs.lightMapIntensity = 5


    const textureMazePlants = useTexture({
        map: './models/EntrancePlantsDiffuse.jpg',
        lightMap: './models/MazePlantsLightMap.jpg',
    })
    textureMazePlants.map.flipY = false
    textureMazePlants.lightMap.flipY = false
    textureMazePlants.lightMapIntensity = 4


    const textureMegaLeafs = useTexture({
        map: './models/EntranceLeafsDiffuse.jpg',
        roughnessMap: './models/EntranceLeafsRoughness.jpg',
        normalMap: './models/EntranceLeafsNormal.jpg',
        lightMap: './models/MegaLeafsLightMap.jpg',
    })
    textureMegaLeafs.map.flipY = false    
    textureMegaLeafs.roughnessMap.flipY = false
    textureMegaLeafs.roughness = 4
    textureMegaLeafs.normalMap.flipY = false
    textureMegaLeafs.lightMap.flipY = false
    textureMegaLeafs.lightMapIntensity = 4


    const textureMegaPlants = useTexture({
        map: './models/EntrancePlantsDiffuse.jpg',
        lightMap: './models/MegaPlantsLightMap.jpg',
    })
    textureMegaPlants.map.flipY = false    
    textureMegaPlants.lightMap.flipY = false
    textureMegaPlants.lightMapIntensity = 2


    const textureOpenLeafs = useTexture({
        map: './models/EntranceLeafsDiffuse.jpg',
        roughnessMap: './models/EntranceLeafsRoughness.jpg',
        normalMap: './models/EntranceLeafsNormal.jpg',
        lightMap: './models/OpenLeafsLightMap.jpg',
    })
    textureOpenLeafs.map.flipY = false    
    textureOpenLeafs.roughnessMap.flipY = false
    textureOpenLeafs.roughness = 4
    textureOpenLeafs.normalMap.flipY = false
    textureOpenLeafs.lightMap.flipY = false
    textureOpenLeafs.lightMapIntensity = 4


    const textureOpenPlants = useTexture({
        map: './models/EntrancePlantsDiffuse.jpg',
        lightMap: './models/OpenPlantsLightMap.jpg',
    })
    textureOpenPlants.map.flipY = false    
    textureOpenPlants.lightMap.flipY = false
    textureOpenPlants.lightMapIntensity = 2




    // Metals //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    const textureMetal = useTexture('./models/matcap2.png')
    const textureGold = useTexture('./models/matcapGold.png')



    // Interactions //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    const [audio] = useState(new Audio('./sounds/switch.mp3'));
    audio.volume = 0.08;

    const [isHovered, setIsHovered] = useState(false);
    const [isClicked, setIsClicked] = useState(false);

    // declare a state variable and a function (set) to update that state    
    const [lightMapIntensityArch, setLightMapIntensityArch] = useState(3);
    const [lightMapIntensityEntrance, setLightMapIntensityEntrance] = useState(2);
    const [lightMapIntensityOpen, setLightMapIntensityOpen] = useState(3);
    const [lightMapIntensityTrypo, setLightMapIntensityTrypo] = useState(2);
    const [lightMapIntensityMegaRoom, setLightMapIntensityMegaRoom] = useState(4);
    const [lightMapIntensityMegaFloor, setLightMapIntensityMegaFloor] = useState(4);
    const [lightMapIntensityMegaWalls, setLightMapIntensityMegaWalls] = useState(4);
    const [lightMapIntensityMaze, setLightMapIntensityMaze] = useState(5);
    const [lightMapIntensityLevelsHalls, setLightMapIntensityLevelsHalls] = useState(3);
    const [lightMapIntensityLevelsWalls, setLightMapIntensityLevelsWalls] = useState(3);

    const [lightMapIntensitySmiley, setLightMapIntensitySmiley] = useState(3);
    const [lightMapIntensityChairs2, setLightMapIntensityChairs2] = useState(2);
    const [lightMapIntensityChairs3, setLightMapIntensityChairs3] = useState(1);
    const [lightMapIntensityTable, setLightMapIntensityTable] = useState(10);

    const [lightMapIntensityEntranceLeafs, setLightMapIntensityEntranceLeafs] = useState(3);
    const [lightMapIntensityEntrancePlants, setLightMapIntensityEntrancePlants] = useState(2);
    const [lightMapIntensityMazeLeafs, setLightMapIntensityMazeLeafs] = useState(2);
    const [lightMapIntensityMazePlants, setLightMapIntensityMazePlants] = useState(4);
    const [lightMapIntensityMegaLeafs, setLightMapIntensityMegaLeafs] = useState(4);
    const [lightMapIntensityMegaPlants, setLightMapIntensityMegaPlants] = useState(2);
    const [lightMapIntensityOpenLeafs, setLightMapIntensityOpenLeafs] = useState(4);
    const [lightMapIntensityOpenPlants, setLightMapIntensityOpenPlants] = useState(2);

    const [ArchMetalColor, setArchMetalColor] = useState('#fcc0e5');
    const [OpenMetalColor, setOpenMetalColor] = useState('#dadeb1');
    const [MegaMetalColor, setMegaMetalColor] = useState('#5b65a6');
    const [TrypoMetalColor, setTrypoMetalColor] = useState('#81855d');
    const [BellGoldColor, setBellGoldColor] = useState('#fff4c2');
   
    const [brightness, setBrightness] = useState(-0.01);

 
    const handlePointerOver = () => {
        setIsHovered(true);

    };

    const handlePointerOut = () => {
        setIsHovered(false);    
    };

    const handlePointerDown = () => {
        audio.play();
        setIsClicked(!isClicked);
    };


    // Change lightmaps intensity when clicked
    const getLightMapIntensity = (originalIntensity) => {
        return isClicked ? 0.08 : originalIntensity;
    };

    const getMeshMatcapColor = (originalColor) => {
        return isClicked ? '#5c5c5c' : originalColor; // Change color logic here
    };

    const getBrightness = (originalBrightness) => {
        return isClicked ? -10.0 : originalBrightness; 
    };



    
    useEffect(() => {

        setLightMapIntensityArch(textureArch.lightMapIntensity);
        setLightMapIntensityEntrance(textureEntrance.lightMapIntensity);
        setLightMapIntensityOpen(textureOpen.lightMapIntensity);
        setLightMapIntensityTrypo(textureTrypo.lightMapIntensity);
        setLightMapIntensityMegaRoom(textureMegaRoom.lightMapIntensity);        
        setLightMapIntensityMegaFloor(textureMegaFloor.lightMapIntensity);        
        setLightMapIntensityMegaWalls(textureMegaWalls.lightMapIntensity);        
        setLightMapIntensityMaze(textureMaze.lightMapIntensity);        
        setLightMapIntensityLevelsHalls(textureLevelsHalls.lightMapIntensity);        
        setLightMapIntensityLevelsWalls(textureLevelsWalls.lightMapIntensity);        
        
        setLightMapIntensitySmiley(textureSmileys.lightMapIntensity);
        setLightMapIntensityChairs2(textureChairs2.lightMapIntensity);
        setLightMapIntensityChairs3(textureChairs3.lightMapIntensity);
        setLightMapIntensityTable(textureTable.lightMapIntensity);

        setLightMapIntensityEntranceLeafs(textureEntranceLeafs.lightMapIntensity);
        setLightMapIntensityEntrancePlants(textureEntrancePlants.lightMapIntensity);
        setLightMapIntensityMazeLeafs(textureMazeLeafs.lightMapIntensity);
        setLightMapIntensityMazePlants(textureMazePlants.lightMapIntensity);
        setLightMapIntensityMegaLeafs(textureMegaLeafs.lightMapIntensity);
        setLightMapIntensityMegaPlants(textureMegaPlants.lightMapIntensity);
        setLightMapIntensityOpenLeafs(textureOpenLeafs.lightMapIntensity);
        setLightMapIntensityOpenPlants(textureOpenPlants.lightMapIntensity);

        setArchMetalColor(getMeshMatcapColor('#fcc0e5'));
        setOpenMetalColor(getMeshMatcapColor('#dae3af'));
        setMegaMetalColor(getMeshMatcapColor('#5b65a6'));
        setTrypoMetalColor(getMeshMatcapColor('#81855d'));
        setBellGoldColor(getMeshMatcapColor('#fff4c2'));

        setBrightness(getBrightness(-0.01));

    }, [isHovered, isClicked]);


    const updatedLightMapIntensityArch = getLightMapIntensity(lightMapIntensityArch);
    const updatedLightMapIntensityEntrance = getLightMapIntensity(lightMapIntensityEntrance);
    const updatedLightMapIntensityOpen = getLightMapIntensity(lightMapIntensityOpen);
    const updatedLightMapIntensityTrypo = getLightMapIntensity(lightMapIntensityTrypo);
    const updatedLightMapIntensityMegaRoom = getLightMapIntensity(lightMapIntensityMegaRoom);    
    const updatedLightMapIntensityMegaFloor = getLightMapIntensity(lightMapIntensityMegaFloor);    
    const updatedLightMapIntensityMegaWalls = getLightMapIntensity(lightMapIntensityMegaWalls);    
    const updatedLightMapIntensityMaze = getLightMapIntensity(lightMapIntensityMaze);    
    const updatedLightMapIntensityLevelsHalls = getLightMapIntensity(lightMapIntensityLevelsHalls);    
    const updatedLightMapIntensityLevelsWalls = getLightMapIntensity(lightMapIntensityLevelsWalls);    
    
    const updatedLightMapIntensitySmiley = getLightMapIntensity(lightMapIntensitySmiley);
    const updatedLightMapIntensityChairs2 = getLightMapIntensity(lightMapIntensityChairs2);
    const updatedLightMapIntensityChairs3 = getLightMapIntensity(lightMapIntensityChairs3);
    const updatedLightMapIntensityTable = getLightMapIntensity(lightMapIntensityTable);

    const updatedLightMapIntensityEntranceLeafs = getLightMapIntensity(lightMapIntensityEntranceLeafs);
    const updatedLightMapIntensityEntrancePlants = getLightMapIntensity(lightMapIntensityEntrancePlants);
    const updatedLightMapIntensityMazeLeafs = getLightMapIntensity(lightMapIntensityMazeLeafs);
    const updatedLightMapIntensityMazePlants = getLightMapIntensity(lightMapIntensityMazePlants);
    const updatedLightMapIntensityMegaLeafs = getLightMapIntensity(lightMapIntensityMegaLeafs);
    const updatedLightMapIntensityMegaPlants = getLightMapIntensity(lightMapIntensityMegaPlants);
    const updatedLightMapIntensityOpenLeafs = getLightMapIntensity(lightMapIntensityOpenLeafs);
    const updatedLightMapIntensityOpenPlants = getLightMapIntensity(lightMapIntensityOpenPlants);
       
   const updatedBrightness = getBrightness(brightness);





    return <>

        <RigidBody
            type="fixed"
            colliders="trimesh"
            restitution={0} 
        >
            {/* position={ nodes.archHallway.position} */}

            <mesh geometry={ model.nodes.ArchHallway.geometry }>
                <meshStandardMaterial {...textureArch } lightMapIntensity={updatedLightMapIntensityArch}/>

            </mesh>

            <mesh geometry={ model.nodes.EntranceRoom.geometry }>
                <meshStandardMaterial {...textureEntrance } lightMapIntensity={updatedLightMapIntensityEntrance}/>
            </mesh>

            <mesh geometry={ model.nodes.OpenRoom.geometry }> 
                <meshStandardMaterial {...textureOpen } lightMapIntensity={updatedLightMapIntensityOpen}/>
            </mesh>

            <mesh geometry={ model.nodes.TrypoRoom.geometry }>
                <meshStandardMaterial {...textureTrypo } lightMapIntensity={updatedLightMapIntensityTrypo}/>
            </mesh>

            <mesh geometry={ model.nodes.MegaRoom.geometry }>
                <meshStandardMaterial {...textureMegaRoom } lightMapIntensity={updatedLightMapIntensityMegaRoom}/>
            </mesh>

            <mesh geometry={ model.nodes.MegaWalls.geometry }>
                <meshStandardMaterial {...textureMegaWalls } lightMapIntensity={updatedLightMapIntensityMegaWalls}/>
            </mesh>

            <mesh geometry={ model.nodes.MegaFloor.geometry }>
                <meshStandardMaterial {...textureMegaFloor } lightMapIntensity={updatedLightMapIntensityMegaFloor}/>
            </mesh>

            <mesh geometry={ model.nodes.MazeRoom.geometry }>
                <meshStandardMaterial {...textureMaze } lightMapIntensity={updatedLightMapIntensityMaze}/>
            </mesh>

            <mesh geometry={ model.nodes.LevelsHalls.geometry }>
                <meshStandardMaterial {...textureLevelsHalls } lightMapIntensity={updatedLightMapIntensityLevelsHalls}/>
            </mesh>
            <mesh geometry={ model.nodes.LevelsWalls.geometry }>
                <meshStandardMaterial {...textureLevelsWalls } lightMapIntensity={updatedLightMapIntensityLevelsWalls}/>
            </mesh>



            <mesh geometry={ model.nodes.Smileys.geometry }>
                <meshStandardMaterial {...textureSmileys } lightMapIntensity={updatedLightMapIntensitySmiley}/>
            </mesh>

            <mesh geometry={ model.nodes.Chairs.geometry }>
                <meshStandardMaterial {...textureChairs } />
            </mesh>

            <mesh geometry={ model.nodes.Chairs2.geometry }>
                <meshStandardMaterial {...textureChairs2 } lightMapIntensity={updatedLightMapIntensityChairs2}/>
            </mesh>

            <mesh geometry={ model.nodes.Chairs3.geometry }>
                <meshStandardMaterial {...textureChairs3 } lightMapIntensity={updatedLightMapIntensityChairs3}/>
            </mesh>

            <mesh geometry={ model.nodes.Table.geometry }
                onPointerDown={(e) => handlePointerDown(e, 'Table')}
                onPointerOver={(e) => handlePointerOver(e, 'Table')}
                onPointerOut={(e) => handlePointerOut(e, 'Table')}
             >
                <meshStandardMaterial {...textureTable } lightMapIntensity={updatedLightMapIntensityTable}/>
            </mesh>

            <mesh geometry={ model.nodes.BellGold.geometry }>
                <meshMatcapMaterial matcap={textureGold} color={new THREE.Color(BellGoldColor)}
                />
                <Outlines
                    angle={0}
                    thickness={isHovered ? 0.002 : 0}
                    color={isHovered ? "#a6a897" : null}
                    opacity={isHovered ? 0.1 : 0}
                />
            </mesh>

            <mesh geometry={ model.nodes.Riddle.geometry }>
                <meshBasicMaterial color={0x000000}/>
            </mesh>





            <mesh geometry={ model.nodes.EntranceLeafs.geometry }>
                <meshStandardMaterial {...textureEntranceLeafs } lightMapIntensity={updatedLightMapIntensityEntranceLeafs}/>
            </mesh>
            
            <mesh geometry={ model.nodes.EntrancePlants.geometry }>
                <meshStandardMaterial {...textureEntrancePlants } lightMapIntensity={updatedLightMapIntensityEntrancePlants}/>
            </mesh>

            <mesh geometry={ model.nodes.MazeLeafs.geometry }>
                <meshStandardMaterial {...textureMazeLeafs } lightMapIntensity={updatedLightMapIntensityMazeLeafs}/>
            </mesh>

            <mesh geometry={ model.nodes.MazePlants.geometry }>
                <meshStandardMaterial {...textureMazePlants } lightMapIntensity={updatedLightMapIntensityMazePlants}/>
            </mesh>

            <mesh geometry={ model.nodes.MegaLeafs.geometry }>
                <meshStandardMaterial {...textureMegaLeafs } lightMapIntensity={updatedLightMapIntensityMegaLeafs}/>
            </mesh>

            <mesh geometry={ model.nodes.MegaPlants.geometry }>
                <meshStandardMaterial {...textureMegaPlants } lightMapIntensity={updatedLightMapIntensityMegaPlants}/>
            </mesh>

            <mesh geometry={ model.nodes.LevelsPlants.geometry }>
                <meshStandardMaterial/>
            </mesh>

            <mesh geometry={ model.nodes.OpenLeafs.geometry }>
                <meshStandardMaterial {...textureOpenLeafs } lightMapIntensity={updatedLightMapIntensityOpenLeafs}/>
            </mesh>

            <mesh geometry={ model.nodes.OpenPlants.geometry }>
                <meshStandardMaterial {...textureOpenPlants } lightMapIntensity={updatedLightMapIntensityOpenPlants}/>
            </mesh>
            



            <mesh geometry={ model.nodes.ArchHallwayMetal.geometry }>
                {/* <meshMatcapMaterial matcap={textureMetal} color={new THREE.Color('#fcc0e5')}/> */}
                <meshMatcapMaterial matcap={textureMetal} color={new THREE.Color(ArchMetalColor)}/>
            </mesh>

            <mesh geometry={ model.nodes.OpenMetal.geometry }>
                <meshMatcapMaterial matcap={textureMetal} color={new THREE.Color(OpenMetalColor)}/>
            </mesh>

            <mesh geometry={ model.nodes.MegaMetal.geometry }>
                <meshMatcapMaterial matcap={textureMetal} color={new THREE.Color(MegaMetalColor)}/>
            </mesh>

            <mesh geometry={ model.nodes.TrypoMetal.geometry }>
                <meshMatcapMaterial matcap={textureMetal} color={new THREE.Color(TrypoMetalColor)}/>
            </mesh>




            <mesh geometry={ model.nodes.OpenLight.geometry }>
                <meshBasicMaterial color={isClicked ? "#484a40": "#d1d6b4"}/>
            </mesh>

            <mesh geometry={ model.nodes.EntranceLight.geometry }>
                <meshBasicMaterial color={isClicked ? "#403f3d" : "#e9ebdf"}/>
            </mesh>

            <mesh geometry={ model.nodes.ArchLamp1.geometry }>
                <meshBasicMaterial color={isClicked ? "#211c1e" : "#dbc5ce"}/>
            </mesh>
            <mesh geometry={ model.nodes.ArchLamp2.geometry }>
                <meshBasicMaterial color={isClicked ? "#211c1e" : "#a6929a"}/>
            </mesh>
            <mesh geometry={ model.nodes.ArchLamp3.geometry }>
                <meshBasicMaterial color={isClicked ? "#211c1e" : "#91848d"}/>
            </mesh>
            <mesh geometry={ model.nodes.ArchLamp4.geometry }>
                <meshBasicMaterial color={isClicked ? "#211c1e" : "#695960"}/>
            </mesh>

            <mesh geometry={ model.nodes.MazeLight.geometry }>
                <meshBasicMaterial color={isClicked ? "#211c1e" : "#f2f2f2"}/>
            </mesh>

            <mesh geometry={ model.nodes.MegaLight.geometry }>
                <meshBasicMaterial color={isClicked ? "#15171a" : "#b4bdcf"}/>
            </mesh>

            <mesh geometry={ model.nodes.TrypoLight.geometry }>
                <meshBasicMaterial color={isClicked ? "#241e21" : "#bda7a6"}/>
            </mesh>



            <CustomMatcapMesh
                matcapUrl="./models/matcap2b.png"
                normalUrl="./models/WaterNormal2.jpg"
                geometry={model.nodes.EntranceWater.geometry}
                opacity={0.80}
                saturation={2.1}
                brightness={updatedBrightness}
            />

            <CustomMatcapMesh
                matcapUrl="./models/matcap2b.png"
                normalUrl="./models/WaterNormal2.jpg"
                geometry={model.nodes.OpenWater.geometry}
                opacity={0.87}
                saturation={1.2}
                brightness={-0.04}
            />

            <CustomMatcapMesh
                matcapUrl="./models/matcap2d.png"
                normalUrl="./models/WaterNormal2.jpg"
                geometry={model.nodes.TrypoWater.geometry}
                opacity={0.7}
                saturation={2.5}
                brightness={-0.12}
            />

            <mesh geometry={ model.nodes.Collider.geometry }>
                <meshBasicMaterial transparent opacity={0}/>
            </mesh>


        </RigidBody>
    </>
}

useGLTF.preload('./models/WNDR2.glb')
