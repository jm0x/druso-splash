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
                    const titleDiv = document.createElement('div');
                    titleDiv.classList.add('collapsible-title');
                    titleDiv.textContent = item.title;

                    const contentP = document.createElement('p');
                    contentP.classList.add('collapsible-content');
                    contentP.textContent = item.content;

                    titleDiv.addEventListener('click', () => {
                        const isCollapsed = contentP.style.display === 'none';
                        contentP.style.display = isCollapsed ? 'block' : 'none';
                        titleDiv.classList.toggle('collapsed', !isCollapsed);
                    });

                    contentDiv.appendChild(titleDiv);
                    contentDiv.appendChild(contentP);
                }
            });
        })
        .catch(error => console.error('Error loading content:', error));
}); 