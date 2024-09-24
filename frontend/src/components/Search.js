import { useState, useEffect } from "react";
function Search() {
  const [query, setQuery] = useState("");
  const [songList, setSongList] = useState([
    "Shape of You",
    "Blinding Lights",
    "Dance Monkey",
    "Rockstar",
    "One Dance",
    "Closer",
    "Someone You Loved",
    "Sunflower",
    "Senorita",
    "Perfect",
    // Add more song names as needed
  ]);
  const [filteredSongs, setFilteredSongs] = useState([]);

  useEffect(() => {
    const handleSearch = () => {
      if (query.trim() !== "") {
        const results = songList.filter((song) =>
          song.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredSongs(results);
      } else {
        setFilteredSongs([]);
      }
    };

    handleSearch();
  }, [query, songList]);

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const highlightMatch = (song, query) => {
    if (!query) return song;

    const regex = new RegExp(`(${query})`, "gi");
    const parts = song.split(regex);

    return parts.map((part, i) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <span key={i} className="highlight">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <div className="search-container">
      <h1>Search any song...</h1>
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Type a song name..."
        className="search-input"
      />
      <ul className="search-list">
        {filteredSongs.map((song, index) => (
          <li key={index} className="search-list-item">
            {highlightMatch(song, query)}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Search;
