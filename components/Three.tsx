import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import {
  Color,
  DoubleSide,
  MeshPhysicalMaterial,
  PerspectiveCamera,
  Vector3,
} from "three";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { Flex } from "@chakra-ui/react";
import { GUI } from "dat.gui";
import TWEEN from "@tweenjs/tween.js";

const Three = forwardRef((props, ref) => {
  const camera = useRef<PerspectiveCamera>();
  const control = useRef<OrbitControls>();
  //GLTF
  const logo = useRef<THREE.Group | undefined>();
  const clouds = useRef<THREE.Mesh[]>([]);

  //requestAnimationFrame
  const stop = useRef<number>(0);

  //Event Variable
  const initWidth = useRef<number | undefined>(0);
  const scaleSize = useRef<number>(0);
  const logoScaleSize = useRef(5);
  const rotateAxis = useRef(new Vector3(1, 1, 0));
  const throttleFlag = useRef(true);

  useEffect(() => {
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    const three = document.querySelector(".three");
    const threeWidth = three?.clientWidth ?? 0;
    const threeHeight = three?.clientHeight ?? 0;
    initWidth.current = three?.clientWidth;
    scaleSize.current = threeWidth / threeHeight;

    const scene = new THREE.Scene();

    camera.current = new THREE.PerspectiveCamera(
      60,
      threeWidth / threeHeight,
      0.1,
      100
    );
    control.current = new OrbitControls(camera.current, renderer.domElement);

    function init3D() {
      if (
        typeof camera.current === "undefined" ||
        typeof control.current === "undefined"
      ) {
        return;
      }

      //camera.current
      camera.current.position.y = 5;
      camera.current.position.z = 20;
      control.current.target.set(-5, 5, 0);

      //light

      function createSpotlight(color: THREE.ColorRepresentation) {
        const newObj = new THREE.SpotLight(color, 5);
        newObj.castShadow = true;
        newObj.angle = 0.5;
        newObj.penumbra = 0.2;
        newObj.decay = 1;
        newObj.distance = 50;
        return newObj;
      }

      const spotLight1 = createSpotlight(0x0000aa);
      spotLight1.position.set(-10, 30, 0);
      scene.add(spotLight1);
      const lightHelper1 = new THREE.SpotLightHelper(spotLight1);
      // scene.add(lightHelper1);
      const spotLight2 = createSpotlight(0xaa0033);
      spotLight2.position.set(10, 30, 0);
      scene.add(spotLight2);
      const lightHelper2 = new THREE.SpotLightHelper(spotLight2);
      // scene.add(lightHelper2);

      const width = 50;
      const height = 50;
      const intensity = 2;
      const rectLight = new THREE.RectAreaLight(
        0xeeeeff,
        intensity,
        width,
        height
      );
      rectLight.position.set(0, -1, 0);
      rectLight.lookAt(0, 10, 0);
      scene.add(rectLight);

      // const rectLightHelper = new RectAreaLightHelper( rectLight );
      // rectLight.add( rectLightHelper );

      //renderer
      renderer.setSize(threeWidth, threeHeight);
      renderer.setClearColor(0x000000, 1);
      // renderer.setClearColor( 0x000000, 0);
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      renderer.outputEncoding = THREE.sRGBEncoding;

      document.querySelector(".three")!.appendChild(renderer.domElement);

      // control.current
      control.current.enabled = false;
      control.current.enableRotate = true;
      control.current.enableZoom = false;
      control.current.enableDamping = true;
      control.current.dampingFactor = 0.2;
      // control.current.minPolarAngle = Math.PI / 3;
      // control.current.maxPolarAngle = Math.PI / 3;

      const crystalLoader = new GLTFLoader();
      crystalLoader.load("/logo.glb", async function (gltf) {
        gltf.scene.position.set(1, 5, 0);
        gltf.scene.rotation.y = 0;
        // gltf.scene.rotation.x = 0.5 * Math.PI;
        gltf.scene.rotation.z = -0.25 * Math.PI;
        const logoSize = 0.6;
        gltf.scene.scale.set(
          scaleSize.current * logoSize,
          scaleSize.current * logoSize,
          scaleSize.current * logoSize
        );
        gltf.scene.castShadow = true;
        gltf.scene.receiveShadow = true;

        // const dat = await import('dat.gui')
        // const gui = new dat.GUI()

        let i = 0;
        gltf.scene.traverse((child) => {
          if ((child as THREE.Mesh).material !== undefined) {
            // ((child as THREE.Mesh).material as THREE.MeshPhysicalMaterial).color = new THREE.Color(0xff0000)
            child.castShadow = true;
            child.receiveShadow = true;
            // ((child as THREE.Mesh).material as THREE.MeshPhysicalMaterial).ior = 2;
            // ((child as THREE.Mesh).material as THREE.MeshPhysicalMaterial).transmission = 1;
            // ((child as THREE.Mesh).material as THREE.MeshPhysicalMaterial).metalness = 0;
            (
              (child as THREE.Mesh).material as THREE.MeshPhysicalMaterial
            ).roughness = 1;
            // ((child as THREE.Mesh).material as THREE.MeshPhysicalMaterial).thickness = 0;
            // ((child as THREE.Mesh).material as THREE.MeshPhysicalMaterial).opacity = 0.1;
            if (i === 0) {
              (
                (child as THREE.Mesh).material as THREE.MeshPhysicalMaterial
              ).emissive = new THREE.Color(0x003366);
            } else {
              (
                (child as THREE.Mesh).material as THREE.MeshPhysicalMaterial
              ).emissive = new THREE.Color(0x33aabb);
            }
            (
              (child as THREE.Mesh).material as THREE.MeshPhysicalMaterial
            ).emissiveIntensity = 1;

            // console.log(child)
            // guiMeshPhysicalMaterial(gui, (child as THREE.Mesh).material as THREE.MeshPhysicalMaterial)
            i++;
          }
        });

        // const pmremGenerator = new THREE.PMREMGenerator(renderer);
        // pmremGenerator.compileEquirectangularShader();
        // new THREE.TextureLoader().load("/crystal-texture.svg", function(texture){
        //     var cubeMap = pmremGenerator.fromEquirectangular(texture);
        //     const newEnvMap = cubeMap.texture;

        //     gltf.scene.traverse(function(child){
        //         for(var i = 0; i < child.children.length; i++){
        //             ((child.children[i] as THREE.Mesh).material as THREE.MeshStandardMaterial).envMap = newEnvMap;
        //             ((child.children[i] as THREE.Mesh).material as THREE.MeshStandardMaterial).envMapIntensity = 1;
        //             ((child.children[i] as THREE.Mesh).material as THREE.MeshStandardMaterial).opacity = 1;
        //             ((child.children[i] as THREE.Mesh).material as THREE.MeshStandardMaterial).needsUpdate = true;
        //         }
        //     });

        //     texture.dispose();
        // })
        logo.current = gltf.scene;

        scene.add(gltf.scene);
      });
    }

    function createComposer() {
      if (typeof camera.current === "undefined") {
        return;
      }
      var renderScene = new RenderPass(scene, camera.current);
      //Bloom通道创建
      var bloomPass = new UnrealBloomPass(
        new THREE.Vector2(threeWidth, threeHeight),
        0.3,
        0.4,
        0.85
      );
      bloomPass.renderToScreen = true;
      bloomPass.threshold = 0;
      bloomPass.strength = 1.5;
      bloomPass.radius = 0;

      const composer = new EffectComposer(renderer);
      composer.setSize(threeWidth, threeHeight);
      composer.addPass(renderScene);
      composer.addPass(bloomPass);

      return composer;
    }

    const addFloor = () => {
      const geometry = new THREE.BoxGeometry(100, 0.1, 100);
      const material = new THREE.MeshStandardMaterial({
        color: 0x000000,
        roughness: 1,
        metalness: 0,
        side: DoubleSide,
        // transparent: true,
        // opacity: 0.2
      });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(0, 0, 0);
      mesh.receiveShadow = true;
      scene.add(mesh);
    };

    const addDisplayBox = () => {
      const geometry = new THREE.CylinderGeometry(5, 5, 0.3, 50, 10);
      const material = new THREE.MeshStandardMaterial({
        color: 0x000000,
        roughness: 1,
        metalness: 0,
        // transparent: true,
        // opacity: 0.2
      });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(0, 0.5, 0);
      mesh.receiveShadow = true;
      scene.add(mesh);
    };

    const composer = createComposer();
    let clock = new THREE.Clock();
    let delta = 0;
    function animation(time: number) {
      if (
        typeof camera.current === "undefined" ||
        typeof control.current === "undefined"
      ) {
        return;
      }
      TWEEN.update(time);
      delta = clock.getDelta();
      renderer.render(scene, camera.current);
      control.current.update();
      onWindowResize();
      if (logo.current) {
        logo.current.rotateOnWorldAxis(rotateAxis.current, 0.002);
      }

      if (stop.current === 1) {
        return;
      } else {
        requestAnimationFrame(animation);
      }
    }

    init3D();
    requestAnimationFrame(animation);
    addFloor();
    addDisplayBox();

    function onWindowResize() {
      if (
        typeof camera.current === "undefined" ||
        typeof control.current === "undefined"
      ) {
        return;
      }
      if (scaleSize.current !== window.innerWidth / window.innerHeight) {
        scaleSize.current = window.innerWidth / window.innerHeight;
        camera.current.aspect = window.innerWidth / window.innerHeight;
        camera.current.updateProjectionMatrix();

        renderer.setSize(window.innerWidth, window.innerHeight);
        // logo.current?.scale.set(
        //   scaleSize.current * logoScaleSize.current,
        //   scaleSize.current * logoScaleSize.current,
        //   scaleSize.current * logoScaleSize.current
        // );
      }
    }

    stop.current = 0;

    function handleColorChange(color: Color) {
      return function (value: Number) {
        // console.log(value)
        // value = value.replace( '#', '0x' );
        color.setHex(Number(value));
        color.convertLinearToSRGB();
      };
    }


    function guiMeshPhysicalMaterial(gui: GUI, material: MeshPhysicalMaterial) {
      const data = {
        color: material.color.getHex(),
        emissive: material.emissive.getHex(),
      };
      console.log(data);

      const folder = gui.addFolder(material.uuid);

      folder
        .addColor(data, "color")
        .onChange(handleColorChange(material.color));
      folder
        .addColor(data, "emissive")
        .onChange(handleColorChange(material.emissive));
      // folder.addColor( data, 'specularColor' ).onChange( handleColorChange( material.specularColor ) );

      // folder.add( material, 'specularIntensity', 0, 1 );
      folder.add(material, "roughness", 0, 1);
      folder.add(material, "metalness", 0, 1);
      folder.add(material, "metalness", 0, 1);
      folder.add(material, "metalness", 0, 1);
      folder.add(material, "metalness", 0, 1);
      folder.add(material, "reflectivity", 0, 1);
      folder.add(material, "clearcoat", 0, 1).step(0.01);
      folder.add(material, "clearcoatRoughness", 0, 1).step(0.01);

      // TODO metalnessMap
    }

    return () => {
      stop.current = 1;
      while (scene.children.length > 0) {
        scene.remove(scene.children[0]);
      }
    };
  }, []);

  function onRequest() {
    if (
      typeof camera.current === "undefined" ||
      typeof control.current === "undefined"
    ) {
      return;
    }
    const cp = {
      x: camera.current.position.x,
      y: camera.current.position.y,
      z: camera.current.position.z,
    };
    const ct1 = new TWEEN.Tween(cp)
      .to({ x: -20, y: 15, z: 5 }, 3000)
      .easing(TWEEN.Easing.Quadratic.InOut)
      .delay(1000)
      .onUpdate(() => {
        if (typeof camera.current === "undefined") {
          return;
        }
        camera.current.position.set(cp.x, cp.y, cp.z);
      });
    ct1.start();

    const ctp = {
      x: control.current.target.x,
      y: control.current.target.y,
      z: control.current.target.z,
    };
    const ctt1 = new TWEEN.Tween(ctp)
      .to({ x: 0, y: 5, z: -5 }, 3000)
      .easing(TWEEN.Easing.Quadratic.InOut)
      .delay(1000)
      .onUpdate(() => {
        if (typeof control.current === "undefined") {
          return;
        }
        control.current.target.set(ctp.x, ctp.y, ctp.z);
      });
    ctt1.start();
  }

  function onAudit() {
    if (
      typeof camera.current === "undefined" ||
      typeof control.current === "undefined"
    ) {
      return;
    }
    const cp = {
      x: camera.current.position.x,
      y: camera.current.position.y,
      z: camera.current.position.z,
    };
    const ct1 = new TWEEN.Tween(cp)
      .to({ x: 0, y: 1, z: 15 }, 3000)
      .easing(TWEEN.Easing.Quadratic.InOut)
      .delay(1000)
      .onUpdate(() => {
        if (typeof camera.current === "undefined") {
          return;
        }
        camera.current.position.set(cp.x, cp.y, cp.z);
      });
    ct1.start();

    const ctp = {
      x: control.current.target.x,
      y: control.current.target.y,
      z: control.current.target.z,
    };
    const ctt1 = new TWEEN.Tween(ctp)
      .to({ x: 0, y: 3, z: 3 }, 3000)
      .easing(TWEEN.Easing.Quadratic.InOut)
      .delay(1000)
      .onUpdate(() => {
        if (typeof control.current === "undefined") {
          return;
        }
        control.current.target.set(ctp.x, ctp.y, ctp.z);
      });
    ctt1.start();
  }

  function onMain() {
    if (
      typeof camera.current === "undefined" ||
      typeof control.current === "undefined"
    ) {
      return;
    }
    const cp = {
      x: camera.current.position.x,
      y: camera.current.position.y,
      z: camera.current.position.z,
    };
    const ct2 = new TWEEN.Tween(cp)
      .to({ x: 0, y: 5, z: 20 }, 3000)
      .easing(TWEEN.Easing.Quadratic.InOut)
      .delay(1000)
      .onUpdate(() => {
        if (typeof camera.current === "undefined") {
          return;
        }
        camera.current.position.set(cp.x, cp.y, cp.z);
      });
    ct2.start();

    const ctp = {
      x: control.current.target.x,
      y: control.current.target.y,
      z: control.current.target.z,
    };
    const ctt2 = new TWEEN.Tween(ctp)
      .to({ x: -5, y: 5, z: 0 }, 3000)
      .easing(TWEEN.Easing.Quadratic.InOut)
      .delay(1000)
      .onUpdate(() => {
        if (typeof control.current === "undefined") {
          return;
        }
        control.current.target.set(ctp.x, ctp.y, ctp.z);
      });
    ctt2.start();
  }

  function throttle(tween: Function, ms: number) {
    if (throttleFlag.current) {
      throttleFlag.current = false;
      tween();
      setTimeout(() => {
        throttleFlag.current = true;
      }, ms);
    }
  }

  useImperativeHandle(
    ref,
    () => ({
      setOnRequest() {
        throttle(onRequest, 3000);
      },
      setOnMain() {
        throttle(onMain, 3000);
      },
      setOnAudit() {
        throttle(onAudit, 3000);
      },
    }),
    [onRequest, onMain, onAudit, throttle]
  );

  return (
    <>
      <Flex
        className="three"
        position="absolute"
        top="0"
        left="0"
        w="100%"
        h="100%"
        zIndex="0"
      ></Flex>
    </>
  );
});

export default Three;
