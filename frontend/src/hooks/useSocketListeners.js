import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function useSocketListeners({ user, onLogin, onSongSelect, song, socket }) {
  const navigate = useNavigate(); // Used to navigate to the main page after logging in

  useEffect(() => {
    socket.on("change-page", (selectedSong) => {
      // Causes all users to navigate to song page
      if (!song) {
        // Makes sure all users register the selected song
        onSongSelect(selectedSong);
      }
      navigate("/song");
    });

    socket.on("currentUser", (loggedUser) => {
      console.log("Received user", loggedUser);

      // An empty object means this user just logged in
      if (Object.keys(user).length === 0) {
        onLogin(loggedUser, loggedUser.type === "admin");
      }
    });

    return () => {
      //Cleanup
      socket.off("change-page");
      socket.off("currentUser");
    };
  }, [song, onSongSelect, onLogin, user, navigate, socket]);
}

export default useSocketListeners;
