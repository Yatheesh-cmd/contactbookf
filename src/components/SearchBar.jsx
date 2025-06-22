function SearchBar({ searchQuery, handleSearch }) {
  return (
    <div className="relative mb-8">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="Search contacts..."
        className="w-full px-4 py-3 pl-12 border border-gray-200 rounded-xl bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
      />
      <span
        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-xl"
        role="img"
        aria-label="Search"
      >
        🔎
      </span>
    </div>
  );
}

export default SearchBar;