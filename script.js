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
    })
    .catch(error => console.error('Error loading content:', error));
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