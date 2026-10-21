(function () {
  const cfg = window.REPORTET_CONFIG || {};
  const number = String(cfg.WHATSAPP_NUMBER || "916387651169").replace(
    /\D/g,
    "",
  );
  const prefill =
    cfg.WHATSAPP_PREFILL ||
    "Hi, I want a demo of ReportET. Please share more details.";

  const href =
    `https://wa.me/${number}` +
    (prefill ? `?text=${encodeURIComponent(prefill)}` : "");

  document.querySelectorAll("[data-whatsapp]").forEach((el) => {
    el.setAttribute("href", href);
    el.setAttribute("target", "_blank");
    el.setAttribute("rel", "noopener noreferrer");
  });
})();
