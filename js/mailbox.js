
/* ==========================================
   BUZÓN DE SUGERENCIAS
   ========================================== */

   window.Mailbox = (() => {

    const form = document.getElementById("mailboxForm");
  
    if (!form) return;
  
    const fileInput = document.getElementById("mailboxFile");
    const fileInfo = document.getElementById("mailboxFileInfo");
    const messageInput = document.getElementById("mailboxMessage");
    const charCount = document.getElementById("mailboxCharCount");
    const result = document.getElementById("mailboxResult");
    const submitButton = document.getElementById("mailboxSubmit");
    const buttonText = submitButton.querySelector(".mailbox-button-text");
    const replyTo = document.getElementById("mailboxReplyTo");
  
    const MAX_FILE_SIZE = 5 * 1024 * 1024;
  
    const ALLOWED_EXTENSIONS = [
      "pdf",
      "png",
      "jpg",
      "jpeg",
      "webp",
      "doc",
      "docx",
      "txt",
      "zip"
    ];
  
    /* ==========================================
       CONTADOR DE CARACTERES
       ========================================== */
  
    messageInput.addEventListener("input", () => {
      charCount.textContent = messageInput.value.length;
    });
  
    /* ==========================================
       INFORMACIÓN DEL ARCHIVO
       ========================================== */
  
    fileInput.addEventListener("change", () => {
  
      const file = fileInput.files[0];
  
      if (!file) {
        fileInfo.textContent = "Ningún archivo seleccionado";
        return;
      }
  
      const sizeMB = (file.size / (1024 * 1024)).toFixed(2);
  
      fileInfo.textContent = `${file.name} (${sizeMB} MB)`;
  
    });
  
    /* ==========================================
       VALIDACIÓN DEL ARCHIVO
       ========================================== */
  
    function validarArchivo(file) {
  
      if (!file) return true;
  
      const extension = file.name
        .split(".")
        .pop()
        .toLowerCase();
  
      if (!ALLOWED_EXTENSIONS.includes(extension)) {
        mostrarResultado(
          "El tipo de archivo seleccionado no está permitido.",
          "error"
        );
  
        return false;
      }
  
      if (file.size > MAX_FILE_SIZE) {
        mostrarResultado(
          "El archivo supera el tamaño máximo permitido de 5 MB.",
          "error"
        );
  
        return false;
      }
  
      return true;
    }
  
    /* ==========================================
       MOSTRAR RESULTADOS
       ========================================== */
  
    function mostrarResultado(message, type) {
  
      result.textContent = message;
      result.className = `mailbox-result ${type}`;
  
    }
  
    /* ==========================================
       ENVÍO DEL FORMULARIO
       ========================================== */
  
    form.addEventListener("submit", async (event) => {
  
      event.preventDefault();
  
      // Comprobar campos obligatorios
      if (!form.reportValidity()) return;
  
      // Comprobar archivo
      const file = fileInput.files[0];
  
      if (!validarArchivo(file)) return;
  
      // Evitar envíos repetidos
      submitButton.disabled = true;
      buttonText.textContent = "Enviando...";
  
      result.className = "mailbox-result";
      result.textContent = "";
  
      // Preparar datos
      const formData = new FormData(form);
  
      // Configurar asunto dinámico
      const category = formData.get("category");
      const subject = formData.get("message_subject");
  
      formData.set(
        "subject",
        `[${category}] ${subject}`
      );
  
      // Configurar respuesta al remitente
      replyTo.value = formData.get("email");
  
      formData.set("replyto", replyTo.value);
  
      try {
  
        const response = await fetch(
          "https://api.web3forms.com/submit",
          {
            method: "POST",
            body: formData
          }
        );
  
        const data = await response.json();
  
        if (!response.ok || !data.success) {
          throw new Error(
            data.message || "No se ha podido enviar el mensaje."
          );
        }
  
        // Envío correcto
        mostrarResultado(
          "¡Mensaje enviado correctamente! Muchas gracias por compartir tu sugerencia.",
          "success"
        );
  
        form.reset();
  
        charCount.textContent = "0";
        fileInfo.textContent = "Ningún archivo seleccionado";
  
      } catch (error) {
  
        console.error("Error al enviar el buzón:", error);
  
        mostrarResultado(
          error.message || "Ha ocurrido un error al enviar el mensaje. Inténtalo de nuevo.",
          "error"
        );
  
      } finally {
  
        submitButton.disabled = false;
        buttonText.textContent = "Enviar mensaje";
  
      }
  
    });
  
    return {
      validarArchivo,
      mostrarResultado
    };
  
  })();
  