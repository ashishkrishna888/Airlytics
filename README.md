# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/54c6d504-b6e7-4766-a92d-bf9e99f32b18

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/54c6d504-b6e7-4766-a92d-bf9e99f32b18) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
- React Query (TanStack Query)
- OpenWeatherMap API

## Air Quality Monitoring Features

This application provides real-time air quality monitoring with the following features:

- **Real-time AQI Data**: Fetches live air quality data from OpenWeatherMap API
- **Location Search**: Search for cities worldwide to get air quality data
- **Current Location**: Automatically detect and show air quality for your current location
- **Pollutant Breakdown**: Detailed information about PM2.5, PM10, O3, NO2, SO2, and CO levels
- **Weather Conditions**: Current temperature, humidity, wind speed, and visibility
- **Health Recommendations**: Personalized health advice based on air quality levels
- **Auto-refresh**: Data automatically updates every 5 minutes

## API Configuration

The application uses the OpenWeatherMap API for air quality and weather data. The API key is configured in the code, but for production use, you should:

1. Create a `.env` file in the project root
2. Add your OpenWeatherMap API key: `VITE_OPENWEATHER_API_KEY=your_api_key_here`
3. Get your free API key from [OpenWeatherMap](https://openweathermap.org/api)

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/54c6d504-b6e7-4766-a92d-bf9e99f32b18) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
