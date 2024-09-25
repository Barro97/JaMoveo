// App.js
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { io } from "socket.io-client";
import AuthPage from "./components/AuthPage";
import LivePage from "./components/LivePage";
import Main from "./components/Main";
import UserContext from "./UserContext";
import useSessionStorageSync from "./hooks/useSessionStorageSync";

const server = "http://localhost:5000";
const socket = io(server);

function App() {
  // Initialize states from sessionStorage
  // Created useSessionStorageSync hook for reusability
  const [user, setUser] = useSessionStorageSync("user", null);
  const [isAdmin, setIsAdmin] = useSessionStorageSync("isAdmin", false);
  const [song, setSong] = useSessionStorageSync("song", null);
  const [isSong, setIsSong] = useSessionStorageSync("isSong", false);

  function handleSongSelect(selectedSong) {
    setSong(selectedSong);
    setIsSong(true);
  }

  function handleLogin(loggedUser, admin) {
    setUser(loggedUser);
    setIsAdmin(admin);
  }

  // Context value - all of the states that the app needs
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
    // The context helps with state management and eliminated prop drilling
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
