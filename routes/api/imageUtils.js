const tesseract = require("tesseract.js");
const sharp = require("sharp");
const path = require("path");

// Function to blur text in the image
const blurTextInImage = async (imagePath) => {
  try {
    // Step 1: Extract text and word positions from the image using Tesseract.js (OCR)
    const { data: { text, words } } = await tesseract.recognize(imagePath, 'eng');
    
    // Log the extracted text
    console.log("Extracted text from image:", text);
    
    // Log the position of each word (bounding box coordinates)
    words.forEach((word, index) => {
      console.log(`Word ${index + 1}: ${word.text}`);
      console.log(`Position: x: ${word.bbox.x0}, y: ${word.bbox.y0}, width: ${word.bbox.x1 - word.bbox.x0}, height: ${word.bbox.y1 - word.bbox.y0}`);
    });

    // Step 2: Create a new file path for the modified image (don't overwrite the original)
    const newImagePath = path.join(path.dirname(imagePath), `modified-${path.basename(imagePath)}`);

    // Step 3: Create a composite overlay with blurred regions for each word
    let image = sharp(imagePath);
    const blurOperations = []; // Store all the blur operations here

    for (const word of words) {
      const { bbox: { x0, y0, x1, y1 } } = word;
      const width = x1 - x0;
      const height = y1 - y0;
      
      // Create a blurred region for each word
      const blurRegion = await sharp(imagePath)
        .extract({ left: x0, top: y0, width, height })
        .blur(5)
        .toBuffer();

      // Add the blur operation to the list
      blurOperations.push({ input: blurRegion, top: y0, left: x0 });
    }

    // Apply all blur operations at once
    await image.composite(blurOperations).toFile(newImagePath);

    // Return the path to the new image
    return newImagePath;
  } catch (error) {
    console.error("Error blurring text in image:", error);
  }
};

module.exports = { blurTextInImage };
