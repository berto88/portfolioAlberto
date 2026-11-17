document.addEventListener("DOMContentLoaded", () => {

    /* ---------- Configuración ---------- */
    const MAX_FILES = 5;
    const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB por archivo
  
    /* ---------- Elementos ---------- */
    const modal = document.getElementById("mailboxModal");
    const openBtn = document.getElementById("openMailbox");
    const closeBtn = document.getElementById("closeMailbox");
    const form = document.getElementById("mailboxForm");
    const frame = document.getElementById("mailboxFrame");
    const submitBtn = document.getElementById("mailboxSubmit");
    const result = document.getElementById("mailboxResult");
    const toast = document.getElementById("mailboxToast");
    const message = document.getElementById("mailboxMessage");
    const charCount = document.getElementById("mailboxCharCount");
    const emailInput = document.getElementById("mailboxEmail");
    const replyTo = document.getElementById("mailboxReplyTo");
    const fileInput = document.getElementById("mailboxFile");
    const fileInfo = document.getElementById("mailboxFileInfo");
  
    if (!modal || !form || !frame) return;
  
    let selectedFiles = [];
  
    /* ---------- Abrir / cerrar modal ---------- */
    openBtn.addEventListener("click", () => modal.showModal());
    closeBtn.addEventListener("click", () => modal.close());
    modal.addEventListener("click", (e) => {
      if (e.target === modal) modal.close();
    });
  
    /* ---------- Contador de caracteres ---------- */
    message.addEventListener("input", () => {
      charCount.textContent = message.value.length;
    });
  
    /* ---------- Archivos ---------- */
    fileInput.addEventListener("change", () => {
      const errors = [];
  
      Array.from(fileInput.files).forEach((file) => {
        const exists = selectedFiles.some(
          (f) =>
            f.name === file.name &&
            f.size === file.size &&
            f.lastModified === file.lastModified
        );
        if (exists) return;
  
        if (file.size > MAX_FILE_SIZE) {
          errors.push(`"${file.name}" supera los 5 MB.`);
          return;
        }
        if (selectedFiles.length >= MAX_FILES) {
          errors.push(`Máximo ${MAX_FILES} archivos.`);
          return;
        }
        selectedFiles.push(file);
      });
  
      syncInput();
      renderFiles();
  
      if (errors.length) showResult("error", [...new Set(errors)].join(" "));
      else hideResult();
    });
  
    function syncInput() {
      const dt = new DataTransfer();
      selectedFiles.forEach((f) => dt.items.add(f));
      fileInput.files = dt.files;
    }
  
    function formatSize(bytes) {
      if (bytes < 1024 * 1024) return Math.max(1, Math.round(bytes / 1024)) + " KB";
      return (bytes / (1024 * 1024)).toFixed(2) + " MB";
    }
  
    function fileIcon(name) {
      const ext = name.split(".").pop().toLowerCase();
      if (ext === "pdf") return "fa-file-pdf";
      if (["png", "jpg", "jpeg", "webp"].includes(ext)) return "fa-file-image";
      if (["doc", "docx"].includes(ext)) return "fa-file-word";
      if (ext === "zip") return "fa-file-zipper";
      return "fa-file-lines";
    }
  
    function renderFiles() {
      fileInfo.innerHTML = "";
  
      if (selectedFiles.length === 0) {
        const empty = document.createElement("span");
        empty.className = "mailbox-empty";
        empty.textContent = "Ningún archivo seleccionado";
        fileInfo.appendChild(empty);
        return;
      }
  
      selectedFiles.forEach((file, index) => {
        const item = document.createElement("div");
        item.className = "mailbox-file-item";
  
        const iconBox = document.createElement("div");
        iconBox.className = "mailbox-file-icon";
        iconBox.innerHTML = `<i class="fas ${fileIcon(file.name)}"></i>`;
  
        const details = document.createElement("div");
        details.className = "mailbox-file-details";
  
        const name = document.createElement("strong");
        name.textContent = file.name;
        name.title = file.name;
  
        const size = document.createElement("small");
        size.textContent = formatSize(file.size);
  
        const remove = document.createElement("button");
        remove.type = "button";
        remove.className = "mailbox-file-remove";
        remove.innerHTML = '<i class="fas fa-times"></i>';
        remove.setAttribute("aria-label", "Eliminar " + file.name);
        remove.addEventListener("click", () => {
          selectedFiles.splice(index, 1);
          syncInput();
          renderFiles();
        });
  
        details.append(name, size);
        item.append(iconBox, details, remove);
        fileInfo.appendChild(item);
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
    function showToast(text, isError = false) {
      toast.textContent = text;
      toast.classList.toggle("error", isError);
      toast.classList.add("show");
      clearTimeout(toastTimer);
      toastTimer = setTimeout(() => toast.classList.remove("show"), 4500);
    }
  
    /* ---------- Envío (formulario clásico + iframe oculto) ---------- */
    const buttonText = submitBtn.querySelector(".mailbox-button-text");
    const originalText = buttonText.textContent;
    let sending = false;
    let sendTimer;
  
    form.addEventListener("submit", () => {
      hideResult();
      if (replyTo) replyTo.value = emailInput.value;
      syncInput(); // asegura que el input lleva los archivos seleccionados
  
      sending = true;
      submitBtn.disabled = true;
      buttonText.textContent = "Enviando...";
  
      sendTimer = setTimeout(() => {
        if (!sending) return;
        sending = false;
        submitBtn.disabled = false;
        buttonText.textContent = originalText;
        showResult("error", "No se obtuvo confirmación. Inténtalo de nuevo.");
      }, 30000);
    });
  
    frame.addEventListener("load", () => {
      if (!sending) return;
      sending = false;
      clearTimeout(sendTimer);
  
      modal.close();
      form.reset();
      selectedFiles = [];
      syncInput();
      renderFiles();
      charCount.textContent = "0";
      submitBtn.disabled = false;
      buttonText.textContent = originalText;
      showToast("✓ Mensaje enviado correctamente. ¡Gracias!");
    });
  
  });