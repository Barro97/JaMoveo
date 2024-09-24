import { useState, useEffect } from "react";
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
const isSinger = false;
const isAdmin = true;
function LivePage() {
  const [autoScroll, setAutoScroll] = useState(false);

  useEffect(() => {
    let scrollInterval;
    if (autoScroll) {
      scrollInterval = setInterval(() => {
        window.scrollBy(0, 1); // Scroll down by 1 pixel
      }, 50);
    }
    return () => clearInterval(scrollInterval);
  }, [autoScroll]);

  return (
    <>
      <div className="live-page">
        <h1 className="song-title">{title}</h1>
        <h2 className="song-author">By {author}</h2>
        {isAdmin && <button className="quit-button">Quit</button>}
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
