import { useNavigate } from "react-router-dom";

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

export default Header;
