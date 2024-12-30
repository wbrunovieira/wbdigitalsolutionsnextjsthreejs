import { Instances } from '@react-three/drei'
import { useThree, useFrame } from '@react-three/fiber'
import { useControls } from 'leva'
import { useRef, useState, useMemo, useEffect } from 'react'
import { Cube } from './Cube'
import { easing } from 'maath'
import * as THREE from 'three'

/**
 * Cubes Component
 * 
 * This component creates a group of interactive cubes within a Three.js scene.
 * The cubes react to mouse movements and clicks, providing a dynamic visual experience.
 * 
 * Dependencies:
 * - THREE: The core three.js library for 3D rendering.
 * - useRef, useMemo, useState, useEffect: React hooks for managing component state and lifecycle.
 * - useThree, useFrame: Hooks from @react-three/fiber for accessing the Three.js context and rendering loop.
 * - useControls: A hook from 'leva' for creating UI controls.
 * - easing: A utility from 'maath' for smooth animations.
 * 
 * Props:
 * - gap: The gap between the cubes.
 * - stride: The number of cubes along each axis.
 * - displacement: The maximum displacement of the cubes from their original positions.
 * - intensity: The intensity of the cube movements.
 * 
 * Functionality:
 * - Creates a grid of cubes with customizable gap and stride.
 * - Uses raycasting to determine the mouse position in 3D space and updates the cubes' positions accordingly.
 * - Animates the cubes based on mouse movements and clicks.
 * - Provides a Leva control for adjusting the explosion duration.
 * 
 * Usage:
 * - This component is used within a Three.js scene to create an interactive 3D experience with cubes.
 * - It can be combined with other components to create complex 3D visualizations.
 */
function Cubes({ gap = 0.1, stride = 4, displacement = 3, intensity = 1 }) {
  const [hovered, setHovered] = useState(false) // State to track if the cubes are hovered
  const cursor = new THREE.Vector3() // Vector to store the cursor position in 3D space
  const oPos = new THREE.Vector3() // Vector to store the original position of each cube
  const vec = new THREE.Vector3() // Vector for temporary calculations
  const dir = new THREE.Vector3() // Vector to store the direction from the camera to the cursor
  const ref = useRef<any>(null) // Reference to the group of cubes
  
  const [clicked, setClicked] = useState(false) // State to track if the cubes have been clicked
  const { camera } = useThree() // Access the camera from the Three.js context
  camera.lookAt(0,0,0) // Make the camera look at the origin (0,0,0)
  camera.updateProjectionMatrix() // Update the camera's projection matrix
  const { explosionDuration } = useControls({
    explosionDuration: { value: .2, min: 0.1, max: 5.0, step: 0.1 }
  }) // Leva control for explosion duration, allowing the user to adjust it via UI
  
  // Memoize the positions of the cubes to avoid recalculating on every render
  const positions = useMemo(() => {
    const temp = []
    const center = stride / 2 - stride * gap + gap // Calculate the center offset based on the stride and gap
    for (let x = 0; x < stride; x++)
    for (let y = 0; y < stride; y++)
      for (let z = 0; z < stride; z++) temp.push([x + x * gap - center, y + y * gap - center, z + z * gap - center])
    return temp
  }, [stride, gap])
  
  // Effect to handle click events and set the clicked state
  useEffect(() => {
    const handleClick = () => {
    setClicked(true)
    }
    window.addEventListener('click', handleClick) // Add event listener for click events
    return () => window.removeEventListener('click', handleClick) // Cleanup event listener on component unmount
  }, [])
  
  // useFrame hook to update the cubes' positions and colors on each frame
  useFrame(({ pointer, camera, clock }, delta) => {
    cursor.set(pointer.x, pointer.y, 0.5).unproject(camera) // Set the cursor position based on the pointer position
    dir.copy(cursor).sub(camera.position).normalize() // Calculate the direction from the camera to the cursor
    cursor.add(dir.multiplyScalar(camera.position.length())) // Move the cursor along the direction vector
    let count = 0
    for (let child of ref.current.children) { // Loop through each child (cube) in the group
    const p = positions[count++]; // Get the original position of the current cube
    oPos.set(p[0], p[1], p[2]);
    dir.copy(oPos).sub(cursor).normalize() // Calculate the direction from the original position to the cursor
    const dist = oPos.distanceTo(cursor) // Calculate the distance from the original position to the cursor
    const distInv = displacement - dist // Calculate the inverse distance for displacement
    const col = Math.max(10.5, distInv) / 3.5 // Calculate the color intensity based on the distance
    const mov = 1 + Math.sin(clock.elapsedTime * 2 + 1000 * count) // Calculate the movement factor based on time and count
  
    if (clicked) {
      easing.damp3(child.position, vec.copy(child.position).multiplyScalar(1.5), .3, delta * 6) // If clicked, use the explosionDuration from Leva to control the speed
    } else {
      easing.dampC(child.color, dist > displacement * 1.1 ? 'white' : [col / 2, col * 2, col * 4], 0.1, delta) // Smoothly interpolate the color of the cube based on the distance
      easing.damp3(
      child.position,
      dist > displacement ? oPos : vec.copy(oPos).add(dir.multiplyScalar(distInv * intensity + mov / 4)),
      0.2,
      delta
      ) // Smoothly interpolate the position of the cube based on the distance and movement factor
    }
    }
  })
  
  return (
    <Instances
    onPointerEnter={() => setHovered(true)} // Set hovered state to true on pointer enter
    onPointerLeave={() => setHovered(false)} // Set hovered state to false on pointer leave
    key={stride} limit={stride * stride * stride} frames={Infinity} ref={ref}>
    <roundedBoxGeometry args={[1, 1, 1, 2, 0.15]} /> {/* Geometry for the cubes with rounded edges */}
    <meshLambertMaterial emissive={0x0066FF} color={0x00001c} emissiveIntensity={4} transparent /> {/* Material for the cubes */}
    {Array.from({ length: stride * stride * stride }, (v, n) => (
      <Cube key={n} parent={ref} position={positions[n]} index={n} /> 
      // {/* Create an instance for each cube with the calculated positions */}
    ))}
    </Instances>
  )
  }
   
  export { Cubes }
