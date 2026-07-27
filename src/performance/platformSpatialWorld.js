import * as THREE from "three";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { RGBELoader } from "three/addons/loaders/RGBELoader.js";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";
import { OutputPass } from "three/addons/postprocessing/OutputPass.js";

const COLORS = {
  blue: 0x78a9ff,
  teal: 0x72d1c6,
  mint: 0x89d9aa,
  cyan: 0x6edcff,
  violet: 0xa57bff,
  magenta: 0xff73d3,
  amber: 0xffd28c,
  steel: 0x2a3438,
  steelDark: 0x1c2528,
  steelLight: 0x39464b,
};

const ZONES = {
  overview: { id: "overview", label: "Overview", pos: [0, 8.0, 29.6], look: [0, 1.75, -0.45] },
  buckets: { id: "buckets", label: "Platform Systems", pos: [0.6, 6.2, 14.8], look: [0.8, 2.05, -7.7] },
  timeline: { id: "timeline", label: "Activity Runway", pos: [5.6, 5.4, 12.4], look: [4.5, 1.25, 1.1] },
  files: { id: "files", label: "Notable Signals", pos: [0, 4.0, 15.6], look: [0, 1.65, 6.05] },
  vault: { id: "vault", label: "App Health", pos: [-15.0, 6.8, 5.8], look: [-8.25, 3.95, -7.0] },
};

function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

export function createStorageWorld(options) {
  const {
    canvas,
    touchTargets,
    tooltip,
    buckets,
    months,
    files,
    formatBytes,
    core = {},
    activity = [],
    onZoneChange = () => {},
    onBucketSelected = () => {},
    onMonthSelected = () => {},
    onFileSelected = () => {},
    onVaultSelected = () => {},
    qualityPreference: initialQualityPreference = "auto",
    onPerformanceSample = () => {},
    onQualityChange = () => {},
    onFirstRender = () => {},
  } = options;
  const coreRows = Array.isArray(core.rows) ? core.rows : [];
  const healthScoreRow = coreRows.find(([label]) => label === "Health score");

  const QUALITY_SETTINGS = Object.freeze({
    performance: { pixelRatioMin: 1, pixelRatioMax: 1, samples: 0, bloom: 0.55, shadowSize: 1024, targetFps: 45 },
    balanced: { pixelRatioMin: 1, pixelRatioMax: 1.4, samples: 2, bloom: 0.85, shadowSize: 1024, targetFps: 60 },
    cinematic: { pixelRatioMin: 1.35, pixelRatioMax: 2, samples: 4, bloom: 1, shadowSize: 2048, targetFps: 60 },
  });

  function automaticQuality() {
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    const coarse = window.matchMedia("(pointer: coarse), (hover: none)").matches;
    const constrainedConnection = Boolean(connection?.saveData) || /(^|-)2g|3g/.test(String(connection?.effectiveType || ""));
    const constrainedHardware = Number(navigator.deviceMemory) > 0 && Number(navigator.deviceMemory) <= 4
      || Number(navigator.hardwareConcurrency) > 0 && Number(navigator.hardwareConcurrency) <= 4;
    return coarse || constrainedConnection || constrainedHardware ? "performance" : "balanced";
  }

  function resolveQuality(preference) {
    if (preference === "performance" || preference === "cinematic") return preference;
    return automaticQuality();
  }

  let qualityState = {
    preference: ["auto", "performance", "cinematic"].includes(initialQualityPreference) ? initialQualityPreference : "auto",
    effective: resolveQuality(initialQualityPreference),
  };
  let qualitySettings = QUALITY_SETTINGS[qualityState.effective];
  let keyLight = null;
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: false, powerPreference: "high-performance" });
  const renderPixelRatio = () => Math.min(Math.max(window.devicePixelRatio || 1, qualitySettings.pixelRatioMin), qualitySettings.pixelRatioMax);
  renderer.setPixelRatio(renderPixelRatio());
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.24;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.info.autoReset = false;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x0d2232);
  scene.backgroundIntensity = 1.28;
  scene.fog = new THREE.FogExp2(0x0d2232, 0.00285);
  scene.environmentIntensity = 0.84;

  const camera = new THREE.PerspectiveCamera(38, window.innerWidth / window.innerHeight, 0.1, 300);

  let assetsReady = false;
  const loadingManager = new THREE.LoadingManager();
  loadingManager.onLoad = () => { assetsReady = true; };
  new RGBELoader(loadingManager).load("assets/performance-spatial/hdri/studio_small_01_1k.hdr", (texture) => {
    texture.mapping = THREE.EquirectangularReflectionMapping;
    scene.environment = texture;
  });

  const textureLoader = new THREE.TextureLoader(loadingManager);
  const fileSkinAtlas = textureLoader.load("assets/performance-spatial/textures/file-cube-skins.png", (texture) => {
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
    texture.needsUpdate = true;
  });
  fileSkinAtlas.colorSpace = THREE.SRGBColorSpace;
  fileSkinAtlas.wrapS = THREE.ClampToEdgeWrapping;
  fileSkinAtlas.wrapT = THREE.ClampToEdgeWrapping;
  const siloSkinAtlas = textureLoader.load("assets/performance-spatial/textures/silo-open-panels.png", (texture) => {
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
    texture.needsUpdate = true;
  });
  siloSkinAtlas.colorSpace = THREE.SRGBColorSpace;
  siloSkinAtlas.wrapS = THREE.ClampToEdgeWrapping;
  siloSkinAtlas.wrapT = THREE.ClampToEdgeWrapping;
  const siloClosedAtlas = textureLoader.load("assets/performance-spatial/textures/silo-closed-panels.png", (texture) => {
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
    texture.needsUpdate = true;
  });
  siloClosedAtlas.colorSpace = THREE.SRGBColorSpace;
  siloClosedAtlas.wrapS = THREE.ClampToEdgeWrapping;
  siloClosedAtlas.wrapT = THREE.ClampToEdgeWrapping;
  const capacityCoreAtlas = textureLoader.load("assets/performance-spatial/textures/capacity-core-kit.png", (texture) => {
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
    texture.needsUpdate = true;
  });
  capacityCoreAtlas.colorSpace = THREE.SRGBColorSpace;
  capacityCoreAtlas.wrapS = THREE.ClampToEdgeWrapping;
  capacityCoreAtlas.wrapT = THREE.ClampToEdgeWrapping;
  const floorDeckAtlas = textureLoader.load("assets/performance-spatial/textures/floor-deck.png", (texture) => {
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
    texture.needsUpdate = true;
  });
  floorDeckAtlas.colorSpace = THREE.SRGBColorSpace;
  floorDeckAtlas.wrapS = THREE.ClampToEdgeWrapping;
  floorDeckAtlas.wrapT = THREE.ClampToEdgeWrapping;
  const outerWallAtlas = textureLoader.load("assets/performance-spatial/textures/outer-walls.png", (texture) => {
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
    texture.needsUpdate = true;
    scene.background = texture;
    scene.backgroundIntensity = 1.34;
  });
  outerWallAtlas.colorSpace = THREE.SRGBColorSpace;
  outerWallAtlas.wrapS = THREE.ClampToEdgeWrapping;
  outerWallAtlas.wrapT = THREE.ClampToEdgeWrapping;
  const composer = new EffectComposer(renderer);
  let composerPixelRatio = renderer.getPixelRatio();
  if (renderer.capabilities.isWebGL2) {
    composer.renderTarget1.samples = qualitySettings.samples;
    composer.renderTarget2.samples = qualitySettings.samples;
  }
  composer.addPass(new RenderPass(scene, camera));
  const bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 0.28, 0.24, 0.95);
  composer.addPass(bloomPass);
  composer.addPass(new OutputPass());

  function applyViewportTuning() {
    const compact = camera.aspect < 0.75;
    renderer.toneMappingExposure = compact ? 1.28 : 1.24;
    bloomPass.strength = (compact ? 0.26 : 0.22) * qualitySettings.bloom;
    bloomPass.radius = compact ? 0.24 : 0.2;
    if (scene.background?.isColor) scene.background.setHex(compact ? 0x102b40 : 0x0d2232);
    scene.backgroundIntensity = compact ? 1.42 : 1.34;
    scene.fog.color.setHex(compact ? 0x102b40 : 0x0d2232);
    scene.fog.density = compact ? 0.00235 : 0.00285;
    scene.environmentIntensity = compact ? 0.92 : 0.84;
  }

  function applyQuality(preference = "auto") {
    qualityState = {
      preference: ["auto", "performance", "cinematic"].includes(preference) ? preference : "auto",
      effective: resolveQuality(preference),
    };
    qualitySettings = QUALITY_SETTINGS[qualityState.effective];
    if (renderer.capabilities.isWebGL2) {
      composer.renderTarget1.samples = qualitySettings.samples;
      composer.renderTarget2.samples = qualitySettings.samples;
    }
    const nextPixelRatio = renderPixelRatio();
    if (renderer.getPixelRatio() !== nextPixelRatio) renderer.setPixelRatio(nextPixelRatio);
    if (composerPixelRatio !== nextPixelRatio) {
      composer.setPixelRatio(nextPixelRatio);
      composerPixelRatio = nextPixelRatio;
    }
    if (keyLight) {
      keyLight.shadow.mapSize.set(qualitySettings.shadowSize, qualitySettings.shadowSize);
      keyLight.shadow.map?.dispose();
      keyLight.shadow.map = null;
      keyLight.shadow.needsUpdate = true;
    }
    applyViewportTuning();
    onQualityChange({ ...qualityState });
    return { ...qualityState };
  }

  const interactive = [];
  const animated = [];
  const zoneLabels = [];
  const clock = new THREE.Clock();
  const raycaster = new THREE.Raycaster();
  const pointerNdc = new THREE.Vector2(10, 10);
  const pointerClient = { x: 0, y: 0, overCanvas: false };
  let hovered = null;
  let selected = null;
  let currentZone = "overview";

  // ---------------------------------------------------------------------------
  // Camera rig: eased travel between zones plus a manual drag-orbit offset that
  // unwinds whenever the camera travels somewhere new.
  // ---------------------------------------------------------------------------
  const rig = {
    basePos: new THREE.Vector3(...ZONES.overview.pos),
    baseLook: new THREE.Vector3(...ZONES.overview.look),
    fromPos: new THREE.Vector3(),
    toPos: new THREE.Vector3(...ZONES.overview.pos),
    fromLook: new THREE.Vector3(),
    toLook: new THREE.Vector3(...ZONES.overview.look),
    t: 1,
    duration: 1.7,
    yaw: 0,
    pitch: 0,
    yawStart: 0,
    pitchStart: 0,
  };
  const tmpOffset = new THREE.Vector3();
  const tmpSpherical = new THREE.Spherical();

  function distanceScale() {
    if (camera.aspect < 0.58) return 1.78;
    if (camera.aspect < 0.9) return 1.52;
    return 1;
  }

  function travelTo(pos, look, duration = 1.7) {
    rig.fromPos.copy(rig.basePos);
    rig.fromLook.copy(rig.baseLook);
    rig.toLook.copy(look);
    rig.toPos.copy(look).add(tmpOffset.copy(pos).sub(look).multiplyScalar(distanceScale()));
    rig.yawStart = rig.yaw;
    rig.pitchStart = rig.pitch;
    rig.t = 0;
    rig.duration = duration;
  }

  function travelToZone(id, duration = 1.7) {
    const zone = ZONES[id];
    currentZone = id;
    travelTo(new THREE.Vector3(...zone.pos), new THREE.Vector3(...zone.look), duration);
    onZoneChange(zone);
  }

  // ---------------------------------------------------------------------------
  // Materials and helpers
  // ---------------------------------------------------------------------------
  function metal(color, { roughness = 0.36, metalness = 0.55, emissive = 0x000000, emissiveIntensity = 0.3 } = {}) {
    return new THREE.MeshStandardMaterial({ color, roughness, metalness, emissive, emissiveIntensity });
  }

  function matte(color, { roughness = 0.72, metalness = 0.1, emissive = 0x000000, emissiveIntensity = 0.3 } = {}) {
    return new THREE.MeshStandardMaterial({ color, roughness, metalness, emissive, emissiveIntensity });
  }

  function glow(color, intensity = 1.6) {
    return new THREE.MeshStandardMaterial({
      color: 0x0c1416,
      emissive: color,
      emissiveIntensity: intensity * 0.82,
      roughness: 0.4,
      metalness: 0.1,
    });
  }

  function addMesh(parent, geometry, material, position, { shadow = true } = {}) {
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(...position);
    mesh.castShadow = shadow;
    mesh.receiveShadow = shadow;
    parent.add(mesh);
    return mesh;
  }

  function roundedBox(parent, size, position, material, opts) {
    const radius = Math.min(0.14, Math.min(...size) * 0.24);
    return addMesh(parent, new RoundedBoxGeometry(...size, 4, radius), material, position, opts);
  }

  function atlasTexture({ x, y, w, h }, atlas = fileSkinAtlas) {
    const texture = atlas.clone();
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
    texture.wrapS = THREE.ClampToEdgeWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;
    texture.repeat.set(w, h);
    texture.offset.set(x, 1 - y - h);
    texture.needsUpdate = true;
    return texture;
  }

  function skinMaterial(rect, { emissiveIntensity = 0.36, opacity = 1, atlas = fileSkinAtlas, emissive = 0x75dcff, metalness = 0.72, roughness = 0.34, side = THREE.FrontSide } = {}) {
    const texture = atlasTexture(rect, atlas);
    return new THREE.MeshStandardMaterial({
      color: 0xffffff,
      map: texture,
      emissive,
      emissiveMap: texture,
      emissiveIntensity,
      roughness,
      metalness,
      side,
      transparent: opacity < 1,
      opacity,
      polygonOffset: true,
      polygonOffsetFactor: -2,
      polygonOffsetUnits: -2,
    });
  }

  function additiveAtlasMaterial(rect, { atlas = fileSkinAtlas, color = 0xffffff, opacity = 0.65 } = {}) {
    return new THREE.MeshBasicMaterial({
      map: atlasTexture(rect, atlas),
      color,
      transparent: true,
      opacity,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      side: THREE.DoubleSide,
    });
  }

  function texturedPanel(parent, size, position, material, rotation = [0, 0, 0]) {
    const panel = addMesh(parent, new THREE.PlaneGeometry(...size), material, position, { shadow: false });
    panel.rotation.set(...rotation);
    panel.renderOrder = 4;
    return panel;
  }

  function radialPanel(parent, rect, { angle = 0, radius = 0.78, y = 1, width = 0.42, height = 2, atlas, emissive = 0x6edcff, emissiveIntensity = 0.22 } = {}) {
    return texturedPanel(
      parent,
      [width, height],
      [Math.sin(angle) * radius, y, Math.cos(angle) * radius],
      skinMaterial(rect, {
        atlas,
        emissive,
        emissiveIntensity,
        metalness: 0.82,
        roughness: 0.36,
        side: THREE.DoubleSide,
      }),
      [0, angle, 0],
    );
  }

  function trimmedRadialPanel(parent, rect, { angle = 0, radius = 0.78, y = 1, width = 0.42, height = 2, atlas, emissive = 0x6edcff, emissiveIntensity = 0.22, trim = true } = {}) {
    const group = new THREE.Group();
    group.position.set(Math.sin(angle) * radius, y, Math.cos(angle) * radius);
    group.rotation.y = angle;
    parent.add(group);

    const art = texturedPanel(
      group,
      [width, height],
      [0, 0, 0.006],
      skinMaterial(rect, {
        atlas,
        emissive,
        emissiveIntensity,
        metalness: 0.82,
        roughness: 0.36,
        side: THREE.DoubleSide,
      }),
    );
    art.userData.kind = "closedSiloSkin";

    if (trim) {
      const trimMat = metal(0x02060a, { roughness: 0.44, metalness: 0.92, emissive: 0x010406, emissiveIntensity: 0.08 });
      const capMat = metal(0x071018, { roughness: 0.42, metalness: 0.9, emissive: 0x021016, emissiveIntensity: 0.14 });
      [
        [-width / 2 - 0.035, 0, 0.024, 0.07, height + 0.04, 0.06],
        [width / 2 + 0.035, 0, 0.024, 0.07, height + 0.04, 0.06],
      ].forEach(([px, py, pz, sx, sy, sz]) => {
        const rail = roundedBox(group, [sx, sy, sz], [px, py, pz], trimMat, { shadow: false });
        rail.userData.kind = "closedSiloSkin";
      });
      [
        [0, height / 2 + 0.035, 0.028, width + 0.15, 0.07, 0.065],
        [0, -height / 2 - 0.035, 0.028, width + 0.15, 0.07, 0.065],
      ].forEach(([px, py, pz, sx, sy, sz]) => {
        const cap = roundedBox(group, [sx, sy, sz], [px, py, pz], capMat, { shadow: false });
        cap.userData.kind = "closedSiloSkin";
      });
    }

    group.userData.kind = "closedSiloSkin";
    return group;
  }

  function dataPacket(parent, from, to, color, { phase = 0, speed = 0.12, size = 0.12 } = {}) {
    const packet = addMesh(
      parent,
      new THREE.SphereGeometry(size, 12, 8),
      new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.72, blending: THREE.AdditiveBlending, depthWrite: false }),
      from,
      { shadow: false },
    );
    packet.userData.kind = "dataPacket";
    packet.userData.from = new THREE.Vector3(...from);
    packet.userData.to = new THREE.Vector3(...to);
    packet.userData.phase = phase;
    packet.userData.speed = speed;
    animated.push(packet);
    return packet;
  }

  function register(mesh, payload) {
    if (payload.platformTooltip) payload.tooltip = payload.platformTooltip;
    mesh.userData.payload = payload;
    mesh.userData.baseScale = mesh.scale.clone();
    mesh.userData.baseY = mesh.position.y;
    mesh.userData.baseEmissive = mesh.material.emissiveIntensity ?? 0;
    interactive.push(mesh);
    animated.push(mesh);
    return mesh;
  }

  function makeLabel(lines, { accent = "#eef7f4", scale = 1, chip = true } = {}) {
    // These cards can fill much of the viewport when a physical object opens.
    // Render their type above browser-UI density at that close viewing distance.
    const dpr = Math.min(Math.max(window.devicePixelRatio * 2, 3), 4);
    const pad = 24;
    const fonts = ['540 31px Inter, "Segoe UI", Arial, sans-serif', '450 22px Inter, "Segoe UI", Arial, sans-serif'];
    const lineStep = [40, 31];
    const measure = document.createElement("canvas").getContext("2d");
    let textWidth = 0;
    lines.forEach((line, index) => {
      measure.font = fonts[Math.min(index, 1)];
      textWidth = Math.max(textWidth, measure.measureText(line).width);
    });
    const width = Math.ceil(textWidth + pad * 2);
    const height = pad * 2 + lines.reduce((total, _, index) => total + lineStep[Math.min(index, 1)], 0) - 12;
    const labelCanvas = document.createElement("canvas");
    labelCanvas.width = width * dpr;
    labelCanvas.height = height * dpr;
    const ctx = labelCanvas.getContext("2d");
    ctx.scale(dpr, dpr);
    if (chip) {
      ctx.fillStyle = "rgba(6, 12, 13, 0.84)";
      ctx.beginPath();
      ctx.roundRect(1, 1, width - 2, height - 2, 14);
      ctx.fill();
      ctx.strokeStyle = "rgba(190, 235, 228, 0.32)";
      ctx.lineWidth = 2;
      ctx.stroke();
    } else {
      ctx.shadowColor = "rgba(0, 0, 0, 0.85)";
      ctx.shadowBlur = 3;
    }
    ctx.textAlign = "center";
    let y = pad + 28;
    lines.forEach((line, index) => {
      ctx.font = fonts[Math.min(index, 1)];
      ctx.fillStyle = index === 0 ? accent : "#a7b3b3";
      ctx.fillText(line, width / 2, y);
      y += lineStep[Math.min(index, 1)];
    });
    const texture = new THREE.CanvasTexture(labelCanvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = 4;
    const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: texture, transparent: true, depthWrite: false }));
    sprite.scale.set((width / 110) * scale, (height / 110) * scale, 1);
    return sprite;
  }

  function makeHudPanel({
    eyebrow = "App performance",
    title,
    subtitle = "",
    badge = "",
    rows = [],
    footer = "",
    status = "Online",
    accent = "#6edcff",
    width = 520,
    height = 300,
    scale = 1,
  }) {
    const dpr = 2;
    const panelCanvas = document.createElement("canvas");
    panelCanvas.width = width * dpr;
    panelCanvas.height = height * dpr;
    const ctx = panelCanvas.getContext("2d");
    ctx.scale(dpr, dpr);

    const cut = 16;
    const panelPath = () => {
      ctx.beginPath();
      ctx.moveTo(cut, 1);
      ctx.lineTo(width - cut, 1);
      ctx.lineTo(width - 1, cut);
      ctx.lineTo(width - 1, height - cut);
      ctx.lineTo(width - cut, height - 1);
      ctx.lineTo(cut, height - 1);
      ctx.lineTo(1, height - cut);
      ctx.lineTo(1, cut);
      ctx.closePath();
    };

    panelPath();
    ctx.fillStyle = "rgba(2, 8, 13, 0.985)";
    ctx.fill();

    const wash = ctx.createLinearGradient(0, 0, width, height);
    wash.addColorStop(0, "rgba(110, 220, 255, 0.075)");
    wash.addColorStop(0.32, "rgba(8, 19, 28, 0.02)");
    wash.addColorStop(1, "rgba(232, 173, 98, 0.035)");
    panelPath();
    ctx.fillStyle = wash;
    ctx.fill();

    panelPath();
    ctx.strokeStyle = "rgba(110, 220, 255, 0.42)";
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.strokeStyle = accent;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(38, 1);
    ctx.lineTo(Math.min(width * 0.42, 210), 1);
    ctx.stroke();

    ctx.strokeStyle = "rgba(110, 220, 255, 0.18)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(26, 92);
    ctx.lineTo(width - 26, 92);
    ctx.moveTo(26, height - 35);
    ctx.lineTo(width - 26, height - 35);
    ctx.stroke();

    const fitText = (text, maxWidth, maxSize, minSize, weight = 600) => {
      let fontSize = maxSize;
      do {
        ctx.font = `${weight} ${fontSize}px Inter, "Segoe UI", Arial, sans-serif`;
        if (ctx.measureText(String(text)).width <= maxWidth) break;
        fontSize -= 1;
      } while (fontSize > minSize);
      return fontSize;
    };

    ctx.fillStyle = accent;
    ctx.font = '560 12px Inter, "Segoe UI", Arial, sans-serif';
    ctx.fillText(eyebrow.toUpperCase(), 28, 27);

    if (badge) {
      ctx.font = '620 12px Inter, "Segoe UI", Arial, sans-serif';
      const badgeWidth = Math.max(74, ctx.measureText(badge.toUpperCase()).width + 24);
      const badgeX = width - 28 - badgeWidth;
      ctx.fillStyle = "rgba(110, 220, 255, 0.07)";
      ctx.strokeStyle = "rgba(110, 220, 255, 0.28)";
      ctx.beginPath();
      ctx.roundRect(badgeX, 13, badgeWidth, 27, 4);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = "#dff4ff";
      ctx.textAlign = "center";
      ctx.fillText(badge.toUpperCase(), badgeX + badgeWidth / 2, 32);
      ctx.textAlign = "left";
    }

    const titleWidth = width - 56;
    fitText(title, titleWidth, 30, 18, 610);
    ctx.fillStyle = "#eef7f8";
    ctx.fillText(title, 28, 59);

    if (subtitle) {
      fitText(subtitle, titleWidth, 14, 11, 480);
      ctx.fillStyle = "rgba(169, 187, 194, 0.82)";
      ctx.fillText(subtitle, 28, 80);
    }

    const rowsTop = 105;
    const rowsBottom = height - 42;
    const rowHeight = Math.max(32, (rowsBottom - rowsTop) / Math.max(rows.length, 1));
    rows.forEach(([label, value], index) => {
      const rowY = rowsTop + rowHeight * index;
      if (index > 0) {
        ctx.strokeStyle = "rgba(171, 212, 222, 0.10)";
        ctx.beginPath();
        ctx.moveTo(28, rowY);
        ctx.lineTo(width - 28, rowY);
        ctx.stroke();
      }

      ctx.fillStyle = index === 0 ? accent : "rgba(110, 220, 255, 0.48)";
      ctx.fillRect(28, rowY + rowHeight / 2 - 3, 6, 6);

      ctx.fillStyle = "#8fa3ad";
      ctx.font = '540 13px Inter, "Segoe UI", Arial, sans-serif';
      ctx.fillText(label.toUpperCase(), 46, rowY + rowHeight / 2 + 4);

      ctx.fillStyle = index === 0 ? accent : "#eff8ff";
      fitText(value, width * 0.52, index === 0 ? 24 : 20, 13, index === 0 ? 640 : 580);
      ctx.textAlign = "right";
      ctx.fillText(value, width - 28, rowY + rowHeight / 2 + (index === 0 ? 7 : 6));
      ctx.textAlign = "left";
    });

    if (footer) {
      ctx.fillStyle = "rgba(164, 183, 189, 0.72)";
      ctx.font = '520 11px Inter, "Segoe UI", Arial, sans-serif';
      fitText(footer.toUpperCase(), width - 148, 11, 9, 520);
      ctx.fillText(footer.toUpperCase(), 28, height - 15);
    }

    if (status) {
      ctx.fillStyle = "#72d9a4";
      ctx.beginPath();
      ctx.arc(width - 94, height - 18, 3, 0, Math.PI * 2);
      ctx.fill();
      ctx.font = '600 11px Inter, "Segoe UI", Arial, sans-serif';
      ctx.textAlign = "right";
      ctx.fillText(status.toUpperCase(), width - 28, height - 15);
      ctx.textAlign = "left";
    }

    const texture = new THREE.CanvasTexture(panelCanvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
    texture.generateMipmaps = false;
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.needsUpdate = true;
    const sprite = new THREE.Sprite(
      new THREE.SpriteMaterial({ map: texture, transparent: true, depthTest: false, depthWrite: false, toneMapped: false }),
    );
    sprite.scale.set((width / 78) * scale, (height / 78) * scale, 1);
    return sprite;
  }

  // Labels tagged with a zone stay crisp when that zone (or the overview) is
  // active and fade way down otherwise, so zoomed views stay uncluttered.
  function tagLabel(sprite, zone) {
    zoneLabels.push({ sprite, zone });
    return sprite;
  }

  // ---------------------------------------------------------------------------
  // Space environment: starfield, nebulae, and a floating dark-glass deck
  // ---------------------------------------------------------------------------
  const root = new THREE.Group();
  scene.add(root);
  const worldHudGroup = new THREE.Group();
  worldHudGroup.visible = false;
  root.add(worldHudGroup);

  new GLTFLoader(loadingManager).load(
    "assets/performance-spatial/models/maintain_ops_concept_kit.glb",
    (gltf) => {
      const kit = gltf.scene;
      kit.name = "Blender concept architecture kit";
      kit.position.set(0, -0.04, 0);
      kit.traverse((object) => {
        if (!object.isMesh) return;
        const importedFloor =
          object.name.includes("kit_stage_") ||
          object.name.includes("kit_floor_armor_plate");
        const importedFileEmitter =
          object.name.includes("kit_file_emitter_") ||
          object.name.includes("kit_file_glass_shard_");
        const importedBackdrop = object.name.includes("kit_back_");
        if (object.name.includes("kit_perimeter_heat_fin") || object.name.includes("kit_side_reactor_tower") || importedFloor || importedFileEmitter || importedBackdrop) {
          object.visible = false;
          return;
        }
        object.castShadow = true;
        object.receiveShadow = true;
        if (object.material) {
          object.material.envMapIntensity = object.material.name.toLowerCase().includes("emissive") ? 0.5 : 0.9;
          if (object.material.emissiveIntensity) object.material.emissiveIntensity *= 0.72;
        }
      });
      root.add(kit);
    },
    undefined,
    (error) => {
      console.warn("Blender concept kit failed to load", error);
    },
  );

  // The chamber artwork is assigned directly to scene.background so it owns
  // the full viewport without entering the 3D depth buffer.

  // Floating deck: the circular floor art is the source of truth, with the
  // procedural geometry acting as thickness and glow trim around it.
  const deck = addMesh(
    root,
    new THREE.CylinderGeometry(18.6, 19.6, 0.55, 96),
    metal(0x071019, { roughness: 0.36, metalness: 0.84, emissive: 0x02090d, emissiveIntensity: 0.12 }),
    [0, -0.28, 0.5],
  );
  deck.receiveShadow = true;
  const floorDeck = addMesh(
    root,
    new THREE.CircleGeometry(18.35, 160),
    new THREE.MeshPhysicalMaterial({
      map: floorDeckAtlas,
      color: 0xffffff,
      roughness: 0.46,
      metalness: 0.86,
      emissive: 0x163240,
      emissiveMap: floorDeckAtlas,
      emissiveIntensity: 0.18,
      clearcoat: 0.22,
      clearcoatRoughness: 0.5,
      side: THREE.DoubleSide,
    }),
    [0, 0.015, 0.5],
    { shadow: false },
  );
  floorDeck.rotation.x = -Math.PI / 2;
  floorDeck.receiveShadow = true;
  const floorDetailGlow = addMesh(
    root,
    new THREE.CircleGeometry(18.28, 160),
    new THREE.MeshBasicMaterial({
      map: floorDeckAtlas,
      color: 0x8feaff,
      transparent: true,
      opacity: 0.07,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      side: THREE.DoubleSide,
    }),
    [0, 0.028, 0.5],
    { shadow: false },
  );
  floorDetailGlow.rotation.x = -Math.PI / 2;
  floorDetailGlow.renderOrder = 1;
  addMesh(root, new THREE.CylinderGeometry(19.6, 16.8, 1.6, 96), metal(0x060d14, { roughness: 0.54, metalness: 0.72, emissive: 0x010407, emissiveIntensity: 0.08 }), [0, -1.35, 0.5]);

  function deckSector(innerRadius, outerRadius, startAngle, endAngle, material, y = 0.045) {
    const shape = new THREE.Shape();
    shape.absarc(0, 0, outerRadius, startAngle, endAngle, false);
    shape.lineTo(Math.cos(endAngle) * innerRadius, Math.sin(endAngle) * innerRadius);
    shape.absarc(0, 0, innerRadius, endAngle, startAngle, true);
    shape.closePath();
    const sector = addMesh(root, new THREE.ShapeGeometry(shape, 10), material, [0, y, 0.5], { shadow: false });
    sector.rotation.x = -Math.PI / 2;
    sector.renderOrder = 2;
    return sector;
  }

  // Recessed central service hatch. Its layered plates, seams, fasteners, and
  // inset signal channels make the empty center read as manufactured deck.
  const centerPlateDark = metal(0x071018, {
    roughness: 0.5,
    metalness: 0.9,
    emissive: 0x02070a,
    emissiveIntensity: 0.06,
  });
  const centerPlateLight = metal(0x0b1821, {
    roughness: 0.43,
    metalness: 0.88,
    emissive: 0x031018,
    emissiveIntensity: 0.07,
  });
  addMesh(
    root,
    new THREE.CylinderGeometry(2.12, 2.12, 0.055, 96),
    metal(0x03090e, { roughness: 0.55, metalness: 0.94, emissive: 0x010405, emissiveIntensity: 0.04 }),
    [0, 0.018, 0.5],
    { shadow: false },
  );
  for (let i = 0; i < 12; i += 1) {
    const gap = 0.022;
    const start = (i / 12) * Math.PI * 2 + gap;
    const end = ((i + 1) / 12) * Math.PI * 2 - gap;
    deckSector(0.72, 2.02, start, end, i % 2 === 0 ? centerPlateDark : centerPlateLight, 0.052);

    const angle = start + (end - start) * 0.5;
    const seamRadius = 1.37;
    const seam = roundedBox(
      root,
      [0.018, 0.018, 1.14],
      [Math.cos(angle) * seamRadius, 0.058, Math.sin(angle) * seamRadius + 0.5],
      metal(0x010407, { roughness: 0.58, metalness: 0.94, emissive: 0x000102, emissiveIntensity: 0.02 }),
      { shadow: false },
    );
    seam.rotation.y = -angle;

    const fastenerAngle = angle;
    const fastenerRadius = 1.78;
    const fastener = addMesh(
      root,
      new THREE.CylinderGeometry(0.042, 0.042, 0.026, 10),
      metal(i % 3 === 0 ? 0x8c6842 : 0x1a2931, {
        roughness: 0.36,
        metalness: 0.94,
        emissive: i % 3 === 0 ? COLORS.amber : 0x05141b,
        emissiveIntensity: i % 3 === 0 ? 0.08 : 0.03,
      }),
      [Math.cos(fastenerAngle) * fastenerRadius, 0.077, Math.sin(fastenerAngle) * fastenerRadius + 0.5],
      { shadow: false },
    );
    fastener.renderOrder = 4;
  }

  const centerCap = addMesh(
    root,
    new THREE.CylinderGeometry(0.67, 0.7, 0.065, 48),
    metal(0x0a141b, { roughness: 0.38, metalness: 0.92, emissive: 0x031018, emissiveIntensity: 0.07 }),
    [0, 0.052, 0.5],
    { shadow: false },
  );
  centerCap.receiveShadow = true;
  [0.69, 1.12, 1.98].forEach((radius, index) => {
    const retainingRing = addMesh(
      root,
      new THREE.TorusGeometry(radius, index === 2 ? 0.025 : 0.014, 8, 96),
      metal(0x061018, {
        roughness: 0.48,
        metalness: 0.92,
        emissive: index === 1 ? 0x245564 : 0x071820,
        emissiveIntensity: index === 1 ? 0.1 : 0.04,
      }),
      [0, 0.072 + index * 0.001, 0.5],
      { shadow: false },
    );
    retainingRing.rotation.x = Math.PI / 2;
  });
  for (let i = 0; i < 4; i += 1) {
    const angle = i * (Math.PI / 2) + Math.PI / 4;
    const channelRadius = 1.5;
    const channel = roundedBox(
      root,
      [0.055, 0.018, 0.34],
      [Math.cos(angle) * channelRadius, 0.067, Math.sin(angle) * channelRadius + 0.5],
      metal(0x061018, { roughness: 0.48, metalness: 0.92, emissive: COLORS.cyan, emissiveIntensity: 0.16 }),
      { shadow: false },
    );
    channel.rotation.y = -angle;
  }

  const plateMaterials = [
    new THREE.MeshBasicMaterial({ color: 0x1b3444, transparent: true, opacity: 0.2, depthWrite: false }),
    new THREE.MeshBasicMaterial({ color: 0x0c1b26, transparent: true, opacity: 0.28, depthWrite: false }),
  ];
  [
    { inner: 2.15, outer: 5.1, count: 8, offset: 0.05 },
    { inner: 5.55, outer: 9.9, count: 12, offset: 0.18 },
    { inner: 10.35, outer: 14.65, count: 16, offset: 0.08 },
    { inner: 15.1, outer: 17.95, count: 20, offset: 0.0 },
  ].forEach((band, bandIndex) => {
    for (let i = 0; i < band.count; i += 1) {
      const gap = 0.012;
      const start = band.offset + (i / band.count) * Math.PI * 2 + gap;
      const end = band.offset + ((i + 1) / band.count) * Math.PI * 2 - gap;
      deckSector(band.inner, band.outer, start, end, plateMaterials[(i + bandIndex) % 2], 0.035 + bandIndex * 0.002);

      const midAngle = band.offset + (i / band.count) * Math.PI * 2;
      const midRadius = (band.inner + band.outer) * 0.5;
      const seamLength = band.outer - band.inner - 0.18;
      const seam = roundedBox(
        root,
        [0.026, 0.032, seamLength],
        [Math.cos(midAngle) * midRadius, 0.052 + bandIndex * 0.002, Math.sin(midAngle) * midRadius + 0.5],
        metal(0x02070b, { roughness: 0.46, metalness: 0.92, emissive: 0x02080c, emissiveIntensity: 0.06 }),
        { shadow: false },
      );
      seam.rotation.y = -midAngle;
      seam.renderOrder = 4;

      if (i % Math.max(2, Math.floor(band.count / 6)) === 0) {
        const light = roundedBox(
          root,
          [0.018, 0.04, seamLength * 0.5],
          [Math.cos(midAngle + 0.012) * midRadius, 0.018 + bandIndex * 0.001, Math.sin(midAngle + 0.012) * midRadius + 0.5],
          metal(0x07131a, { roughness: 0.48, metalness: 0.92, emissive: COLORS.cyan, emissiveIntensity: 0.045 }),
          { shadow: false },
        );
        light.rotation.y = -midAngle;
      }
    }
  });

  const outerLip = addMesh(root, new THREE.CylinderGeometry(18.72, 18.58, 0.18, 160, 1, true), metal(0x03080d, { roughness: 0.42, metalness: 0.9, emissive: 0x031016, emissiveIntensity: 0.12 }), [0, 0.06, 0.5], { shadow: false });
  outerLip.renderOrder = 1;
  const innerBevel = addMesh(root, new THREE.CylinderGeometry(14.9, 14.75, 0.08, 144, 1, true), metal(0x071018, { roughness: 0.5, metalness: 0.82, emissive: 0x031016, emissiveIntensity: 0.08 }), [0, 0.075, 0.5], { shadow: false });
  innerBevel.renderOrder = 1;
  const rimRing = addMesh(root, new THREE.TorusGeometry(18.45, 0.01, 10, 160), metal(0x07131a, { roughness: 0.48, metalness: 0.9, emissive: COLORS.cyan, emissiveIntensity: 0.06 }), [0, 0.02, 0.5], { shadow: false });
  rimRing.rotation.x = Math.PI / 2;
  const underRing = addMesh(root, new THREE.TorusGeometry(19.3, 0.045, 10, 128), glow(0x2b6a72, 0.28), [0, -0.9, 0.5], { shadow: false });
  underRing.rotation.x = Math.PI / 2;
  [2.15, 5.1, 5.55, 9.9, 10.35, 14.65, 15.1, 17.95].forEach((radius, index) => {
    const groove = addMesh(root, new THREE.TorusGeometry(radius, 0.012, 8, 160), metal(0x010508, { roughness: 0.52, metalness: 0.9, emissive: 0x000203, emissiveIntensity: 0.025 }), [0, 0.028 + index * 0.0008, 0.5], { shadow: false });
    groove.rotation.x = Math.PI / 2;
    groove.renderOrder = 2;
    const ring = addMesh(root, new THREE.TorusGeometry(radius + 0.03, 0.0035, 8, 128), metal(0x061018, { roughness: 0.52, metalness: 0.88, emissive: 0x2b6a72, emissiveIntensity: index % 3 === 0 ? 0.05 : 0.03 }), [0, 0.018 + index * 0.0006, 0.5], { shadow: false });
    ring.rotation.x = Math.PI / 2;
  });

  for (let i = 0; i < 16; i += 1) {
    const angle = (i / 16) * Math.PI * 2;
    const radius = 9.4;
    const length = 16.2;
    const x = Math.sin(angle) * radius;
    const z = Math.cos(angle) * radius + 0.5;
    const seam = roundedBox(
      root,
      [0.028, 0.024, length],
      [x, 0.038, z],
      metal(0x08121a, { roughness: 0.48, metalness: 0.92, emissive: 0x02080c, emissiveIntensity: 0.035 }),
      { shadow: false },
    );
    seam.rotation.y = angle;
    seam.renderOrder = 3;
  }

  for (let i = 0; i < 32; i += 1) {
    const angle = (i / 32) * Math.PI * 2;
    const radius = i % 2 ? 17.0 : 15.35;
    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius + 0.5;
    const inset = roundedBox(
      root,
      [i % 4 === 0 ? 0.08 : 0.055, 0.035, i % 4 === 0 ? 0.82 : 0.48],
      [x, 0.038, z],
      metal(0x07131a, { roughness: 0.46, metalness: 0.9, emissive: i % 5 === 0 ? COLORS.amber : COLORS.cyan, emissiveIntensity: i % 5 === 0 ? 0.12 : 0.08 }),
      { shadow: false },
    );
    inset.rotation.y = -angle;
  }

  [2.0, 3.0, 5.5, 8.2, 12.2].forEach((radius, index) => {
    const arc = addMesh(
      root,
      new THREE.TorusGeometry(radius, 0.009, 8, 96, Math.PI * (index % 2 ? 0.42 : 0.58)),
      metal(0x061018, { roughness: 0.52, metalness: 0.9, emissive: index % 2 ? COLORS.cyan : COLORS.teal, emissiveIntensity: 0.035 }),
      [0, 0.018 + index * 0.0008, 0.5],
      { shadow: false },
    );
    arc.rotation.x = Math.PI / 2;
    arc.rotation.z = index * 1.17;
  });

  [5.8, 10.8, 15.6].forEach((radius, index) => {
    const structuralRing = addMesh(
      root,
      new THREE.TorusGeometry(radius, 0.012, 12, 160),
      metal(0x061018, { roughness: 0.52, metalness: 0.9, emissive: index === 1 ? COLORS.teal : COLORS.cyan, emissiveIntensity: index === 1 ? 0.06 : 0.045 }),
      [0, 0.016 + index * 0.001, 0.5],
      { shadow: false },
    );
    structuralRing.rotation.x = Math.PI / 2;
  });

  // The older procedural pylons fought the Blender stage silhouette, so the
  // imported kit now owns the architectural frame.

  // A small number of rim blocks preserve depth without fighting the detailed
  // floor texture.
  for (let i = 0; i < 12; i += 1) {
    const angle = (i / 12) * Math.PI * 2;
    const radius = 16.2 + (i % 2) * 0.75;
    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius + 0.5;
    const plate = roundedBox(
      root,
      [1.45, 0.045, 0.28],
      [x, 0.12, z],
      metal(i % 2 === 0 ? 0x0b131b : 0x071018, { roughness: 0.52, metalness: 0.72, emissive: 0x041018, emissiveIntensity: 0.08 }),
      { shadow: false },
    );
    plate.rotation.y = -angle;
  }

  for (let i = 0; i < 26; i += 1) {
    const angle = (i / 26) * Math.PI * 2;
    const radius = 18.1 + (i % 2) * 0.5;
    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius + 0.5;
    const height = 0.5 + (i % 5) * 0.18;
    const fin = roundedBox(
      root,
      [0.12, height, 0.48],
      [x, 0.42 + height / 2, z],
      metal(0x07111a, { roughness: 0.32, metalness: 0.7, emissive: 0x08232f, emissiveIntensity: 0.32 }),
      { shadow: false },
    );
    fin.rotation.y = -angle;
    if (i % 3 === 0) {
      const beacon = roundedBox(root, [0.045, height * 0.72, 0.06], [x, 0.52 + height / 2, z], glow(i % 2 ? COLORS.blue : COLORS.cyan, 0.52), { shadow: false });
      beacon.rotation.y = -angle;
      beacon.userData.kind = "rail";
      beacon.userData.phase = i * 0.27;
      animated.push(beacon);
    }
  }

  const statusPanel = makeHudPanel({
    title: "System Status",
    rows: [["Platform core", "Current"], ["Process stream", "Sampled"]],
    footer: "Company-scoped view",
    accent: "#89d9aa",
    width: 250,
    height: 150,
    scale: 0.62,
  });
  statusPanel.position.set(-15.3, 8.1, -13.8);
  worldHudGroup.add(statusPanel);

  const healthPanel = makeHudPanel({
    title: "Platform Health",
    rows: [["Data scope", "Company"], ["Sample window", "Current"], ["Access", "Member"]],
    accent: "#72d1c6",
    width: 300,
    height: 190,
    scale: 0.72,
  });
  healthPanel.position.set(15.4, 7.6, -13.2);
  worldHudGroup.add(healthPanel);

  const usageDialGroup = new THREE.Group();
  usageDialGroup.position.set(0, 3.5, -12.2);
  worldHudGroup.add(usageDialGroup);
  const dialRing = addMesh(usageDialGroup, new THREE.TorusGeometry(1.18, 0.08, 12, 96), glow(COLORS.cyan, 1.05), [0, 0, 0], { shadow: false });
  dialRing.userData.kind = "rail";
  dialRing.userData.phase = 2.4;
  animated.push(dialRing);
  addMesh(usageDialGroup, new THREE.CircleGeometry(0.84, 48), new THREE.MeshBasicMaterial({ color: 0x081624, transparent: true, opacity: 0.88 }), [0, 0, 0], { shadow: false });
  const dialLabel = makeLabel([healthScoreRow?.[1] || "APP", "HEALTH"], { accent: "#dff4ff", scale: 0.52 });
  dialLabel.position.set(0, 0, 0.02);
  usageDialGroup.add(dialLabel);

  // ---------------------------------------------------------------------------
  // App-health core: the central focus for measured browser and platform signals.
  // ---------------------------------------------------------------------------
  const vaultGroup = new THREE.Group();
  vaultGroup.position.set(-8.3, 0, -7.1);
  root.add(vaultGroup);
  {
    addMesh(vaultGroup, new THREE.CylinderGeometry(3.1, 3.3, 0.28, 48), metal(COLORS.steelDark, { roughness: 0.4 }), [0, 0.14, 0]);
    const padRing = addMesh(vaultGroup, new THREE.TorusGeometry(2.95, 0.05, 10, 96), glow(COLORS.cyan, 1.0), [0, 0.3, 0], { shadow: false });
    padRing.rotation.x = Math.PI / 2;
    const coreFrameMat = metal(0x03080d, { roughness: 0.34, metalness: 0.96, emissive: 0x031820, emissiveIntensity: 0.24 });
    const coreAccentMat = metal(0x07121a, { roughness: 0.3, metalness: 0.9, emissive: 0x0a3944, emissiveIntensity: 0.42 });
    const capacityRects = {
      assembled: { x: 0.61, y: 0.02, w: 0.37, h: 0.37 },
      final: { x: 0.365, y: 0.64, w: 0.245, h: 0.31 },
      glassLeft: { x: 0.0, y: 0.0, w: 0.15, h: 0.19 },
      glassRight: { x: 0.15, y: 0.0, w: 0.15, h: 0.19 },
      topCap: { x: 0.738, y: 0.0, w: 0.145, h: 0.09 },
      coreRing: { x: 0.47, y: 0.02, w: 0.13, h: 0.13 },
    };
    [
      { y: 0.82, r1: 1.42, r2: 1.78, h: 0.18 },
      { y: 5.98, r1: 1.78, r2: 1.42, h: 0.18 },
      { y: 0.62, r1: 1.9, r2: 2.18, h: 0.12 },
      { y: 6.18, r1: 2.18, r2: 1.9, h: 0.12 },
    ].forEach(({ y, r1, r2, h }) => {
      if (y < 3) {
        const cap = addMesh(vaultGroup, new THREE.CylinderGeometry(r1, r2, h, 72), coreFrameMat.clone(), [0, y, 0], { shadow: false });
        cap.userData.kind = "pulse";
        cap.userData.phase = y;
        animated.push(cap);
      }
      const isTopRing = y > 3;
      const trimRing = addMesh(
        vaultGroup,
        new THREE.TorusGeometry((r1 + r2) * 0.5, isTopRing ? 0.012 : 0.018, 8, 96),
        isTopRing ? metal(0x071118, { roughness: 0.36, metalness: 0.94, emissive: COLORS.cyan, emissiveIntensity: 0.08 }) : glow(COLORS.cyan, 0.42),
        [0, y + h * 0.52, 0],
        { shadow: false },
      );
      trimRing.rotation.x = Math.PI / 2;
      trimRing.userData.kind = "gyro";
      trimRing.userData.speed = y > 3 ? -0.06 : 0.08;
      animated.push(trimRing);
    });

    const assembledCutout = texturedPanel(
      vaultGroup,
      [5.45, 5.45],
      [0, 3.45, 0.18],
      additiveAtlasMaterial(capacityRects.assembled, { atlas: capacityCoreAtlas, color: 0xb8e8f0, opacity: 0.2 }),
    );
    assembledCutout.renderOrder = 5;
    const finalCutout = texturedPanel(
      vaultGroup,
      [3.2, 4.05],
      [0, 3.28, 0.28],
      additiveAtlasMaterial(capacityRects.final, { atlas: capacityCoreAtlas, color: 0x7fd8e8, opacity: 0.14 }),
    );
    finalCutout.renderOrder = 4;

    [0.58, 0.98, 1.32].forEach((radius, ringIndex) => {
      const crownRing = addMesh(
        vaultGroup,
        new THREE.TorusGeometry(radius, ringIndex === 1 ? 0.014 : 0.01, 8, 96),
        metal(0x050b10, {
          roughness: 0.32,
          metalness: 0.96,
          emissive: ringIndex === 1 ? COLORS.amber : COLORS.cyan,
          emissiveIntensity: ringIndex === 1 ? 0.08 : 0.12,
        }),
        [0, 6.36 + ringIndex * 0.04, 0],
        { shadow: false },
      );
      crownRing.rotation.x = Math.PI / 2;
      crownRing.userData.kind = "gyro";
      crownRing.userData.speed = ringIndex === 1 ? -0.04 : 0.05;
      animated.push(crownRing);
    });
    const baseCapArt = texturedPanel(
      vaultGroup,
      [2.4, 2.4],
      [0, 0.58, 0.02],
      additiveAtlasMaterial(capacityRects.coreRing, { atlas: capacityCoreAtlas, color: 0xbdf7ff, opacity: 0.18 }),
      [-Math.PI / 2, 0, 0],
    );
    baseCapArt.renderOrder = 6;

    [-1, 1].forEach((side) => {
      const glass = texturedPanel(
        vaultGroup,
        [2.2, 2.75],
        [side * 1.08, 3.7, 0.34],
        additiveAtlasMaterial(side < 0 ? capacityRects.glassLeft : capacityRects.glassRight, { atlas: capacityCoreAtlas, color: 0x9ce6f0, opacity: 0.12 }),
      );
      glass.rotation.z = side * 0.04;
      glass.renderOrder = 3;
    });

    [0, Math.PI / 2, Math.PI, Math.PI * 1.5].forEach((angle, frameIndex) => {
      const x = Math.cos(angle) * 1.62;
      const z = Math.sin(angle) * 1.62;
      const post = addMesh(vaultGroup, new THREE.CylinderGeometry(0.055, 0.055, 5.18, 14), coreAccentMat.clone(), [x, 3.4, z], { shadow: false });
      post.userData.kind = "pulse";
      post.userData.phase = frameIndex * 0.6;
      animated.push(post);
      const railGlow = addMesh(vaultGroup, new THREE.CylinderGeometry(0.02, 0.02, 4.76, 10), glow(COLORS.cyan, 0.55), [x * 1.02, 3.4, z * 1.02], { shadow: false });
      railGlow.userData.kind = "pulse";
      railGlow.userData.phase = frameIndex * 0.6 + 0.3;
      animated.push(railGlow);
    });

    // Containment shell for the aggregate health score.
    const shell = addMesh(
      vaultGroup,
      new THREE.SphereGeometry(2.55, 48, 32),
      new THREE.MeshPhysicalMaterial({
        color: 0x9fd4e8,
        transparent: true,
        opacity: 0.055,
        roughness: 0.22,
        metalness: 0,
        emissive: 0x0d2833,
        emissiveIntensity: 0.16,
        depthWrite: false,
      }),
      [0, 3.4, 0],
      { shadow: false },
    );
    [0, Math.PI / 2, Math.PI, Math.PI * 1.5].forEach((angle) => {
      const x = Math.cos(angle) * 1.08;
      const z = Math.sin(angle) * 1.08;
      const topPin = addMesh(vaultGroup, new THREE.CylinderGeometry(0.024, 0.024, 0.62, 8), coreFrameMat.clone(), [x, 6.07, z], { shadow: false });
      topPin.userData.kind = "pulse";
      topPin.userData.phase = angle;
      animated.push(topPin);
    });
    register(shell, {
      type: "vault",
      focusRadius: 3.6,
      ringY: 0.34,
      tooltip: ["App Health", "Measured browser experience and app reliability"],
      platformTooltip: [core.title || "App Health", core.tooltip || core.badge || "Measured company app health"],
    });
    const cage = new THREE.Mesh(
      new THREE.IcosahedronGeometry(2.62, 1),
      new THREE.MeshBasicMaterial({ color: 0x2f6a76, wireframe: true, transparent: true, opacity: 0.18 }),
    );
    cage.position.set(0, 3.4, 0);
    cage.userData.kind = "coreCage";
    cage.userData.phase = 0.4;
    vaultGroup.add(cage);
    animated.push(cage);

    // The bright core carries the aggregate health state.
    const coreOrb = addMesh(vaultGroup, new THREE.SphereGeometry(0.42, 24, 16), glow(COLORS.cyan, 1.9), [0, 3.4, 0], { shadow: false });
    coreOrb.userData.kind = "corePulse";
    coreOrb.userData.phase = 0;
    animated.push(coreOrb);
    const beam = addMesh(
      vaultGroup,
      new THREE.CylinderGeometry(0.05, 0.09, 3.0, 12),
      new THREE.MeshBasicMaterial({ color: 0x6edcff, transparent: true, opacity: 0.35, blending: THREE.AdditiveBlending, depthWrite: false }),
      [0, 1.85, 0],
      { shadow: false },
    );
    beam.renderOrder = 1;
    beam.userData.kind = "coreBeam";
    beam.userData.baseOpacity = 0.22;
    animated.push(beam);

    // Gyroscope rings
    [
      { radius: 2.72, tube: 0.07, rotation: [Math.PI / 2, 0, 0], speed: 0.35, color: COLORS.cyan, intensity: 0.78 },
      { radius: 2.96, tube: 0.045, rotation: [Math.PI / 2.25, 0, Math.PI / 9], speed: -0.22, color: COLORS.amber, intensity: 0.42 },
      { radius: 3.16, tube: 0.045, rotation: [Math.PI / 3, 0, Math.PI / 7], speed: -0.18, color: COLORS.cyan, intensity: 0.62 },
      { radius: 3.36, tube: 0.035, rotation: [-Math.PI / 4, Math.PI / 6, 0], speed: 0.16, color: COLORS.blue, intensity: 0.5 },
    ].forEach(({ radius, tube, rotation, speed, color, intensity }, index) => {
      const gyro = addMesh(
        vaultGroup,
        new THREE.TorusGeometry(radius, tube, 10, 96),
        metal(COLORS.steelLight, { roughness: 0.3, emissive: color, emissiveIntensity: intensity }),
        [0, 3.4, 0],
        { shadow: false },
      );
      gyro.rotation.set(...rotation);
      gyro.userData.kind = "coreGyro";
      gyro.userData.speed = speed;
      gyro.userData.phase = index;
      animated.push(gyro);
    });

    // Three small status nodes travel on separate paths. They make the core
    // read as an operating machine from the overview without adding large
    // beams or another bright ring.
    [
      { radius: 2.76, speed: 0.16, phase: 0, lift: 0.24, color: COLORS.cyan },
      { radius: 3.02, speed: -0.11, phase: 2.1, lift: -0.18, color: COLORS.amber },
      { radius: 3.24, speed: 0.08, phase: 4.2, lift: 0.06, color: COLORS.blue },
    ].forEach((node) => {
      const satellite = addMesh(
        vaultGroup,
        new THREE.SphereGeometry(0.075, 12, 8),
        glow(node.color, 1.05),
        [node.radius, 3.4 + node.lift, 0],
        { shadow: false },
      );
      satellite.userData.kind = "coreSatellite";
      Object.assign(satellite.userData, node);
      animated.push(satellite);
    });

    const vaultLight = new THREE.PointLight(0x6edcff, 18, 13, 2);
    vaultLight.position.set(0, 3.4, 0);
    vaultLight.userData.kind = "coreLight";
    vaultLight.userData.baseIntensity = 18;
    vaultGroup.add(vaultLight);
    animated.push(vaultLight);

  }

  // ---------------------------------------------------------------------------
  // Bucket energy columns: glass tubes with glowing data cores
  // ---------------------------------------------------------------------------
  const bucketColors = [COLORS.cyan, COLORS.teal, COLORS.blue, COLORS.mint, COLORS.cyan];
  const bucketAnchors = [];
  {
    const closedSiloRects = {
      shellA: { x: 0.018, y: 0.055, w: 0.105, h: 0.58 },
      shellB: { x: 0.135, y: 0.055, w: 0.098, h: 0.58 },
      shellC: { x: 0.246, y: 0.055, w: 0.102, h: 0.58 },
      shellD: { x: 0.424, y: 0.014, w: 0.062, h: 0.414 },
      shellE: { x: 0.505, y: 0.014, w: 0.062, h: 0.414 },
      lightRail: { x: 0.424, y: 0.014, w: 0.062, h: 0.414 },
      capTop: { x: 0.68, y: 0.018, w: 0.29, h: 0.29 },
      capRing: { x: 0.68, y: 0.35, w: 0.29, h: 0.29 },
      baseStrip: { x: 0.02, y: 0.782, w: 0.31, h: 0.072 },
      vent: { x: 0.509, y: 0.47, w: 0.056, h: 0.174 },
    };
    const largest = Math.max(...buckets.map((bucket) => bucket.size));
    buckets.forEach((bucket, index) => {
      const x = -3.8 + index * 3.05;
      const height = 0.62 + Math.sqrt(bucket.size / largest) * 3.45;
      const color = bucketColors[index % bucketColors.length];
      const columnGroup = new THREE.Group();
      columnGroup.position.set(x, 0, -8.15);
      root.add(columnGroup);

      // Emitter pad with a neon ring
      addMesh(columnGroup, new THREE.CylinderGeometry(1.12, 1.26, 0.2, 36), metal(COLORS.steelDark, { roughness: 0.38 }), [0, 0.1, 0]);
      const padRing = addMesh(columnGroup, new THREE.TorusGeometry(0.98, 0.035, 10, 64), glow(color, 1.0), [0, 0.22, 0], { shadow: false });
      padRing.rotation.x = Math.PI / 2;

      const shellY = 0.32 + height / 2;
      const shellHeight = Math.max(0.8, height * 0.9);
      const shellBack = addMesh(
        columnGroup,
        new THREE.CylinderGeometry(0.755, 0.755, shellHeight + 0.12, 56, 1, true),
        metal(0x02070b, { roughness: 0.52, metalness: 0.94, emissive: 0x01070a, emissiveIntensity: 0.08 }),
        [0, shellY, 0],
        { shadow: false },
      );
      shellBack.userData.kind = "closedSiloSkin";
      [
        { rect: closedSiloRects.shellA, angle: -0.48, w: 0.44, lift: 0 },
        { rect: closedSiloRects.shellB, angle: 0, w: 0.48, lift: 0.02 },
        { rect: closedSiloRects.shellC, angle: 0.48, w: 0.44, lift: 0 },
        { rect: closedSiloRects.shellD, angle: -0.88, w: 0.26, lift: 0.02 },
        { rect: closedSiloRects.shellE, angle: 0.88, w: 0.26, lift: 0.02 },
      ].forEach((panel, panelIndex) => {
        const piece = trimmedRadialPanel(columnGroup, panel.rect, {
          angle: panel.angle,
          radius: 0.785,
          y: shellY + panel.lift,
          width: panel.w,
          height: shellHeight,
          atlas: siloClosedAtlas,
          emissive: color,
          emissiveIntensity: panelIndex === 1 ? 0.18 : 0.14,
        });
        piece.userData.kind = "closedSiloSkin";
      });

      [
        { y: shellY + shellHeight / 2 + 0.02, h: 0.16, rTop: 0.86, rBottom: 0.82 },
        { y: shellY - shellHeight / 2 - 0.02, h: 0.16, rTop: 0.82, rBottom: 0.9 },
      ].forEach(({ y, h, rTop, rBottom }) => {
        const collar = addMesh(
          columnGroup,
          new THREE.CylinderGeometry(rTop, rBottom, h, 56),
          metal(0x03080d, { roughness: 0.38, metalness: 0.94, emissive: 0x021016, emissiveIntensity: 0.14 }),
          [0, y, 0],
          { shadow: false },
        );
        collar.userData.kind = "closedSiloSkin";
        const collarLine = addMesh(columnGroup, new THREE.TorusGeometry((rTop + rBottom) * 0.5, 0.011, 8, 72), glow(color, 0.36), [0, y + h * 0.5 + 0.006, 0], { shadow: false });
        collarLine.rotation.x = Math.PI / 2;
        collarLine.userData.kind = "closedSiloSkin";
      });

      [-0.72, -0.24, 0.24, 0.72].forEach((angle, seamIndex) => {
        const seam = trimmedRadialPanel(columnGroup, seamIndex % 2 ? closedSiloRects.vent : closedSiloRects.baseStrip, {
          angle,
          radius: 0.835,
          y: shellY,
          width: 0.08,
          height: shellHeight + 0.06,
          atlas: siloClosedAtlas,
          emissive: seamIndex % 2 ? color : COLORS.amber,
          emissiveIntensity: seamIndex % 2 ? 0.26 : 0.16,
          trim: true,
        });
        seam.userData.kind = "closedSiloSkin";
      });

      [-1.12, 1.12].forEach((angle, railIndex) => {
        const rail = trimmedRadialPanel(columnGroup, closedSiloRects.lightRail, {
          angle,
          radius: 0.81,
          y: shellY,
          width: 0.16,
          height: shellHeight * 0.88,
          atlas: siloClosedAtlas,
          emissive: color,
          emissiveIntensity: 0.38,
        });
        rail.userData.kind = "closedSiloSkin";
        const latch = trimmedRadialPanel(columnGroup, railIndex ? closedSiloRects.vent : closedSiloRects.baseStrip, {
          angle,
          radius: 0.825,
          y: 0.44 + height * 0.16,
          width: 0.2,
          height: 0.38,
          atlas: siloClosedAtlas,
          emissive: COLORS.amber,
          emissiveIntensity: 0.18,
          trim: false,
        });
        latch.userData.kind = "closedSiloSkin";
      });

      // Glass containment tube (the clickable body)
      const tube = addMesh(
        columnGroup,
        new THREE.CylinderGeometry(0.74, 0.74, height, 32),
        new THREE.MeshPhysicalMaterial({
          color: 0xcfe9f2,
          transparent: true,
          opacity: 0.08,
          roughness: 0.08,
          metalness: 0,
          emissive: 0x14323c,
          emissiveIntensity: 0.24,
          depthWrite: false,
        }),
        [0, 0.32 + height / 2, 0],
        { shadow: false },
      );
      register(tube, {
        type: "bucket",
        bucket,
        index,
        color,
        revealHeight: height,
        focusRadius: 1.5,
        ringY: 0.28,
        tooltip: [bucket.title, `${bucket.valueLabel || formatBytes(bucket.size)} · ${bucket.files} ${bucket.itemLabel || (bucket.files === 1 ? "signal" : "signals")}`],
      });

      // Subtle internal beam. The detailed blue chamber art should read as the
      // main source when a silo opens, so this stays transparent and narrow.
      const core = addMesh(
        columnGroup,
        new THREE.CylinderGeometry(0.13, 0.16, Math.max(0.2, height - 0.52), 24),
        new THREE.MeshBasicMaterial({
          color,
          transparent: true,
          opacity: 0.2,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        }),
        [0, 0.32 + height / 2, 0],
        { shadow: false },
      );
      core.userData.kind = "pulse";
      core.userData.phase = index * 0.7;
      animated.push(core);

      // Seat the top cap directly on the shell collar. The earlier fixed
      // height left a visible air gap on the taller storage silos.
      const topCollarY = shellY + shellHeight / 2 + 0.02;
      const capCenterY = topCollarY + 0.08 + 0.065;
      const closedTopCap = addMesh(columnGroup, new THREE.CylinderGeometry(0.86, 0.9, 0.13, 40), metal(0x071018, { roughness: 0.42, metalness: 0.82, emissive: 0x061b22, emissiveIntensity: 0.22 }), [0, capCenterY, 0], { shadow: false });
      closedTopCap.userData.kind = "closedSiloSkin";
      const capFace = addMesh(
        columnGroup,
        new THREE.CircleGeometry(0.76, 56),
        skinMaterial(index % 2 ? closedSiloRects.capRing : closedSiloRects.capTop, {
          atlas: siloClosedAtlas,
          emissive: color,
          emissiveIntensity: 0.18,
          metalness: 0.82,
          roughness: 0.36,
          side: THREE.DoubleSide,
        }),
        [0, capCenterY + 0.071, 0],
        { shadow: false },
      );
      capFace.rotation.x = -Math.PI / 2;
      capFace.userData.kind = "closedSiloSkin";
      const lowerCap = texturedPanel(
        columnGroup,
        [1.36, 0.24],
        [0, 0.28, 0.78],
        skinMaterial(closedSiloRects.baseStrip, {
          atlas: siloClosedAtlas,
          emissive: color,
          emissiveIntensity: 0.18,
          metalness: 0.82,
          roughness: 0.36,
          side: THREE.DoubleSide,
        }),
      );
      lowerCap.userData.kind = "closedSiloSkin";
      const orbit = addMesh(columnGroup, new THREE.TorusGeometry(1.0, 0.02, 8, 64), glow(color, 0.85), [0, 0.32 + height * 0.72, 0], { shadow: false });
      orbit.rotation.x = Math.PI / 2;
      orbit.userData.kind = "spin";
      orbit.userData.speed = 0.5 + index * 0.12;
      animated.push(orbit);
      const scanBand = addMesh(
        columnGroup,
        new THREE.CylinderGeometry(0.82, 0.82, 0.09, 24),
        new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.24, blending: THREE.AdditiveBlending, depthWrite: false }),
        [0, 0.58 + height * 0.46, 0],
        { shadow: false },
      );
      scanBand.userData.kind = "scanBand";
      scanBand.userData.phase = index * 0.65;
      scanBand.userData.baseY = scanBand.position.y;
      scanBand.userData.span = height * 0.42;
      animated.push(scanBand);

      bucketAnchors.push(tube);
    });
  }

  // ---------------------------------------------------------------------------
  // Legacy 3D month blocks are retired. The expandable timeline source below
  // the scene is now the single month-over-month interaction surface.
  // ---------------------------------------------------------------------------
  const monthAnchors = [];
  if (false) {
    const largest = Math.max(...months.map((month) => month.added), 1);
    const timelineVisualGroup = new THREE.Group();
    timelineVisualGroup.position.set(0, 0, 1.35);
    timelineVisualGroup.scale.set(1, 0.58, 0.68);
    root.add(timelineVisualGroup);
    const timelineRects = {
      faces: [
        { x: 0.086, y: 0.012, w: 0.165, h: 0.321 },
        { x: 0.371, y: 0.012, w: 0.165, h: 0.321 },
        { x: 0.656, y: 0.012, w: 0.165, h: 0.321 },
        { x: 0.086, y: 0.588, w: 0.165, h: 0.287 },
        { x: 0.371, y: 0.588, w: 0.165, h: 0.287 },
        { x: 0.656, y: 0.588, w: 0.165, h: 0.287 },
      ],
      sides: [
        { x: 0.018, y: 0.012, w: 0.047, h: 0.322 },
        { x: 0.266, y: 0.012, w: 0.047, h: 0.322 },
        { x: 0.551, y: 0.012, w: 0.047, h: 0.322 },
        { x: 0.836, y: 0.012, w: 0.047, h: 0.322 },
      ],
      caps: [
        { x: 0.086, y: 0.349, w: 0.165, h: 0.108 },
        { x: 0.371, y: 0.349, w: 0.165, h: 0.108 },
        { x: 0.656, y: 0.349, w: 0.165, h: 0.108 },
      ],
    };
    const timelineSkin = (rect, active, extra = {}) =>
      skinMaterial(rect, {
        atlas: timelinePillarAtlas,
        emissive: active ? 0x4fcfff : 0x174252,
        emissiveIntensity: active ? 0.18 : 0.06,
        roughness: 0.42,
        metalness: 0.88,
        ...extra,
      });
    addMesh(
      timelineVisualGroup,
      new THREE.BoxGeometry(25.6, 0.14, 2.4),
      new THREE.MeshPhysicalMaterial({ color: 0x0a141e, transparent: true, opacity: 0.32, roughness: 0.22, metalness: 0.55 }),
      [0, 0.055, 1],
    );
    [-1.14, 1.14].forEach((z) => {
      roundedBox(
        timelineVisualGroup,
        [25.2, 0.026, 0.055],
        [0, 0.045, 1 + z],
        metal(0x061018, { roughness: 0.5, metalness: 0.9, emissive: 0x0b3942, emissiveIntensity: 0.22 }),
        { shadow: false },
      );
    });
    months.forEach((month, index) => {
      const x = -11 + index * 2;
      const active = month.added > 0;
      const height = active ? Math.max(0.12, Math.sqrt(month.added / largest) * 0.42) : 0.06;
      const pillarGroup = new THREE.Group();
      pillarGroup.position.set(x, 0, 1);
      timelineVisualGroup.add(pillarGroup);
      const bar = roundedBox(
        pillarGroup,
        [1.18, height, 1.04],
        [0, 0.24 + height / 2, 0],
        metal(active ? 0x0d1720 : 0x071019, {
          roughness: 0.42,
          metalness: 0.9,
          emissive: active ? 0x062633 : 0x02080c,
          emissiveIntensity: active ? 0.16 : 0.07,
        }),
      );
      const faceRect = timelineRects.faces[index % timelineRects.faces.length];
      const sideRect = timelineRects.sides[index % timelineRects.sides.length];
      const capRect = timelineRects.caps[index % timelineRects.caps.length];
      const faceHeight = Math.max(0.18, height * 0.9);
      const faceY = 0.24 + height / 2;
      texturedPanel(pillarGroup, [1.08, faceHeight], [0, faceY, 0.532], timelineSkin(faceRect, active));
      texturedPanel(pillarGroup, [1.08, faceHeight], [0, faceY, -0.532], timelineSkin(timelineRects.faces[(index + 3) % timelineRects.faces.length], active, { emissiveIntensity: active ? 0.1 : 0.04 }), [0, Math.PI, 0]);
      texturedPanel(pillarGroup, [0.96, faceHeight], [-0.602, faceY, 0], timelineSkin(sideRect, active, { emissiveIntensity: active ? 0.12 : 0.05 }), [0, -Math.PI / 2, 0]);
      texturedPanel(pillarGroup, [0.96, faceHeight], [0.602, faceY, 0], timelineSkin(timelineRects.sides[(index + 1) % timelineRects.sides.length], active, { emissiveIntensity: active ? 0.12 : 0.05 }), [0, Math.PI / 2, 0]);
      texturedPanel(pillarGroup, [1.05, 0.92], [0, 0.24 + height + 0.006, 0], timelineSkin(capRect, active, { emissiveIntensity: active ? 0.14 : 0.05 }), [-Math.PI / 2, 0, 0]);
      bar.userData.bob = active ? 0.03 : 0;
      register(bar, {
        type: "month",
        month,
        index,
        focusRadius: 1.1,
        ringY: 0.22,
        tooltip: [month.label, active ? (month.valueLabel || `${formatBytes(month.added)} activity`) : "No activity recorded"],
      });
      if (active) {
        roundedBox(pillarGroup, [0.72, 0.035, 0.08], [0, 0.29 + height, 0.46], glow(COLORS.cyan, 0.36), { shadow: false });
        const value = tagLabel(makeLabel([formatBytes(month.added)], { accent: "#cfe6ff", scale: 0.52 }), "timeline");
        value.position.set(x, height + 1.05, 1);
        value.visible = false;
        timelineVisualGroup.add(value);
      }
      const tick = tagLabel(makeLabel([month.label.split(" ")[0]], { accent: "#9fb0af", scale: 0.42, chip: false }), "timeline");
      tick.position.set(x, 0.5, 2.35);
      tick.visible = false;
      timelineVisualGroup.add(tick);
      monthAnchors.push(bar);
    });
    const signpost = makeLabel(["TIMELINE"], { accent: "#9fb0af", scale: 0.6, chip: false });
    signpost.position.set(-13.4, 0.7, 1);
    signpost.visible = false;
    timelineVisualGroup.add(signpost);
  }

  // ---------------------------------------------------------------------------
  // Files: grounded armored crates across the front edge of the stage.
  // ---------------------------------------------------------------------------
  const fileAnchors = [];
  {
    const typeColor = {
      "Equipment files": COLORS.blue,
      "Order throughput": COLORS.teal,
      "Request photos": COLORS.mint,
      "Part files": COLORS.blue,
      "Company logos": COLORS.cyan,
    };
    const skinRects = {
      tops: [
        { x: 0.015, y: 0.016, w: 0.313, h: 0.307 },
        { x: 0.344, y: 0.016, w: 0.312, h: 0.307 },
        { x: 0.671, y: 0.016, w: 0.312, h: 0.307 },
      ],
      faces: [
        { x: 0.015, y: 0.016, w: 0.313, h: 0.307 },
        { x: 0.344, y: 0.016, w: 0.312, h: 0.307 },
        { x: 0.671, y: 0.016, w: 0.312, h: 0.307 },
        { x: 0.015, y: 0.344, w: 0.313, h: 0.313 },
        { x: 0.344, y: 0.344, w: 0.312, h: 0.313 },
        { x: 0.671, y: 0.344, w: 0.312, h: 0.313 },
      ],
      sides: [
        { x: 0.018, y: 0.687, w: 0.382, h: 0.055 },
        { x: 0.018, y: 0.748, w: 0.382, h: 0.055 },
        { x: 0.418, y: 0.688, w: 0.032, h: 0.19 },
        { x: 0.61, y: 0.688, w: 0.032, h: 0.19 },
        { x: 0.75, y: 0.688, w: 0.045, h: 0.19 },
      ],
      rails: [
        { x: 0.018, y: 0.687, w: 0.382, h: 0.055 },
        { x: 0.018, y: 0.748, w: 0.382, h: 0.055 },
        { x: 0.017, y: 0.823, w: 0.382, h: 0.044 },
      ],
    };
    files.slice(0, 10).forEach((file, index) => {
      const column = index;
      const row = 0;
      const centered = column - 4.5;
      const x = centered * 2.24;
      const z = 5.95 + Math.abs(centered) * 0.06;
      const hoverY = 0.82;
      const width = 0.72 + Math.min(file.size / (2.1 * 1024 * 1024), 1) * 0.32;
      const color = typeColor[file.bucket] ?? COLORS.cyan;

      // Low floor plinth under each crate, embedded in the deck rather than
      // projecting a beam through the object.
      addMesh(root, new THREE.CylinderGeometry(0.54, 0.62, 0.08, 28), metal(COLORS.steelDark, { roughness: 0.46, emissive: 0x041118, emissiveIntensity: 0.1 }), [x, 0.04, z]);
      const padRing = addMesh(root, new THREE.TorusGeometry(0.48, 0.014, 8, 56), metal(0x061018, { roughness: 0.46, metalness: 0.9, emissive: color, emissiveIntensity: 0.24 }), [x, 0.09, z], { shadow: false });
      padRing.rotation.x = Math.PI / 2;

      // Armored data crate: dark sci-fi file module inspired by the
      // concept-art cube skin, with layered panels and emissive edge detail.
      const shard = roundedBox(
        root,
        [width + 0.46, 1.16, 0.68],
        [x, hoverY, z],
        new THREE.MeshPhysicalMaterial({
          color: 0x05090d,
          roughness: 0.23,
          metalness: 0.92,
          emissive: 0x02090d,
          emissiveIntensity: 0.22,
          clearcoat: 0.55,
          clearcoatRoughness: 0.26,
        }),
      );
      shard.rotation.y = -centered * 0.035;
      shard.userData.bob = 0.012;
      register(shard, {
        type: "file",
        file,
        index,
        focusRadius: 0.95,
        ringY: 0.16,
        tooltip: [file.equipment, `${file.name} · ${file.valueLabel || formatBytes(file.size)}`],
      });

      const faceZ = 0.38;
      const backZ = -0.38;
      const armorMat = metal(0x0a0f14, { roughness: 0.3, metalness: 0.92, emissive: 0x02080b, emissiveIntensity: 0.22 });
      const edgeMat = metal(0x03070b, { roughness: 0.42, metalness: 0.94, emissive: 0x010304, emissiveIntensity: 0.1 });
      const darkInsetMat = metal(0x071018, { roughness: 0.36, metalness: 0.88, emissive: 0x02090e, emissiveIntensity: 0.18 });
      const insetMat = new THREE.MeshPhysicalMaterial({
        color: 0x031019,
        transparent: true,
        opacity: 0.8,
        roughness: 0.05,
        metalness: 0.35,
        emissive: 0x052c3e,
        emissiveIntensity: 1.05,
        clearcoat: 0.8,
        clearcoatRoughness: 0.08,
        depthWrite: false,
      });

      [
        [0, 0.53, faceZ + 0.015, width * 0.96, 0.12],
        [0, -0.53, faceZ + 0.015, width * 0.96, 0.12],
        [-width * 0.58, 0, faceZ + 0.016, 0.12, 0.86],
        [width * 0.58, 0, faceZ + 0.016, 0.12, 0.86],
      ].forEach(([px, py, pz, sx, sy]) => {
        roundedBox(shard, [sx, sy, 0.09], [px, py, pz], armorMat, { shadow: false });
      });

      const facePanel = roundedBox(
        shard,
        [width + 0.04, 1.0, 0.045],
        [0.05, 0, faceZ + 0.044],
        insetMat,
        { shadow: false },
      );
      facePanel.renderOrder = 2;

      const faceRect = skinRects.faces[index % skinRects.faces.length];
      const sideRect = skinRects.sides[index % skinRects.sides.length];
      const topRect = skinRects.tops[(index + row) % skinRects.tops.length];
      const railRect = skinRects.rails[index % skinRects.rails.length];
      const moduleHalfX = (width + 0.46) / 2 + 0.014;
      const moduleHalfY = 1.16 / 2 + 0.01;

      [
        [-1, 1],
        [1, 1],
        [-1, -1],
        [1, -1],
      ].forEach(([sx, sz]) => {
        roundedBox(shard, [0.18, 1.12, 0.16], [sx * moduleHalfX, 0, sz * 0.31], edgeMat, { shadow: false });
      });
      [
        [0, moduleHalfY, 0.31, width + 0.2, 0.09, 0.12],
        [0, -moduleHalfY, 0.31, width + 0.2, 0.09, 0.12],
        [0, moduleHalfY, -0.31, width + 0.14, 0.09, 0.12],
        [0, -moduleHalfY, -0.31, width + 0.14, 0.09, 0.12],
      ].forEach(([px, py, pz, sx, sy, sz]) => {
        roundedBox(shard, [sx, sy, sz], [px, py, pz], edgeMat, { shadow: false });
      });

      texturedPanel(
        shard,
        [width + 0.02, 0.96],
        [0, 0, faceZ + 0.126],
        skinMaterial(faceRect, { emissiveIntensity: 0.42 }),
      );
      texturedPanel(
        shard,
        [width + 0.04, 0.98],
        [0, 0, backZ - 0.011],
        skinMaterial(skinRects.faces[(index + 3) % skinRects.faces.length], { emissiveIntensity: 0.22 }),
        [0, Math.PI, 0],
      );
      texturedPanel(
        shard,
        [0.58, 0.94],
        [moduleHalfX, 0, 0],
        skinMaterial(sideRect, { emissiveIntensity: 0.18 }),
        [0, Math.PI / 2, 0],
      );
      texturedPanel(
        shard,
        [0.58, 0.94],
        [-moduleHalfX, 0, 0],
        skinMaterial(skinRects.sides[(index + 1) % skinRects.sides.length], { emissiveIntensity: 0.16 }),
        [0, -Math.PI / 2, 0],
      );
      texturedPanel(
        shard,
        [width + 0.08, 0.66],
        [0, 0.592, 0],
        skinMaterial(topRect, { emissiveIntensity: 0.32 }),
        [-Math.PI / 2, 0, 0],
      );
      texturedPanel(
        shard,
        [width + 0.02, 0.62],
        [0, -0.592, 0],
        skinMaterial(railRect, { emissiveIntensity: 0.25 }),
        [Math.PI / 2, 0, 0],
      );

      [
        [0, 0.46, faceZ + 0.15, width * 0.7, 0.036],
        [0, -0.46, faceZ + 0.15, width * 0.7, 0.036],
        [-width * 0.49, 0, faceZ + 0.152, 0.036, 0.66],
        [width * 0.49, 0, faceZ + 0.152, 0.036, 0.66],
      ].forEach(([px, py, pz, sx, sy]) => {
        roundedBox(shard, [sx, sy, 0.028], [px, py, pz], glow(color, 1.35), { shadow: false });
      });

      [
        [-1, -1],
        [1, -1],
        [-1, 1],
        [1, 1],
      ].forEach(([sx, sy], cornerIndex) => {
        roundedBox(shard, [0.2, 0.2, 0.105], [sx * (width * 0.54), sy * 0.44, faceZ + 0.145], darkInsetMat, { shadow: false });
        roundedBox(shard, [0.052, 0.052, 0.034], [sx * (width * 0.54), sy * 0.44, faceZ + 0.205], glow(cornerIndex % 2 ? COLORS.blue : COLORS.cyan, 0.9), { shadow: false });
      });

      [-0.39, 0.39].forEach((py, railIndex) => {
        roundedBox(shard, [width * 0.9, 0.07, 0.09], [0, py, backZ - 0.02], metal(0x05080c, { roughness: 0.38, metalness: 0.9, emissive: 0x02080d, emissiveIntensity: 0.18 }), { shadow: false });
        roundedBox(shard, [width * 0.26, 0.034, 0.058], [railIndex ? width * 0.24 : -width * 0.26, py, backZ - 0.075], glow(color, 0.9), { shadow: false });
      });

      [
        [-width * 0.53, -0.08],
        [width * 0.54, 0.18],
        [width * 0.02, 0.49],
      ].forEach(([px, py]) => {
        roundedBox(shard, [0.04, 0.13, 0.04], [px, py, faceZ + 0.12], glow(COLORS.amber, 0.78), { shadow: false });
      });

      fileAnchors.push(shard);
    });
  }

  const dataFootprintRows = coreRows.filter(([label]) => ["Data stored", "Records monitored"].includes(label));
  const transfersPanel = makeHudPanel({
    title: "Data Footprint",
    rows: dataFootprintRows.length ? dataFootprintRows : [["Data stored", "Pending"], ["Records monitored", "Pending"]],
    accent: "#72d1c6",
    width: 330,
    height: 180,
    scale: 0.72,
  });
  transfersPanel.position.set(-14.8, -0.3, 14.2);
  worldHudGroup.add(transfersPanel);

  const activityPanel = makeHudPanel({
    title: "Process Today",
    rows: activity.map((entry) => [entry.label, entry.value]),
    accent: "#6edcff",
    width: 330,
    height: 180,
    scale: 0.72,
  });
  activityPanel.position.set(14.6, -0.3, 14.2);
  worldHudGroup.add(activityPanel);

  // ---------------------------------------------------------------------------
  // Lights
  // ---------------------------------------------------------------------------
  scene.add(new THREE.HemisphereLight(0x9fcce0, 0x07111b, 0.56));
  const fill = new THREE.DirectionalLight(0xb4d4e4, 0.34);
  fill.position.set(4, 7, 22);
  scene.add(fill);
  keyLight = new THREE.DirectionalLight(0xd1e8f8, 1.35);
  keyLight.position.set(-10, 18, 12);
  keyLight.castShadow = true;
  keyLight.shadow.mapSize.set(qualitySettings.shadowSize, qualitySettings.shadowSize);
  keyLight.shadow.camera.left = -26;
  keyLight.shadow.camera.right = 26;
  keyLight.shadow.camera.top = 26;
  keyLight.shadow.camera.bottom = -26;
  keyLight.shadow.bias = -0.0004;
  scene.add(keyLight);
  const rim = new THREE.DirectionalLight(0x7d70ff, 0.72);
  rim.position.set(14, 9, -14);
  scene.add(rim);
  const fileGlow = new THREE.PointLight(0x89d9aa, 7.5, 13, 2);
  fileGlow.position.set(0, 3.1, 6.6);
  scene.add(fileGlow);
  const siloGlow = new THREE.PointLight(0x5fc9d8, 11, 18, 2);
  siloGlow.position.set(1, 5.4, -3.6);
  scene.add(siloGlow);

  // ---------------------------------------------------------------------------
  // Focus + hover rings
  // ---------------------------------------------------------------------------
  function makeRing(color, opacity) {
    const ring = new THREE.Mesh(
      new THREE.RingGeometry(0.86, 1, 56),
      new THREE.MeshBasicMaterial({ color, transparent: true, opacity, side: THREE.DoubleSide, depthWrite: false }),
    );
    ring.rotation.x = -Math.PI / 2;
    ring.visible = false;
    root.add(ring);
    return ring;
  }
  const focusRing = makeRing(0x6edcff, 0.9);
  const hoverRing = makeRing(0xbfe6ee, 0.4);
  let activeReveal = null;

  function placeRing(ring, mesh) {
    const payload = mesh.userData.payload;
    const worldPos = new THREE.Vector3();
    mesh.getWorldPosition(worldPos);
    ring.position.set(worldPos.x, payload.ringY ?? 0.05, worldPos.z);
    const radius = payload.focusRadius ?? 1;
    ring.scale.set(radius, radius, 1);
    ring.visible = true;
  }

  function removeAnimatedObject(object) {
    const index = animated.indexOf(object);
    if (index >= 0) animated.splice(index, 1);
  }

  function clearReveal() {
    if (!activeReveal) return;
    (activeReveal.userData.restoreColumnState ?? []).forEach((entry) => {
      entry.object.visible = entry.visible;
      entry.materials.forEach((materialState) => {
        materialState.material.transparent = materialState.transparent;
        materialState.material.opacity = materialState.opacity;
        materialState.material.depthWrite = materialState.depthWrite;
      });
    });
    activeReveal.traverse((object) => removeAnimatedObject(object));
    root.remove(activeReveal);
    activeReveal = null;
  }

  function captureMaterials(object) {
    const materials = Array.isArray(object.material) ? object.material : object.material ? [object.material] : [];
    return materials.map((material) => ({
      material,
      transparent: material.transparent,
      opacity: material.opacity,
      depthWrite: material.depthWrite,
    }));
  }

  function fadeMaterial(object, opacity) {
    const materials = Array.isArray(object.material) ? object.material : object.material ? [object.material] : [];
    materials.forEach((material) => {
      material.transparent = true;
      material.opacity = opacity;
      material.depthWrite = false;
    });
  }

  function eachObjectMaterial(object, callback) {
    object.traverse((child) => {
      const materials = Array.isArray(child.material) ? child.material : child.material ? [child.material] : [];
      materials.forEach(callback);
    });
  }

  function setObjectOpacity(object, opacity) {
    eachObjectMaterial(object, (material) => {
      material.transparent = true;
      material.opacity = opacity;
      material.depthWrite = false;
    });
  }

  function setObjectEmissive(object, intensity) {
    eachObjectMaterial(object, (material) => {
      if ("emissiveIntensity" in material) material.emissiveIntensity = intensity;
    });
  }

  function suppressClosedSiloForReveal(mesh, revealGroup) {
    const restoreColumnState = [];
    const column = mesh.parent;
    if (!column) return;

    column.traverse((object) => {
      const shouldHideShell = object.userData.kind === "closedSiloSkin";
      const shouldSoften = object === mesh || object.userData.kind === "scanBand" || object.userData.kind === "pulse";
      if (!shouldHideShell && !shouldSoften) return;

      restoreColumnState.push({
        object,
        visible: object.visible,
        materials: captureMaterials(object),
      });

      if (shouldHideShell) {
        object.visible = false;
        return;
      }

      fadeMaterial(object, object === mesh ? 0.025 : 0.06);
    });

    revealGroup.userData.restoreColumnState = restoreColumnState;
  }

  function markRevealObject(object, kind, config = {}) {
    object.userData.kind = kind;
    Object.assign(object.userData, config);
    if ("baseOpacity" in config) setObjectOpacity(object, config.baseOpacity);
    if (kind === "bucketRevealDoor") setObjectOpacity(object, config.baseOpacity ?? 0);
    animated.push(object);
    return object;
  }

  function showBucketReveal(mesh, payload) {
    clearReveal();
    const worldPos = new THREE.Vector3();
    mesh.getWorldPosition(worldPos);
    const bucket = payload.bucket;
    const color = payload.color ?? COLORS.cyan;
    const height = payload.revealHeight ?? 2.5;
    const born = clock.elapsedTime;
    const group = new THREE.Group();
    group.position.set(worldPos.x, 0, worldPos.z);
    root.add(group);
    activeReveal = group;
    suppressClosedSiloForReveal(mesh, group);

    const siloRects = {
      chamber: { x: 0.337, y: 0.014, w: 0.314, h: 0.557 },
      closed: { x: 0.012, y: 0.014, w: 0.31, h: 0.327 },
      leftDoor: { x: 0.012, y: 0.348, w: 0.31, h: 0.226 },
      rightDoor: { x: 0.671, y: 0.014, w: 0.314, h: 0.327 },
      tallRail: { x: 0.012, y: 0.586, w: 0.094, h: 0.293 },
      curvedWingA: { x: 0.313, y: 0.588, w: 0.104, h: 0.246 },
      curvedWingB: { x: 0.424, y: 0.588, w: 0.104, h: 0.246 },
      curvedWingC: { x: 0.535, y: 0.588, w: 0.104, h: 0.246 },
      roundCap: { x: 0.716, y: 0.604, w: 0.228, h: 0.228 },
    };
    const darkPanel = metal(0x03070b, { roughness: 0.4, metalness: 0.94, emissive: 0x02090d, emissiveIntensity: 0.14 });
    const chamberMat = skinMaterial(siloRects.chamber, {
      atlas: siloSkinAtlas,
      emissive: color,
      emissiveIntensity: 0.22,
      metalness: 0.64,
      roughness: 0.38,
      side: THREE.DoubleSide,
      opacity: 0.92,
    });
    const chamber = texturedPanel(group, [1.7, height * 0.98], [0, 0.36 + height / 2, -0.22], chamberMat, [0, 0, 0]);
    chamber.renderOrder = 2;
    markRevealObject(chamber, "bucketRevealPanel", { born, baseOpacity: 0, targetOpacity: 1, delay: 0.05 });

    const capTop = addMesh(group, new THREE.CylinderGeometry(0.9, 0.98, 0.12, 40), darkPanel, [0, 0.66 + height, -0.02], { shadow: false });
    markRevealObject(capTop, "bucketRevealPanel", { born, baseOpacity: 0.2, targetOpacity: 1, delay: 0.02 });
    const capBottom = addMesh(group, new THREE.CylinderGeometry(0.92, 1.02, 0.14, 40), darkPanel.clone(), [0, 0.28, -0.02], { shadow: false });
    markRevealObject(capBottom, "bucketRevealPanel", { born, baseOpacity: 0.2, targetOpacity: 1, delay: 0.02 });

    [
      { y: 0.57 + height, w: 1.58, h: 0.14, z: 0.31, delay: 0.04 },
      { y: 0.38, w: 1.66, h: 0.14, z: 0.33, delay: 0.07 },
    ].forEach(({ y, w, h, z, delay }) => {
      const clamp = roundedBox(
        group,
        [w, h, 0.18],
        [0, y, z],
        metal(0x03080d, { roughness: 0.38, metalness: 0.94, emissive: 0x021016, emissiveIntensity: 0.18 }),
        { shadow: false },
      );
      clamp.renderOrder = 6;
      markRevealObject(clamp, "bucketRevealPanel", { born, baseOpacity: 0, targetOpacity: 1, delay });
    });

    [
      { x: -0.86, y: 0.42 + height / 2 },
      { x: 0.86, y: 0.42 + height / 2 },
    ].forEach(({ x, y }) => {
      const hinge = roundedBox(
        group,
        [0.12, height * 0.82, 0.16],
        [x, y, 0.34],
        metal(0x02060a, { roughness: 0.44, metalness: 0.94, emissive: 0x021016, emissiveIntensity: 0.16 }),
        { shadow: false },
      );
      hinge.renderOrder = 6;
      markRevealObject(hinge, "bucketRevealPanel", { born, baseOpacity: 0, targetOpacity: 1, delay: 0.08 });
    });

    [-1, 1].forEach((side) => {
      const doorSkin = side < 0 ? siloRects.leftDoor : siloRects.rightDoor;
      const door = trimmedRadialPanel(
        group,
        doorSkin,
        {
          angle: 0,
          radius: 0,
          y: 0,
          width: 0.58,
          height: height * 0.88,
          atlas: siloSkinAtlas,
          emissive: color,
          emissiveIntensity: 0.34,
        },
      );
      door.position.set(side * 0.36, 0.34 + height / 2, 0.22);
      markRevealObject(door, "bucketRevealDoor", {
        born,
        startX: side * 0.36,
        targetX: side * 0.58,
        targetRotZ: side * 0.045,
        baseOpacity: 0,
        targetOpacity: 1,
        startRotY: 0,
        targetRotY: -side * 0.08,
        phase: side,
      });

      const rail = trimmedRadialPanel(
        group,
        siloRects.tallRail,
        {
          angle: 0,
          radius: 0,
          y: 0,
          width: 0.14,
          height: height * 0.78,
          atlas: siloSkinAtlas,
          emissive: color,
          emissiveIntensity: 0.42,
        },
      );
      rail.position.set(side * 0.72, 0.4 + height / 2, 0.3);
      markRevealObject(rail, "bucketRevealDoor", {
        born,
        startX: side * 0.72,
        targetX: side * 0.9,
        targetRotZ: side * 0.035,
        baseOpacity: 0,
        targetOpacity: 1,
        startRotY: 0,
        targetRotY: -side * 0.1,
        phase: side * 1.8,
      });
    });

    [
      { rect: siloRects.curvedWingA, side: -1, y: 0.42 + height * 0.33, z: 0.36, width: 0.28 },
      { rect: siloRects.curvedWingB, side: 1, y: 0.42 + height * 0.33, z: 0.36, width: 0.28 },
      { rect: siloRects.curvedWingC, side: -1, y: 0.44 + height * 0.58, z: 0.33, width: 0.22 },
      { rect: siloRects.curvedWingC, side: 1, y: 0.44 + height * 0.58, z: 0.33, width: 0.22 },
    ].forEach((part, i) => {
      const wing = trimmedRadialPanel(
        group,
        part.rect,
        {
          angle: 0,
          radius: 0,
          y: 0,
          width: Math.max(0.12, part.width - 0.08),
          height: height * 0.28,
          atlas: siloSkinAtlas,
          emissive: color,
          emissiveIntensity: 0.22,
        },
      );
      wing.position.set(part.side * 0.48, part.y, part.z);
      wing.rotation.y = part.side * 0.03;
      markRevealObject(wing, "bucketRevealDoor", {
        born,
        startX: wing.position.x,
        targetX: part.side * (0.66 + (i > 1 ? 0.08 : 0)),
        targetRotZ: part.side * 0.025,
        baseOpacity: 0,
        targetOpacity: 0.96,
        startRotY: 0,
        targetRotY: -part.side * 0.08,
        phase: i + 0.4,
      });
    });

    const energySlit = addMesh(
      group,
      new THREE.CylinderGeometry(0.035, 0.05, height * 0.82, 18),
      new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity: 0.0,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
      [0, 0.4 + height / 2, 0.42],
      { shadow: false },
    );
    markRevealObject(energySlit, "bucketRevealPanel", { born, baseOpacity: 0, targetOpacity: 0.48, delay: 0.12 });

    const card = makeHudPanel({
      eyebrow: bucket.eyebrow || `Major app systems / ${String(payload.index + 1).padStart(2, "0")} of ${String(buckets.length).padStart(2, "0")}`,
      title: bucket.title,
      subtitle: bucket.subtitle || "Platform operating system",
      badge: bucket.badge || `${bucket.files} signals`,
      rows: bucket.rows || [
        ["Current volume", bucket.valueLabel || formatBytes(bucket.size)],
        ["Tracked signals", String(bucket.files)],
        ["Operating state", "Current"],
        ["Coverage", "Company scoped"],
      ],
      footer: bucket.footer || "Maintain Ops platform index",
      status: bucket.status || "Current",
      accent: "#6edcff",
      width: 520,
      height: 310,
      scale: 0.74,
    });
    card.position.set(0, height + 1.34, 1.72);
    card.material.opacity = 0;
    card.material.depthTest = false;
    card.renderOrder = 80;
    markRevealObject(card, "bucketRevealCard", {
      born,
      baseY: card.position.y,
      targetY: height + 2.04,
      targetScale: card.scale.clone(),
    });
    group.add(card);

    for (let i = 0; i < 12; i += 1) {
      const angle = (i / 12) * Math.PI * 2;
      const packet = dataPacket(
        group,
        [0, 0.72 + height * 0.42, 0.1],
        [Math.cos(angle) * (1.15 + (i % 3) * 0.34), height + 0.5 + Math.sin(i) * 0.5, 0.7 + Math.sin(angle) * 0.4],
        color,
        { phase: i * 0.08, speed: 0.58, size: 0.055 },
      );
      packet.userData.born = born;
      packet.userData.lifespan = 1.4;
    }
  }

  function revealParticleBurst(group, color, fromY, toY, count = 10) {
    const born = clock.elapsedTime;
    for (let i = 0; i < count; i += 1) {
      const angle = (i / count) * Math.PI * 2;
      const packet = dataPacket(
        group,
        [0, fromY, 0.12],
        [Math.cos(angle) * (0.9 + (i % 3) * 0.25), toY + Math.sin(i) * 0.34, 0.7 + Math.sin(angle) * 0.34],
        color,
        { phase: i * 0.08, speed: 0.54, size: 0.05 },
      );
      packet.userData.born = born;
      packet.userData.lifespan = 1.25;
    }
  }

  function showPanelReveal(mesh, {
    eyebrow,
    title,
    subtitle,
    badge,
    rows,
    footer,
    status,
    color = COLORS.cyan,
    cardY = 2.4,
    cardZ = 0.9,
    cardWidth = 520,
    cardHeight = 310,
    cardScale = 0.74,
  }) {
    clearReveal();
    const worldPos = new THREE.Vector3();
    mesh.getWorldPosition(worldPos);
    const born = clock.elapsedTime;
    const group = new THREE.Group();
    group.position.set(worldPos.x, 0, worldPos.z);
    root.add(group);
    activeReveal = group;

    const aperture = addMesh(
      group,
      new THREE.TorusGeometry(0.78, 0.028, 8, 64),
      glow(color, 1.0),
      [0, 0.28, 0],
      { shadow: false },
    );
    aperture.rotation.x = Math.PI / 2;
    markRevealObject(aperture, "revealAperture", { born, baseScale: 0.35, targetScale: 1.45 });

    const card = makeHudPanel({
      eyebrow,
      title,
      subtitle,
      badge,
      rows,
      footer,
      status,
      accent: color === COLORS.mint ? "#89d9aa" : "#6edcff",
      width: cardWidth,
      height: cardHeight,
      scale: cardScale,
    });
    card.position.set(0, cardY - 0.65, cardZ);
    card.material.opacity = 0;
    card.material.depthTest = false;
    card.renderOrder = 80;
    markRevealObject(card, "bucketRevealCard", {
      born,
      baseY: card.position.y,
      targetY: cardY,
      targetScale: card.scale.clone(),
    });
    group.add(card);
    revealParticleBurst(group, color, 0.42, cardY - 0.35, 10);
  }

  function showMonthReveal(mesh, payload) {
    const month = payload.month;
    const added = month.valueLabel || (month.added ? formatBytes(month.added) : "0 B");
    const cumulative = months.slice(0, payload.index + 1).reduce((total, item) => total + item.added, 0);
    const remaining = 100 * 1024 * 1024 * 1024 - cumulative;
    showPanelReveal(mesh, {
      eyebrow: month.eyebrow || `Activity runway / ${String(payload.index + 1).padStart(2, "0")} of ${String(months.length).padStart(2, "0")}`,
      title: month.label,
      subtitle: month.subtitle || "Platform activity window",
      badge: month.badge || (month.added ? "Activity" : "Quiet"),
      rows: month.rows || [["Recorded activity", added], ["Cumulative activity", formatBytes(cumulative)], ["Runway window", "14 days"], ["Pattern", month.added ? "Above baseline" : "No activity"]],
      footer: month.footer || "Company activity runway",
      status: month.status || "Tracked",
      color: month.added ? COLORS.blue : COLORS.teal,
      cardY: 3.05,
      cardZ: 0.95,
    });
  }

  function showFileReveal(mesh, payload) {
    const file = payload.file;
    const rankedFiles = [...files].sort((a, b) => b.size - a.size || files.indexOf(a) - files.indexOf(b));
    const rank = rankedFiles.indexOf(file) + 1;
    const extension = file.name.includes(".") ? file.name.split(".").pop().toUpperCase() : "FILE";
    showPanelReveal(mesh, {
      eyebrow: file.eyebrow || "Current notable signal",
      title: file.name,
      subtitle: file.subtitle || `${file.bucket} / ${file.category}`,
      badge: file.badge || `Rank ${String(rank).padStart(2, "0")} of ${files.length}`,
      rows: file.rows || [["Signal value", file.valueLabel || formatBytes(file.size)], ["System", file.bucket], ["Source", file.equipment], ["Signal type", extension]],
      footer: file.footer || "Platform signal index",
      status: file.status || "Current",
      color: COLORS.mint,
      cardY: 3.25,
      cardZ: 0.95,
      cardWidth: 560,
      cardHeight: 314,
      cardScale: 0.72,
    });
  }

  function showVaultReveal(mesh) {
    showPanelReveal(mesh, {
      eyebrow: core.eyebrow || "Maintain Ops / App Health",
      title: core.title || "App Health",
      subtitle: core.subtitle || "Measured company app health",
      badge: core.badge || "Current",
      rows: core.rows || [["Health score", "Collecting"], ["Signals measured", "0/0"], ["Page load", "Collecting"], ["Responsiveness", "Collecting"]],
      footer: core.footer || "Maintain Ops command core",
      status: core.status || "Current",
      color: COLORS.cyan,
      cardY: 6.55,
      cardZ: 1.45,
      cardWidth: 540,
      cardHeight: 310,
      cardScale: 0.8,
    });
  }

  // ---------------------------------------------------------------------------
  // Selection and travel
  // ---------------------------------------------------------------------------
  function focusObject(mesh, { silent = false } = {}) {
    const payload = mesh.userData.payload;
    selected = mesh;
    placeRing(focusRing, mesh);
    const worldPos = new THREE.Vector3();
    mesh.getWorldPosition(worldPos);
    if (payload.type === "bucket") {
      currentZone = "buckets";
      const revealHeight = payload.revealHeight ?? 2.5;
      const lookY = Math.max(1.9, revealHeight * 0.65 + 0.9);
      travelTo(worldPos.clone().add(new THREE.Vector3(0.7, lookY + 2.8, 12.4)), worldPos.clone().add(new THREE.Vector3(0, lookY, 0.35)), 1.5);
      showBucketReveal(mesh, payload);
      onZoneChange(ZONES.buckets);
      if (!silent) onBucketSelected(payload.bucket, payload.index);
    } else if (payload.type === "month") {
      currentZone = "timeline";
      travelTo(worldPos.clone().add(new THREE.Vector3(0, 3.4, 5.6)), worldPos.clone().add(new THREE.Vector3(0, 0.3, 0)), 1.5);
      showMonthReveal(mesh, payload);
      onZoneChange(ZONES.timeline);
      if (!silent) onMonthSelected(payload.month, payload.index);
    } else if (payload.type === "file") {
      currentZone = "files";
      travelTo(worldPos.clone().add(new THREE.Vector3(0.35, 3.65, 9.0)), worldPos.clone().add(new THREE.Vector3(0, 1.5, 0)), 1.5);
      showFileReveal(mesh, payload);
      onZoneChange(ZONES.files);
      if (!silent) onFileSelected(payload.file, payload.index);
    } else if (payload.type === "vault") {
      currentZone = "vault";
      travelTo(worldPos.clone().add(new THREE.Vector3(-6.8, 3.2, 12.0)), worldPos.clone().add(new THREE.Vector3(0, 1.15, 0.1)), 1.6);
      showVaultReveal(mesh);
      onZoneChange(ZONES.vault);
      if (!silent) onVaultSelected();
    }
  }

  function clearSelection() {
    selected = null;
    focusRing.visible = false;
    clearReveal();
  }

  function setView(id) {
    clearSelection();
    if (!ZONES[id]) id = "overview";
    travelToZone(id);
  }

  // ---------------------------------------------------------------------------
  // Pointer interaction: hover tooltips, click to travel, drag to orbit
  // ---------------------------------------------------------------------------
  const POINTER_MOVE_THRESHOLD = Object.freeze({ mouse: 6, pen: 10, touch: 44 });
  const TOUCH_PICK_RADIUS = Object.freeze({ bucket: 58, file: 40, month: 42, vault: 72 });
  const drag = {
    active: false,
    moved: false,
    pointerId: null,
    pointerType: "mouse",
    lastGesture: "idle",
    x: 0,
    y: 0,
    startX: 0,
    startY: 0,
  };
  const touchProjection = new THREE.Vector3();
  let lastPickMode = "none";

  const touchTargetSizes = Object.freeze({
    bucket: [56, 116],
    file: [52, 88],
    month: [52, 92],
    vault: [120, 144],
  });
  const touchTargetMedia = window.matchMedia("(pointer: coarse), (hover: none)");

  function touchTargetLabel(payload) {
    const tooltipLines = Array.isArray(payload.tooltip) ? payload.tooltip : [];
    const label = tooltipLines.find((line) => typeof line === "string" && line.trim());
    if (label) return `Open ${label}`;
    return `Open ${payload.type || "performance object"}`;
  }

  const touchTargetEntries = touchTargets
    ? interactive.map((object) => {
      const payload = object.userData.payload || {};
      const [width, height] = touchTargetSizes[payload.type] || [80, 80];
      const button = document.createElement("button");
      button.type = "button";
      button.className = "spatial-touch-target";
      button.dataset.spatialType = payload.type || "object";
      if (payload.index !== undefined) button.dataset.spatialIndex = String(payload.index);
      button.setAttribute("aria-label", touchTargetLabel(payload));
      button.style.setProperty("--spatial-touch-width", `${width}px`);
      button.style.setProperty("--spatial-touch-height", `${height}px`);
      button.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        drag.lastGesture = "tap";
        lastPickMode = "touch-dom";
        focusObject(object);
      });
      touchTargets.append(button);
      return { button, object, projection: new THREE.Vector3() };
    })
    : [];

  let lastTouchTargetUpdate = 0;
  function updateTouchTargets(force = false) {
    if (!touchTargetMedia.matches) return;
    const now = performance.now();
    if (!force && rig.t >= 1 && !drag.active && now - lastTouchTargetUpdate < 250) return;
    lastTouchTargetUpdate = now;
    const cameraSettled = rig.t >= 1;
    touchTargetEntries.forEach(({ button, object, projection }) => {
      object.getWorldPosition(projection);
      projection.project(camera);
      const visible = projection.z >= -1
        && projection.z <= 1
        && projection.x >= -1.08
        && projection.x <= 1.08
        && projection.y >= -1.08
        && projection.y <= 1.08;
      button.hidden = !visible;
      if (!visible) return;
      button.disabled = !cameraSettled;
      button.style.left = `${(projection.x + 1) * 50}%`;
      button.style.top = `${(1 - projection.y) * 50}%`;
      button.style.zIndex = String(Math.round((1 - projection.z) * 1000));
    });
  }

  function pointerMoveThreshold(pointerType) {
    return POINTER_MOVE_THRESHOLD[pointerType] || POINTER_MOVE_THRESHOLD.mouse;
  }

  function releasePointerCapture(pointerId) {
    if (!Number.isInteger(pointerId)) return;
    try {
      if (canvas.hasPointerCapture(pointerId)) canvas.releasePointerCapture(pointerId);
    } catch (_error) {
      // Some synthetic and cancelled touch events no longer own capture.
    }
  }

  function resetPointerGesture(gesture) {
    releasePointerCapture(drag.pointerId);
    drag.active = false;
    drag.moved = false;
    drag.pointerId = null;
    drag.lastGesture = gesture;
  }

  function clearToOverview() {
    lastPickMode = "miss";
    clearSelection();
    travelToZone("overview");
  }

  function pickInteractive(clientX, clientY, allowTouchTolerance = false) {
    pointerNdc.x = (clientX / window.innerWidth) * 2 - 1;
    pointerNdc.y = -(clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(pointerNdc, camera);
    const directHit = raycaster.intersectObjects(interactive, false)[0]?.object ?? null;
    if (directHit) {
      lastPickMode = "raycast";
      return directHit;
    }
    if (!allowTouchTolerance) {
      lastPickMode = "miss";
      return null;
    }

    let nearest = null;
    let nearestDistance = Infinity;
    interactive.forEach((object) => {
      object.getWorldPosition(touchProjection);
      touchProjection.project(camera);
      if (touchProjection.z < -1 || touchProjection.z > 1) return;
      const x = (touchProjection.x + 1) * 0.5 * window.innerWidth;
      const y = (1 - touchProjection.y) * 0.5 * window.innerHeight;
      const radius = TOUCH_PICK_RADIUS[object.userData.payload?.type] ?? 36;
      const distance = Math.hypot(clientX - x, clientY - y);
      if (distance > radius || distance >= nearestDistance) return;
      nearest = object;
      nearestDistance = distance;
    });
    lastPickMode = nearest ? "touch-nearest" : "miss";
    return nearest;
  }

  function updateTooltip() {
    if (!tooltip) return;
    tooltip.hidden = true;
  }

  window.addEventListener("pointermove", (event) => {
    pointerNdc.x = (event.clientX / window.innerWidth) * 2 - 1;
    pointerNdc.y = -(event.clientY / window.innerHeight) * 2 + 1;
    pointerClient.x = event.clientX;
    pointerClient.y = event.clientY;
    pointerClient.overCanvas = event.target === canvas;
    const isActivePointer = drag.active && (drag.pointerId === null || event.pointerId === drag.pointerId);
    if (isActivePointer) {
      const dx = event.clientX - drag.x;
      const dy = event.clientY - drag.y;
      const distance = Math.hypot(event.clientX - drag.startX, event.clientY - drag.startY);
      if (distance > pointerMoveThreshold(drag.pointerType)) drag.moved = true;
      if (drag.moved) {
        rig.yaw = THREE.MathUtils.clamp(rig.yaw - dx * 0.0017, -0.16, 0.16);
        rig.pitch = THREE.MathUtils.clamp(rig.pitch + dy * 0.0012, -0.08, 0.1);
      }
      drag.x = event.clientX;
      drag.y = event.clientY;
    }
  });

  window.addEventListener("pointerdown", (event) => {
    if (event.target !== canvas || event.isPrimary === false) return;
    drag.active = true;
    drag.moved = false;
    drag.pointerId = Number.isInteger(event.pointerId) ? event.pointerId : null;
    drag.pointerType = event.pointerType || "mouse";
    drag.lastGesture = "pending";
    drag.x = event.clientX;
    drag.y = event.clientY;
    drag.startX = event.clientX;
    drag.startY = event.clientY;
    if (drag.pointerId !== null) {
      try {
        canvas.setPointerCapture(drag.pointerId);
      } catch (_error) {
        // Pointer capture can be unavailable for synthetic browser tests.
      }
    }
  });

  window.addEventListener("pointerup", (event) => {
    if (!drag.active || (drag.pointerId !== null && event.pointerId !== drag.pointerId)) return;
    const wasDrag = drag.moved;
    const pointerType = drag.pointerType;
    resetPointerGesture(wasDrag ? "drag" : "tap");
    if (wasDrag) return;
    // DOM touch targets own object selection on coarse-pointer devices. A touch
    // that reaches bare canvas is therefore an intentional empty-space tap.
    if (pointerType === "touch" && touchTargetEntries.length) {
      clearToOverview();
      return;
    }
    // Raycast from the release point itself; the pointer may never have moved.
    const hit = pickInteractive(event.clientX, event.clientY, pointerType === "touch");
    if (hit) focusObject(hit);
    else clearToOverview();
  });

  window.addEventListener("pointercancel", (event) => {
    if (!drag.active || (drag.pointerId !== null && event.pointerId !== drag.pointerId)) return;
    const completeTouchTap = drag.pointerType === "touch" && !drag.moved;
    const clientX = drag.x;
    const clientY = drag.y;
    resetPointerGesture(completeTouchTap ? "tap" : "cancel");
    if (!completeTouchTap) return;
    if (touchTargetEntries.length) {
      clearToOverview();
      return;
    }
    const hit = pickInteractive(clientX, clientY, true);
    if (hit) focusObject(hit);
    else clearToOverview();
  });

  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    applyViewportTuning();
    renderer.setPixelRatio(renderPixelRatio());
    renderer.setSize(window.innerWidth, window.innerHeight);
    composer.setSize(window.innerWidth, window.innerHeight);
    updateTouchTargets(true);
    if (!selected) travelToZone(currentZone, 0.8);
  });

  let contextLosses = 0;
  canvas.addEventListener("webglcontextlost", (event) => {
    event.preventDefault();
    contextLosses += 1;
    onPerformanceSample({ contextLosses, qualityTier: qualityState.effective });
  });

  // ---------------------------------------------------------------------------
  // Frame loop
  // ---------------------------------------------------------------------------
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  applyQuality(qualityState.preference);
  travelToZone("overview", 0.01);

  let latestPixelSample = { sampled: 0, nonBlack: 0, range: 0 };
  let pixelSampleReported = false;
  const pixelProbeEnabled = new URLSearchParams(window.location.search).has("qa_bust")
    || new URLSearchParams(window.location.search).has("lfes_canvas_probe");
  function samplePresentedPixels() {
    const gl = renderer.getContext();
    const width = Math.min(32, gl.drawingBufferWidth);
    const height = Math.min(32, gl.drawingBufferHeight);
    const pixels = new Uint8Array(width * height * 4);
    try {
      gl.readPixels(
        Math.max(0, Math.floor((gl.drawingBufferWidth - width) / 2)),
        Math.max(0, Math.floor((gl.drawingBufferHeight - height) / 2)),
        width,
        height,
        gl.RGBA,
        gl.UNSIGNED_BYTE,
        pixels,
      );
    } catch (_error) {
      return latestPixelSample;
    }
    let nonBlack = 0;
    let minimum = 255;
    let maximum = 0;
    for (let index = 0; index < pixels.length; index += 4) {
      const light = Math.round((pixels[index] + pixels[index + 1] + pixels[index + 2]) / 3);
      if (light > 4) nonBlack += 1;
      minimum = Math.min(minimum, light);
      maximum = Math.max(maximum, light);
    }
    latestPixelSample = { sampled: width * height, nonBlack, range: maximum - minimum };
    return latestPixelSample;
  }

  window.__STORAGE_WORLD_DEBUG = () => ({
    zone: currentZone,
    selected: selected?.userData?.payload
      ? { type: selected.userData.payload.type, index: selected.userData.payload.index ?? null }
      : null,
    pointerActive: drag.active,
    pointerGesture: drag.lastGesture,
    lastPickMode,
    touchTargetCount: touchTargetEntries.length,
    targets: interactive.map((object) => {
      const position = new THREE.Vector3();
      object.getWorldPosition(position);
      position.project(camera);
      return {
        type: object.userData.payload?.type || "",
        index: object.userData.payload?.index ?? null,
        x: Math.round((position.x + 1) * 0.5 * window.innerWidth),
        y: Math.round((1 - position.y) * 0.5 * window.innerHeight),
      };
    }),
    cameraPos: camera.position.toArray().map((v) => Number(v.toFixed(2))),
    baseLook: rig.baseLook.toArray().map((v) => Number(v.toFixed(2))),
    travelT: Number(rig.t.toFixed(2)),
    quality: { ...qualityState },
    renderer: {
      drawCalls: renderer.info.render.calls,
      triangles: renderer.info.render.triangles,
      geometries: renderer.info.memory.geometries,
      textures: renderer.info.memory.textures,
      drawingWidth: renderer.domElement.width,
      drawingHeight: renderer.domElement.height,
      pixels: latestPixelSample,
    },
  });

  let lastRenderAt = 0;
  let sampleStartedAt = performance.now();
  let sampledFrames = 0;
  let sampledFrameTime = 0;
  let sampledSlowFrames = 0;
  let firstRenderReported = false;
  let performanceSampleReported = false;

  function animate(timestamp = performance.now()) {
    requestAnimationFrame(animate);
    const targetFps = document.hidden ? 4 : qualitySettings.targetFps;
    const targetInterval = 1000 / targetFps;
    if (lastRenderAt && timestamp - lastRenderAt < targetInterval - 1) return;
    const observedFrameTime = lastRenderAt ? timestamp - lastRenderAt : targetInterval;
    lastRenderAt = timestamp;
    const dt = Math.min(clock.getDelta(), 0.12);
    const elapsed = clock.elapsedTime;

    // Hover raycast (only when the pointer is actually over open canvas)
    let hit = null;
    if (pointerClient.overCanvas && !drag.active) {
      raycaster.setFromCamera(pointerNdc, camera);
      hit = raycaster.intersectObjects(interactive, false)[0]?.object ?? null;
    }
    if (hovered !== hit) {
      hovered = hit;
      canvas.style.cursor = hovered ? "pointer" : "grab";
    }
    if (hovered && hovered !== selected) placeRing(hoverRing, hovered);
    else hoverRing.visible = false;
    updateTooltip();

    animated.forEach((object) => {
      if (object.userData.kind === "rail") {
        const base = (object.userData.baseIntensity ??= object.material.emissiveIntensity ?? 0.12);
        object.material.emissiveIntensity = base + Math.sin(elapsed * 1.6 + object.userData.phase) * base * 0.18;
        return;
      }
      if (object.userData.kind === "pulse") {
        if ("emissiveIntensity" in object.material) {
          const pulseBase = (object.userData.pulseBase ??= object.material.emissiveIntensity);
          object.material.emissiveIntensity = pulseBase * (1 + 0.3 * Math.sin(elapsed * 1.8 + object.userData.phase));
        } else {
          object.material.opacity = 0.12 + (Math.sin(elapsed * 1.8 + object.userData.phase) + 1) * 0.05;
        }
        return;
      }
      if (object.userData.kind === "spin") {
        object.rotation.z += dt * (object.userData.speed ?? 0.4);
        return;
      }
      if (object.userData.kind === "scanBand") {
        object.position.y = object.userData.baseY + Math.sin(elapsed * 1.9 + object.userData.phase) * object.userData.span;
        object.material.opacity = 0.18 + (Math.sin(elapsed * 2.1 + object.userData.phase) + 1) * 0.14;
        return;
      }
      if (object.userData.kind === "gyro") {
        object.rotateZ(dt * (object.userData.speed ?? 0.25));
        return;
      }
      if (object.userData.kind === "coreGyro") {
        const speed = object.userData.speed ?? 0.12;
        object.rotateZ(dt * speed);
        object.rotateX(dt * speed * 0.12);
        object.rotateY(dt * speed * 0.18);
        return;
      }
      if (object.userData.kind === "coreCage") {
        object.rotation.y += dt * 0.045;
        object.rotation.x = Math.sin(elapsed * 0.18 + object.userData.phase) * 0.035;
        object.material.opacity = 0.14 + (Math.sin(elapsed * 0.7) + 1) * 0.025;
        return;
      }
      if (object.userData.kind === "corePulse") {
        const pulse = 1 + Math.sin(elapsed * 1.15 + object.userData.phase) * 0.075;
        object.scale.setScalar(pulse);
        object.material.emissiveIntensity = 1.45 + (Math.sin(elapsed * 1.15) + 1) * 0.34;
        return;
      }
      if (object.userData.kind === "coreBeam") {
        object.material.opacity = object.userData.baseOpacity + (Math.sin(elapsed * 1.05) + 1) * 0.09;
        object.scale.y = 0.96 + Math.sin(elapsed * 0.72) * 0.04;
        return;
      }
      if (object.userData.kind === "coreSatellite") {
        const angle = elapsed * object.userData.speed + object.userData.phase;
        object.position.x = Math.cos(angle) * object.userData.radius;
        object.position.z = Math.sin(angle) * object.userData.radius;
        object.position.y = 3.4 + object.userData.lift + Math.sin(angle * 1.7) * 0.28;
        object.scale.setScalar(0.82 + (Math.sin(elapsed * 1.8 + object.userData.phase) + 1) * 0.16);
        return;
      }
      if (object.userData.kind === "coreLight") {
        object.intensity = object.userData.baseIntensity * (0.82 + (Math.sin(elapsed * 1.15) + 1) * 0.09);
        return;
      }
      if (object.userData.kind === "dataPacket") {
        const k = (elapsed * (object.userData.speed ?? 0.1) + object.userData.phase) % 1;
        object.position.lerpVectors(object.userData.from, object.userData.to, k);
        object.material.opacity = 0.18 + Math.sin(k * Math.PI) * 0.74;
        const pulseScale = 0.75 + Math.sin(k * Math.PI) * 0.55;
        object.scale.setScalar(pulseScale);
        return;
      }
      if (object.userData.kind === "sweep") {
        object.rotation.z += dt * (object.userData.speed ?? 0.08);
        object.material.emissiveIntensity = 0.26 + (Math.sin(elapsed * 1.4) + 1) * 0.14;
        return;
      }
      if (object.userData.kind === "bucketRevealDoor") {
        const k = easeInOutCubic(THREE.MathUtils.clamp((elapsed - object.userData.born) / 0.72, 0, 1));
        object.position.x = THREE.MathUtils.lerp(object.userData.startX, object.userData.targetX, k);
        object.rotation.z = THREE.MathUtils.lerp(0, object.userData.targetRotZ, k);
        object.rotation.y = THREE.MathUtils.lerp(object.userData.startRotY ?? 0, object.userData.targetRotY ?? 0, k);
        setObjectOpacity(object, THREE.MathUtils.lerp(object.userData.baseOpacity ?? 0.1, object.userData.targetOpacity ?? 0.38, k));
        setObjectEmissive(object, 0.2 + Math.sin(elapsed * 3.2 + object.userData.phase) * 0.04);
        return;
      }
      if (object.userData.kind === "bucketRevealPanel") {
        const k = easeInOutCubic(THREE.MathUtils.clamp((elapsed - object.userData.born - (object.userData.delay ?? 0)) / 0.52, 0, 1));
        setObjectOpacity(object, THREE.MathUtils.lerp(object.userData.baseOpacity ?? 0, object.userData.targetOpacity ?? 1, k));
        setObjectEmissive(object, 0.12 + k * 0.18);
        object.scale.setScalar(0.96 + k * 0.04);
        return;
      }
      if (object.userData.kind === "bucketRevealCard") {
        const k = easeInOutCubic(THREE.MathUtils.clamp((elapsed - object.userData.born - 0.12) / 0.86, 0, 1));
        object.position.y = THREE.MathUtils.lerp(object.userData.baseY, object.userData.targetY, k);
        object.material.opacity = k;
        object.scale.copy(object.userData.targetScale).multiplyScalar(0.86 + k * 0.14);
        return;
      }
      if (object.userData.kind === "bucketRevealChip") {
        const k = easeInOutCubic(THREE.MathUtils.clamp((elapsed - object.userData.born - object.userData.delay) / 0.7, 0, 1));
        object.position.x = THREE.MathUtils.lerp(0, object.userData.targetX, k);
        object.position.y = THREE.MathUtils.lerp(object.position.y, object.userData.targetY + Math.sin(elapsed * 1.4 + object.id) * 0.035, 0.16);
        object.position.z = THREE.MathUtils.lerp(object.position.z, object.userData.targetZ, 0.14);
        object.material.opacity = k * 0.88;
        return;
      }
      if (object.userData.kind === "revealAperture") {
        const k = easeInOutCubic(THREE.MathUtils.clamp((elapsed - object.userData.born) / 0.62, 0, 1));
        const scale = THREE.MathUtils.lerp(object.userData.baseScale, object.userData.targetScale, k);
        object.scale.set(scale, scale, 1);
        object.rotation.z += dt * 0.9;
        object.material.emissiveIntensity = 0.62 + Math.sin(elapsed * 3.4) * 0.12;
        return;
      }
      if (!object.userData.payload) return;
      const isHot = object === hovered || object === selected;
      const target = object.userData.baseScale.clone().multiplyScalar(isHot ? 1.05 : 1);
      object.scale.lerp(target, 0.14);
      const bob = (object.userData.bob ?? 0) * Math.sin(elapsed * 1.1 + object.id * 0.7);
      const lift = isHot ? 0.1 : 0;
      object.position.y += (object.userData.baseY + bob + lift - object.position.y) * 0.12;
      if (object.material.emissive) {
        const base = object.userData.baseEmissive;
        object.material.emissiveIntensity += ((isHot ? base + 0.7 : base) - object.material.emissiveIntensity) * 0.14;
      }
    });

    zoneLabels.forEach(({ sprite, zone }) => {
      const compact = camera.aspect < 0.75;
      const visible = currentZone === "overview" || currentZone === zone;
      const target = visible ? (compact && currentZone === "overview" ? 0.58 : 0.86) : 0.035;
      sprite.material.opacity += (target - sprite.material.opacity) * Math.min(1, dt * 4);
    });

    focusRing.rotation.z += dt * 0.7;
    const pulse = 1 + Math.sin(elapsed * 2.4) * 0.045;
    if (focusRing.visible) {
      const radius = selected?.userData.payload.focusRadius ?? 1;
      focusRing.scale.set(radius * pulse, radius * pulse, 1);
    }

    // Camera travel + manual orbit
    if (rig.t < 1) {
      rig.t = Math.min(1, rig.t + dt / rig.duration);
      const k = easeInOutCubic(rig.t);
      rig.basePos.lerpVectors(rig.fromPos, rig.toPos, k);
      rig.baseLook.lerpVectors(rig.fromLook, rig.toLook, k);
      rig.yaw = rig.yawStart * (1 - k);
      rig.pitch = rig.pitchStart * (1 - k);
    }
    tmpOffset.subVectors(rig.basePos, rig.baseLook);
    tmpSpherical.setFromVector3(tmpOffset);
    tmpSpherical.theta += rig.yaw + (drag.active ? 0 : Math.sin(elapsed * 0.12) * 0.006);
    tmpSpherical.phi = THREE.MathUtils.clamp(tmpSpherical.phi - rig.pitch, 0.8, 1.24);
    tmpOffset.setFromSpherical(tmpSpherical);
    camera.position.copy(rig.baseLook).add(tmpOffset);
    camera.lookAt(rig.baseLook);
    updateTouchTargets();

    renderer.info.reset();
    composer.render();
    if (pixelProbeEnabled && assetsReady && !pixelSampleReported) {
      samplePresentedPixels();
      pixelSampleReported = true;
    }
    if (assetsReady && !firstRenderReported) {
      firstRenderReported = true;
      onFirstRender({ qualityTier: qualityState.effective });
    }
    if (!document.hidden) {
      sampledFrames += 1;
      sampledFrameTime += observedFrameTime;
      if (observedFrameTime > targetInterval * 1.5) sampledSlowFrames += 1;
      const sampleDuration = timestamp - sampleStartedAt;
      if (sampleDuration >= (performanceSampleReported ? 60000 : 6000)) {
        onPerformanceSample({
          fps: sampledFrames / (sampleDuration / 1000),
          frameMs: sampledFrames ? sampledFrameTime / sampledFrames : 0,
          slowFramePercent: sampledFrames ? (sampledSlowFrames / sampledFrames) * 100 : 0,
          drawCalls: renderer.info.render.calls,
          triangles: renderer.info.render.triangles,
          geometries: renderer.info.memory.geometries,
          textures: renderer.info.memory.textures,
          contextLosses,
          qualityTier: qualityState.effective,
        });
        sampleStartedAt = timestamp;
        sampledFrames = 0;
        sampledFrameTime = 0;
        sampledSlowFrames = 0;
        performanceSampleReported = true;
      }
    }
  }
  animate();

  return {
    quality() {
      return { ...qualityState };
    },
    setQuality(preference) {
      return applyQuality(preference);
    },
    setView,
    focusBucket(index) {
      if (bucketAnchors[index]) focusObject(bucketAnchors[index], { silent: true });
    },
    focusMonth(index) {
      if (monthAnchors[index]) focusObject(monthAnchors[index], { silent: true });
    },
    focusFile(index) {
      if (fileAnchors[index]) focusObject(fileAnchors[index], { silent: true });
    },
  };
}
