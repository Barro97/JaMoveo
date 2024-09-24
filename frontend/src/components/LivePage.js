import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

function LivePage({ socket, user, isAdmin, song, handleSongSelect }) {
  const navigate = useNavigate();
  const isSinger = user.instrument === "singer";
  const scrollRef = useRef(null);

  const [autoScroll, setAutoScroll] = useState(false);
  const scrollIntervalID = useRef(null);
  const scrollSpeed = 1;
  const scrollInterval = 20;

  useEffect(() => {
    function startScroll() {
      if (scrollIntervalID.current) return;
      scrollIntervalID.current = setInterval(() => {
        if (scrollRef.current) {
          scrollRef.current.scrollTop += scrollSpeed;
          console.log(scrollRef.current.scrollTop);
        }
      }, scrollInterval);
    }

    function stopScroll() {
      if (scrollIntervalID.current) {
        clearInterval(scrollIntervalID.current);
        scrollIntervalID.current = null;
      }
    }
    if (autoScroll) {
      console.log("starting autoscroll");
      console.log(song);
      startScroll();
    } else stopScroll();
    return () => {
      console.log("ending autoscroll");
      stopScroll();
    };
  }, [autoScroll]);

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
      <div className="live-page" ref={scrollRef}>
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
        <button
          className="auto-scroll-button"
          onClick={() => setAutoScroll(!autoScroll)}
        >
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
