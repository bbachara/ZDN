// (() => {
//   const refs = {
//     openModalBtn: document.querySelector("[data-modal-open]"),
//     closeModalBtn: document.querySelector("[data-modal-close]"),
//     modal: document.querySelector("[data-modal]"),
//   };

//   refs.openModalBtn.addEventListener("click", toggleModal);
//   refs.closeModalBtn.addEventListener("click", toggleModal);

//   function toggleModal() {
//     refs.modal.classList.toggle("is-hidden");
//   }
// })();


// (() => {
//   const refs = {
//     openModalBtn: document.querySelector("[data-modal-open]"),
//     closeModalBtn: document.querySelector("[data-modal-close]"),
//     modal: document.querySelector("[data-modal]"),
//     image: document.getElementById("galleryImage"),
//     prevBtn: document.getElementById("prevBtn"),
//     nextBtn: document.getElementById("nextBtn"),
//   };

//   const images = [
//     "./images/gallery/image1.jpg",
//     "./images/gallery/image2.jpg",
//     "./images/gallery/image3.jpg",
//     "./images/gallery/image4.jpg",
//     "./images/gallery/image5.jpg",
//   ];
//   let currentIndex = 0;

//   function toggleModal() {
//     refs.modal.classList.toggle("is-hidden");
//     if (!refs.modal.classList.contains("is-hidden")) {
//       refs.image.src = images[currentIndex];
//     }
//   }

//   function showPrevImage() {
//     currentIndex = (currentIndex - 1 + images.length) % images.length;
//     refs.image.src = images[currentIndex];
//   }

//   function showNextImage() {
//     currentIndex = (currentIndex + 1) % images.length;
//     refs.image.src = images[currentIndex];
//   }

//   refs.openModalBtn.addEventListener("click", toggleModal);
//   refs.closeModalBtn.addEventListener("click", toggleModal);
//   refs.prevBtn.addEventListener("click", showPrevImage);
//   refs.nextBtn.addEventListener("click", showNextImage);
// })();

//==============================

(() => {
  const refs = {
    openModalBtn: document.querySelector("[data-modal-open]"),
    closeModalBtn: document.querySelector("[data-modal-close]"),
    modal: document.querySelector("[data-modal]"),
    image: document.getElementById("galleryImage"),
    prevBtn: document.getElementById("prevBtn"),
    nextBtn: document.getElementById("nextBtn"),
    fullscreenBtn: document.getElementById("fullscreenBtn"),
    thumbnailContainer: document.getElementById("thumbnailContainer"),
    container: document.getElementById("galleryContainer"),
  };

  const images = [
    "./images/gallery/image1.jpg",
    "./images/gallery/image2.jpg",
    "./images/gallery/image3.jpg",
    "./images/gallery/image4.jpg",
    "./images/gallery/image5.jpg",
    "./images/gallery/image6.jpg",
  ];
  let currentIndex = 0;

  function updateImage() {
    refs.image.classList.remove("show");
    setTimeout(() => {
      refs.image.src = images[currentIndex];
      highlightThumbnail();
      refs.image.classList.add("show");
    }, 100);
  }

  function showPrevImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateImage();
  }

  function showNextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    updateImage();
  }

  function toggleModal() {
    refs.modal.classList.toggle("is-hidden");
    if (!refs.modal.classList.contains("is-hidden")) {
      updateImage();
    }
  }

  function toggleFullscreen() {
    const el = refs.container;
    if (!document.fullscreenElement) {
      el.requestFullscreen().catch(err => alert(`Error: ${err.message}`));
    } else {
      document.exitFullscreen();
    }
  }

  function createThumbnails() {
    refs.thumbnailContainer.innerHTML = "";
    images.forEach((src, index) => {
      const img = document.createElement("img");
      img.src = src;
      img.className = "thumbnail";
      img.addEventListener("click", () => {
        currentIndex = index;
        updateImage();
      });
      refs.thumbnailContainer.appendChild(img);
    });
  }

  function highlightThumbnail() {
    const thumbnails = refs.thumbnailContainer.querySelectorAll(".thumbnail");
    thumbnails.forEach((thumb, index) => {
      thumb.classList.toggle("active", index === currentIndex);
    });
  }

  // Swipe support
  let touchStartX = 0;
  let touchEndX = 0;

  refs.container.addEventListener("touchstart", e => {
    touchStartX = e.changedTouches[0].screenX;
  });

  refs.container.addEventListener("touchend", e => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  });

  function handleSwipe() {
    if (touchEndX < touchStartX - 50) showNextImage();
    if (touchEndX > touchStartX + 50) showPrevImage();
  }

  refs.openModalBtn.addEventListener("click", () => {
    toggleModal();
    createThumbnails();
  });
  refs.closeModalBtn.addEventListener("click", toggleModal);
  refs.prevBtn.addEventListener("click", showPrevImage);
  refs.nextBtn.addEventListener("click", showNextImage);
  refs.fullscreenBtn.addEventListener("click", toggleFullscreen);
})();

