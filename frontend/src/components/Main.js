import { useEffect } from "react";
import Search from "./Search";
import { useNavigate } from "react-router-dom";
import useSocketListeners from "../hooks/useSocketListeners";

function Main({ user, isAdmin, onLogin, onSongSelect, song, isSong, socket }) {
  //   const navigate = useNavigate(); // Used to navigate to the main page after logging in
  useSocketListeners({ user, onLogin, onSongSelect, song, socket });
  useEffect(() => {
    if (song && isSong) socket.emit("song-selected", song);
  }, [song, isSong, socket]);

  //   useEffect(() => {
  //     socket.on("change-page", (selectedSong) => {
  //       if (!song) {
  //         onSongSelect(selectedSong);
  //       }
  //       navigate("/song");
  //     });
  //   });

  useEffect(() => {
    // socket.on("currentUser", (loggedUser) => {
    //   console.log("Received user", loggedUser);
    // An empty object means this user just logged in
    //   if (Object.keys(user).length === 0) {
    //     onLogin(loggedUser, loggedUser.type === "admin");
    //   }
    // });
    const handleBeforeUnload = () => {
      sessionStorage.setItem("user", JSON.stringify(user));
      sessionStorage.setItem("isAdmin", JSON.stringify(isAdmin));
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      // Clean up the event listener
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [user, isAdmin, onLogin, socket]);
  return (
    <>
      <Header user={user} isAdmin={isAdmin} socket={socket} />
      {isAdmin ? (
        <Search onSongSelect={onSongSelect} />
      ) : (
        <h2>Waiting for next song...</h2>
      )}
    </>
  );
}

function Header({ user, isAdmin, socket }) {
  const navigate = useNavigate();

  function disconnect() {
    socket.emit("leaveRoom", user);
    sessionStorage.removeItem("user", JSON.stringify(user));
    sessionStorage.removeItem("isAdmin", JSON.stringify(isAdmin));
    navigate("/");
  }
  return (
    <header>
      <div className="header-content">
        <h1>
          Welcome, {user.username}{" "}
          <span className="role-text">{isAdmin ? "admin" : "player"}</span>
        </h1>
        <button className="disconnect-button" onClick={disconnect}>
          Disconnect
        </button>
      </div>
    </header>
  );
}
export default Main;
