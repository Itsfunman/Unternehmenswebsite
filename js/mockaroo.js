fetch('https://my.api.mockaroo.com/wee.json?key=3db0c550')
.then(response => response.json())
.then(data => {
    const container = document.getElementById('dynamic-employees');
    data.forEach((person) => {
        const employeeBox = document.createElement('div');
        employeeBox.className = 'commonStyles panel review slideInLeft delayAnimation';
        
        employeeBox.innerHTML = `
            <h3 class="boxTitleTeam">${person.first_name} ${person.last_name}</h3>
            <p class="text-team">
                Job-Titel: ${person.job_titel}<br>
                Job-Fähigkeiten: ${person.job_skills}<br>
                E-Mail: ${person.email}<br>
                Telefonnummer: ${person.number}
            </p>`;
        
        container.appendChild(employeeBox);
    });
})
.catch(error => console.error('Error:', error));