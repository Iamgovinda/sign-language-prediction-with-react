export const saveImageToPublic = (dataUrl, label) => {
  const base64Data = dataUrl.replace(/^data:image\/png;base64,/, "");

  fetch("http://localhost:5000/api/save-image", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ image: base64Data, label }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Image saved successfully:", data);
    })
    .catch((error) => {
      console.error("Error saving image:", error);
    });
};
