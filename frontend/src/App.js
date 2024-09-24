import { useState, useEffect } from "react";
import axios from "axios";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import { io } from "socket.io-client";
import AuthPage from "./components/AuthPage";
import Search from "./components/Search";
import LivePage from "./components/LivePage";

const server = "http://localhost:5000";
const socket = io("http://localhost:5000");

function App() {
  //Determine states based on session storage (Makes it so that data does not disappear upon reloading page)
  const [user, setUser] = useState(() => {
    const savedUser = sessionStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : {};
  });

  const [isAdmin, setIsAdmin] = useState(() => {
    const savedIsAdmin = sessionStorage.getItem("isAdmin");
    return savedIsAdmin ? JSON.parse(savedIsAdmin) : false;
  });

  function handleLogin(loggedUser, admin) {
    setUser(loggedUser);
    setIsAdmin(admin);
  }
  //Renders comps based on active routes
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<AuthPage mode="login" socket={socket} server={server} />}
        />
        <Route
          path="/signup"
          element={<AuthPage mode="signup" socket={socket} server={server} />}
        />
        <Route
          path="/main"
          element={<Main user={user} isAdmin={isAdmin} onLogin={handleLogin} />}
        />
        <Route
          path="/song"
          element={<LivePage socket={socket} user={user} isAdmin={isAdmin} />}
        />
      </Routes>
    </Router>
  );
}

function Main({ user, isAdmin, onLogin }) {
  const navigate = useNavigate(); // Used to navigate to the main page after logging in

  const [song, setSong] = useState("");

  function handleSongSelect(selectedSong) {
    setSong(selectedSong);
  }

  useEffect(() => {
    socket.on("change-page", (song) => {
      navigate("/song");
    });
  });

  useEffect(() => {
    if (song) socket.emit("song-selected", song);
  }, [song]);

  useEffect(() => {
    socket.on("currentUser", (loggedUser) => {
      console.log("Received user", loggedUser);
      // An empty object means this user just logged in
      if (Object.keys(user).length === 0) {
        onLogin(loggedUser, loggedUser.type === "admin");
      }
    });
    const handleBeforeUnload = () => {
      sessionStorage.setItem("user", JSON.stringify(user));
      sessionStorage.setItem("isAdmin", JSON.stringify(isAdmin));
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      // Clean up the event listener
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [user, isAdmin, onLogin]);
  return (
    <>
      <Header user={user} isAdmin={isAdmin} />
      {isAdmin ? (
        <Search onSongSelect={handleSongSelect} />
      ) : (
        <h2>Waiting for next song...</h2>
      )}
    </>
  );
}

function Header({ user, isAdmin }) {
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

export default App;
