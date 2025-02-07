# whispering-stems-capstone
*A web app that allows users to learn more about floriography and create floral arrangements based on flower selections.*

## Application Overview
Whispering Stems is a front-end web application that lets users create floral arrangements based on the symbolic meanings of flowers. It uses OpenAI’s DALL·E 3 to generate custom bouquet images, which are then stored in Cloudinary for permanent access and easy sharing within the app.

## ERD 

<img src="./Screenshot 2025-01-27 at 11.39.57 AM.png">

## Features
Whispering Stems v1.0 includes the following user features:
- Users can create custom arrangements by selecting symbolic meaning, flowers included, and notes about the arrangement.
- Uses OpenAI’s DALL·E 3 to create realistic bouquet images based on the selected flowers.
- Saves bouquet images automatically following creation to Cloudinary for long-term reference within the application.
- Provides insights into the meanings and symbolism of each flower within the app to help users craft meaningful arrangements.
- Users can save their favorite bouquets and revisit past designs.
- Works seamlessly across desktops, tablets, and mobile devices.

## Visuals
For a complete overview of the features, [please visit here](https://www.loom.com/share/6910da95af4843228bb867a705704c66?sid=0dbb7112-76b5-4407-ac35-8a55bbeca4bd)

## Installations
To run this project locally, follow the below steps:

1. Install dependencies
```bash
npm install
```

2. Start JSON-Server
```bash
npm run start:db
```

3.Run the React app
```bash
npm run dev
```

#### Image Generation
This app uses OpenAI to generate images. Ensure you have an API key stored in a .env file:
```
VITE_OPENAI_API_KEY=your-api-key
```
#### Cloudinary Integration
To store generated images, set up Cloudinary credentials in your .env file:
```
VITE_CLOUDINARY_CLOUD_NAME=your-cloud-name
VITE_CLOUDINARY_UPLOAD_PRESET=your-upload-preset

```