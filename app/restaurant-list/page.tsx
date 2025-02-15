// app/restaurant-list/page.tsx
"use client";

import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { fetchRestaurants, Restaurant } from "../lib/api";
import useLocation from "../lib/useLocation";
import Hero from "../components/Hero";
// import { Heart } from "lucide-react";

export default function RestaurantListPage() {
  const { position, address, mapUrl } = useLocation();
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    async function loadRestaurants() {
      if (position) {
        setLoading(true);
        const res = await fetchRestaurants(position.lat, position.lng);
        console.log(res, "response here");
        if (res) {
          setRestaurants(res);
        } else {
          setError("Error fetching restaurants.");
        }
        setLoading(false);
      }
    }
    loadRestaurants();
  }, [position]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <Hero />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <h2 className="text-2xl font-semibold mb-7 mt-3 sm:mt-4 sm:mb-8">
          All Restaurants
        </h2>

        {loading ? (
          <div className="text-center text-gray-600">Loading...</div>
        ) : error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {restaurants.map((restaurant, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg overflow-hidden transition-transform hover:scale-105"
              >
                {/* Image Section */}
                <div className="relative w-full h-35 sm:h-48 md:h-52">
                  <img
                    src={restaurant.image || "/placeholder.png"}
                    alt={restaurant.name}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-2 left-2 bg-black text-white text-xs font-semibold px-2 py-1 rounded-md">
                    {restaurant.deliveryTime} MIN
                  </span>
                  <button className="absolute top-2 right-2 bg-white p-1 rounded-full shadow">
                    {/* <Heart className="w-5 h-5 text-gray-600" /> */}
                  </button>
                </div>

                {/* Content Section */}
                <div className="p-4 sm:p-5">
                  <h3 className="text-lg font-bold truncate">
                    {restaurant.name}
                  </h3>
                  <p className="text-sm text-gray-500 truncate">
                    {restaurant.address}
                  </p>

                  <div className="flex items-center justify-between mt-2">
                    <span className="text-green-500 font-semibold">
                      ★ {restaurant.rating}/5
                    </span>
                    <span className="text-gray-800 font-semibold">
                      €{restaurant.minimumOrder} Min
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
