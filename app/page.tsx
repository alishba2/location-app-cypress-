// LandingPage.tsx
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";

import ExploreCountries from "./components/ExploreCountries";
export default function LandingPage() {
  return (
    <div className="w-full min-h-screen bg-gray-100">
      <Navbar />
      <Hero />
      <ExploreCountries />
    </div>
  );
}
