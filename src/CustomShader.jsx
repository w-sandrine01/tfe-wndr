import React, { useRef, useMemo, useEffect } from "react";
import { extend, useLoader, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { TextureLoader } from "three";



function CustomMatcapMaterial({ matcapTexture, normalTexture, opacity, saturation, brightness }) {
  const materialRef = useRef();

  useFrame(() => {
      materialRef.current.uniforms.brightness.value = brightness;
  });

  
  const uniforms = useMemo(() => ({
    matcap: { value: matcapTexture },
    normalMap: { value: normalTexture },
    normalScale: { value: new THREE.Vector2(10, 5) },
    time: { value: 0 },
    opacity: { value: opacity },
    saturation: { value: saturation },
    brightness: { value: brightness } 

  }), [matcapTexture, normalTexture, opacity, saturation, brightness]);

  const vertexShader = `
    varying vec2 vUv;
    varying vec3 vNormal;
    uniform float time;

    void main() {
      vUv = uv;
      vNormal = normalize(normalMatrix * normal);
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;

  const fragmentShader = `
    uniform sampler2D matcap;
    uniform sampler2D normalMap;
    uniform vec2 normalScale;
    uniform float opacity;
    uniform float saturation;
    uniform float brightness;
    varying vec2 vUv;
    varying vec3 vNormal;

    void main() {
      vec3 normalTex = texture2D(normalMap, vUv).xyz * 1.4 - 1.0;
      normalTex.xy *= normalScale;
      normalTex = normalize(normalTex);

      vec3 normal = normalize(vNormal + normalTex);
      vec3 viewDir = normalize(-vNormal);
      vec3 reflectDir = reflect(viewDir, normal);
      float m = 2.82842712474619 * sqrt(reflectDir.z + 1.0);
      vec2 matcapUV = reflectDir.xy / m + 0.5;
      vec3 baseColor = texture2D(matcap, matcapUV).rgb;

      // Convert to grayscale
      float average = (baseColor.r + baseColor.g + baseColor.b) / 3.0;
  
      // Mix grayscale with original color based on saturation
      baseColor = mix(vec3(average), baseColor, saturation);

      baseColor += brightness;

      gl_FragColor = vec4(baseColor, opacity);
    }
  `;


  return (
    <shaderMaterial
      ref={materialRef}
      attach="material"
      uniforms={uniforms}
      vertexShader={vertexShader}
      fragmentShader={fragmentShader}
      transparent={true}
    />
  );
}

function CustomMatcapMesh({ matcapUrl, normalUrl, geometry, opacity, saturation, brightness }) {
  const matcapTexture = useLoader(TextureLoader, matcapUrl);
  const normalTexture = useLoader(TextureLoader, normalUrl);

  return (
    <mesh geometry={geometry}>
      <CustomMatcapMaterial 
        matcapTexture={matcapTexture} 
        normalTexture={normalTexture} 
        opacity={opacity} 
        saturation={saturation} 
        brightness={brightness} 
      />
    </mesh>
  );
}

export default CustomMatcapMesh;



