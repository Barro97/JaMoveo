import Search from "./Search";
import Header from "./Header";
import { useEffect } from "react";
import useSocketListeners from "../hooks/useSocketListeners";
import useSessionStorageSync from "../hooks/useSessionStorageSync";

function Main({
  user,
  isAdmin,
  onLogin,
  onSongSelect,
  song,
  isSong,
  socket,
  server,
}) {
  //Custom hooks to improve readability
  useSocketListeners({ user, onLogin, onSongSelect, song, socket }); //Handles socket events
  useSessionStorageSync(user, isAdmin, socket); // Handles user info upon reload

  // Emit socket event after admin selects a song
  useEffect(() => {
    if (song && isSong) socket.emit("song-selected", song);
  }, [song, isSong, socket]);

  return (
    <>
      <Header user={user} isAdmin={isAdmin} socket={socket} server={server} />
      {isAdmin ? (
        <Search onSongSelect={onSongSelect} />
      ) : (
        <h2>Waiting for next song...</h2>
      )}
    </>
  );
}

export default Main;
