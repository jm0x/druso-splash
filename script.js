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

      // Add click handlers for collapsible blocks
      document.querySelectorAll('.collapsible-container').forEach(container => {
        container.addEventListener('click', (event) => {
          // Si el bloque tiene un enlace, no colapsar/expandir
          if (container.dataset.link) {
            window.open(container.dataset.link, '_blank');
            return;
          }
          
          container.classList.toggle('active');
        });
      });
      
      // Add click handlers for all blocks with links
      document.querySelectorAll('[data-link]').forEach(block => {
        block.addEventListener('click', (event) => {
          // Si el bloque es colapsable, no abrir enlace al hacer clic en el encabezado
          if (block.classList.contains('collapsible-container') && 
              event.target.closest('.collapsible-header')) {
            return;
          }
          
          // Si el bloque tiene un enlace, abrirlo en una nueva ventana
          if (block.dataset.link) {
            window.open(block.dataset.link, '_blank');
          }
        });
      });
    })
    .catch(error => console.error('Error loading content:', error));
});

function createBlock(block) {
  const container = document.createElement('div');
  container.className = 'block-container';

  switch (block.type) {
    case 'texto':
      const textBlock = document.createElement('div');
      textBlock.className = 'text-block';
      textBlock.innerHTML = `<h3>${block.title}</h3>`;
      if (block.link) {
        textBlock.dataset.link = block.link;
        textBlock.style.cursor = 'pointer';
      }
      container.appendChild(textBlock);
      break;
    case 'colapsable':
      const collapsibleContainer = document.createElement('div');
      collapsibleContainer.className = 'collapsible-container';
      if (block.link) {
        collapsibleContainer.dataset.link = block.link;
      }
      collapsibleContainer.innerHTML = `
        <div class="collapsible-header">
          <h3>${block.title}</h3>
          <span class="toggle-icon">+</span>
        </div>
        <div class="collapsible-content">
          <p>${block.content}</p>
        </div>
      `;
      container.appendChild(collapsibleContainer);
      break;
    case 'libro':
      const libroContainer = document.createElement('div');
      libroContainer.className = 'libro-container';
      if (block.link) {
        libroContainer.dataset.link = block.link;
        libroContainer.style.cursor = 'pointer';
      }
      
      const imageContainer = document.createElement('div');
      imageContainer.className = 'libro-image-container';
      imageContainer.style.backgroundImage = `url('assets/${block.backgroundImage}')`;
      
      const contentContainer = document.createElement('div');
      contentContainer.className = 'libro-content-container';
      
      const title = document.createElement('h3');
      title.className = 'libro-title';
      title.textContent = block.title;
      
      const content = document.createElement('div');
      content.className = 'libro-content';
      content.innerHTML = `<p>${block.content}</p>`;
      
      contentContainer.appendChild(title);
      contentContainer.appendChild(content);
      libroContainer.appendChild(imageContainer);
      libroContainer.appendChild(contentContainer);
      container.appendChild(libroContainer);
      break;
    case 'podcast':
      const podcastContainer = document.createElement('div');
      podcastContainer.className = 'podcast-container';
      if (block.link) {
        podcastContainer.dataset.link = block.link;
        podcastContainer.style.cursor = 'pointer';
      }
      
      const podcastTitleContainer = document.createElement('div');
      podcastTitleContainer.className = 'podcast-title-container';
      
      const podcastTitle = document.createElement('h3');
      podcastTitle.className = 'podcast-title';
      podcastTitle.textContent = block.title;
      
      const podcastContentContainer = document.createElement('div');
      podcastContentContainer.className = 'podcast-content-container';
      
      const podcastContent = document.createElement('div');
      podcastContent.className = 'podcast-content';
      podcastContent.textContent = block.content;
      
      const podcastPlayer = document.createElement('div');
      podcastPlayer.className = 'podcast-player';
      
      const audio = document.createElement('audio');
      audio.controls = true;
      audio.src = block.link;
      
      podcastTitleContainer.appendChild(podcastTitle);
      podcastPlayer.appendChild(audio);
      podcastContentContainer.appendChild(podcastContent);
      podcastContentContainer.appendChild(podcastPlayer);
      podcastContainer.appendChild(podcastTitleContainer);
      podcastContainer.appendChild(podcastContentContainer);
      container.appendChild(podcastContainer);
      break;
  }

  return container;
} 