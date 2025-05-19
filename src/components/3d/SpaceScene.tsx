import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import * as THREE from 'three';

const SpaceScene: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
    }
  });
  
  return (
    <>
      {/* Ambient light for general illumination */}
      <ambientLight intensity={0.2} />
      
      {/* Directional light for shadows and highlights */}
      <directionalLight 
        position={[5, 5, 5]} 
        intensity={0.5} 
        color="#8b5cf6" 
      />
      
      {/* Point light for accent lighting */}
      <pointLight 
        position={[-5, 2, -10]} 
        intensity={0.5} 
        color="#0ea5e9" 
      />
      
      {/* Rotating group of particles */}
      <group ref={groupRef}>
        <ParticleField />
      </group>
      
      {/* Background stars */}
      <Stars 
        radius={100} 
        depth={50} 
        count={5000} 
        factor={4} 
        saturation={0} 
        fade
        speed={1}
      />
    </>
  );
};

// Custom particle field
const ParticleField: React.FC = () => {
  const particlesRef = useRef<THREE.Points>(null);
  
  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.x = state.clock.getElapsedTime() * 0.03;
      particlesRef.current.rotation.z = state.clock.getElapsedTime() * 0.02;
    }
  });
  
  // Create particles
  const particleCount = 500;
  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);
  const sizes = new Float32Array(particleCount);
  
  // Fill arrays with random values
  for (let i = 0; i < particleCount; i++) {
    const i3 = i * 3;
    
    // Positions - create a spherical distribution
    const radius = 15 + Math.random() * 10;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    
    positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
    positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
    positions[i3 + 2] = radius * Math.cos(phi);
    
    // Colors - gradient between primary and secondary
    const mixFactor = Math.random();
    colors[i3] = 0.05 + 0.95 * mixFactor;  // R component (primary blue to secondary purple)
    colors[i3 + 1] = 0.36 * (1 - mixFactor) + 0.36 * mixFactor;  // G component
    colors[i3 + 2] = 0.91 * (1 - mixFactor) + 0.96 * mixFactor;  // B component
    
    // Random sizes
    sizes[i] = Math.random() * 0.5 + 0.1;
  }
  
  // Create geometry and material
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
  
  const material = new THREE.ShaderMaterial({
    uniforms: {
      time: { value: 0 },
    },
    vertexShader: `
      attribute float size;
      attribute vec3 color;
      varying vec3 vColor;
      uniform float time;
      
      void main() {
        vColor = color;
        
        // Animated size pulsing
        float pulse = sin(time + position.x * 0.5) * 0.5 + 0.5;
        
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        gl_PointSize = size * (300.0 / -mvPosition.z) * (0.5 + 0.5 * pulse);
        gl_Position = projectionMatrix * mvPosition;
      }
    `,
    fragmentShader: `
      varying vec3 vColor;
      
      void main() {
        // Create a circular point
        vec2 xy = gl_PointCoord.xy - vec2(0.5);
        float radius = length(xy);
        
        if (radius > 0.5) discard;
        
        // Soften the edge
        float alpha = smoothstep(0.5, 0.4, radius);
        
        gl_FragColor = vec4(vColor, alpha);
      }
    `,
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  });
  
  // Update the time uniform
  useFrame(({ clock }) => {
    if (material) {
      material.uniforms.time.value = clock.getElapsedTime();
    }
  });
  
  return (
    <points ref={particlesRef} geometry={geometry} material={material} />
  );
};

export default SpaceScene;
