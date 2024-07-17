document.addEventListener('DOMContentLoaded', (event) => {
    const logo = document.querySelector('#logo img');
    if (logo) {
        document.addEventListener('mousemove', (event) => {
            const { clientX, clientY } = event;

            const logoRect = logo.getBoundingClientRect();
            const logoCenterX = logoRect.left + logoRect.width / 2;
            const logoCenterY = logoRect.top + logoRect.height / 2;

            const offsetX = (clientX - logoCenterX) / 100; // Adjust for intensity
            const offsetY = (clientY - logoCenterY) / 110; // Adjust for intensity

            logo.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
        });
    } else {
        console.error("Logo not found!");
    }
});
