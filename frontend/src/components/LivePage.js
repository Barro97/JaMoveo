import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useInterval } from "react-use";

function LivePage({
  socket,
  user,
  isAdmin,
  handleSongSelect,
  song: initialSong,
}) {
  const navigate = useNavigate();
  const isSinger = user?.instrument === "singer";

  const [autoScroll, setAutoScroll] = useState(false);

  const [song, setSong] = useState(() => {
    const savedSong = sessionStorage.getItem("song");
    return initialSong || (savedSong && JSON.parse(savedSong));
  });

  useEffect(() => {
    if (!song) {
      navigate("/main");
    }
    function handleBeforeUnload() {
      sessionStorage.setItem("song", JSON.stringify(song));
    }
    window.addEventListener("beforeunload", handleBeforeUnload);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  });

  useInterval(
    () => {
      window.scrollBy(0, 2); // Scrolls 2 pixels vertically
    },
    autoScroll ? 10 : null // Runs every 10 milliseconds
  );

  const toggleAutoScroll = () => {
    setAutoScroll(!autoScroll);
  };

  function quitSong() {
    socket.emit("quit-song");
  }

  useEffect(() => {
    socket.on("main-page", () => {
      handleSongSelect("", false);
      navigate("/main");
    });
  });
  return (
    <>
      <div className="live-page">
        <h1 className="song-title">{song.name}</h1>
        <h2 className="song-author">By {song.author}</h2>
        {isAdmin && (
          <button className="quit-button" onClick={quitSong}>
            Quit
          </button>
        )}
        <div className="song-content">
          {song?.content.map((line, index) => (
            <div key={index} className="song-line">
              {line?.map((word, idx) => (
                <div key={idx} className="word-chord-pair">
                  {!isSinger && (
                    <span className="chord">
                      {" "}
                      {word.chords ? word.chords : ""}{" "}
                    </span>
                  )}
                  <span className="lyrics"> {word.lyrics} </span>
                </div>
              ))}
            </div>
          ))}
        </div>
        <button className="auto-scroll-button" onClick={toggleAutoScroll}>
          {autoScroll ? "Stop Scrolling" : "Start Scrolling"}
        </button>
      </div>
      <Footer />
    </>
  );
}

function Footer() {
  return <footer></footer>;
}
export default LivePage;
