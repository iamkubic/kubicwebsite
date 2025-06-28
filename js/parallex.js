document.addEventListener('DOMContentLoaded', () => {
    const logo = document.querySelector('#logo img');
    if (!logo) {
        console.error("Logo not found!");
        return;
    }

    const isMobile = window.matchMedia("(pointer: coarse)").matches;
    let usingGyro = false;

    function handleParallax(x, y) {
        logo.style.transform = `translate(${x}px, ${y}px)`;
    }

    function enableGyro() {
        window.addEventListener('deviceorientation', (event) => {
            const gamma = event.gamma;
            const beta = event.beta;
            if (gamma !== null && beta !== null) {
                const offsetX = gamma / 2;   // tilt left-right
                const offsetY = beta / 4;    // tilt forward-back
                handleParallax(offsetX, offsetY);
            }
        });
        usingGyro = true;
    }

    if (isMobile) {
        if (typeof DeviceOrientationEvent !== "undefined" && typeof DeviceOrientationEvent.requestPermission === "function") {
            // iOS
            if (localStorage.getItem('gyroPermission') !== 'granted') {
                document.body.addEventListener('click', function requestGyroPermission() {
                    DeviceOrientationEvent.requestPermission()
                        .then(response => {
                            if (response === 'granted') {
                                localStorage.setItem('gyroPermission', 'granted');
                                enableGyro();
                            } else {
                                console.log("Gyro permission denied.");
                            }
                        })
                        .catch(console.error)
                        .finally(() => {
                            document.body.removeEventListener('click', requestGyroPermission);
                        });
                });
            } else {
                enableGyro();
            }
        } else {
            // Android or non-permission devices
            enableGyro();
        }

        if (!usingGyro) {
            // Fallback: tap-and-drag
            let isDragging = false;
            logo.addEventListener('touchstart', () => { isDragging = true; });
            logo.addEventListener('touchmove', (e) => {
                if (!isDragging || e.touches.length !== 1) return;
                const touch = e.touches[0];
                const rect = logo.getBoundingClientRect();
                const offsetX = (touch.clientX - (rect.left + rect.width / 2)) / 15;
                const offsetY = (touch.clientY - (rect.top + rect.height / 2)) / 15;
                handleParallax(offsetX, offsetY);
            });
            logo.addEventListener('touchend', () => {
                isDragging = false;
                handleParallax(0, 0);
            });
        }
    } else {
        // Desktop: mousemove
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
