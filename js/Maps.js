var map = L.map('map').setView([48.2318921, 16.4127015], 15);  // Koordinaten

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

L.marker([48.2318921, 16.4127015]).addTo(map)  // Koordinaten
    .bindPopup('<strong>TechSolutions Vienna GmbH</strong><br>DC Tower 1<br>30. Stock<br>1220 Wien<br>Österreich')
    .openPopup();