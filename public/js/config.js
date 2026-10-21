/* Local defaults — override for production deploys if needed.
   API_BASE_URL must match the React app (include /api locally). */
window.REPORTET_CONFIG = {
  API_BASE_URL: "http://localhost:5005/api",
  APP_URL: "http://localhost:5174",
  MARKETING_URL: "http://localhost:5500",
  SESSION_COOKIE_NAME: "reportet_logged_in",
  WHATSAPP_NUMBER: "916387651169",
  WHATSAPP_PREFILL:
    "Hi, I want a demo of ReportET. Please share more details.",
};

// Production (uncomment when deploying marketing to reportet.softetsolutions.com):
// window.REPORTET_CONFIG = {
//   API_BASE_URL: "https://schoolet.org/schoolet",
//   APP_URL: "https://reportetapp.softetsolutions.com",
//   MARKETING_URL: "https://reportet.softetsolutions.com",
//   SESSION_COOKIE_NAME: "reportet_logged_in",
//   WHATSAPP_NUMBER: "916387651169",
//   WHATSAPP_PREFILL:
//     "Hi, I want a demo of ReportET. Please share more details.",
// };
