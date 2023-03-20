import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useAuthContext } from "./context/AuthContext";
import { removeCookies } from "./utils/cookies/Cookie";

function SessionTimeout({ timeoutInMinutes = 30 }) {
  const [isIdle, setIsIdle] = useState(false);
  const router = useRouter();
  const { setChoosePractitionerOpen, setShowSecondForm } = useAuthContext();

  useEffect(() => {
    let timeoutId;

    // reset the idle state and start the timeout
    const resetIdleState = () => {
      setIsIdle(false);
      clearTimeout(timeoutId);

      timeoutId = setTimeout(() => {
        setIsIdle(true);
        localStorage.clear();
        setShowSecondForm(false);
        setChoosePractitionerOpen(true);
        removeCookies("access");
        removeCookies("signup_info");
        removeCookies("profile_info");
        router.push("/auth/login");
      }, timeoutInMinutes * 60 * 1000);
    };

    // reset the idle state on user activity
    const onUserActivity = () => {
      resetIdleState();
    };

    resetIdleState();

    window.addEventListener("mousemove", onUserActivity);
    window.addEventListener("keypress", onUserActivity);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("mousemove", onUserActivity);
      window.removeEventListener("keypress", onUserActivity);
    };
  }, [isIdle]);

  return null;
}

export default SessionTimeout;
