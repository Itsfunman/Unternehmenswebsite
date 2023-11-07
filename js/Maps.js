var map = L.map('map').setView([28.2082, 16.3738], 15);  // Koordinaten

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

L.marker([48.2082, 16.3738]).addTo(map)  // Koordinaten
    .bindPopup('<strong>DASMÜSSENWIRNOCHÄNDERN GmbH</strong><br>Stephansplatz 1<br>3. Stock, Tür 5<br>1010 Wien<br>Österreich')
    .openPopup();