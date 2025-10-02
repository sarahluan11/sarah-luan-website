// Art Page Modal Functionality
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const closeBtn = document.querySelector('.close-btn');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    // Check if all elements exist
    if (!modal || !modalImage || !modalTitle) {
        return;
    }
    
    // Get all painting images
    const paintingImages = document.querySelectorAll('.painting-image');
    let currentImageIndex = 0;
    let imageData = [];
    
    // Extract image data from all paintings
    paintingImages.forEach((img, index) => {
        const titleElement = img.parentElement.querySelector('.painting-title');
        const title = titleElement ? titleElement.textContent.trim() : '';
        
        imageData.push({
            src: img.src,
            alt: img.alt,
            title: title
        });
    });
    
    // Add click event listeners to all painting images
    paintingImages.forEach((img, index) => {
        img.addEventListener('click', function() {
            console.log('Image clicked:', index, img.src);
            currentImageIndex = index;
            openModal(imageData[index]);
        });
    });
    
    console.log('Modal script loaded. Found', paintingImages.length, 'painting images');
    
    // Open modal function
    function openModal(imageInfo) {
        modalImage.src = imageInfo.src;
        modalImage.alt = imageInfo.alt;
        modalTitle.textContent = imageInfo.title;
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
        
        // Adjust tape width based on title length
        adjustTapeWidth(imageInfo.title);
        
        // Update navigation button visibility
        updateNavigationButtons();
    }
    
    // Function to adjust tape width based on title length
    function adjustTapeWidth(title) {
        const tapeSticker = document.querySelector('.tape-sticker');
        const tapeText = document.querySelector('.tape-text');
        
        if (tapeSticker && tapeText) {
            // Create a temporary element to measure text width
            const tempElement = document.createElement('span');
            tempElement.style.font = window.getComputedStyle(tapeText).font;
            tempElement.style.visibility = 'hidden';
            tempElement.style.position = 'absolute';
            tempElement.textContent = title;
            document.body.appendChild(tempElement);
            
            const textWidth = tempElement.getBoundingClientRect().width;
            document.body.removeChild(tempElement);
            
            // Set tape width with some padding
            const tapeWidth = Math.max(textWidth + 60, 200); // Minimum 200px, add 60px padding
            tapeSticker.style.width = tapeWidth + 'px';
        }
    }
    
    // Close modal function
    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restore scrolling
    }
    
    // Navigate to previous image
    function showPreviousImage() {
        if (currentImageIndex > 0) {
            currentImageIndex--;
        } else {
            currentImageIndex = imageData.length - 1; // Loop to last image
        }
        openModal(imageData[currentImageIndex]);
    }
    
    // Navigate to next image
    function showNextImage() {
        if (currentImageIndex < imageData.length - 1) {
            currentImageIndex++;
        } else {
            currentImageIndex = 0; // Loop to first image
        }
        openModal(imageData[currentImageIndex]);
    }
    
    // Update navigation button visibility
    function updateNavigationButtons() {
        // Always show both buttons for looping navigation
        prevBtn.style.display = 'block';
        nextBtn.style.display = 'block';
    }
    
    // Event listeners
    closeBtn.addEventListener('click', closeModal);
    prevBtn.addEventListener('click', showPreviousImage);
    nextBtn.addEventListener('click', showNextImage);
    
    // Close modal when clicking outside the modal content
    modal.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modal.style.display === 'block') {
            closeModal();
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(event) {
        if (modal.style.display === 'block') {
            if (event.key === 'ArrowLeft') {
                showPreviousImage();
            } else if (event.key === 'ArrowRight') {
                showNextImage();
            }
        }
    });
});
