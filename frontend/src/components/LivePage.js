import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useInterval } from "react-use";
import UserContext from "../UserContext";

function LivePage() {
  const { user, isAdmin, song, socket, setSong, setIsSong } =
    useContext(UserContext);

  const navigate = useNavigate();
  const isSinger = user?.instrument === "singer";

  const [autoScroll, setAutoScroll] = useState(false);

  // Redirect to login if user is not authenticated - prevents a bug
  useEffect(() => {
    if (!user || Object.keys(user).length === 0) {
      navigate("/");
    }
  }, [user, navigate]);

  // Redirect to main if no song is selected
  useEffect(() => {
    if (!song || !song.content) {
      navigate("/main");
    }
  }, [song, navigate]);

  // Scroll was made possible by importing the react-use library
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
      setSong(null);
      setIsSong(false);
      navigate("/main");
    });

    // Clean up the socket listener
    return () => {
      socket.off("main-page");
    };
  }, [socket, navigate, setSong, setIsSong]);

  if (!song || !song.content) {
    return <div>Loading song data...</div>;
  }

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
          {song.content.map((line, index) => (
            <div key={index} className="song-line">
              {line.map((word, idx) => (
                <div key={idx} className="word-chord-pair">
                  {!isSinger && (
                    <span className="chord">
                      {word.chords ? word.chords : ""}
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
  // Added this comp because maybe in the future we will want to add more ui elements
  return <footer></footer>;
}

export default LivePage;
