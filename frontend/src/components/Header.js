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
      await navigator.clipboard.writeText(
        `${process.env.REACT_APP_CLIENT_URL}/signup/Admin`
      );
      alert("Admin signup link copied");
    } catch (err) {
      console.log("Failed to copy link", err);
    }
  }

  return (
    <header>
      <div className="header-content">
        <h1>Welcome, {user.username}</h1>
        <div>
          <h1>
            Role:
            <span className="role-text"> {isAdmin ? "Admin" : "Player"}</span>
          </h1>
        </div>
        <div className="header-buttons">
          {isAdmin && (
            <button className="button " onClick={handleCopyAdminSignup}>
              Invite Admin
            </button>
          )}
          <button className="button " onClick={disconnect}>
            Disconnect
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
