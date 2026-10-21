(function () {
  const cfg = window.REPORTET_CONFIG || {};
  const apiBase = (cfg.API_BASE_URL || "").replace(/\/$/, "");
  const appUrl = (cfg.APP_URL || "").replace(/\/$/, "");
  const FLAG = cfg.SESSION_COOKIE_NAME || "reportet_logged_in";

  const loginLinks = document.querySelectorAll("[data-auth-login]");
  const signupLinks = document.querySelectorAll("[data-auth-signup]");
  const dashboardLinks = document.querySelectorAll("[data-auth-dashboard]");
  const loggedOutEls = document.querySelectorAll("[data-auth-logged-out]");
  const loggedInEls = document.querySelectorAll("[data-auth-logged-in]");

  function setLoggedIn(isLoggedIn) {
    loggedOutEls.forEach((el) => {
      el.hidden = isLoggedIn;
    });
    loggedInEls.forEach((el) => {
      el.hidden = !isLoggedIn;
    });
  }

  function readSessionFlag() {
    return document.cookie.split(";").some((part) => {
      const [k, v] = part.trim().split("=");
      return k === FLAG && v === "1";
    });
  }

  /** Drop shared SoftET flag so Login/Signup show again. */
  function clearSessionFlag() {
    document.cookie =
      FLAG +
      "=; Path=/; Max-Age=0; SameSite=Lax; Domain=.softetsolutions.com; Secure";
    document.cookie = FLAG + "=; Path=/; Max-Age=0; SameSite=Lax";
  }

  loginLinks.forEach((el) => {
    el.href = `${appUrl}/login`;
  });
  signupLinks.forEach((el) => {
    el.href = `${appUrl}/signup`;
  });
  dashboardLinks.forEach((el) => {
    el.href = `${appUrl}/admin`;
  });

  // Optimistic UI from shared SoftET subdomain cookie (prod)
  setLoggedIn(readSessionFlag());

  if (!apiBase) return;

  // Confirm with API session; 401 clears the shared flag
  fetch(`${apiBase}/logo/me`, {
    method: "GET",
    credentials: "include",
  })
    .then((res) => {
      if (res.ok) {
        setLoggedIn(true);
        return;
      }
      clearSessionFlag();
      setLoggedIn(false);
      if (res.status === 401) {
        console.warn(
          "[ReportET marketing] Not logged in (401). Showing Login/Signup.",
        );
      }
    })
    .catch((err) => {
      console.warn("[ReportET marketing] Session probe error:", err);
      // Keep flag-based UI if network blip; do not clear on network errors only
    });
})();
