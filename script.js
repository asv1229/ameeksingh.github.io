document.addEventListener("DOMContentLoaded", () => {
    fetch('./data.json')
        .then(response => response.json())
        .then(data => {
            const content = document.getElementById('portfolio-content');
            let html = '';

            // Header
            html += `
                <header class="fade-in">
                    <h1>${data.name}</h1>
                    <p>${data.contact.email} &bull; ${data.contact.address}</p>
                </header>
            `;

            // Sections matching resume layout
            const sections = [
                { key: 'education', title: 'Education' },
                { key: 'volunteer_experience', title: 'Volunteer Experience' },
                { key: 'skills_and_abilities', title: 'Skills and Abilities' },
                { key: 'achievements', title: 'Achievements' },
                { key: 'extra_curricular', title: 'Extra-Curricular' }
            ];

            sections.forEach(sec => {
                if (data[sec.key] && data[sec.key].length > 0) {
                    html += `<section class="fade-in"><h2>${sec.title}</h2><p class="section-paragraph">`;
                    
                    // Conditionally include dates only if they exist to prevent empty parentheses
                    let combinedText = data[sec.key].map(item => {
                        const dateText = item.date ? ` (${item.date})` : '';
                        return `<strong>${item.title}</strong>${dateText}: ${item.description}`;
                    }).join(' ');

                    html += combinedText;
                    html += `</p></section>`;
                }
            });

            content.innerHTML = html;

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            }, { threshold: 0.1 });

            document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
        })
        .catch(error => console.error('Error loading resume data:', error));
});
