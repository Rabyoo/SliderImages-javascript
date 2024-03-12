const initSlide = () => {
  const slideButtons = document.querySelectorAll(
    ".slider-wrapper .slide-button"
  );
  const imageList = document.querySelector(".slider-wrapper .image-list");
  const sliderScrollBar = document.querySelector(
    ".container .slider-scrollBar"
  );
  const scrollBarThumb = sliderScrollBar.querySelector(".scrollBar-thumb");
  const maxScrollLeft = imageList.scrollWidth - imageList.clientHeight;

  scrollBarThumb.addEventListener("mousedown", (e) => {
    const startX = e.clientX;
    const thumbPosition = scrollBarThumb.offsetLeft;

    // Update thumb position on mouse move
    const handleMouseMove = (e) => {
      const deltaX = e.clientX - startX;
      const newThumbPosition = thumbPosition + deltaX;
      const maxThumbPosition =
        sliderScrollBar.getBoundingClientRect().width -
        scrollBarThumb.offsetWidth;

      const boundedPosition = Math.max(
        0,
        Math.min(maxThumbPosition, newThumbPosition)
      );

      const scrollPosition =
        (boundedPosition / maxThumbPosition) * maxScrollLeft;

      scrollBarThumb.style.position = `absolute`;
      scrollBarThumb.style.left = `${boundedPosition}px`;
      imageList.scrollLeft = scrollPosition;
    };

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    // Add event listener for drag interaction
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  });

  // Slide images according to the slide button clicks
  slideButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const direction = button.id === "prev-slide" ? -1 : 1;
      const scrollAmount = imageList.clientWidth * direction;
      imageList.scrollBy({ left: scrollAmount, behavior: "smooth" });
    });
  });
  handleSlideButton = () => {
    slideButtons[0].style.display =
      imageList.scrollLeft <= 0 ? "none" : "block";
    slideButtons[1].style.display =
      imageList.scrollLeft >= maxScrollLeft ? "none" : "block";
  };

  // update ScrollBarThumb position based on image scroll
  updateScrollThumbPosition = () => {
    const scrollPosition = imageList.scrollLeft;
    const thumbPosition =
      (scrollPosition / maxScrollLeft) *
      (sliderScrollBar.clientWidth - scrollBarThumb.offsetWidth);
    scrollBarThumb.style.position = `absolute`;
    scrollBarThumb.style.left = `${thumbPosition}px`;
  };

  imageList.addEventListener("scroll", () => {
    handleSlideButton();
    updateScrollThumbPosition();
  });
};

window.addEventListener("load", initSlide);
