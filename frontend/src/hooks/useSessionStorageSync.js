import { useEffect } from "react";

function useSessionStorageSync(user, isAdmin, socket) {
  useEffect(() => {
    const handleBeforeUnload = () => {
      // stores current user info when reloading
      sessionStorage.setItem("user", JSON.stringify(user));
      sessionStorage.setItem("isAdmin", JSON.stringify(isAdmin));
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      // Clean up the event listener
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [user, isAdmin, socket]);
}

export default useSessionStorageSync;
