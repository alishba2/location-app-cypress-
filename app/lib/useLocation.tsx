// lib/useLocation.ts
import { useEffect, useState } from "react";
import { fetchConfiguration } from "./api";

export interface Position {
  lat: number;
  lng: number;
}

export default function useLocation() {
  const [apiKey, setApiKey] = useState<string>("");
  const [position, setPosition] = useState<Position | null>(null);
  const [address, setAddress] = useState<string>("");
  const [mapUrl, setMapUrl] = useState<string>("");

  // Fetch configuration (Google Maps API key)
  useEffect(() => {
    fetchConfiguration().then((config) => {
      if (config) {
        setApiKey(config.googleApiKey);
      }
    });
  }, []);

  // Get user's geolocation once API key is available
  useEffect(() => {
    if (apiKey && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setPosition({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          });
        },
        (error) => {
          console.error("Error obtaining location:", error);
        }
      );
    }
  }, [apiKey]);

  // Reverse geocode coordinates to get address and construct static map URL
  useEffect(() => {
    if (position && apiKey) {
      // Reverse geocode using Google Maps API
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
        .catch((error) => {
          console.error("Error reverse geocoding:", error);
          setAddress("Error fetching address");
        });

      // Create a Google Static Map URL for the background image
      const staticMapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${position.lat},${position.lng}&zoom=14&size=600x300&maptype=roadmap&markers=color:red%7Clabel:A%7C${position.lat},${position.lng}&key=${apiKey}`;
      setMapUrl(staticMapUrl);
    }
  }, [position, apiKey]);

  return { position, address, mapUrl };
}
