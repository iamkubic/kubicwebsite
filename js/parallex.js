document.addEventListener('DOMContentLoaded', () => {
    const logo = document.querySelector('#logo img');

    function handleParallax(x, y) {
        logo.style.transform = `translate(${x}px, ${y}px)`;
    }

    let isDragging = false;

    if (window.matchMedia("(pointer: coarse)").matches) {
        // Mobile: Tap-and-drag
        logo.addEventListener('touchstart', () => {
            isDragging = true;
        });

        logo.addEventListener('touchmove', (e) => {
            if (isDragging && e.touches.length === 1) {
                const touch = e.touches[0];
                const rect = logo.getBoundingClientRect();
                const offsetX = (touch.clientX - (rect.left + rect.width / 2)) / 15;
                const offsetY = (touch.clientY - (rect.top + rect.height / 2)) / 15;
                handleParallax(offsetX, offsetY);
            }
        });

        logo.addEventListener('touchend', () => {
            isDragging = false;
            handleParallax(0, 0);
        });

    } else {
        // Desktop: Mouse move
        document.addEventListener('mousemove', (event) => {
            const { clientX, clientY } = event;
            const logoRect = logo.getBoundingClientRect();
            const logoCenterX = logoRect.left + logoRect.width / 2;
            const logoCenterY = logoRect.top + logoRect.height / 2;
            const offsetX = (clientX - logoCenterX) / 100;
            const offsetY = (clientY - logoCenterY) / 110;
            handleParallax(offsetX, offsetY);
        });
    }
});
