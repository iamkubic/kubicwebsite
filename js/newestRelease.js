document.addEventListener('DOMContentLoaded', function() {
    const newestRelease = document.getElementById('newest-release');
    newestRelease.innerHTML = `
        <div class="release-content">
            <div>
                <img src="assets/album-art.jpg" alt="Album Art">
            </div>
            <div class="release-info">
                <h2>Album Title</h2>
                <p>OUT NOW</p>
                <p>Release Date: July 17, 2024</p>
                <button onclick="location.href='https://placeholder.com';">Listen Now</button>
            </div>
        </div>
    `;
});
