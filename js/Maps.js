var map = L.map('map').setView([48.2318921, 16.4127015], 15);  // Koordinaten

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

L.marker([48.2082, 16.3738]).addTo(map)  // Koordinaten
    .bindPopup('<strong>TechSolutions Vienna GmbH</strong><br>DC Tower 1, Donau-City-Straße 7<br>3. Etage, Tür 5<br>1220 Wien<br>Österreich')
    .openPopup();