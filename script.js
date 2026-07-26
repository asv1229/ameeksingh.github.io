document.addEventListener("DOMContentLoaded", () => {
    fetch('./data.json')
        .then(response => response.json())
        .then(data => {
            const content = document.getElementById('portfolio-content');
            let html = '';

            // Header Section
            html += `
                <header class="fade-in">
                    <h1>${data.name}</h1>
                    <div class="contact-line">${data.contact.email} &bull; ${data.contact.address}</div>
                </header>
            `;

            // Core Resume Sections Mapping
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
                    
                    let combinedText = data[sec.key].map(item => {
                        const dateText = item.date ? ` (${item.date})` : '';
                        return `<strong>${item.title}</strong>${dateText} — ${item.description}`;
                    }).join(' ');

                    html += combinedText;
                    html += `</p></section>`;
                }
            });

            content.innerHTML = html;

            // High-performance Intersection Observer for buttery scroll reveals
            const observerOptions = {
                threshold: 0.15,
                rootMargin: "0px 0px -50px 0px"
            };

            const observer = new IntersectionObserver((entries, observerInstance) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        observerInstance.unobserve(entry.target);
                    }
                });
            }, observerOptions);

            document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
        })
        .catch(error => console.error('Error loading portfolio data:', error));
});
