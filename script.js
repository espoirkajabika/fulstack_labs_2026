// Define your navigation items
const navItems = [
    { text: 'Dashboard', url: '#home' },
    { text: 'employees', url: '#about' },
    { text: 'Departments', url: '#services' },
    { text: 'Contact', url: '#contact' }
];

// Get the nav menu element
const navMenu = document.getElementById('nav-menu');

// Populate the navigation
navItems.forEach(item => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    
    a.textContent = item.text;
    a.href = item.url;
    
    li.appendChild(a);
    navMenu.appendChild(li);
});

// Search functionality
document.getElementById('search-btn').addEventListener('click', function() {
    const searchTerm = document.getElementById('search-input').value;
    console.log('Searching for:', searchTerm);
    // Add your search logic here
});

// Optional: Search on Enter key
document.getElementById('search-input').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        const searchTerm = this.value;
        console.log('Searching for:', searchTerm);
        // Add your search logic here
    }
});