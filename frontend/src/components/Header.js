import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../UserContext";

function Header() {
  const { user, isAdmin, socket, handleLogin } = useContext(UserContext);

  const navigate = useNavigate();

  function disconnect() {
    socket.emit("leaveRoom", user);
    sessionStorage.clear();
    handleLogin(null, false); // Set user to null
    navigate("/");
  }

  async function handleCopyAdminSignup() {
    try {
      await navigator.clipboard.writeText(`http://localhost:3000/signup/Admin`);
      alert("Admin signup link copied");
    } catch (err) {
      console.log("Failed to copy link", err);
    }
  }

  return (
    <header>
      <div className="header-content">
        <h1>
          Welcome, {user.username}{" "}
          <span className="role-text">{isAdmin ? "admin" : "player"}</span>
        </h1>
        {isAdmin && (
          <button className="disconnect-button" onClick={handleCopyAdminSignup}>
            Invite Admin
          </button>
        )}
        <button className="disconnect-button" onClick={disconnect}>
          Disconnect
        </button>
      </div>
    </header>
  );
}

export default Header;
