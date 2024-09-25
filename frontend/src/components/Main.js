import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../UserContext";
import Search from "./Search";
import Header from "./Header";
import useSocketListeners from "../hooks/useSocketListeners";

function Main() {
  const { user, isAdmin, song, isSong, socket, handleLogin, handleSongSelect } =
    useContext(UserContext);

  const [loading, setLoading] = useState(true);

  useSocketListeners(); // Now uses context internally

  // Emit socket event after admin selects a song
  useEffect(() => {
    if (song && isSong) socket.emit("song-selected", song);
  }, [song, isSong, socket]);

  useEffect(() => {
    if (user && Object.keys(user).length !== 0) {
      setLoading(false);
    }
  }, [user]);

  if (loading) {
    return <div>Loading user data...</div>;
  }

  return (
    <>
      <Header />
      {isAdmin ? <Search /> : <h2>Waiting for next song...</h2>}
    </>
  );
}

export default Main;
