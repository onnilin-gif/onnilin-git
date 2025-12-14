document.addEventListener('DOMContentLoaded', async () => {
    const themeToggle = document.getElementById('theme-toggle-checkbox');
    const htmlEl = document.documentElement;

    const particlesConfigLight = {
        particles: {
            number: { value: 80, density: { enable: true, value_area: 800 } },
            color: { value: "#6b7280" },
            shape: { type: "circle" },
            opacity: { value: 0.5, random: false, anim: { enable: false, speed: 1, opacity_min: 0.1, sync: false } },
            size: { value: 3, random: true, anim: { enable: false, speed: 40, size_min: 0.1, sync: false } },
            links: { color: "#6b7280", distance: 150, enable: true, opacity: 0.4, width: 1 },
            move: { enable: true, speed: 1, direction: "none", random: false, straight: false, out_mode: "out", bounce: false, attract: { enable: false, rotateX: 600, rotateY: 1200 } }
        },
        interactivity: {
            detect_on: "canvas",
            events: { onhover: { enable: true, mode: "repulse" }, onclick: { enable: false }, resize: true },
            modes: { repulse: { distance: 100, duration: 0.4 } }
        },
        retina_detect: true
    };

    const particlesConfigDark = {
        ...particlesConfigLight, // Inherit base config
        particles: {
            ...particlesConfigLight.particles,
            color: { value: "#9ca3af" },
            links: { ...particlesConfigLight.particles.links, color: "#9ca3af" }
        }
    };
    
    let currentParticles = null;

    const loadParticles = async (config) => {
        if (currentParticles) {
            currentParticles.destroy();
        }
        currentParticles = await tsParticles.load({ id: "tsparticles", options: config });
    };

    const setTheme = (theme) => {
        htmlEl.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        themeToggle.checked = theme === 'dark';

        if (theme === 'dark') {
            loadParticles(particlesConfigDark);
        } else {
            loadParticles(particlesConfigLight);
        }
    };

    themeToggle.addEventListener('change', () => {
        setTheme(themeToggle.checked ? 'dark' : 'light');
    });

    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme) {
        setTheme(savedTheme);
    } else if (prefersDark) {
        setTheme('dark');
    } else {
        setTheme('light');
    }
});
