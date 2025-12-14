document.addEventListener('DOMContentLoaded', () => {
    const principleItems = document.querySelectorAll('#principles li');

    principleItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.color = 'var(--accent-color)';
        });
        item.addEventListener('mouseleave', () => {
            item.style.color = 'var(--text-color)';
        });
    });

    const contactLink = document.querySelector('.contact-link');
    // Replace the dummy email address
    contactLink.addEventListener('click', function(e) {
        e.preventDefault();
        // A simple "puzzle" to reveal the email, fitting the theme
        const user = 'onnilin';
        const domain = 'gmail.com';
        const email = `${user}@${domain}`;
        
        // Show the email in a way that requires a little interaction
        const revealed = this.dataset.revealed;
        if (revealed) {
            window.location.href = `mailto:${email}`;
        } else {
            this.textContent = email;
            this.dataset.revealed = "true";
        }
    });
});
