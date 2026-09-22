// Nova Motion — Agency Portfolio Script
document.addEventListener('DOMContentLoaded', () => {
    // Set current year in footer
    const yearEl = document.getElementById('currentYear');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }

    // Check reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Mobile Navigation Toggle
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('open');
            navToggle.classList.toggle('active');
            const expanded = navToggle.getAttribute('aria-expanded') === 'true' || false;
            navToggle.setAttribute('aria-expanded', !expanded);
        });

        // Close mobile nav when clicking link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('open');
                navToggle.classList.remove('active');
            });
        });
    }

    // Contact Form Handling (Client-side feedback)
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('name').value.trim();
            if (formStatus) {
                formStatus.style.color = '#00f2fe';
                formStatus.textContent = `Thank you, ${name}! Your message has been received. We'll be in touch within 24 hours.`;
                contactForm.reset();
            }
        });
    }

    // --- Three.js 3D Background Setup ---
    initThreeJS(prefersReducedMotion);

    // --- GSAP Scroll Animations Setup ---
    initGSAPAnimations(prefersReducedMotion);
});

/* Three.js Background Implementation */
function initThreeJS(isReducedMotion) {
    const canvas = document.getElementById('webgl-canvas');
    if (!canvas || typeof THREE === 'undefined') return;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();

    // Camera settings
    const camera = new THREE.PerspectiveCamera(
        60,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    camera.position.z = 15;

    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true,
        antialias: !isReducedMotion
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isReducedMotion ? 1 : 2));

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x00f2fe, 2, 50); // Cyan light
    pointLight1.position.set(10, 10, 10);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x9d4edd, 2, 50); // Purple light
    pointLight2.position.set(-10, -10, 10);
    scene.add(pointLight2);

    const pointLight3 = new THREE.PointLight(0xff007f, 1.5, 40); // Magenta glow
    pointLight3.position.set(0, 15, -5);
    scene.add(pointLight3);

    // Main Abstract Visual Group
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // Central Floating 3D Geometric Object (Torus Knot Wireframe + Core Geometry)
    const torusKnotGeo = new THREE.TorusKnotGeometry(3, 0.9, 100, 16);
    const torusKnotMat = new THREE.MeshStandardMaterial({
        color: 0x00f2fe,
        wireframe: true,
        metalness: 0.8,
        roughness: 0.2,
        emissive: 0x0a1128
    });
    const torusKnot = new THREE.Mesh(torusKnotGeo, torusKnotMat);
    mainGroup.add(torusKnot);

    // Inner Glowing Core (Icosahedron)
    const coreGeo = new THREE.IcosahedronGeometry(1.8, 1);
    const coreMat = new THREE.MeshStandardMaterial({
        color: 0x9d4edd,
        roughness: 0.1,
        metalness: 0.9,
        wireframe: false
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    mainGroup.add(coreMesh);

    // Surrounding Floating Decorative Mesh Objects
    const floatingObjects = [];
    const geometries = [
        new THREE.TetrahedronGeometry(0.8),
        new THREE.OctahedronGeometry(0.7),
        new THREE.IcosahedronGeometry(0.6),
        new THREE.BoxGeometry(0.8, 0.8, 0.8)
    ];

    const materials = [
        new THREE.MeshStandardMaterial({ color: 0x00f2fe, wireframe: true }),
        new THREE.MeshStandardMaterial({ color: 0x9d4edd, wireframe: true }),
        new THREE.MeshStandardMaterial({ color: 0xff007f, wireframe: true })
    ];

    const count = isReducedMotion ? 8 : (window.innerWidth < 768 ? 15 : 30);
    for (let i = 0; i < count; i++) {
        const geo = geometries[Math.floor(Math.random() * geometries.length)];
        const mat = materials[Math.floor(Math.random() * materials.length)];
        const mesh = new THREE.Mesh(geo, mat);

        mesh.position.set(
            (Math.random() - 0.5) * 35,
            (Math.random() - 0.5) * 35,
            (Math.random() - 0.5) * 20 - 5
        );

        mesh.rotation.set(
            Math.random() * Math.PI,
            Math.random() * Math.PI,
            0
        );

        mesh.userData = {
            rotSpeedX: (Math.random() - 0.5) * 0.02,
            rotSpeedY: (Math.random() - 0.5) * 0.02,
            posY: mesh.position.y
        };

        floatingObjects.push(mesh);
        scene.add(mesh);
    }

    // Particle Stars System
    let particleSystem = null;
    const particleCount = isReducedMotion ? 100 : (window.innerWidth < 768 ? 300 : 800);
    const particlesGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
        particlePositions[i] = (Math.random() - 0.5) * 60;
        particlePositions[i + 1] = (Math.random() - 0.5) * 60;
        particlePositions[i + 2] = (Math.random() - 0.5) * 40;
    }

    particlesGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    const particleMat = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 0.12,
        transparent: true,
        opacity: 0.7
    });

    particleSystem = new THREE.Points(particlesGeo, particleMat);
    scene.add(particleSystem);

    // Mouse Parallax Interaction
    let targetMouseX = 0;
    let targetMouseY = 0;
    let mouseX = 0;
    let mouseY = 0;

    if (!isReducedMotion) {
        window.addEventListener('mousemove', (e) => {
            targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
            targetMouseY = (e.clientY / window.innerHeight - 0.5) * 2;
        });
    }

    // Scroll Position Tracking for Mesh Rotation/Positioning
    let scrollY = window.scrollY;
    window.addEventListener('scroll', () => {
        scrollY = window.scrollY;
    });

    // Resize Handler
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    // Animation Loop
    let animationFrameId = null;

    function render() {
        if (!isReducedMotion) {
            // Smooth mouse easing
            mouseX += (targetMouseX - mouseX) * 0.05;
            mouseY += (targetMouseY - mouseY) * 0.05;

            // Rotate central group
            torusKnot.rotation.x += 0.005;
            torusKnot.rotation.y += 0.008;

            coreMesh.rotation.x -= 0.003;
            coreMesh.rotation.y -= 0.005;

            mainGroup.rotation.y = mouseX * 0.3 + (scrollY * 0.0005);
            mainGroup.rotation.x = mouseY * 0.3;

            // Floating decorative objects motion
            floatingObjects.forEach(obj => {
                obj.rotation.x += obj.userData.rotSpeedX;
                obj.rotation.y += obj.userData.rotSpeedY;
            });

            // Slowly rotate particle field
            if (particleSystem) {
                particleSystem.rotation.y += 0.0003;
            }

            animationFrameId = requestAnimationFrame(render);
        }

        renderer.render(scene, camera);
    }

    // Initial render
    render();

    // If reduced motion, render single frame or minimal updates
    if (isReducedMotion) {
        renderer.render(scene, camera);
    }
}

/* GSAP Scroll Animations Implementation */
function initGSAPAnimations(isReducedMotion) {
    if (typeof gsap === 'undefined') return;

    if (typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
    }

    if (isReducedMotion) {
        // Simple instant visibility for accessibility / reduced motion mode
        gsap.set('.hero-title, .hero-description, .hero-actions, .service-card, .portfolio-card, .about-content, .contact-wrapper', {
            opacity: 1,
            y: 0
        });
        return;
    }

    // Hero Section Animation
    gsap.from('.hero-content .badge', {
        opacity: 0,
        y: -20,
        duration: 0.8,
        delay: 0.2
    });

    gsap.from('.hero-title', {
        opacity: 0,
        y: 30,
        duration: 1,
        delay: 0.4,
        ease: 'power3.out'
    });

    gsap.from('.hero-description', {
        opacity: 0,
        y: 20,
        duration: 0.8,
        delay: 0.6
    });

    gsap.from('.hero-actions', {
        opacity: 0,
        y: 20,
        duration: 0.8,
        delay: 0.8
    });

    if (typeof ScrollTrigger === 'undefined') return;

    // Services Scroll Animation
    gsap.from('.services-section .section-header', {
        scrollTrigger: {
            trigger: '.services-section',
            start: 'top 80%'
        },
        opacity: 0,
        y: 30,
        duration: 0.8
    });

    gsap.from('.service-card', {
        scrollTrigger: {
            trigger: '.services-grid',
            start: 'top 80%'
        },
        opacity: 0,
        y: 40,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power2.out'
    });

    // Portfolio Scroll Animation
    gsap.from('.portfolio-section .section-header', {
        scrollTrigger: {
            trigger: '.portfolio-section',
            start: 'top 80%'
        },
        opacity: 0,
        y: 30,
        duration: 0.8
    });

    gsap.from('.portfolio-card', {
        scrollTrigger: {
            trigger: '.portfolio-grid',
            start: 'top 80%'
        },
        opacity: 0,
        y: 40,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power2.out'
    });

    // About Section Scroll Animation
    gsap.from('.about-content', {
        scrollTrigger: {
            trigger: '.about-section',
            start: 'top 80%'
        },
        opacity: 0,
        y: 30,
        duration: 0.9,
        ease: 'power2.out'
    });

    // Contact Section Scroll Animation
    gsap.from('.contact-info', {
        scrollTrigger: {
            trigger: '.contact-section',
            start: 'top 80%'
        },
        opacity: 0,
        x: -30,
        duration: 0.8
    });

    gsap.from('.contact-form', {
        scrollTrigger: {
            trigger: '.contact-section',
            start: 'top 80%'
        },
        opacity: 0,
        x: 30,
        duration: 0.8
    });

    // Update active nav link on scroll
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let currentSection = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            if (window.scrollY >= sectionTop) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    });
}
