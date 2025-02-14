"use client";

import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
// import { UilSearch, UilMapMarker } from "@iconscout/react-unicons";

export default function Hero() {
  return (
    <section className="relative w-full h-[50vh] flex items-center justify-center bg-gray-300">
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/map-placeholder.png')" }} />
      <div className="relative w-[80%] max-w-2xl bg-white rounded-lg shadow-lg flex items-center p-4 gap-2">
        {/* <UilSearch className="text-gray-500" /> */}
        <InputText placeholder="Enter Delivery Address" className="w-full p-2 border rounded-md" />
        <Button label="Share Location" className="p-button-outlined" />
        <Button label="Find Restaurants" className="bg-green-600 text-white" />
      </div>
    </section>
  );
}
