document.addEventListener('DOMContentLoaded', () => {
    const logo = document.querySelector('#logo img');
    if (!logo) {
        console.error("Logo not found!");
        return;
    }

    const isMobile = window.matchMedia("(pointer: coarse)").matches;
    let isDragging = false;

    if (isMobile) {
        // Mobile: tap-and-drag
        logo.addEventListener('touchstart', () => {
            isDragging = true;
        });

        logo.addEventListener('touchmove', (e) => {
            if (!isDragging || e.touches.length !== 1) return;
            const touch = e.touches[0];
            const rect = logo.getBoundingClientRect();
            const offsetX = (touch.clientX - (rect.left + rect.width / 2)) / 15;
            const offsetY = (touch.clientY - (rect.top + rect.height / 2)) / 15;
            logo.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
        });

        logo.addEventListener('touchend', () => {
            isDragging = false;
            logo.style.transform = `translate(0px, 0px)`;
        });

    } else {
        // Desktop: mousemove
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
