document.addEventListener('DOMContentLoaded', function() {
    const navigation = document.getElementById('navigation');
    navigation.innerHTML = `
        <nav>
            <ul>
                <li><a href="#music">Music</a></li>
                <li><a href="#bio">Bio</a></li>
                <li><a href="#contact">Contact</a></li>
            </ul>
        </nav>
    `;
});
