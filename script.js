// JavaScript code will go here 

document.addEventListener('DOMContentLoaded', () => {
    fetch('content.json')
        .then(response => response.json())
        .then(data => {
            const contentDiv = document.getElementById('content');
            data.forEach(item => {
                if (item.type === 'texto') {
                    const p = document.createElement('p');
                    p.textContent = item.content;
                    p.classList.add('text-block');
                    contentDiv.appendChild(p);
                } else if (item.type === 'colapsable') {
                    const container = document.createElement('div');
                    container.classList.add('collapsible-container');

                    const titleDiv = document.createElement('div');
                    titleDiv.classList.add('collapsible-title');
                    titleDiv.textContent = item.title;

                    const contentP = document.createElement('p');
                    contentP.classList.add('collapsible-content');
                    contentP.textContent = item.content;
                    contentP.style.display = 'none'; // Aseguramos que esté oculto inicialmente

                    titleDiv.addEventListener('click', () => {
                        // Comprobamos si el contenido está oculto o visible
                        if (contentP.style.display === 'none' || contentP.style.display === '') {
                            contentP.style.display = 'block';
                        } else {
                            contentP.style.display = 'none';
                        }
                    });

                    container.appendChild(titleDiv);
                    container.appendChild(contentP);
                    contentDiv.appendChild(container);
                } else if (item.type === 'libro') {
                    console.log('Creando bloque de tipo libro:', item);
                    
                    // Crear un nuevo bloque de tipo libro
                    const libroContainer = document.createElement('div');
                    libroContainer.classList.add('libro-container');
                    
                    // Aplicar la imagen de fondo si se proporciona
                    if (item.backgroundImage) {
                        const imagePath = `assets/${item.backgroundImage}`;
                        libroContainer.style.backgroundImage = `url('${imagePath}')`;
                    }
                    
                    // Crear el título del libro
                    const libroTitle = document.createElement('div');
                    libroTitle.classList.add('libro-title');
                    libroTitle.textContent = item.title;
                    
                    // Crear el contenido principal del libro
                    const libroContent = document.createElement('div');
                    libroContent.classList.add('libro-content');
                    libroContent.textContent = item.content;
                    
                    // Añadir los elementos al contenedor
                    libroContainer.appendChild(libroTitle);
                    libroContainer.appendChild(libroContent);
                    
                    // Añadir el contenedor al contenido principal
                    contentDiv.appendChild(libroContainer);
                }
            });
        })
        .catch(error => console.error('Error loading content:', error));
}); 

function createBlock(block) {
  const container = document.createElement('div');
  container.className = 'block-container';

  switch (block.type) {
    case 'texto':
      container.innerHTML = `<p>${block.content}</p>`;
      break;
    case 'colapsable':
      container.innerHTML = `
        <div class="collapsible-container">
          <div class="collapsible-header">
            <h3>${block.title}</h3>
            <span class="toggle-icon">+</span>
          </div>
          <div class="collapsible-content">
            <p>${block.content}</p>
          </div>
        </div>
      `;
      break;
    case 'libro':
      const libroContainer = document.createElement('div');
      libroContainer.className = 'libro-container';
      libroContainer.style.backgroundImage = `url('assets/${block.backgroundImage}')`;
      
      const title = document.createElement('h2');
      title.className = 'libro-title';
      title.textContent = block.title;
      
      const content = document.createElement('div');
      content.className = 'libro-content';
      content.innerHTML = `<p>${block.content}</p>`;
      
      libroContainer.appendChild(title);
      libroContainer.appendChild(content);
      container.appendChild(libroContainer);
      break;
  }

  return container;
} 