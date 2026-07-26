document.addEventListener("DOMContentLoaded", () => {
    fetch('./data.json')
        .then(response => response.json())
        .then(data => {
            const content = document.getElementById('portfolio-content');
            let html = '';

            // Hero Section with your photo and details
            html += `
                <div class="hero-container fade-in">
                    <div class="profile-photo">
                        <img src="./1774982788567.png" alt="${data.name}">
                    </div>
                    <div>
                        <h1>${data.name}</h1>
                        <div class="contact-line">${data.contact.email} &bull; ${data.contact.address}</div>
                    </div>
                </div>
            `;

            // Core Resume Sections Mapping
            const sections = [
                { key: 'education', title: 'Education', icon: 'graduation-cap' },
                { key: 'volunteer_experience', title: 'Volunteer Experience', icon: 'heart-handshake' },
                { key: 'skills_and_abilities', title: 'Skills and Abilities', icon: 'cpu' },
                { key: 'achievements', title: 'Achievements', icon: 'trophy' },
                { key: 'extra_curricular', title: 'Extra-Curricular', icon: 'compass' }
            ];

            sections.forEach(sec => {
                if (data[sec.key] && data[sec.key].length > 0) {
                    html += `
                        <section class="fade-in">
                            <div class="section-header">
                                <i data-lucide="${sec.icon}"></i>
                                <h2>${sec.title}</h2>
                            </div>
                            <p class="section-paragraph">
                    `;
                    
                    let combinedText = data[sec.key].map(item => {
                        const dateText = item.date ? ` (${item.date})` : '';
                        return `<strong>${item.title}</strong>${dateText}, ${item.description}`;
                    }).join(' ');

                    html += combinedText;
                    html += `</p></section>`;
                }
            });

            content.innerHTML = html;

            // Render Lucide Vector Icons
            lucide.createIcons();

            // High-performance Intersection Observer for smooth scroll reveals
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
