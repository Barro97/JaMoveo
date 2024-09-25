import { useEffect, useState, useContext } from "react";
import UserContext from "../UserContext";
import Search from "./Search";
import Header from "./Header";
import useSocketListeners from "../hooks/useSocketListeners";

function Main() {
  const { user, isAdmin } = useContext(UserContext);
  const [loading, setLoading] = useState(true);

  // A custom hook for grouping all socket listeners
  useSocketListeners();

  // Make sure page isn't loaded until data is fetched
  useEffect(() => {
    if (user && Object.keys(user).length !== 0) {
      setLoading(false);
    }
  }, [user]);

  if (loading) {
    return <div>Loading user data...</div>;
  }

  return (
    <>
      <Header />
      {isAdmin ? <Search /> : <h2>Waiting for next song...</h2>}
    </>
  );
}

export default Main;
