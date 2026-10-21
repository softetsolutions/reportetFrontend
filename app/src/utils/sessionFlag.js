/** Shared SoftET-subdomain flag so marketing can show Go to Dashboard.
 *  Not the auth JWT — only a tiny UI hint. Real auth stays on API orgToken. */
export const MARKETING_SESSION_COOKIE = "reportet_logged_in";

function isSoftetHost(hostname = window.location.hostname) {
  return (
    hostname === "softetsolutions.com" ||
    hostname.endsWith(".softetsolutions.com")
  );
}

function cookieString(value, maxAgeSeconds) {
  const parts = [
    `${MARKETING_SESSION_COOKIE}=${value}`,
    "Path=/",
    `Max-Age=${maxAgeSeconds}`,
    "SameSite=Lax",
  ];

  if (isSoftetHost()) {
    // Shared by reportet.* and reportetapp.*
    parts.push("Domain=.softetsolutions.com");
    parts.push("Secure");
  }

  return parts.join("; ");
}

/** Call after successful org login (and signup if a token is returned). */
export function setMarketingSessionFlag() {
  try {
    // 7 days — aligned with org JWT expiry
    document.cookie = cookieString("1", 7 * 24 * 60 * 60);
  } catch (err) {
    console.warn("Could not set marketing session flag:", err);
  }
}

/** Call on logout, expired token, and any 401 cleanup. */
export function clearMarketingSessionFlag() {
  try {
    // Expire with the same Domain/Secure attrs used when setting
    document.cookie = cookieString("", 0);
    // Also clear host-only variant (local / mis-set cookies)
    document.cookie = `${MARKETING_SESSION_COOKIE}=; Path=/; Max-Age=0; SameSite=Lax`;
  } catch (err) {
    console.warn("Could not clear marketing session flag:", err);
  }
}
