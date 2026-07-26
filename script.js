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
                    <div class="contact-info">
                        ${data.contact.email} &bull; ${data.contact.address}
                    </div>
                </header>
            `;

            // Featured Projects
            if (data.projects && data.projects.length > 0) {
                html += `<section class="fade-in"><h2>Selected Work</h2><div class="projects-grid">`;
                data.projects.forEach(project => {
                    let tagsHtml = project.technologies.map(tech => `<span class="tag">${tech}</span>`).join('');
                    html += `
                        <div class="project-card">
                            <div class="project-title">${project.title}</div>
                            <div class="project-role">${project.role}</div>
                            <p>${project.description}</p>
                            <div class="tags">${tagsHtml}</div>
                        </div>
                    `;
                });
                html += `</div></section>`;
            }

            // Skills
            if (data.skills && data.skills.length > 0) {
                html += `<section class="fade-in"><h2>Core Competencies</h2><div class="projects-grid">`;
                data.skills.forEach(skill => {
                    let itemsHtml = skill.items.map(item => `<li>${item}</li>`).join('');
                    html += `
                        <div class="project-card">
                            <div class="project-title">${skill.category}</div>
                            <ul style="padding-left: 1rem; color: #555;">${itemsHtml}</ul>
                        </div>
                    `;
                });
                html += `</div></section>`;
            }

            // Education & Timeline
            if (data.education_timeline && data.education_timeline.length > 0) {
                html += `<section class="fade-in"><h2>Background & Achievements</h2>`;
                data.education_timeline.forEach(item => {
                    html += `
                        <div class="timeline-item">
                            <div class="timeline-header">
                                <span>${item.title}</span>
                                <span class="timeline-date">${item.date}</span>
                            </div>
                            <div style="color: #555; font-size: 0.95rem;">${item.details}</div>
                        </div>
                    `;
                });
                html += `</section>`;
            }

            content.innerHTML = html;

            // Scroll Animations
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            }, { threshold: 0.1 });

            setTimeout(() => {
                document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
            }, 100);
        })
        .catch(err => console.error('Error loading portfolio data:', err));
});
