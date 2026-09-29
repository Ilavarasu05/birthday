import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { StoryConfig } from '../config/storyConfig';

interface ThreeCanvasProps {
  currentScene: number;
  config: StoryConfig;
  boxOpenCount?: number;
  candlesBlown?: boolean;
  doorOpened?: boolean;
  ringRevealed?: boolean;
  isYesCelebration?: boolean;
  onBoxClick?: () => void;
  onCandleClick?: () => void;
  onDoorClick?: () => void;
}

export const ThreeCanvas: React.FC<ThreeCanvasProps> = ({
  currentScene,
  config,
  boxOpenCount = 0,
  candlesBlown = false,
  doorOpened = false,
  ringRevealed = false,
  isYesCelebration = false,
  onBoxClick,
  onCandleClick,
  onDoorClick,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const animFrameId = useRef<number | null>(null);

  // Group references for clean transitions
  const cyberGroupRef = useRef<THREE.Group | null>(null);
  const giftBoxGroupRef = useRef<THREE.Group | null>(null);
  const boxLidRef = useRef<THREE.Group | null>(null);
  const gardenGroupRef = useRef<THREE.Group | null>(null);
  const cakeGroupRef = useRef<THREE.Group | null>(null);
  const flameLightsRef = useRef<THREE.PointLight[]>([]);
  const flameMeshesRef = useRef<THREE.Mesh[]>([]);
  const doorGroupRef = useRef<THREE.Group | null>(null);
  const doorLeafRef = useRef<THREE.Group | null>(null);
  const proposalGroupRef = useRef<THREE.Group | null>(null);
  const ringBoxLidRef = useRef<THREE.Group | null>(null);
  const diamondMeshRef = useRef<THREE.Mesh | null>(null);
  const celebrationGroupRef = useRef<THREE.Group | null>(null);
  const sunriseGroupRef = useRef<THREE.Group | null>(null);

  // Particle systems
  const firefliesRef = useRef<THREE.Points | null>(null);
  const starsRef = useRef<THREE.Points | null>(null);
  const celebrationParticlesRef = useRef<THREE.Points | null>(null);
  const rosePetalsRef = useRef<THREE.Points | null>(null);
  const goldenHeartsRef = useRef<THREE.Points | null>(null);
  const goldenHeartsDataRef = useRef<{ speeds: Float32Array; phases: Float32Array; sways: Float32Array } | null>(null);
  const tumblingHeartsRef = useRef<THREE.InstancedMesh | null>(null);
  const tumblingHeartsDataRef = useRef<{ pos: THREE.Vector3; rot: THREE.Euler; rotSpeed: THREE.Vector3; speed: number; swayPhase: number }[]>([]);

  // Mouse interaction
  const mouse = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Scene setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x05050f, 0.035);
    sceneRef.current = scene;

    // 2. Camera setup
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 1.5, 7);
    cameraRef.current = camera;

    // 3. Renderer setup
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;

    container.innerHTML = '';
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 4. Ambient and Directional Lights
    const ambientLight = new THREE.AmbientLight(0x221133, 0.8);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffeedd, 1.2);
    dirLight.position.set(5, 10, 7);
    dirLight.castShadow = true;
    scene.add(dirLight);

    const moonLight = new THREE.PointLight(0x38bdf8, 1.5, 30);
    moonLight.position.set(-8, 12, -10);
    scene.add(moonLight);

    // ==========================================
    // BUILD SCENE OBJECTS
    // ==========================================

    // A. Cyber Grid & Hologram (Scenes 1-5)
    const cyberGroup = new THREE.Group();
    cyberGroupRef.current = cyberGroup;
    scene.add(cyberGroup);

    // Grid floor
    const gridHelper = new THREE.GridHelper(24, 24, 0xf43f5e, 0x38bdf8);
    gridHelper.position.y = -2;
    (gridHelper.material as THREE.Material).transparent = true;
    (gridHelper.material as THREE.Material).opacity = 0.35;
    cyberGroup.add(gridHelper);

    // Hologram Rings
    for (let r = 0; r < 3; r++) {
      const ringGeo = new THREE.TorusGeometry(1.6 + r * 0.7, 0.02, 16, 64);
      const ringMat = new THREE.MeshBasicMaterial({
        color: r % 2 === 0 ? 0xf43f5e : 0x38bdf8,
        wireframe: true,
        transparent: true,
        opacity: 0.5,
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.rotation.x = Math.PI / 2;
      ringMesh.position.y = -1.2 + r * 0.4;
      cyberGroup.add(ringMesh);
    }

    // Floating cyber data cubes
    const cyberCubes: THREE.Mesh[] = [];
    for (let i = 0; i < 20; i++) {
      const cGeo = new THREE.BoxGeometry(0.2, 0.2, 0.2);
      const cMat = new THREE.MeshBasicMaterial({
        color: 0xf43f5e,
        wireframe: true,
        transparent: true,
        opacity: 0.6,
      });
      const cube = new THREE.Mesh(cGeo, cMat);
      cube.position.set(
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 4,
        (Math.random() - 0.5) * 6
      );
      cyberGroup.add(cube);
      cyberCubes.push(cube);
    }

    // B. Interactive 3D Gift Box (Scene 6)
    const giftBoxGroup = new THREE.Group();
    giftBoxGroup.position.set(0, 0, 0);
    giftBoxGroupRef.current = giftBoxGroup;
    scene.add(giftBoxGroup);

    const boxMat = new THREE.MeshStandardMaterial({
      color: 0x9333ea,
      metalness: 0.3,
      roughness: 0.4,
    });
    const ribbonMat = new THREE.MeshStandardMaterial({
      color: 0xfbbf24,
      metalness: 0.8,
      roughness: 0.2,
    });

    // Box base
    const baseMesh = new THREE.Mesh(new THREE.BoxGeometry(1.8, 1.4, 1.8), boxMat);
    baseMesh.position.y = -0.3;
    baseMesh.castShadow = true;
    baseMesh.receiveShadow = true;
    giftBoxGroup.add(baseMesh);

    // Ribbons on base
    const ribbonV = new THREE.Mesh(new THREE.BoxGeometry(1.82, 1.42, 0.25), ribbonMat);
    ribbonV.position.y = -0.3;
    giftBoxGroup.add(ribbonV);

    const ribbonH = new THREE.Mesh(new THREE.BoxGeometry(0.25, 1.42, 1.82), ribbonMat);
    ribbonH.position.y = -0.3;
    giftBoxGroup.add(ribbonH);

    // Box Lid (hinged at back)
    const boxLid = new THREE.Group();
    boxLid.position.set(0, 0.4, -0.9);
    boxLidRef.current = boxLid;
    giftBoxGroup.add(boxLid);

    const lidMesh = new THREE.Mesh(new THREE.BoxGeometry(1.9, 0.3, 1.9), boxMat);
    lidMesh.position.set(0, 0.15, 0.9);
    lidMesh.castShadow = true;
    boxLid.add(lidMesh);

    // Bow on lid
    const bowMesh = new THREE.Mesh(new THREE.TorusGeometry(0.3, 0.08, 16, 32), ribbonMat);
    bowMesh.rotation.x = Math.PI / 2;
    bowMesh.position.set(0, 0.35, 0.9);
    boxLid.add(bowMesh);

    // C. Moonlit Night Garden (Scenes 7-8)
    const gardenGroup = new THREE.Group();
    gardenGroupRef.current = gardenGroup;
    scene.add(gardenGroup);

    // Full Moon
    const moonGeo = new THREE.SphereGeometry(3.5, 32, 32);
    const moonMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const moonMesh = new THREE.Mesh(moonGeo, moonMat);
    moonMesh.position.set(12, 16, -28);
    gardenGroup.add(moonMesh);

    // Moon Glow halo
    const haloGeo = new THREE.RingGeometry(3.6, 5.8, 32);
    const haloMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.25,
    });
    const haloMesh = new THREE.Mesh(haloGeo, haloMat);
    haloMesh.position.copy(moonMesh.position);
    haloMesh.position.z += 0.1;
    gardenGroup.add(haloMesh);

    // Twinkling Stars (Thousands)
    const starCount = 1800;
    const starGeo = new THREE.BufferGeometry();
    const starPos = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount * 3; i += 3) {
      starPos[i] = (Math.random() - 0.5) * 80;
      starPos[i + 1] = Math.random() * 40 - 2;
      starPos[i + 2] = -Math.random() * 50 - 5;
    }
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
    const starMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.18,
      transparent: true,
      opacity: 0.85,
    });
    const stars = new THREE.Points(starGeo, starMat);
    starsRef.current = stars;
    gardenGroup.add(stars);

    // Floating Fireflies
    const fireflyCount = 120;
    const fireflyGeo = new THREE.BufferGeometry();
    const fireflyPos = new Float32Array(fireflyCount * 3);
    for (let i = 0; i < fireflyCount * 3; i += 3) {
      fireflyPos[i] = (Math.random() - 0.5) * 16;
      fireflyPos[i + 1] = Math.random() * 6 - 1;
      fireflyPos[i + 2] = (Math.random() - 0.5) * 14;
    }
    fireflyGeo.setAttribute('position', new THREE.BufferAttribute(fireflyPos, 3));
    const fireflyMat = new THREE.PointsMaterial({
      color: 0xfbbf24,
      size: 0.22,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
    });
    const fireflies = new THREE.Points(fireflyGeo, fireflyMat);
    firefliesRef.current = fireflies;
    gardenGroup.add(fireflies);

    // Ground grass/stone hillocks
    const groundGeo = new THREE.PlaneGeometry(60, 60, 32, 32);
    const groundMat = new THREE.MeshStandardMaterial({
      color: 0x070b14,
      roughness: 0.9,
      metalness: 0.1,
    });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -2.2;
    ground.receiveShadow = true;
    gardenGroup.add(ground);

    // Garden Lanterns
    for (let l = 0; l < 4; l++) {
      const lantern = new THREE.Group();
      lantern.position.set((l - 1.5) * 4.2, -1.2, -3 - Math.sin(l) * 2);
      
      const post = new THREE.Mesh(
        new THREE.CylinderGeometry(0.04, 0.05, 2),
        new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.8 })
      );
      post.position.y = 0;
      lantern.add(post);

      const lamp = new THREE.Mesh(
        new THREE.SphereGeometry(0.18, 16, 16),
        new THREE.MeshBasicMaterial({ color: 0xfbbf24 })
      );
      lamp.position.y = 1;
      lantern.add(lamp);

      const lampLight = new THREE.PointLight(0xfbbf24, 0.8, 6);
      lampLight.position.y = 1;
      lantern.add(lampLight);

      gardenGroup.add(lantern);
    }

    // D. 3D Birthday Cake (Scene 9)
    const cakeGroup = new THREE.Group();
    cakeGroupRef.current = cakeGroup;
    scene.add(cakeGroup);

    // Cake Pedestal
    const pedestal = new THREE.Mesh(
      new THREE.CylinderGeometry(2.2, 1.8, 0.3, 32),
      new THREE.MeshStandardMaterial({ color: 0xd4af37, metalness: 0.8, roughness: 0.2 })
    );
    pedestal.position.y = -1.5;
    pedestal.receiveShadow = true;
    cakeGroup.add(pedestal);

    // Tier 1 Cake
    const tier1 = new THREE.Mesh(
      new THREE.CylinderGeometry(1.8, 1.8, 0.9, 32),
      new THREE.MeshStandardMaterial({ color: 0x3b1836, roughness: 0.5 })
    );
    tier1.position.y = -0.9;
    tier1.castShadow = true;
    cakeGroup.add(tier1);

    // Tier 2 Cake
    const tier2 = new THREE.Mesh(
      new THREE.CylinderGeometry(1.2, 1.2, 0.8, 32),
      new THREE.MeshStandardMaterial({ color: 0xf43f5e, roughness: 0.4 })
    );
    tier2.position.y = -0.05;
    tier2.castShadow = true;
    cakeGroup.add(tier2);

    // Cream Frosting Swirls on top
    for (let c = 0; c < 12; c++) {
      const angle = (c / 12) * Math.PI * 2;
      const swirl = new THREE.Mesh(
        new THREE.SphereGeometry(0.12, 16, 16),
        new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.3 })
      );
      swirl.position.set(Math.cos(angle) * 1.1, 0.35, Math.sin(angle) * 1.1);
      cakeGroup.add(swirl);
    }

    // Birthday Candles & Flame
    const candlePositions = [
      [0, 0.35, 0],
      [0.45, 0.35, 0.3],
      [-0.45, 0.35, -0.3],
      [-0.4, 0.35, 0.35],
      [0.4, 0.35, -0.35],
    ];

    flameLightsRef.current = [];
    flameMeshesRef.current = [];

    candlePositions.forEach((pos, idx) => {
      // Candle stick
      const candle = new THREE.Mesh(
        new THREE.CylinderGeometry(0.04, 0.04, 0.5, 16),
        new THREE.MeshStandardMaterial({ color: idx % 2 === 0 ? 0xfbbf24 : 0xf43f5e })
      );
      candle.position.set(pos[0], pos[1] + 0.25, pos[2]);
      cakeGroup.add(candle);

      // Flame
      const flameGeo = new THREE.ConeGeometry(0.08, 0.2, 16);
      flameGeo.translate(0, 0.1, 0);
      const flameMat = new THREE.MeshBasicMaterial({
        color: 0xffaa00,
      });
      const flame = new THREE.Mesh(flameGeo, flameMat);
      flame.position.set(pos[0], pos[1] + 0.5, pos[2]);
      cakeGroup.add(flame);
      flameMeshesRef.current.push(flame);

      // Light
      const pLight = new THREE.PointLight(0xff9900, 1.2, 4);
      pLight.position.set(pos[0], pos[1] + 0.6, pos[2]);
      cakeGroup.add(pLight);
      flameLightsRef.current.push(pLight);
    });

    // E. 3D Secret Golden Door (Scene 10)
    const doorGroup = new THREE.Group();
    doorGroupRef.current = doorGroup;
    scene.add(doorGroup);

    // Door Frame
    const frameMat = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      metalness: 0.9,
      roughness: 0.2,
    });
    const leftPost = new THREE.Mesh(new THREE.BoxGeometry(0.2, 3.6, 0.3), frameMat);
    leftPost.position.set(-1.1, 0, 0);
    doorGroup.add(leftPost);

    const rightPost = new THREE.Mesh(new THREE.BoxGeometry(0.2, 3.6, 0.3), frameMat);
    rightPost.position.set(1.1, 0, 0);
    doorGroup.add(rightPost);

    const topArch = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.25, 0.3), frameMat);
    topArch.position.set(0, 1.8, 0);
    doorGroup.add(topArch);

    // Door Leaf (Hinged at left)
    const doorLeaf = new THREE.Group();
    doorLeaf.position.set(-1.0, 0, 0);
    doorLeafRef.current = doorLeaf;
    doorGroup.add(doorLeaf);

    const doorMesh = new THREE.Mesh(
      new THREE.BoxGeometry(2.0, 3.4, 0.1),
      new THREE.MeshStandardMaterial({
        color: 0x1f1730,
        metalness: 0.6,
        roughness: 0.3,
      })
    );
    doorMesh.position.set(1.0, 0, 0);
    doorLeaf.add(doorMesh);

    // Ornate Golden Door Handle
    const handleMesh = new THREE.Mesh(
      new THREE.SphereGeometry(0.1, 16, 16),
      new THREE.MeshStandardMaterial({ color: 0xfbbf24, metalness: 0.95, roughness: 0.1 })
    );
    handleMesh.position.set(1.8, 0, 0.12);
    doorLeaf.add(handleMesh);

    // Light beam behind the door
    const lightBehindDoor = new THREE.PointLight(0xffeedd, 3.5, 12);
    lightBehindDoor.position.set(0, 0, -2);
    doorGroup.add(lightBehindDoor);

    // F. 3D Velvet Ring Box & Diamond Solitaire Ring (Scene 11)
    const proposalGroup = new THREE.Group();
    proposalGroupRef.current = proposalGroup;
    scene.add(proposalGroup);

    // Ring box velvet material
    const velvetMat = new THREE.MeshStandardMaterial({
      color: 0x581c87, // Deep royal purple velvet
      roughness: 0.8,
      metalness: 0.1,
    });
    const goldTrimMat = new THREE.MeshStandardMaterial({
      color: 0xfbbf24,
      metalness: 0.9,
      roughness: 0.15,
    });

    // Ring box bottom
    const boxBottom = new THREE.Mesh(new THREE.CylinderGeometry(0.9, 0.9, 0.6, 8), velvetMat);
    boxBottom.position.y = -0.3;
    boxBottom.castShadow = true;
    proposalGroup.add(boxBottom);

    const bottomGoldTrim = new THREE.Mesh(new THREE.CylinderGeometry(0.92, 0.92, 0.05, 8), goldTrimMat);
    bottomGoldTrim.position.y = -0.02;
    proposalGroup.add(bottomGoldTrim);

    // Velvet cushion
    const cushion = new THREE.Mesh(
      new THREE.CylinderGeometry(0.8, 0.8, 0.2, 16),
      new THREE.MeshStandardMaterial({ color: 0x1e102d, roughness: 0.95 })
    );
    cushion.position.y = 0;
    proposalGroup.add(cushion);

    // Ring Box Lid (hinged at back z = -0.9)
    const ringBoxLid = new THREE.Group();
    ringBoxLid.position.set(0, 0, -0.85);
    ringBoxLidRef.current = ringBoxLid;
    proposalGroup.add(ringBoxLid);

    const lidTop = new THREE.Mesh(new THREE.CylinderGeometry(0.9, 0.9, 0.5, 8), velvetMat);
    lidTop.position.set(0, 0.25, 0.85);
    ringBoxLid.add(lidTop);

    const lidGoldTrim = new THREE.Mesh(new THREE.CylinderGeometry(0.92, 0.92, 0.05, 8), goldTrimMat);
    lidGoldTrim.position.set(0, 0.02, 0.85);
    ringBoxLid.add(lidGoldTrim);

    // The Diamond Ring
    const ringGroup = new THREE.Group();
    ringGroup.position.set(0, 0.25, 0);
    proposalGroup.add(ringGroup);

    // Gold band
    const bandMesh = new THREE.Mesh(
      new THREE.TorusGeometry(0.32, 0.045, 16, 64),
      new THREE.MeshStandardMaterial({
        color: 0xffd700,
        metalness: 0.98,
        roughness: 0.1,
      })
    );
    bandMesh.rotation.x = Math.PI / 2;
    ringGroup.add(bandMesh);

    // Diamond Crown Prongs
    const crown = new THREE.Mesh(
      new THREE.CylinderGeometry(0.12, 0.06, 0.12, 6),
      new THREE.MeshStandardMaterial({ color: 0xffffff, metalness: 0.9, roughness: 0.1 })
    );
    crown.position.set(0, 0.36, 0);
    ringGroup.add(crown);

    // Solitaire Diamond (Octahedron with refractive sparkle)
    const diamondGeo = new THREE.OctahedronGeometry(0.18, 2);
    const diamondMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transmission: 0.9,
      opacity: 1,
      transparent: true,
      roughness: 0.02,
      metalness: 0.1,
      ior: 2.4, // Real diamond index of refraction!
      reflectivity: 0.9,
    });
    const diamondMesh = new THREE.Mesh(diamondGeo, diamondMat);
    diamondMesh.position.set(0, 0.44, 0);
    diamondMeshRef.current = diamondMesh;
    ringGroup.add(diamondMesh);

    // Diamond Spotlight (makes the stone sparkle with real caustics)
    const diamondSpotlight = new THREE.SpotLight(0xffffff, 4, 8, Math.PI / 6, 0.5);
    diamondSpotlight.position.set(0, 3, 1);
    diamondSpotlight.target = diamondMesh;
    proposalGroup.add(diamondSpotlight);

    // G. Celebration Galaxy & 3D Giant Heart (Scene 13)
    const celebrationGroup = new THREE.Group();
    celebrationGroupRef.current = celebrationGroup;
    scene.add(celebrationGroup);

    // Giant 3D Heart Mesh
    const heartShape = new THREE.Shape();
    const x = 0, y = 0;
    heartShape.moveTo(x + 0.25, y + 0.25);
    heartShape.bezierCurveTo(x + 0.25, y + 0.25, x + 0.2, y, x, y);
    heartShape.bezierCurveTo(x - 0.3, y, x - 0.3, y + 0.35, x - 0.3, y + 0.35);
    heartShape.bezierCurveTo(x - 0.3, y + 0.55, x - 0.1, y + 0.77, x + 0.25, y + 1.0);
    heartShape.bezierCurveTo(x + 0.6, y + 0.77, x + 0.8, y + 0.55, x + 0.8, y + 0.35);
    heartShape.bezierCurveTo(x + 0.8, y + 0.35, x + 0.8, y, x + 0.5, y);
    heartShape.bezierCurveTo(x + 0.35, y, x + 0.25, y + 0.25, x + 0.25, y + 0.25);

    const extrudeSettings = { depth: 0.3, bevelEnabled: true, bevelSegments: 5, steps: 2, bevelSize: 0.1, bevelThickness: 0.1 };
    const heartGeo = new THREE.ExtrudeGeometry(heartShape, extrudeSettings);
    heartGeo.center();
    const heartMat = new THREE.MeshStandardMaterial({
      color: 0xf43f5e,
      emissive: 0x881337,
      roughness: 0.2,
      metalness: 0.5,
    });
    const heartMesh = new THREE.Mesh(heartGeo, heartMat);
    heartMesh.scale.set(1.8, 1.8, 1.8);
    heartMesh.rotation.z = Math.PI;
    heartMesh.position.set(0, 1.2, 0);
    celebrationGroup.add(heartMesh);

    // Rose Petals Shower (Falling particles)
    const petalCount = 350;
    const petalGeo = new THREE.BufferGeometry();
    const petalPos = new Float32Array(petalCount * 3);
    for (let p = 0; p < petalCount * 3; p += 3) {
      petalPos[p] = (Math.random() - 0.5) * 14;
      petalPos[p + 1] = Math.random() * 12 - 2;
      petalPos[p + 2] = (Math.random() - 0.5) * 10;
    }
    petalGeo.setAttribute('position', new THREE.BufferAttribute(petalPos, 3));
    const petalMat = new THREE.PointsMaterial({
      color: 0xf43f5e,
      size: 0.28,
      transparent: true,
      opacity: 0.85,
    });
    const rosePetals = new THREE.Points(petalGeo, petalMat);
    rosePetalsRef.current = rosePetals;
    celebrationGroup.add(rosePetals);

    // Golden sparks
    const sparkCount = 400;
    const sparkGeo = new THREE.BufferGeometry();
    const sparkPos = new Float32Array(sparkCount * 3);
    for (let s = 0; s < sparkCount * 3; s += 3) {
      sparkPos[s] = (Math.random() - 0.5) * 16;
      sparkPos[s + 1] = Math.random() * 10 - 2;
      sparkPos[s + 2] = (Math.random() - 0.5) * 12;
    }
    sparkGeo.setAttribute('position', new THREE.BufferAttribute(sparkPos, 3));
    const sparkMat = new THREE.PointsMaterial({
      color: 0xfbbf24,
      size: 0.16,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
    });
    const sparks = new THREE.Points(sparkGeo, sparkMat);
    celebrationParticlesRef.current = sparks;
    celebrationGroup.add(sparks);

    // Custom Particle System: Floating, Shimmering Golden Hearts
    const createGoldenHeartTexture = (): THREE.CanvasTexture => {
      const canvas = document.createElement('canvas');
      canvas.width = 128;
      canvas.height = 128;
      const ctx = canvas.getContext('2d');
      if (!ctx) return new THREE.CanvasTexture(canvas);

      ctx.clearRect(0, 0, 128, 128);

      // Warm luminous halo
      const glow = ctx.createRadialGradient(64, 58, 6, 64, 58, 54);
      glow.addColorStop(0, 'rgba(255, 238, 140, 0.95)');
      glow.addColorStop(0.35, 'rgba(251, 191, 36, 0.65)');
      glow.addColorStop(0.7, 'rgba(217, 119, 6, 0.25)');
      glow.addColorStop(1, 'rgba(217, 119, 6, 0)');
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(64, 58, 54, 0, Math.PI * 2);
      ctx.fill();

      // Crisp golden heart shape
      ctx.save();
      ctx.translate(64, 50);
      ctx.scale(1.7, 1.7);
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(0, -8, -12, -8, -12, 2);
      ctx.bezierCurveTo(-12, 10, -5, 15, 0, 20);
      ctx.bezierCurveTo(5, 15, 12, 10, 12, 2);
      ctx.bezierCurveTo(12, -8, 0, -8, 0, 0);
      ctx.closePath();

      // Shimmering rich gold gradient
      const goldGrad = ctx.createLinearGradient(-12, -8, 12, 20);
      goldGrad.addColorStop(0, '#ffffff');
      goldGrad.addColorStop(0.2, '#fef08a');
      goldGrad.addColorStop(0.55, '#f59e0b');
      goldGrad.addColorStop(0.9, '#b45309');
      goldGrad.addColorStop(1, '#78350f');
      ctx.fillStyle = goldGrad;
      ctx.shadowColor = '#fbbf24';
      ctx.shadowBlur = 12;
      ctx.fill();

      // Specular gleam highlight
      ctx.beginPath();
      ctx.ellipse(-4, -1, 3.5, 1.8, -Math.PI / 4, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
      ctx.fill();

      ctx.restore();

      const texture = new THREE.CanvasTexture(canvas);
      texture.needsUpdate = true;
      return texture;
    };

    const heartCount = 280;
    const goldenHeartGeo = new THREE.BufferGeometry();
    const heartPos = new Float32Array(heartCount * 3);
    const heartSpeeds = new Float32Array(heartCount);
    const heartPhases = new Float32Array(heartCount);
    const heartSways = new Float32Array(heartCount);

    for (let h = 0; h < heartCount; h++) {
      const idx = h * 3;
      heartPos[idx] = (Math.random() - 0.5) * 16;
      heartPos[idx + 1] = Math.random() * 14 - 3;
      heartPos[idx + 2] = (Math.random() - 0.5) * 12;

      heartSpeeds[h] = 0.9 + Math.random() * 1.5;
      heartPhases[h] = Math.random() * Math.PI * 2;
      heartSways[h] = 0.4 + Math.random() * 0.8;
    }

    goldenHeartGeo.setAttribute('position', new THREE.BufferAttribute(heartPos, 3));
    const goldenHeartTexture = createGoldenHeartTexture();

    const goldenHeartMat = new THREE.PointsMaterial({
      map: goldenHeartTexture,
      size: 0.65,
      transparent: true,
      opacity: 0.92,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const goldenHearts = new THREE.Points(goldenHeartGeo, goldenHeartMat);
    goldenHeartsRef.current = goldenHearts;
    goldenHeartsDataRef.current = {
      speeds: heartSpeeds,
      phases: heartPhases,
      sways: heartSways,
    };
    celebrationGroup.add(goldenHearts);

    // 3D Extruded Miniature Golden Hearts (faceted specular reflections)
    const miniHeartShape = new THREE.Shape();
    const hx = 0, hy = 0;
    miniHeartShape.moveTo(hx + 0.1, hy + 0.1);
    miniHeartShape.bezierCurveTo(hx + 0.1, hy + 0.1, hx + 0.08, hy, hx, hy);
    miniHeartShape.bezierCurveTo(hx - 0.12, hy, hx - 0.12, hy + 0.14, hx - 0.12, hy + 0.14);
    miniHeartShape.bezierCurveTo(hx - 0.12, hy + 0.22, hx - 0.04, hy + 0.31, hx + 0.1, hy + 0.4);
    miniHeartShape.bezierCurveTo(hx + 0.24, hy + 0.31, hx + 0.32, hy + 0.22, hx + 0.32, hy + 0.14);
    miniHeartShape.bezierCurveTo(hx + 0.32, hy + 0.14, hx + 0.32, hy, hx + 0.2, hy);
    miniHeartShape.bezierCurveTo(hx + 0.14, hy, hx + 0.1, hy + 0.1, hx + 0.1, hy + 0.1);

    const miniHeartGeo = new THREE.ExtrudeGeometry(miniHeartShape, {
      depth: 0.08,
      bevelEnabled: true,
      bevelSegments: 3,
      steps: 1,
      bevelSize: 0.03,
      bevelThickness: 0.03,
    });
    miniHeartGeo.center();

    const miniHeartMat = new THREE.MeshStandardMaterial({
      color: 0xffd700,
      emissive: 0x582a05,
      roughness: 0.18,
      metalness: 0.92,
    });

    const tumblingCount = 38;
    const tumblingHearts = new THREE.InstancedMesh(miniHeartGeo, miniHeartMat, tumblingCount);
    tumblingHeartsRef.current = tumblingHearts;
    tumblingHeartsDataRef.current = [];

    const dummyObj = new THREE.Object3D();
    for (let t = 0; t < tumblingCount; t++) {
      const pos = new THREE.Vector3(
        (Math.random() - 0.5) * 14,
        Math.random() * 12 - 3,
        (Math.random() - 0.5) * 8
      );
      const rot = new THREE.Euler(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );
      const rotSpeed = new THREE.Vector3(
        (Math.random() - 0.5) * 2,
        (Math.random() - 0.5) * 2.5,
        (Math.random() - 0.5) * 2
      );
      const speed = 0.5 + Math.random() * 1.2;
      const swayPhase = Math.random() * Math.PI * 2;

      dummyObj.position.copy(pos);
      dummyObj.rotation.copy(rot);
      dummyObj.scale.setScalar(0.7 + Math.random() * 0.6);
      dummyObj.updateMatrix();
      tumblingHearts.setMatrixAt(t, dummyObj.matrix);

      tumblingHeartsDataRef.current.push({ pos, rot, rotSpeed, speed, swayPhase });
    }
    tumblingHearts.instanceMatrix.needsUpdate = true;
    celebrationGroup.add(tumblingHearts);

    // H. Sunrise Horizon Silhouettes (Scene 15)
    const sunriseGroup = new THREE.Group();
    sunriseGroupRef.current = sunriseGroup;
    scene.add(sunriseGroup);

    // Sunrise glowing sphere
    const sunGeo = new THREE.SphereGeometry(6, 32, 32);
    const sunMat = new THREE.MeshBasicMaterial({ color: 0xff7733 });
    const sunMesh = new THREE.Mesh(sunGeo, sunMat);
    sunMesh.position.set(0, -2.5, -20);
    sunriseGroup.add(sunMesh);

    // Horizon glow plane
    const horizonGlow = new THREE.Mesh(
      new THREE.PlaneGeometry(60, 25),
      new THREE.MeshBasicMaterial({
        color: 0xf97316,
        transparent: true,
        opacity: 0.45,
      })
    );
    horizonGlow.position.set(0, 0, -18);
    sunriseGroup.add(horizonGlow);

    // Two Silhouettes holding hands on a hill
    const hillGeo = new THREE.CylinderGeometry(15, 18, 4, 32);
    const hillMat = new THREE.MeshBasicMaterial({ color: 0x050508 });
    const hill = new THREE.Mesh(hillGeo, hillMat);
    hill.position.set(0, -3.5, -5);
    sunriseGroup.add(hill);

    // Person 1 (Lucas silhouette)
    const person1 = new THREE.Group();
    person1.position.set(-0.35, -1.2, -5);
    const body1 = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.22, 1.2), hillMat);
    const head1 = new THREE.Mesh(new THREE.SphereGeometry(0.16, 16, 16), hillMat);
    head1.position.y = 0.72;
    person1.add(body1);
    person1.add(head1);
    sunriseGroup.add(person1);

    // Person 2 (Maya silhouette)
    const person2 = new THREE.Group();
    person2.position.set(0.35, -1.25, -5);
    const body2 = new THREE.Mesh(new THREE.ConeGeometry(0.24, 1.15, 16), hillMat);
    const head2 = new THREE.Mesh(new THREE.SphereGeometry(0.15, 16, 16), hillMat);
    head2.position.y = 0.68;
    person2.add(body2);
    person2.add(head2);
    sunriseGroup.add(person2);

    // 5. Mouse tracking for subtle cinematic parallax
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouse.current.targetX = x * 0.4;
      mouse.current.targetY = y * 0.3;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        const rect = container.getBoundingClientRect();
        const x = ((touch.clientX - rect.left) / rect.width) * 2 - 1;
        const y = -(((touch.clientY - rect.top) / rect.height) * 2 - 1);
        mouse.current.targetX = x * 0.3;
        mouse.current.targetY = y * 0.2;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    // Handle Resize
    const handleResize = () => {
      if (!container || !rendererRef.current || !cameraRef.current) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      cameraRef.current.aspect = width / height;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    // 6. Animation Loop
    let clock = new THREE.Clock();

    const animate = () => {
      animFrameId.current = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // Smooth camera parallax
      mouse.current.x += (mouse.current.targetX - mouse.current.x) * 0.05;
      mouse.current.y += (mouse.current.targetY - mouse.current.y) * 0.05;

      if (cameraRef.current) {
        cameraRef.current.position.x += (mouse.current.x - cameraRef.current.position.x) * 0.03;
      }

      // Rotate cyber cubes
      cyberCubes.forEach((cube, i) => {
        cube.rotation.x += 0.01 * (i % 2 === 0 ? 1 : -1);
        cube.rotation.y += 0.015;
      });

      // Animate fireflies
      if (firefliesRef.current) {
        const positions = firefliesRef.current.geometry.attributes.position.array as Float32Array;
        for (let i = 0; i < positions.length; i += 3) {
          positions[i + 1] += Math.sin(elapsed * 1.5 + i) * 0.005;
          positions[i] += Math.cos(elapsed * 0.8 + i) * 0.003;
        }
        firefliesRef.current.geometry.attributes.position.needsUpdate = true;
      }

      // Animate candle flames flicker
      flameMeshesRef.current.forEach((flame, idx) => {
        const flicker = Math.sin(elapsed * 12 + idx * 3) * 0.15 + 1;
        flame.scale.set(flicker, flicker, flicker);
      });
      flameLightsRef.current.forEach((light, idx) => {
        light.intensity = Math.sin(elapsed * 10 + idx) * 0.3 + 1.2;
      });

      // Rotate solitaire diamond & shine
      if (diamondMeshRef.current) {
        diamondMeshRef.current.rotation.y += 0.015;
        diamondMeshRef.current.rotation.x = Math.sin(elapsed * 2) * 0.1;
      }

      // Falling rose petals in celebration
      if (rosePetalsRef.current) {
        const pArr = rosePetalsRef.current.geometry.attributes.position.array as Float32Array;
        for (let p = 0; p < pArr.length; p += 3) {
          pArr[p + 1] -= delta * 1.8;
          pArr[p] += Math.sin(elapsed * 2 + p) * 0.01;
          if (pArr[p + 1] < -3) {
            pArr[p + 1] = 9;
          }
        }
        rosePetalsRef.current.geometry.attributes.position.needsUpdate = true;
      }

      // Floating celebration sparks
      if (celebrationParticlesRef.current) {
        celebrationParticlesRef.current.rotation.y += 0.005;
      }

      // Floating shimmering golden hearts particle system
      if (goldenHeartsRef.current && goldenHeartsDataRef.current) {
        const hArr = goldenHeartsRef.current.geometry.attributes.position.array as Float32Array;
        const { speeds, phases, sways } = goldenHeartsDataRef.current;
        const count = speeds.length;
        for (let i = 0; i < count; i++) {
          const idx = i * 3;
          // Float upward
          hArr[idx + 1] += speeds[i] * delta;
          // Shimmering romantic sway in X and Z
          hArr[idx] += Math.sin(elapsed * 2.0 + phases[i]) * (sways[i] * delta * 1.2);
          hArr[idx + 2] += Math.cos(elapsed * 1.6 + phases[i]) * (sways[i] * delta * 0.8);

          // Loop back from bottom when reaching the top
          if (hArr[idx + 1] > 11) {
            hArr[idx + 1] = -3.5 - Math.random() * 2;
            hArr[idx] = (Math.random() - 0.5) * 16;
            hArr[idx + 2] = (Math.random() - 0.5) * 12;
          }
        }
        goldenHeartsRef.current.geometry.attributes.position.needsUpdate = true;
        // Overall shimmering drift
        goldenHeartsRef.current.rotation.y = elapsed * 0.03;
      }

      // Tumbling 3D specular golden hearts
      if (tumblingHeartsRef.current && tumblingHeartsDataRef.current.length > 0) {
        const dummy = new THREE.Object3D();
        tumblingHeartsDataRef.current.forEach((item, idx) => {
          item.pos.y += item.speed * delta;
          item.pos.x += Math.sin(elapsed * 1.5 + item.swayPhase) * (0.35 * delta);
          item.rot.x += item.rotSpeed.x * delta;
          item.rot.y += item.rotSpeed.y * delta;
          item.rot.z += item.rotSpeed.z * delta;

          if (item.pos.y > 10) {
            item.pos.y = -4;
            item.pos.x = (Math.random() - 0.5) * 14;
            item.pos.z = (Math.random() - 0.5) * 8;
          }

          dummy.position.copy(item.pos);
          dummy.rotation.copy(item.rot);
          const pulse = 1 + Math.sin(elapsed * 3.5 + item.swayPhase) * 0.12;
          dummy.scale.set(pulse, pulse, pulse);
          dummy.updateMatrix();
          tumblingHeartsRef.current!.setMatrixAt(idx, dummy.matrix);
        });
        tumblingHeartsRef.current.instanceMatrix.needsUpdate = true;
      }

      // Slowly rotate heart in celebration
      if (celebrationGroupRef.current && isYesCelebration) {
        celebrationGroupRef.current.rotation.y += 0.01;
      }

      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
    };

    animate();

    return () => {
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, []);

  // Update 3D groups visibility & camera positions based on currentScene
  useEffect(() => {
    if (!cameraRef.current) return;
    const cam = cameraRef.current;

    // Reset visibility
    if (cyberGroupRef.current) cyberGroupRef.current.visible = currentScene >= 1 && currentScene <= 5;
    if (giftBoxGroupRef.current) giftBoxGroupRef.current.visible = currentScene === 6;
    if (gardenGroupRef.current) gardenGroupRef.current.visible = currentScene >= 7 && currentScene <= 14;
    if (cakeGroupRef.current) cakeGroupRef.current.visible = currentScene === 9;
    if (doorGroupRef.current) doorGroupRef.current.visible = currentScene === 10;
    if (proposalGroupRef.current) proposalGroupRef.current.visible = currentScene === 11 || currentScene === 12;
    if (celebrationGroupRef.current) celebrationGroupRef.current.visible = currentScene === 13 || currentScene === 14;
    if (sunriseGroupRef.current) sunriseGroupRef.current.visible = currentScene === 15;

    // Scene camera transitions using GSAP
    if (currentScene <= 5) {
      // Cyber radar view
      gsap.to(cam.position, { x: 0, y: 1.2, z: 6.5, duration: 1.2, ease: 'power2.out' });
      gsap.to(cam.rotation, { x: -0.1, y: 0, z: 0, duration: 1.2 });
    } else if (currentScene === 6) {
      // Gift Box close-up
      gsap.to(cam.position, { x: 0, y: 1.0, z: 4.2, duration: 1.5, ease: 'power2.inOut' });
      gsap.to(cam.rotation, { x: -0.15, y: 0, z: 0, duration: 1.5 });
    } else if (currentScene === 7 || currentScene === 8) {
      // Moonlit night garden panoramic
      gsap.to(cam.position, { x: 0, y: 0.8, z: 8.0, duration: 2.5, ease: 'power2.out' });
      gsap.to(cam.rotation, { x: 0.05, y: 0, z: 0, duration: 2.5 });
    } else if (currentScene === 9) {
      // Cake focus
      gsap.to(cam.position, { x: 0, y: 0.8, z: 4.8, duration: 1.8, ease: 'power2.out' });
      gsap.to(cam.rotation, { x: -0.05, y: 0, z: 0, duration: 1.8 });
    } else if (currentScene === 10) {
      // Mystical Door
      gsap.to(cam.position, { x: 0, y: 0.2, z: 5.5, duration: 1.8, ease: 'power2.out' });
      gsap.to(cam.rotation, { x: 0, y: 0, z: 0, duration: 1.8 });
    } else if (currentScene === 11 || currentScene === 12) {
      // Velvet Ring Box & Sparkling Diamond
      gsap.to(cam.position, { x: 0, y: 1.2, z: 3.2, duration: 2.0, ease: 'power3.out' });
      gsap.to(cam.rotation, { x: -0.3, y: 0, z: 0, duration: 2.0 });
    } else if (currentScene === 13 || currentScene === 14) {
      // Celebration 360 degree vista
      gsap.to(cam.position, { x: 0, y: 1.5, z: 6.0, duration: 2.0, ease: 'power2.out' });
      gsap.to(cam.rotation, { x: -0.1, y: 0, z: 0, duration: 2.0 });
    } else if (currentScene === 15) {
      // Final Sunrise pull-back
      gsap.to(cam.position, { x: 0, y: 0.5, z: 7.5, duration: 3.5, ease: 'power1.inOut' });
      gsap.to(cam.rotation, { x: 0.02, y: 0, z: 0, duration: 3.5 });
    }
  }, [currentScene]);

  // Handle Box Opening animation
  useEffect(() => {
    if (boxLidRef.current && currentScene === 6) {
      if (boxOpenCount > 0) {
        gsap.to(boxLidRef.current.rotation, {
          x: -Math.PI * 0.65,
          duration: 0.6,
          ease: 'back.out(1.8)',
          onComplete: () => {
            // bounce closed ready for next box
            gsap.to(boxLidRef.current!.rotation, {
              x: 0,
              delay: 0.7,
              duration: 0.5,
              ease: 'power2.in',
            });
          },
        });
      }
    }
  }, [boxOpenCount, currentScene]);

  // Handle Candle Extinguish animation
  useEffect(() => {
    if (currentScene === 9 && candlesBlown) {
      flameMeshesRef.current.forEach((flame) => {
        gsap.to(flame.scale, { x: 0.001, y: 0.001, z: 0.001, duration: 0.4, ease: 'power2.in' });
      });
      flameLightsRef.current.forEach((light) => {
        gsap.to(light, { intensity: 0, duration: 0.4 });
      });
    }
  }, [candlesBlown, currentScene]);

  // Handle Door Opening animation
  useEffect(() => {
    if (currentScene === 10 && doorLeafRef.current) {
      if (doorOpened) {
        gsap.to(doorLeafRef.current.rotation, {
          y: -Math.PI * 0.6,
          duration: 2.2,
          ease: 'power2.inOut',
        });
        if (cameraRef.current) {
          // Camera glides straight through the open golden door
          gsap.to(cameraRef.current.position, {
            z: 0.5,
            duration: 2.5,
            ease: 'power2.in',
          });
        }
      } else {
        doorLeafRef.current.rotation.y = 0;
      }
    }
  }, [doorOpened, currentScene]);

  // Handle Ring Box Opening animation
  useEffect(() => {
    if ((currentScene === 11 || currentScene === 12) && ringBoxLidRef.current) {
      if (ringRevealed) {
        gsap.to(ringBoxLidRef.current.rotation, {
          x: -Math.PI * 0.65,
          duration: 1.8,
          ease: 'power2.out',
        });
      } else {
        ringBoxLidRef.current.rotation.x = 0;
      }
    }
  }, [ringRevealed, currentScene]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      onClick={() => {
        if (currentScene === 6 && onBoxClick) onBoxClick();
        if (currentScene === 9 && onCandleClick) onCandleClick();
        if (currentScene === 10 && onDoorClick) onDoorClick();
      }}
    />
  );
};
