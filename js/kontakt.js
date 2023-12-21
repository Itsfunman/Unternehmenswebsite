document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();
    var form = this;
    fetch(form.action, {
        method: form.method,
        body: new FormData(form),
        headers: {
            'Accept': 'application/json'
        },
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        form.reset(); // Formular zurücksetzen
        alert('Formular erfolgreich gesendet!'); // Erfolgsmeldung anzeigen
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Fehler beim Senden des Formulars'); // Fehlermeldung anzeigen
    });
});