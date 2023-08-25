"use client";
import React from "react";
import Image from "next/image";

interface WeatherArray {
  id?: number;
  description?: string;
  icon?: string;
  main: string;
}

interface WeatherObject {
  base?: string;
  clouds?: {
    all: number;
  };
  cod?: number;
  coord?: {
    lat: number;
    lon: number;
  };
  dt?: number;
  id?: number;
  main?: {
    feels_like: number;
    grnd_level: number;
    humidity: number;
    pressure: number;
    sea_level: number;
    temp: number;
    temp_max: number;
    temp_min: number;
  };
  name?: string;
  sys?: {
    country: string;
    id: number;
    sunrise: number;
    sunset: number;
    type: number;
  };
  timezone?: number;
  visibility?: number;
  weather?: WeatherArray[];
  wind?: {
    deg: number;
    gust: number;
    speed: number;
  };
}

const WeatherInfo = ({ data }: { data: WeatherObject }): JSX.Element => (
  <ul>
    {Object.keys(data).map((key) => (
      <li key={key}>
        <strong>{key}: </strong>
        {JSON.stringify(data[key as keyof WeatherObject])}
      </li>
    ))}
  </ul>
);

export default function Home() {
  const [data, setData] = React.useState<WeatherObject | null>(null);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const callCurrentWeather = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}`
        );
        const result: WeatherObject = await response.json();
        setData(result);
      } catch (error) {
        setError("An error has occured while fetching data...");
      } finally {
        setLoading(false);
      }
    };

    callCurrentWeather();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="w-full min-h-[70vh] bg-gray-100 rounded-xl shadow-2xl p-24 overflow-scroll">
        <h1 className="text-xl font-bold text-center">Weather App</h1>
        {loading && (
          <text className="text-md font-medium text-center">Loading...</text>
        )}
        {error && (
          <text className="text-md font-medium text-center">{error}</text>
        )}
        {data && <WeatherInfo data={data} />}
      </div>
    </main>
  );
}
