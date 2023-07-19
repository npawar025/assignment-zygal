const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
const downloadLink = document.getElementById("downloadLink");

// Function to draw the character on the canvas
function drawCharacter() {
  const char = "H"; // You can change this to any character you like
  const fontSize = 25; //You can change this to any size you like
  const fontFace = "Arial"; // You can change the font family here
  const fontColor = "#FFFFFF"; // Set character color to white (#FFFFFF) you can change this as you like

  context.fillStyle = "#000000"; // Set canvas background color to black (#000000)
  context.fillRect(0, 0, canvas.width, canvas.height);

  context.font = `${fontSize}px ${fontFace}`;
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillStyle = fontColor;
  context.fillText(char, canvas.width / 2, canvas.height / 2); //This draws a black-filled rectangle on the canvas

  // Convert canvas drawing to text format with hex data for each pixel
  let canvasData = "";
  const imageData = context.getImageData(
    0,
    0,
    canvas.width,
    canvas.height
  ).data;

  //Iterate through each pixel of the canvas to convert its RGBA color to hexadecimal format
  for (let y = 0; y < canvas.height; y++) {
    for (let x = 0; x < canvas.width; x++) {
      const pixelIndex = (y * canvas.width + x) * 4;
      const hexColor = rgbaToHex(
        imageData[pixelIndex],
        imageData[pixelIndex + 1],
        imageData[pixelIndex + 2],
        imageData[pixelIndex + 3]
      );
      canvasData += hexColor;
    }
    canvasData += "\n";
  }

  // Trigger download when the canvas is drawn and data is ready
  const blob = new Blob([canvasData], { type: "text/plain" });
  downloadLink.href = URL.createObjectURL(blob);
  downloadLink.style.display = "block";
}

// Convert RGBA to Hex
function componentToHex(c) {
  const hex = c.toString(16);
  return hex.length === 1 ? "0" + hex : hex;
}

function rgbaToHex(r, g, b, a) {
  return (
    "0x" +
    componentToHex(r) +
    componentToHex(g) +
    componentToHex(b) +
    componentToHex(a) +
    ", "
  );
}

// Draw the character on the canvas and trigger download
drawCharacter();
