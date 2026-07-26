document.addEventListener("DOMContentLoaded", () => {
    fetch('./data.json')
        .then(response => response.json())
        .then(data => {
            const content = document.getElementById('portfolio-content');
            let html = '';

            // Build Header (Fixes the undefined phone error)
            html += `
                <header class="fade-in">
                    <h1>${data.name}</h1>
                    <p>${data.contact.email}</p>
                    <p>${data.contact.address}</p>
                </header>
            `;

            // Build Projects Section
            if (data.projects && data.projects.length > 0) {
                html += `<section class="fade-in"><h2>Selected Work</h2>`;
                data.projects.forEach(project => {
                    html += `
                        <div class="item">
                            <div class="item-header">
                                <span>${project.title} - ${project.role}</span>
                            </div>
                            <p>${project.description}</p>
                            <p style="font-size: 0.85rem; color: #666;"><strong>Tech:</strong> ${project.technologies.join(', ')}</p>
                        </div>
                    `;
                });
                html += `</section>`;
            }

            // Build Skills Section (Fixes the undefined array error)
            if (data.skills && data.skills.length > 0) {
                html += `<section class="fade-in"><h2>Skills</h2>`;
                data.skills.forEach(skill => {
                    html += `
                        <div class="item">
                            <div class="item-header">
                                <span>${skill.category}</span>
                            </div>
                            <ul>
                                ${skill.items.map(item => `<li>${item}</li>`).join('')}
                            </ul>
                        </div>
                    `;
                });
                html += `</section>`;
            }

            // Build Education Timeline
            if (data.education_timeline && data.education_timeline.length > 0) {
                html += `<section class="fade-in"><h2>Background & Achievements</h2>`;
                data.education_timeline.forEach(item => {
                    html += `
                        <div class="item">
                            <div class="item-header">
                                <span>${item.title}</span>
                                <span class="date">${item.date}</span>
                            </div>
                            <p>${item.details}</p>
                        </div>
                    `;
                });
                html += `</section>`;
            }

            content.innerHTML = html;

            // Trigger Animations on Scroll
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
