import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../UserContext";

function useSocketListeners() {
  const { socket, user, song, handleLogin, handleSongSelect } =
    useContext(UserContext);
  const navigate = useNavigate();

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
