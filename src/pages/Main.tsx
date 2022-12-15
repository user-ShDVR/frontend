import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import svg from './map1.svg'
import * as THREE from "three";
import { Suspense, useState, useRef, useEffect, useLayoutEffect, useMemo } from 'react'
import { SVGLoader } from 'three-stdlib'
import { MapControls } from '@react-three/drei'
import './main.css';
import {
  Canvas,
  extend,
  ReactThreeFiber,
  useFrame,
  useThree,
  useLoader,
} from "@react-three/fiber";
import Loader from "./Loader";




const Main = () => {

  function Cell({ color, shape, fillOpacity }: any) {
    const [hovered, hover] = useState(false)
    
    return (
      <mesh onPointerOver={(e) => hover(true)} onPointerOut={() => hover(false)}>
        <meshBasicMaterial color={color} opacity={fillOpacity} depthWrite={false} transparent />
        <shapeBufferGeometry args={[shape]} />
      </mesh>
    )
  }

  function Svg() {
    const { paths }: any = useLoader(SVGLoader, svg)
    const shapes = useMemo(
      () => paths.flatMap((p:any) => p.toShapes(true).map((shape: any) => ({ shape, color: p.color, fillOpacity: p.userData.style.fillOpacity }))),
      [paths]
    )
  
    const ref = useRef<any>()
    useLayoutEffect(() => {
      const sphere = new THREE.Box3().setFromObject(ref.current).getBoundingSphere(new THREE.Sphere())
      ref.current.position.set(-sphere.center.x, -sphere.center.y, 0)
    }, [])
  
    return (
      <group ref={ref}>
        {shapes.map((props:any, index:any) => (
          <Cell key={props.shape.uuid} {...props} />
        ))}
      </group>
    )
  }
  
  return (
  //   <Container className="root"  sx={{ py: 12 }} component="main" maxWidth="lg">
  //     <CssBaseline />
  //     <Canvas style={{
  //   height: "74vh",
  //   width: "100%",
  // }} >
  //     <Svg />
  //     <MapControls enableRotate={false} />
  //   </Canvas>
  //   213123
  //   </Container>
  <Loader/>
  );
};

export default Main;
