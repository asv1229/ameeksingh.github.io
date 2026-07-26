document.addEventListener("DOMContentLoaded", () => {
    fetch('./data.json')
        .then(response => response.json())
        .then(data => {
            const content = document.getElementById('portfolio-content');
            let html = '';

            // Build Header
            html += `
                <header class="fade-in">
                    <h1>${data.name}</h1>
                    <p>${data.contact.email} | ${data.contact.phone}</p>
                    <p>${data.contact.address}</p>
                </header>
            `;

            // Build Sections Dynamically
            const sections = ['Education', 'Volunteer', 'Skills', 'Achievements', 'Extracurricular', 'Hobbies'];
            
            sections.forEach(sec => {
                const key = sec.toLowerCase();
                if (data[key] && data[key].length > 0) {
                    html += `<section class="fade-in"><h2>${sec}</h2>`;
                    data[key].forEach(item => {
                        html += `
                            <div class="item">
                                <div class="item-header">
                                    <span>${item.title}</span>
                                    ${item.date ? `<span class="date">${item.date}</span>` : ''}
                                </div>
                                ${item.description ? `<p>${item.description}</p>` : ''}
                            </div>
                        `;
                    });
                    html += `</section>`;
                }
            });

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
