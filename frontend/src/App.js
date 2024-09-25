import { useState, createContext } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { io } from "socket.io-client";
import AuthPage from "./components/AuthPage";
import LivePage from "./components/LivePage";
import Main from "./components/Main";

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
  const [song, setSong] = useState("");
  const [isSong, setIsSong] = useState(false);

  function handleSongSelect(selectedSong) {
    setSong(selectedSong);
    setIsSong(true);
  }
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
          path="/signup/:type"
          element={<AuthPage mode="signup" socket={socket} server={server} />}
        />
        <Route
          path="/main"
          element={
            <Main
              user={user}
              isAdmin={isAdmin}
              onLogin={handleLogin}
              onSongSelect={handleSongSelect}
              song={song}
              isSong={isSong}
              socket={socket}
              server={server}
            />
          }
        />
        <Route
          path="/song"
          element={
            <LivePage
              socket={socket}
              user={user}
              isAdmin={isAdmin}
              song={song}
              handleSongSelect={handleSongSelect}
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
