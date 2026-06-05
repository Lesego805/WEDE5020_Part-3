document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("lightboxModal");
    const modalImg = document.getElementById("lightboxImg");
    const modalCaption = document.getElementById("lightboxCaption");
    const closeBtn = document.querySelector(".lightbox-close");
    const productCards = document.querySelectorAll(".product-card");

    productCards.forEach(card => {
        card.addEventListener("click", function () {
            // Read attributes and decode any URL spacing quirks automatically
            let largeImageSrc = this.getAttribute("data-full");
            const descriptionText = this.getAttribute("data-desc");

            if (modal && modalImg && modalCaption) {
                // Set the elements inside the popup box
                modalImg.src = encodeURI(largeImageSrc); 
                modalCaption.innerText = descriptionText;

                // Display the lightbox centered on screen
                modal.style.display = "flex";
            }
        });
    });

    // Close window event listeners
    if (closeBtn) {
        closeBtn.addEventListener("click", function () {
            modal.style.display = "none";
        });
    }

    if (modal) {
        modal.addEventListener("click", function (event) {
            if (event.target === modal) {
                modal.style.display = "none";
            }
        });
    }
});