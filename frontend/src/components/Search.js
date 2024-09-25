import { useState, useEffect, useContext } from "react";
import songs from "../songs";
import UserContext from "../UserContext";
import useSearch from "../hooks/useSearch";

function Search() {
  const { handleSongSelect } = useContext(UserContext);
  const [query, setQuery] = useState("");
  const songList = songs.map((song) => song.name); // since the song db is hardcoded there is no need for state
  const filteredSongs = useSearch(songList, query); // A custom hook for handling search

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  // A function that highlights text that matches the query
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
        {filteredSongs.map((songName, index) => (
          <li
            key={index}
            className="search-list-item"
            onClick={() => {
              const selectedSong = songs.find((song) => song.name === songName);
              handleSongSelect(selectedSong);
            }}
          >
            {highlightMatch(songName, query)}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Search;
