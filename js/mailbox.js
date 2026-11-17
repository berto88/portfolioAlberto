document.addEventListener("DOMContentLoaded", () => {

    /* ---------- Configuración ---------- */
    const ENDPOINT = "https://formsubmit.co/ajax/bertotorre88@gmail.com";
    const TIMEOUT_MS = 20000;
  
    /* ---------- Elementos ---------- */
    const modal = document.getElementById("mailboxModal");
    const closeBtn = document.getElementById("closeMailbox");
    const form = document.getElementById("mailboxForm");
    const submitBtn = document.getElementById("mailboxSubmit");
    const result = document.getElementById("mailboxResult");
    const toast = document.getElementById("mailboxToast");
    const message = document.getElementById("mailboxMessage");
    const charCount = document.getElementById("mailboxCharCount");
    const emailInput = document.getElementById("mailboxEmail");
    const replyTo = document.getElementById("mailboxReplyTo");
  
    if (!modal || !form || !submitBtn) return;
  
    const buttonText = submitBtn.querySelector(".mailbox-button-text");
    const originalText = buttonText ? buttonText.textContent : "";
  
    /* ---------- Cerrar modal ---------- */
    if (closeBtn) closeBtn.addEventListener("click", () => modal.close());
    modal.addEventListener("click", (e) => {
      if (e.target === modal) modal.close();
    });
  
    /* ---------- Contador de caracteres ---------- */
    if (message && charCount) {
      message.addEventListener("input", () => {
        charCount.textContent = message.value.length;
      });
    }
  
    /* ---------- Mensajes ---------- */
    function showResult(type, text) {
      result.className = "mailbox-result " + type;
      result.textContent = text;
    }
  
    function hideResult() {
      result.className = "mailbox-result";
      result.textContent = "";
    }
  
    let toastTimer;
    function showToast(text) {
      if (!toast) return;
      toast.textContent = text;
      toast.classList.add("show");
      clearTimeout(toastTimer);
      toastTimer = setTimeout(() => toast.classList.remove("show"), 4500);
    }
  
    function setSending(isSending) {
      submitBtn.disabled = isSending;
      if (buttonText) buttonText.textContent = isSending ? "Enviando..." : originalText;
    }
  
    /* ---------- Envío ---------- */
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      hideResult();
  
      if (replyTo && emailInput) replyTo.value = emailInput.value;
  
      setSending(true);
  
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);
  
      try {
        const response = await fetch(ENDPOINT, {
          method: "POST",
          body: new FormData(form),
          headers: { Accept: "application/json" },
          signal: controller.signal
        });
  
        const data = await response.json().catch(() => ({}));
        console.log("Respuesta FormSubmit:", response.status, data);
  
        if (response.ok && String(data.success) !== "false") {
          modal.close();
          form.reset();
          if (charCount) charCount.textContent = "0";
          showToast("✓ Mensaje enviado correctamente. ¡Gracias!");
        } else {
          throw new Error(data.message || "Error " + response.status);
        }
      } catch (err) {
        console.error(err);
        const msg = err.name === "AbortError"
          ? "El servidor tardó demasiado en responder."
          : err.message;
        showResult("error", "No se pudo enviar: " + msg);
      } finally {
        clearTimeout(timeout);
        setSending(false);
      }
    });
  
  });