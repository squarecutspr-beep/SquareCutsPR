document.addEventListener('DOMContentLoaded', () => {
  const modalTriggers = document.querySelectorAll('[data-modal-target]');
  const modalCloses = document.querySelectorAll('[data-modal-close]');

  modalTriggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const modal = document.querySelector(trigger.dataset.modalTarget);
      if (modal) openModal(modal);
    });
  });

  modalCloses.forEach(button => {
    button.addEventListener('click', () => {
      const modal = button.closest('.modal');
      if (modal) closeModal(modal);
    });
  });

  document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', (event) => {
      if (event.target === modal) closeModal(modal);
    });
  });

  function openModal(modal) {
    modal.classList.add('is-active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal(modal) {
    modal.classList.remove('is-active');
    document.body.style.overflow = '';
  }

  // Botón compartir
  const shareButton = document.getElementById('shareButton');
  if (shareButton) {
    shareButton.addEventListener('click', async () => {
      const shareData = {
        title: 'Square Cuts Studio',
        text: 'Barbería Familiar de confianza',
        url: window.location.href,
      };

      try {
        if (navigator.share) {
          await navigator.share(shareData);
        } else {
          await navigator.clipboard.writeText(window.location.href);
          showFeedback('¡Enlace copiado!');
        }
      } catch (error) {
        console.error('Error al compartir:', error);
        showFeedback('Error al compartir', true);
      }
    });
  }

  function showFeedback(message, isError = false) {
    const originalText = shareButton.innerHTML;
    shareButton.innerHTML = message;
    shareButton.style.color = isError ? '#ff6b6b' : '#4caf50';
    setTimeout(() => {
      shareButton.innerHTML = originalText;
      shareButton.style.color = '';
    }, 2000);
  }
});