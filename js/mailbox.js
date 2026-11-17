const fileInfo = document.getElementById("mailboxFileInfo");

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const MAX_TOTAL_SIZE = 10 * 1024 * 1024;

const ALLOWED_EXTENSIONS = [
  "pdf", "png", "jpg", "jpeg",
  "webp", "doc", "docx", "txt", "zip"
];

fileInput.addEventListener("change", () => {

  const files = Array.from(fileInput.files);

  if (files.length === 0) {
    fileInfo.textContent = "Ningún archivo seleccionado";
    return;
  }

  const totalSize = files.reduce(
    (total, file) => total + file.size, 0
  );

  const invalidFile = files.find(file => {
    const extension = file.name.split(".").pop().toLowerCase();

    return !ALLOWED_EXTENSIONS.includes(extension) ||
           file.size > MAX_FILE_SIZE;
  });

  if (invalidFile || totalSize > MAX_TOTAL_SIZE) {

    alert(
      invalidFile
        ? "Archivo no permitido o superior a 5 MB."
        : "El conjunto de archivos supera los 10 MB."
    );

    fileInput.value = "";
    fileInfo.textContent = "Ningún archivo seleccionado";
    return;
  }

  fileInfo.textContent = files
    .map(file => `${file.name} (${(file.size / 1024 / 1024).toFixed(2)} MB)`)
    .join(" · ");

});