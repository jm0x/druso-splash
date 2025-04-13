// JavaScript code will go here 

document.addEventListener('DOMContentLoaded', () => {
    fetch('content.json')
        .then(response => response.json())
        .then(data => {
            const contentDiv = document.getElementById('content');
            data.forEach(item => {
                if (item.type === 'text') {
                    const p = document.createElement('p');
                    p.textContent = item.content;
                    p.classList.add('text-block');
                    contentDiv.appendChild(p);
                } else if (item.type === 'collapsible') {
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
                }
            });
        })
        .catch(error => console.error('Error loading content:', error));
}); 