const countries = [
  { name: "Cyprus", code: "cy" },
  { name: "Estonia", code: "ee" },
  { name: "Denmark", code: "dk" },
  { name: "Georgia", code: "ge" },
  { name: "Germany", code: "de" },
  { name: "Greece", code: "gr" },
  { name: "Cyprus", code: "cy" },
  { name: "Estonia", code: "ee" },
  { name: "Denmark", code: "dk" },
  { name: "Georgia", code: "ge" },
  { name: "Germany", code: "de" },
  { name: "Greece", code: "gr" },
];

export default function ExploreCountries() {
  return (
    <section className="w-full py-8 px-6 relative z-10 mx-auto max-w-6xl">
      <h2 className="text-2xl font-semibold mb-6">Explore Countries</h2>
      <div className="flex flex-wrap justify-between gap-4">
        {countries.map((country) => (
          <div
            key={country.code}
            className="flex items-center justify-between w-full sm:w-[48%] lg:w-[30%] p-4 bg-white border rounded-lg shadow-sm hover:shadow-md transition"
          >
            <div className="flex items-center gap-3">
              <img
                src={`https://flagcdn.com/w40/${country.code}.png`}
                alt={country.name}
                className="w-6 h-4"
              />
              <span className="font-medium text-gray-800">{country.name}</span>
            </div>
            <span className="text-gray-400 text-lg">→</span>
          </div>
        ))}
      </div>
    </section>
  );
}
