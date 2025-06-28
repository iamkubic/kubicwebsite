document.addEventListener('DOMContentLoaded', () => {
    const logo = document.querySelector('#logo img');

    function handleParallax(x, y) {
        const offsetX = x / 50; // Adjust for sensitivity
        const offsetY = y / 50;
        logo.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
    }

    if (window.DeviceOrientationEvent) {
        window.addEventListener('deviceorientation', (event) => {
            const gamma = event.gamma || 0; // left-right tilt
            const beta = event.beta || 0;   // front-back tilt
            handleParallax(gamma, beta);
        }, true);
    } else {
        document.addEventListener('mousemove', (event) => {
            const { clientX, clientY } = event;
            const logoRect = logo.getBoundingClientRect();
            const logoCenterX = logoRect.left + logoRect.width / 2;
            const logoCenterY = logoRect.top + logoRect.height / 2;
            const offsetX = (clientX - logoCenterX) / 100;
            const offsetY = (clientY - logoCenterY) / 110;
            logo.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
        });
    }
});
