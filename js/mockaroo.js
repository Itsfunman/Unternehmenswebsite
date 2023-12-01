fetch('https://my.api.mockaroo.com/daten.json?key=b968ed40')
.then(response => response.json())
.then(data => {
    const container = document.getElementById('dynamic-employees');
    data.forEach((person) => {
        const employeeBox = document.createElement('div');
        employeeBox.className = 'employee-box panel review slideInLeft delayAnimation';
        
        employeeBox.innerHTML = `
        <h3 class="boxTitleTeam">${person.first_name} ${person.last_name}</h3>
        <p class="text-team-klein">
             ${person.job_title}<br>
            Fachgebiet: ${person.skill1}, ${person.skill2}<br>
            ${person.first_name + "." + person.last_name + "@techsolutions.at"}<br>
            ${person.phone}
        </p>`;
        
        container.appendChild(employeeBox);
    });
})
.catch(error => console.error('Error:', error));