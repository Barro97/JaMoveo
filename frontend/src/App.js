// App.js
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { io } from "socket.io-client";
import AuthPage from "./components/AuthPage";
import LivePage from "./components/LivePage";
import Main from "./components/Main";
import UserContext from "./UserContext";

const server = "http://localhost:5000";
const socket = io(server);

function App() {
  // Initialize states from sessionStorage
  const [user, setUser] = useState(() => {
    const savedUser = sessionStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [isAdmin, setIsAdmin] = useState(() => {
    const savedIsAdmin = sessionStorage.getItem("isAdmin");
    return savedIsAdmin ? JSON.parse(savedIsAdmin) : false;
  });

  const [song, setSong] = useState(() => {
    const savedSong = sessionStorage.getItem("song");
    return savedSong ? JSON.parse(savedSong) : null;
  });

  const [isSong, setIsSong] = useState(() => {
    const savedIsSong = sessionStorage.getItem("isSong");
    return savedIsSong ? JSON.parse(savedIsSong) : false;
  });

  // Save to sessionStorage on change
  useEffect(() => {
    sessionStorage.setItem("user", JSON.stringify(user));
    sessionStorage.setItem("isAdmin", JSON.stringify(isAdmin));
    sessionStorage.setItem("song", JSON.stringify(song));
    sessionStorage.setItem("isSong", JSON.stringify(isSong));
  }, [user, isAdmin, song, isSong]);

  function handleSongSelect(selectedSong) {
    setSong(selectedSong);
    setIsSong(true);
  }

  function handleLogin(loggedUser, admin) {
    setUser(loggedUser);
    setIsAdmin(admin);
  }

  // Context value
  const contextValue = {
    user,
    setUser,
    isAdmin,
    setIsAdmin,
    song,
    setSong,
    isSong,
    setIsSong,
    socket,
    server,
    handleLogin,
    handleSongSelect,
  };

  return (
    <UserContext.Provider value={contextValue}>
      <Router>
        <Routes>
          <Route path="/" element={<AuthPage mode="login" />} />
          <Route path="/signup/:type" element={<AuthPage mode="signup" />} />
          <Route path="/main" element={<Main />} />
          <Route path="/song" element={<LivePage />} />
        </Routes>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
