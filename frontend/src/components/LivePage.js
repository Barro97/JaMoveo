import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
const song = [
  [
    {
      lyrics: "Hey",
    },
    {
      lyrics: "Jude",
      chords: "F",
    },
    {
      lyrics: "don't",
    },
    {
      lyrics: "make",
    },
    {
      lyrics: "it",
    },
    {
      lyrics: "bad",
      chords: "C",
    },
  ],
  [
    {
      lyrics: "Take",
    },
    {
      lyrics: "a",
    },
    {
      lyrics: "sad",
      chords: "C7",
    },
    {
      lyrics: "song",
      chords: "C4/7",
    },
    {
      lyrics: "and",
    },
    {
      lyrics: "make",
    },
    {
      lyrics: "it",
    },
    {
      lyrics: "better",
      chords: "F",
    },
  ],
  [
    {
      lyrics: "Remember",
      chords: "Bb",
    },
    {
      lyrics: "to",
    },
    {
      lyrics: "let",
    },
    {
      lyrics: "her",
    },
    {
      lyrics: "into",
    },
    {
      lyrics: "your",
    },
    {
      lyrics: "heart",
      chords: "F",
    },
  ],
  [
    {
      lyrics: "Then",
    },
    {
      lyrics: "you",
    },
    {
      lyrics: "can",
    },
    {
      lyrics: "start",
      chords: "C",
    },
    {
      lyrics: "to",
    },
    {
      lyrics: "make",
      chords: "C7",
    },
    {
      lyrics: "it",
    },
    {
      lyrics: "better",
      chords: "F",
    },
  ],
  [
    {
      lyrics: "Hey",
    },
    {
      lyrics: "Jude",
      chords: "F",
    },
    {
      lyrics: "don't",
    },
    {
      lyrics: "make",
    },
    {
      lyrics: "it",
    },
    {
      lyrics: "bad",
      chords: "C",
    },
  ],
  [
    {
      lyrics: "Take",
    },
    {
      lyrics: "a",
    },
    {
      lyrics: "sad",
      chords: "C7",
    },
    {
      lyrics: "song",
      chords: "C4/7",
    },
    {
      lyrics: "and",
    },
    {
      lyrics: "make",
    },
    {
      lyrics: "it",
    },
    {
      lyrics: "better",
      chords: "F",
    },
  ],
  [
    {
      lyrics: "Remember",
      chords: "Bb",
    },
    {
      lyrics: "to",
    },
    {
      lyrics: "let",
    },
    {
      lyrics: "her",
    },
    {
      lyrics: "into",
    },
    {
      lyrics: "your",
    },
    {
      lyrics: "heart",
      chords: "F",
    },
  ],
  [
    {
      lyrics: "Then",
    },
    {
      lyrics: "you",
    },
    {
      lyrics: "can",
    },
    {
      lyrics: "start",
      chords: "C",
    },
    {
      lyrics: "to",
    },
    {
      lyrics: "make",
      chords: "C7",
    },
    {
      lyrics: "it",
    },
    {
      lyrics: "better",
      chords: "F",
    },
  ],
  [
    {
      lyrics: "Hey",
    },
    {
      lyrics: "Jude",
      chords: "F",
    },
    {
      lyrics: "don't",
    },
    {
      lyrics: "make",
    },
    {
      lyrics: "it",
    },
    {
      lyrics: "bad",
      chords: "C",
    },
  ],
  [
    {
      lyrics: "Take",
    },
    {
      lyrics: "a",
    },
    {
      lyrics: "sad",
      chords: "C7",
    },
    {
      lyrics: "song",
      chords: "C4/7",
    },
    {
      lyrics: "and",
    },
    {
      lyrics: "make",
    },
    {
      lyrics: "it",
    },
    {
      lyrics: "better",
      chords: "F",
    },
  ],
  [
    {
      lyrics: "Remember",
      chords: "Bb",
    },
    {
      lyrics: "to",
    },
    {
      lyrics: "let",
    },
    {
      lyrics: "her",
    },
    {
      lyrics: "into",
    },
    {
      lyrics: "your",
    },
    {
      lyrics: "heart",
      chords: "F",
    },
  ],
  [
    {
      lyrics: "Then",
    },
    {
      lyrics: "you",
    },
    {
      lyrics: "can",
    },
    {
      lyrics: "start",
      chords: "C",
    },
    {
      lyrics: "to",
    },
    {
      lyrics: "make",
      chords: "C7",
    },
    {
      lyrics: "it",
    },
    {
      lyrics: "better",
      chords: "F",
    },
  ],
  [
    {
      lyrics: "Hey",
    },
    {
      lyrics: "Jude",
      chords: "F",
    },
    {
      lyrics: "don't",
    },
    {
      lyrics: "make",
    },
    {
      lyrics: "it",
    },
    {
      lyrics: "bad",
      chords: "C",
    },
  ],
  [
    {
      lyrics: "Take",
    },
    {
      lyrics: "a",
    },
    {
      lyrics: "sad",
      chords: "C7",
    },
    {
      lyrics: "song",
      chords: "C4/7",
    },
    {
      lyrics: "and",
    },
    {
      lyrics: "make",
    },
    {
      lyrics: "it",
    },
    {
      lyrics: "better",
      chords: "F",
    },
  ],
  [
    {
      lyrics: "Remember",
      chords: "Bb",
    },
    {
      lyrics: "to",
    },
    {
      lyrics: "let",
    },
    {
      lyrics: "her",
    },
    {
      lyrics: "into",
    },
    {
      lyrics: "your",
    },
    {
      lyrics: "heart",
      chords: "F",
    },
  ],
  [
    {
      lyrics: "Then",
    },
    {
      lyrics: "you",
    },
    {
      lyrics: "can",
    },
    {
      lyrics: "start",
      chords: "C",
    },
    {
      lyrics: "to",
    },
    {
      lyrics: "make",
      chords: "C7",
    },
    {
      lyrics: "it",
    },
    {
      lyrics: "better",
      chords: "F",
    },
  ],
];
const author = "The Beetles";
const title = "Hey Jude";

function LivePage({ socket, user, isAdmin }) {
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
      navigate("/main");
    });
  });
  return (
    <>
      <div className="live-page" ref={scrollRef}>
        <h1 className="song-title">{title}</h1>
        <h2 className="song-author">By {author}</h2>
        {isAdmin && (
          <button className="quit-button" onClick={quitSong}>
            Quit
          </button>
        )}
        <div className="song-content">
          {song.map((line, index) => (
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
