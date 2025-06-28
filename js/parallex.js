document.addEventListener('DOMContentLoaded', () => {
    const logo = document.querySelector('#logo img');
    if (!logo) return;

    const motionDiv = document.getElementById('motion-permission');
    const allowBtn = document.getElementById('allow-motion-btn');

    function handleParallax(x, y) {
        logo.style.transform = `translate(${x}px, ${y}px)`;
    }

    function enableGyro() {
        window.addEventListener('deviceorientation', (event) => {
            const gamma = event.gamma;
            const beta = event.beta;
            if (gamma !== null && beta !== null) {
                const offsetX = gamma / 2;
                const offsetY = beta / 4;
                handleParallax(offsetX, offsetY);
            }
        });
    }

    // Tap-and-drag fallback on all mobile devices
    function enableTouchDrag() {
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

    // Mouse movement for desktop
    function enableMouseMove() {
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

    // Detection routine to prevent prompt on desktop
    const testDeviceOrientation = () => {
        let detected = false;

        function testHandler(event) {
            if (event.gamma !== null && event.beta !== null) {
                detected = true;
                window.removeEventListener('deviceorientation', testHandler);
                // If iOS with permission API
                if (typeof DeviceOrientationEvent !== "undefined" && typeof DeviceOrientationEvent.requestPermission === "function") {
                    if (localStorage.getItem('gyroPermission') !== 'granted') {
                        motionDiv.style.display = 'flex';
                        allowBtn.addEventListener('click', () => {
                            DeviceOrientationEvent.requestPermission().then(response => {
                                if (response === 'granted') {
                                    localStorage.setItem('gyroPermission', 'granted');
                                    enableGyro();
                                }
                                motionDiv.style.display = 'none';
                            }).catch(err => {
                                console.error(err);
                                motionDiv.style.display = 'none';
                            });
                        });
                    } else {
                        enableGyro();
                    }
                } else {
                    enableGyro(); // Android and others
                }
            }
        }

        // Listen briefly to detect real device orientation support
        window.addEventListener('deviceorientation', testHandler);

        // If no detection after 1 second, fallback to mouse
        setTimeout(() => {
            if (!detected) {
                window.removeEventListener('deviceorientation', testHandler);
                enableMouseMove();
            }
        }, 1000);
    };

    testDeviceOrientation();
    enableTouchDrag();
});
