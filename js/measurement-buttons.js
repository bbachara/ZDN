const filterButtons = document.querySelectorAll(".filter-button");
const items = document.querySelectorAll(".list-net .item");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.textContent.trim(); // Pobieramy tekst przycisku

    items.forEach((item) => {
      const category = item
        .querySelector(".portfolio-example p")
        .textContent.trim();

      if (filter === "All" || category === filter) {
        item.style.display = "block"; // Pokaż element
      } else {
        item.style.display = "none"; // Ukryj element
      }
    });
  });
});
