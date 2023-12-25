// JavaScript para recoger datos del formulario
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('form');
  
    form.addEventListener('submit', function (event) {
      event.preventDefault();
  
      // Recoger datos del formulario
      const formData = new FormData(form);
      const formDataObject = {};
      formData.forEach((value, key) => {
        formDataObject[key] = value;
      });
  
      // Llamar a la función para enviar datos a Google Apps Script
      sendDataToGoogleAppsScript(formDataObject);
    });
  });
  
  // Función para enviar datos a Google Apps Script
  function sendDataToGoogleAppsScript(formData) {
    fetch('https://script.google.com/macros/s/AKfycbwPlqjHK2l4eTKKaJVpv7HBKm_XovbAom91lJenXNrCIRsXHUMzd84xrRkxzRJ-K7oVvw/exec', {
      method: 'POST',
      mode: 'no-cors', // Cambia a 'cors' si tu script permite CORS
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then(response => {
        console.log('Datos enviados con éxito a Google Apps Script:', response);
        // Puedes hacer algo con la respuesta si es necesario
      })
      .catch(error => {
        console.error('Error al enviar datos a Google Apps Script:', error);
      });
  }
  