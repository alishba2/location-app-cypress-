"use client";

const countries = ["Cyprus", "Georgia", "Germany", "Estonia", "Denmark", "Greece"];

export default function ExploreCountries() {
  return (
    <section className="w-full py-8 px-6">
      <h2 className="text-2xl font-semibold mb-4">Explore Countries</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {countries.map((country, index) => (
          <div key={index} className="flex items-center justify-between p-4 border rounded-lg shadow-sm">
            <span>{country}</span>
            <span>→</span>
          </div>
        ))}
      </div>
    </section>
  );
}
