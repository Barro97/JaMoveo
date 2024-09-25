import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../UserContext";

function useSocketListeners() {
  const { socket, song, handleLogin, handleSongSelect, isSong } =
    useContext(UserContext);
  const navigate = useNavigate();

  // Emit socket event after admin selects a song
  useEffect(() => {
    if (song && isSong) socket.emit("song-selected", song);
  }, [song, isSong, socket]);

  useEffect(() => {
    socket.on("change-page", (selectedSong) => {
      // Ensures all users register the selected song
      handleSongSelect(selectedSong);
      navigate("/song");
    });

    socket.on("currentUser", (loggedUser) => {
      // Updates user state upon receiving current user data
      handleLogin(loggedUser, loggedUser.type === "admin");
    });

    // Cleanup
    return () => {
      socket.off("change-page");
      socket.off("currentUser");
    };
  }, [handleSongSelect, handleLogin, navigate, socket]);
}

export default useSocketListeners;
