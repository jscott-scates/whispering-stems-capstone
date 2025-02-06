import axios from "axios";

const generateImage = async (arrangement) => {

  if (!arrangement || !arrangement.flowers || arrangement.flowers.length === 0) {
    return null;
  }

  // Extract flower names and colors
  const flowerDetails = arrangement.flowers
    .map(flower => `${flower.color.name} ${flower.name}`)
    .join(", ");

  // Construct a descriptive prompt
  const prompt = `A beautiful bouquet that only includes ${flowerDetails} in a delicate vase centered in frame with dark background.`;

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/images/generations",
      {
        model: "dall-e-3",
        prompt: prompt,
        n: 1,
        size: "1024x1024",
      },
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_APP_OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data.data[0].url; // URL of the generated image
  } catch (error) {
    console.error("Error generating image:", error.response ? error.response.data : error.message);
    return null;
  }
};

export default generateImage;