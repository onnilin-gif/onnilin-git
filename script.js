document.addEventListener('DOMContentLoaded', async () => {
    // --- Common Elements ---
    const themeToggle = document.getElementById('theme-toggle-checkbox');
    const htmlEl = document.documentElement;

    // --- tsParticles Logic ---
    const particlesConfigLight = {
        particles: { number: { value: 40 }, color: { value: "#6b7280" }, links: { color: "#6b7280", distance: 150, enable: true, opacity: 0.2 }, move: { enable: true, speed: 1 } },
        interactivity: { events: { onhover: { enable: true, mode: "repulse" } }, modes: { repulse: { distance: 100 } } },
    };
    const particlesConfigDark = {
        ...particlesConfigLight,
        particles: { ...particlesConfigLight.particles, color: { value: "#9ca3af" }, links: { ...particlesConfigLight.particles.links, color: "#9ca3af" } }
    };
    let currentParticles = null;
    const loadParticles = async (config) => {
        if (currentParticles) { currentParticles.destroy(); }
        currentParticles = await tsParticles.load({ id: "tsparticles", options: config });
    };

    // --- Chart.js Logic ---
    let gpaChart = null;
    const chartLabels = ['2025-1', '2025-2', '2026-1', '2026-2', '2027-1', '2027-2', '2028-1', '2028-2'];
    const chartData = [4.35, null, null, null, null, null, null, null];

    const getGpaChartConfig = (theme) => {
        const isDark = theme === 'dark';
        const gridColor = isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';
        const ticksColor = isDark ? '#9ca3af' : '#6b7280';
        const pointColor = isDark ? '#f4f7f9' : '#1f2937';
        const accentColor = getComputedStyle(htmlEl).getPropertyValue('--accent-color').trim();

        return {
            type: 'line',
            data: {
                labels: chartLabels,
                datasets: [{
                    label: 'GPA',
                    data: chartData,
                    borderColor: accentColor,
                    backgroundColor: accentColor,
                    pointBackgroundColor: pointColor,
                    pointBorderColor: accentColor,
                    pointHoverBackgroundColor: accentColor,
                    pointHoverBorderColor: pointColor,
                    tension: 0.1,
                    spanGaps: true,
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: false,
                        min: 3.0,
                        max: 4.5,
                        grid: { color: gridColor },
                        ticks: { color: ticksColor }
                    },
                    x: {
                        grid: { display: false },
                        ticks: { color: ticksColor }
                    }
                },
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                if (context.parsed.y !== null) {
                                    return `GPA: ${context.parsed.y}`;
                                }
                                return 'GPA: (미래 학기)';
                            }
                        }
                    }
                }
            }
        };
    };
    
    const initOrUpdateGpaChart = (theme) => {
        const config = getGpaChartConfig(theme);
        if (!gpaChart) {
            const ctx = document.getElementById('gpa-chart').getContext('2d');
            gpaChart = new Chart(ctx, config);
        } else {
            const chartColors = config.options.scales;
            gpaChart.options.scales.y.grid.color = chartColors.y.grid.color;
            gpaChart.options.scales.y.ticks.color = chartColors.y.ticks.color;
            gpaChart.options.scales.x.ticks.color = chartColors.x.ticks.color;
            gpaChart.data.datasets[0].borderColor = config.data.datasets[0].borderColor;
            gpaChart.data.datasets[0].backgroundColor = config.data.datasets[0].backgroundColor;
            gpaChart.update();
        }
    };


    // --- Theme Controller ---
    const setTheme = (theme) => {
        htmlEl.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        themeToggle.checked = theme === 'dark';

        loadParticles(theme === 'dark' ? particlesConfigDark : particlesConfigLight);
        initOrUpdateGpaChart(theme);
    };

    themeToggle.addEventListener('change', () => {
        setTheme(themeToggle.checked ? 'dark' : 'light');
    });

    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    setTheme(savedTheme || (prefersDark ? 'dark' : 'light'));
});
