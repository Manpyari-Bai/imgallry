const galleryItems = document.getElementsByClassName('gallery-item');
const lightboxContainer = document.createElement('div');
const lightboxContent = document.createElement('div');
const lightboxImg = document.createElement('img');
const lightboxTitle = document.createElement('div');
const lightboxDescription = document.createElement('div');
const lightboxPrev = document.createElement('div');
const lightboxNext = document.createElement('div');

lightboxContainer.classList.add('lightbox');
lightboxContent.classList.add('lightbox-content');
lightboxTitle.classList.add('lightbox-title');
lightboxDescription.classList.add('lightbox-description');
lightboxPrev.classList.add("fa", "fa-angle-left", "lightbox-prev");
lightboxNext.classList.add("fa", "fa-angle-right", "lightbox-next");

lightboxContent.appendChild(lightboxImg);
lightboxContent.appendChild(lightboxTitle);
lightboxContent.appendChild(lightboxDescription);
lightboxContainer.appendChild(lightboxContent);
lightboxContainer.appendChild(lightboxPrev);
lightboxContainer.appendChild(lightboxNext);
document.body.appendChild(lightboxContainer);

let index = 1;

function showLightbox(n) {
    if (n > galleryItems.length) {
        index = 1;
    } else if (n < 1) {
        index = galleryItems.length;
    }
    
    const galleryItem = galleryItems[index - 1];
    const imageLocation = galleryItem.children[0].getAttribute('src');
    const titleText = galleryItem.getAttribute('data-title');
    const descriptionText = galleryItem.getAttribute('data-description');

    lightboxImg.setAttribute("src", imageLocation);
    lightboxTitle.textContent = titleText;
    lightboxDescription.textContent = descriptionText;
    lightboxContainer.scrollTo(0, 0); 
}

function currentImage() {
    lightboxContainer.style.display = "block";
    const imageIndex = parseInt(this.getAttribute("data-index"));
    showLightbox(index = imageIndex);
}

for (let i = 0; i < galleryItems.length; i++) {
    galleryItems[i].addEventListener("click", currentImage);
}

function prevImage() {
    showLightbox(index -= 1);
}

function nextImage() {
    showLightbox(index += 1);
}

lightboxPrev.addEventListener('click', prevImage);
lightboxNext.addEventListener('click', nextImage);

function closeLightbox(event) {
    if (this === event.target) {
        lightboxContainer.style.display = "none";
    }
}

lightboxContainer.addEventListener("click", closeLightbox);
document.addEventListener("keydown", handleKeyboard);

function handleKeyboard(event) {
    if (lightboxContainer.style.display === "block") {
        if (event.key === "ArrowLeft") {
            prevImage();
        } else if (event.key === "ArrowRight") {
            nextImage();
        } else if (event.key === "Escape") {
            lightboxContainer.style.display = "none";
        }
    }
}
