"use client";

import { useEffect, useState } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { fetchConfiguration } from "../lib/api";
import { IoMdLocate } from "react-icons/io";
import { useRouter } from "next/navigation";

interface Position {
  lat: number;
  lng: number;
}

export default function Hero() {
  const [apiKey, setApiKey] = useState<string>("");
  const [position, setPosition] = useState<Position | null>(null);
  const [address, setAddress] = useState<string>("");
  const [mapUrl, setMapUrl] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    fetchConfiguration().then((config) => {
      if (config) setApiKey(config.googleApiKey);
    });
  }, []);

  useEffect(() => {
    if (apiKey && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos: GeolocationPosition) => {
          setPosition({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        },
        (error: GeolocationPositionError) => {
          console.error("Error obtaining location:", error);
        }
      );
    }
  }, [apiKey]);

  useEffect(() => {
    if (position && apiKey) {
      fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.lat},${position.lng}&key=${apiKey}`
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.status === "OK" && data.results.length > 0) {
            setAddress(data.results[0].formatted_address);
          } else {
            setAddress("Address not found");
          }
        })
        .catch(() => setAddress("Error fetching address"));

      const staticMapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${position.lat},${position.lng}&zoom=14&size=1200x600&maptype=roadmap&markers=color:red%7Clabel:A%7C${position.lat},${position.lng}&key=${apiKey}`;
      setMapUrl(staticMapUrl);
    }
  }, [position, apiKey]);

  const handleFindRestaurants = () => {
    router.push("/restaurant-list");
  };

  return (
    <>
      <section className="relative w-full h-[300px] md:h-[400px] sm:h-[300px]  flex items-center justify-center bg-gray-200 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center grayscale"
          style={{
            backgroundImage: mapUrl
              ? `url(${mapUrl})`
              : "url('/map-placeholder.png')",
          }}
        />

        <div className="relative z-10 w-[90%] max-w-3xl bg-[#0F172A] p-2 rounded-md shadow-lg flex flex-col sm:flex-row items-center gap-2">
          <div className="flex items-center justify-between w-full bg-white rounded-md shadow-md px-4 py-2 border border-gray-200">
            <div className="flex items-center flex-grow">
              <FaMapMarkerAlt className="text-gray-500 mr-2 text-lg" />
              <input
                data-test="search-bar"
                type="text"
                placeholder="Enter Delivery Address"
                className="w-full bg-transparent border-none outline-none text-gray-700 placeholder-gray-400 text-sm"
                value={address}
                readOnly
              />
            </div>

            <button className="flex items-center gap-2 px-4 py-1 text-gray-600 text-sm font-medium rounded-full hover:bg-gray-100 transition">
              <IoMdLocate className="text-gray-500 text-lg" />
              <span className="hidden sm:inline">Share Location</span>
            </button>
          </div>

          <button
            data-test="find-restaurants-button"
            className="ml-2 px-6 py-3 bg-green-500 text-white font-medium rounded-full  text-sm hover:bg-green-600 transition whitespace-nowrap mt-2 sm:mt-0"
            onClick={handleFindRestaurants}
          >
            Find Restaurants
          </button>
        </div>
      </section>
    </>
  );
}
