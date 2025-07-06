// Modal references
const modals = {
    contactModal: document.getElementById('contactModal'),
    signupModal: document.getElementById('signupModal'),
    feedbackModal: document.getElementById('feedbackModal')
};

// Open buttons
const contactBtn = document.getElementById('contactModalBtn');
const signupBtn = document.getElementById('signupModalBtn');
const feedbackBtn = document.getElementById('feedbackModalBtn');

// Close and cancel buttons
const closeBtns = document.querySelectorAll('.close-btn');
const cancelBtns = document.querySelectorAll('.modal-btn.secondary');

// Open modal function
function openModal(modalId) {
    // Close all modals
    for (const key in modals) {
        if (modals[key]) {
            modals[key].classList.remove('active');
        }
    }

    const modalToOpen = modals[modalId];
    if (modalToOpen) {
        modalToOpen.classList.add('active');
        document.body.style.overflow = 'hidden';
    } else {
        console.error(`Modal with ID "${modalId}" not found.`);
    }
}

// Close modal function
function closeModal(modal) {
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

// Event listeners
if (contactBtn) {
    contactBtn.addEventListener('click', (e) => {
        e.preventDefault(); // prevent anchor jump
        openModal('contactModal');
    });
}
if (signupBtn) {
    signupBtn.addEventListener('click', (e) => {
        e.preventDefault();
        openModal('signupModal');
    });
}
if (feedbackBtn) {
    feedbackBtn.addEventListener('click', (e) => {
        e.preventDefault();
        openModal('feedbackModal');
    });
}

// Close via X or cancel
closeBtns.forEach(btn => {
    btn.addEventListener('click', function () {
        closeModal(this.closest('.modal'));
    });
});
cancelBtns.forEach(btn => {
    btn.addEventListener('click', function () {
        closeModal(this.closest('.modal'));
    });
});

// Close on outside click
window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        closeModal(e.target);
    }
});

// Escape key to close modal
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        for (const key in modals) {
            if (modals[key]?.classList.contains('active')) {
                closeModal(modals[key]);
            }
        }
    }
});
