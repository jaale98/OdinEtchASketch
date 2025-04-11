function createGrid(size) {
    const container = document.getElementById("container");
    container.innerHTML = "";

    const totalSquares = size * size;
    const squareSize = 960 / size;

    for (let i = 0; i < totalSquares; i++) {
        const square = document.createElement("div");
        square.classList.add("square");
        square.style.width = `${squareSize}px`;
        square.style.height = `${squareSize}px`;

        square.addEventListener("mouseenter", function () {
            if (!square.dataset.originalR) {
                const r = Math.floor(Math.random() * 256);
                const g = Math.floor(Math.random() * 256);
                const b = Math.floor(Math.random() * 256);
                square.dataset.originalR = r;
                square.dataset.originalG = g;
                square.dataset.originalB = b;
                square.dataset.darkness = 0;
                square.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
            } else {
                let darkness = Number(square.dataset.darkness);
                if (darkness < 10) {
                    darkness++;
                    square.dataset.darkness = darkness;

                    const r = Number(square.dataset.originalR);
                    const g = Number(square.dataset.originalG);
                    const b = Number(square.dataset.originalB);

                    const factor = 1 - darkness * 0.1;
                    const newR = Math.floor(r * factor);
                    const newG = Math.floor(g * factor);
                    const newB = Math.floor(b * factor);

                    square.style.backgroundColor = `rgb(${newR}, ${newG}, ${newB})`;
                }
            }
        });
        container.appendChild(square);
    }
}

const resizeBtn = document.getElementById("resizeBtn");

resizeBtn.addEventListener("click", () => {
    let newSize = prompt("Enter the number of squares per side (max 100):", "16");
    if (newSize !== null) {
        newSize = parseInt(newSize);
        if (isNaN(newSize) || newSize < 1 || newSize > 100) {
            alert("Please enter a valid number between 1 and 100.");
            return;
        }
        createGrid(newSize);
    }
});

createGrid(16);