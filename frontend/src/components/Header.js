import { useNavigate } from "react-router-dom";

function Header({ user, isAdmin, socket, server }) {
  const navigate = useNavigate();

  function disconnect() {
    socket.emit("leaveRoom", user);
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("isAdmin");
    navigate("/");
  }
  async function handleCopyAdminSignup() {
    try {
      await navigator.clipboard.writeText(`http://localhost:3000/signup/Admin`);
      alert("admin signup link copied");
    } catch (err) {
      console.log("failed to copy link", err);
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
