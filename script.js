const btn = document.querySelector('.btn-list');
const clientsLabel = document.querySelector('.clients-label');

btn.addEventListener('click', () => {
    clientsLabel.style.display = 'block'; 
    btn.style.display = 'none';           
});

//Пока добавила только кнопку которая показывает все.
