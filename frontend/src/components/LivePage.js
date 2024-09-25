import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useInterval } from "react-use";
const song = {
  name: "hey jude",
  author: "the beetles",
  content: [
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
  ],
};
function LivePage({ socket, user, isAdmin, songy, handleSongSelect }) {
  // const navigate = useNavigate();
  // const isSinger = user.instrument === "singer";
  const isSinger = false;
  // const scrollRef = useRef(null);

  const [autoScroll, setAutoScroll] = useState(false);
  // const scrollIntervalID = useRef(null);
  const scrollSpeed = 1;
  const scrollInterval = 20;
  useInterval(
    () => {
      window.scrollBy(0, 2); // Scrolls 2 pixels vertically
    },
    autoScroll ? 10 : null // Runs every 10 milliseconds
  );

  const toggleAutoScroll = () => {
    setAutoScroll(!autoScroll);
  };
  // useEffect(() => {
  //   function startScroll() {
  //     if (scrollIntervalID.current) return;
  //     scrollIntervalID.current = setInterval(() => {
  //       console.log(`Current scroll position: ${window.scrollY}px`);
  //       window.scrollBy(0, scrollSpeed);
  //     }, scrollInterval);
  //     console.log(scrollIntervalID.current);
  //   }

  //   function stopScroll() {
  //     if (scrollIntervalID.current) {
  //       clearInterval(scrollIntervalID.current);
  //       scrollIntervalID.current = null;
  //     }
  //   }
  //   if (autoScroll) {
  //     console.log("starting autoscroll");
  //     console.log(song);
  //     startScroll();
  //   } else stopScroll();
  //   return () => {
  //     console.log("ending autoscroll");
  //     stopScroll();
  //   };
  // }, [autoScroll]);

  function quitSong() {
    socket.emit("quit-song");
  }

  // useEffect(() => {
  //   socket.on("main-page", () => {
  //     handleSongSelect("", false);
  //     navigate("/main");
  //   });
  // });
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
