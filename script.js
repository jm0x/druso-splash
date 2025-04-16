// JavaScript code will go here 

document.addEventListener('DOMContentLoaded', () => {
  fetch('content.json')
    .then(response => response.json())
    .then(data => {
      const contentDiv = document.getElementById('content');
      
      // Sort blocks by sticky first, then by id
      const sortedBlocks = data.sort((a, b) => {
        if (a.sticky === b.sticky) {
          return a.id - b.id;
        }
        return b.sticky - a.sticky;
      });

      sortedBlocks.forEach(block => {
        const blockElement = createBlock(block);
        contentDiv.appendChild(blockElement);
      });

      // Add click handlers for all blocks with links
      document.querySelectorAll('[data-link]').forEach(block => {
        block.addEventListener('click', (event) => {
          // Si el bloque tiene un enlace, abrirlo en una nueva ventana
          if (block.dataset.link) {
            window.open(block.dataset.link, '_blank');
          }
        });
      });

      AOS.init(); // Inicializar AOS después de cargar el contenido
    })
    .catch(error => console.error('Error loading content:', error));

  // --- Lógica del Formulario de Contacto Flotante ---
  const contactFab = document.getElementById('contact-fab');
  const formContainer = document.getElementById('contact-form-container');
  const closeFormBtn = document.getElementById('close-form-btn');
  const contactForm = document.getElementById('contactForm');

  if (contactFab && formContainer && closeFormBtn && contactForm) {
    // Mostrar/ocultar formulario al hacer clic en el FAB
    contactFab.addEventListener('click', () => {
      formContainer.classList.toggle('visible');
    });

    // Ocultar formulario al hacer clic en el botón de cierre
    closeFormBtn.addEventListener('click', () => {
      formContainer.classList.remove('visible');
    });

    // Lógica de envío del formulario a Telegram
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Obtener valores del formulario
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const message = document.getElementById('message').value;

      // Formatear el mensaje
      const telegramMessage = `Nuevo mensaje de Contacto:\n\nNombre: ${name}\nEmail: ${email}\nMensaje:\n${message}`;

      // Reemplaza con tus datos
      const botToken = "8152974123:AAHE6-zDaQ1HKkcH1UuED6dvn6nuDn3dQsg"; // TU TOKEN
      const chatId = "12725"; // CORREGIDO CHAT ID FINAL

      // Enviar mensaje a Telegram
      fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: telegramMessage
        })
      })
      .then(response => {
        if (!response.ok) {
          // Intentar obtener más detalles del error si es posible
          return response.json().then(errData => {
            throw new Error(`Error en la respuesta de Telegram: ${response.status} ${response.statusText} - ${JSON.stringify(errData)}`);
          }).catch(() => {
            throw new Error(`Error en la respuesta de Telegram: ${response.status} ${response.statusText}`);
          });
        }
        return response.json();
      })
      .then(data => {
        if (data.ok) {
          alert('¡Mensaje enviado con éxito!');
          contactForm.reset();
          formContainer.classList.remove('visible'); // Ocultar formulario después de enviar
        } else {
          alert('Hubo un problema al enviar el mensaje. Detalles: ' + JSON.stringify(data));
        }
      })
      .catch(error => {
        console.error('Error al enviar el mensaje a Telegram:', error);
        alert('Error al enviar el mensaje. Por favor, inténtalo de nuevo más tarde. Detalles: ' + error.message);
      });
    });
  } else {
    console.error('No se encontraron los elementos del formulario flotante.');
  }
  // -------------------------------------------------
});

function createBlock(block) {
  const blockElement = document.createElement('div');
  
  switch(block.type) {
    case 'texto':
      blockElement.className = 'text-block';
      if (block.link) {
        blockElement.setAttribute('data-link', block.link);
        blockElement.style.cursor = 'pointer';
      }
      const title = document.createElement('h3');
      title.textContent = block.title;
      blockElement.appendChild(title);
      break;
      
    case 'colapsable':
      blockElement.className = 'collapsible-container';
      const header = document.createElement('div');
      header.className = 'collapsible-header';
      
      const headerTitle = document.createElement('h3');
      headerTitle.textContent = block.title;
      
      const toggleIcon = document.createElement('span');
      toggleIcon.className = 'toggle-icon';
      toggleIcon.textContent = '+';
      
      header.appendChild(headerTitle);
      header.appendChild(toggleIcon);
      
      const content = document.createElement('div');
      content.className = 'collapsible-content';
      const contentText = document.createElement('p');
      contentText.textContent = block.content;
      content.appendChild(contentText);
      
      blockElement.appendChild(header);
      blockElement.appendChild(content);
      
      // Hacer que todo el bloque sea clickeable para expandir/colapsar
      blockElement.addEventListener('click', () => {
        blockElement.classList.toggle('active');
      });
      break;
      
    case 'libro':
      blockElement.className = 'libro-container';
      if (block.link) {
        blockElement.setAttribute('data-link', block.link);
        blockElement.style.cursor = 'pointer';
      }
      
      const libroImageContainer = document.createElement('div');
      libroImageContainer.className = 'libro-image-container';
      if (block.backgroundImage) {
        libroImageContainer.style.backgroundImage = `url(assets/${block.backgroundImage})`;
      }
      
      const libroContentContainer = document.createElement('div');
      libroContentContainer.className = 'libro-content-container';
      
      const libroTitle = document.createElement('h3');
      libroTitle.className = 'libro-title';
      libroTitle.textContent = block.title;
      
      const libroContent = document.createElement('p');
      libroContent.className = 'libro-content';
      libroContent.textContent = block.content;
      
      libroContentContainer.appendChild(libroTitle);
      libroContentContainer.appendChild(libroContent);
      
      blockElement.appendChild(libroImageContainer);
      blockElement.appendChild(libroContentContainer);
      break;
      
    case 'podcast':
      blockElement.className = 'podcast-container';
      
      const podcastTitleContainer = document.createElement('div');
      podcastTitleContainer.className = 'podcast-title-container';
      
      if (block.episode) {
        const episodeTag = document.createElement('div');
        episodeTag.className = 'podcast-episode-tag';
        episodeTag.textContent = `Podcast Episodio ${block.episode}`;
        podcastTitleContainer.appendChild(episodeTag);
      }
      
      const podcastTitle = document.createElement('h3');
      podcastTitle.className = 'podcast-title';
      podcastTitle.textContent = block.title;
      
      const podcastContentContainer = document.createElement('div');
      podcastContentContainer.className = 'podcast-content-container';
      
      const podcastContent = document.createElement('p');
      podcastContent.className = 'podcast-content';
      podcastContent.textContent = block.content;
      
      // Crear el reproductor de audio de forma más directa
      const audioElement = document.createElement('audio');
      audioElement.controls = true;
      audioElement.src = block.link;
      audioElement.style.width = '100%';
      audioElement.style.height = '36px';
      audioElement.style.marginTop = '10px';
      audioElement.style.borderRadius = '20px';
      audioElement.style.background = 'rgba(0, 0, 0, 0.3)';
      audioElement.style.outline = 'none';
      audioElement.style.display = 'block';
      
      podcastContentContainer.appendChild(podcastContent);
      podcastContentContainer.appendChild(audioElement);
      
      podcastTitleContainer.appendChild(podcastTitle);
      blockElement.appendChild(podcastTitleContainer);
      blockElement.appendChild(podcastContentContainer);
      break;
  }
  
  return blockElement;
} 