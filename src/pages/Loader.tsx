/* @ts-ignore */
import * as THREE from "three";
import photo from "../photo.jpg";
import photo1 from "../asssets/1.jpg";
import photo2 from "../asssets/2.jpg";
import photo3 from "../asssets/3.jpg";
import photo4 from "../asssets/4.jpg";
import photo5 from "../asssets/5.jpg";
import photo6 from "../asssets/6.jpg";
import photo7 from "../asssets/7.jpg";
import photo8 from "../asssets/8.jpg";
import photo9 from "../asssets/9.jpg";
import photo10 from "../asssets/10.jpg";
import React, { Suspense, useEffect, useRef, useState } from "react";

import {
  Canvas,
  extend,
  ReactThreeFiber,
  useFrame,
  useThree,
  useLoader,
} from "@react-three/fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
extend({ OrbitControls });
declare global {
  namespace JSX {
    interface IntrinsicElements {
      orbitControls: ReactThreeFiber.Object3DNode<
        OrbitControls,
        typeof OrbitControls
      >;
    }
  }
}
interface IScreen {
  height: string;
  width: string;
}
interface IUrlProps {
  url: any;
}

const objects: Array<{
  id: number;
  title: string;
  src: any;
}> = [
  {
    id: 1,
    title: "Объект 1",
    src: photo1,
  },
  {
    id: 2,
    title: "Объект 2",
    src: photo2,
  },
  {
    id: 3,
    title: "Объект 3",
    src: photo3,
  },
  {
    id: 4,
    title: "Объект 4",
    src: photo4,
  },
  {
    id: 5,
    title: "Объект 5",
    src: photo5,
  },
];

const Loader = () => {
  const [activeSlide, setActiveSlide] = useState(0);
	
	useEffect(() => {
		console.log(activeSlide)
	  }, [activeSlide])
  const [fullscreen, setFullscreen] = useState<IScreen>({
    height: "74vh",
    width: "100%",
  });

  function Arrow() {
    return (
      <mesh
        position={new THREE.Vector3(0, -0.7, 1)}
        rotation={new THREE.Euler(Math.PI / 2, 0, 0)}
        onClick={(e) => setActiveSlide(objects.length ==  activeSlide ? 0 : activeSlide + 1)}
      >
        <boxGeometry args={[0.1, 0.1, 0.1]} />
		<meshStandardMaterial color='white' />
      </mesh>
    );
  }
  function Controls(props: any) {
    const { camera, gl } = useThree();
    const refF = useRef<OrbitControls>(null!);
    useFrame(() => refF.current.update());
    return (
      <orbitControls
        ref={refF}
        target={[0, 0, 0]}
        {...props}
        args={[camera, gl.domElement]}
      />
    );
  }

  function Dome({ url }: IUrlProps) {
    const texture = useLoader(THREE.TextureLoader, `${url}`);
    const mesh = useRef<THREE.Mesh>(null!);
    return (
      <mesh>
        <sphereBufferGeometry attach="geometry" args={[500, 60, 40]} />
        <meshBasicMaterial
          attach="material"
          map={texture}
          side={THREE.BackSide}
        />
      </mesh>
    );
  }
  return (
	<div>
		<h1>{objects[activeSlide].title}</h1>
    <Canvas style={fullscreen} camera={{ position: [0, 0, 0.1] }}>
      <Controls
        enableZoom={false}
        enablePan={false}
        enableDamping
        dampingFactor={0.2}
      />
      <Suspense fallback={null}>
        <Dome url={[`${objects[activeSlide].src}`]} />
        {/* <Arrow /> */}
      </Suspense>
    </Canvas>
	<button onClick={()=>setActiveSlide(activeSlide - 1)}>←</button>
	<button onClick={()=>setActiveSlide(activeSlide + 1)}>→</button>
	</div>

  );
};

export default Loader;
