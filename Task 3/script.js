const images = [
  "https://picsum.photos/600/300?random=1",
  "https://picsum.photos/600/300?random=2",
  "https://picsum.photos/600/300?random=3",
  "https://picsum.photos/600/300?random=4"
];
let currentIndex = 0;

const carouselImage = document.getElementById("carousel-image");
document.querySelector(".prev").addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  carouselImage.src = images[currentIndex];
});
document.querySelector(".next").addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % images.length;
  carouselImage.src = images[currentIndex];
});

document.getElementById("get-joke").addEventListener("click", async () => {
  const response = await fetch("https://official-joke-api.appspot.com/random_joke");
  const data = await response.json();
  document.getElementById("joke").innerText = `${data.setup} 😂 ${data.punchline}`;
});
