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
  const prompt = `Create a high-quality image of a beautiful floral arrangement that features only ${flowerDetails.toLowerCase()}. The arrangement should be in a vase and is displayed against a background that enhances the colors and textures of the flowers. The arrangement is well-balanced, vibrant, and visually pleasing, with intricate details of petals, leaves, and stems. Ensure a natural and realistic depiction while avoiding overly stylized or abstract elements.`;

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
          Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
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