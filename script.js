// JavaScript for Sarah Luan's personal website

document.addEventListener('DOMContentLoaded', function() {
    // Add smooth scrolling for any anchor links
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add click animation to circles
    const circles = document.querySelectorAll('.circle');
    
    circles.forEach(circle => {
        circle.addEventListener('click', function() {
            // Add a temporary click animation
            this.style.transform = 'scale(0.95)';
            
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });

    // Add keyboard navigation support
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            const focusedElement = document.activeElement;
            if (focusedElement.classList.contains('circle-link')) {
                e.preventDefault();
                focusedElement.click();
            }
        }
    });

    // Preload images for better performance
    const imagePaths = [
        'images/art-figurine.png',
        'images/work-figurine.png',
        'images/about-figurine.png',
        'images/github-icon.svg',
        'images/linkedin-icon.svg',
        'images/email-icon.svg'
    ];

    imagePaths.forEach(imagePath => {
        const img = new Image();
        img.src = imagePath;
    });
});

// Function to handle page transitions (if needed for future enhancements)
function navigateToPage(page) {
    // Add any transition effects here
    window.location.href = page;
}
