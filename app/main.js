const $divCards = document.querySelector('.grid');
const $btns = document.querySelectorAll('.btn');
const $scrollToTopBtn = document.getElementById('scrollToTopBtn');
const url = 'https://hp-api.onrender.com/api/characters';
 
function showData(data) {
    $divCards.innerHTML = '';
    data.forEach(character => {
        let person = character.name.replace(' ', '+');
        let actor = 'Actor';
        let status = character.alive ? 'Vivo' : 'Muerto💀';

        if (character.gender === 'female') {
            actor = 'Actris';
        } 

        if(!character.actor) {
            actor = 'Googlealo..';
        }
        if(character.house) {
            $divCards.innerHTML += `
            <a href="https://www.google.com/search?q=${person}&oq=harr&gs_lcrp=EgZjaHJvbWUqDwgAEEUYOxiDARixAxiABDIPCAAQRRg7GIMBGLEDGIAEMgYIARBFGDkyCggCEAAYsQMYgAQyDQgDEAAYgwEYsQMYgAQyCggEEAAYsQMYgAQyBggFEEUYPDIGCAYQRRg9MgYIBxBFGD0yBggIEEUYQdIBCDEzNDFqMGo0qAIAsAIB&sourceid=chrome&ie=UTF-8" 
            target="_blank" class="card ${character.house.toLowerCase() }">
                <div>
                    <h4>${character.name}</h4>
                    <img src="${character.image ? character.image : '../assets/middle.png'}" 
                        class="${character.image ? 'imgCards' : 'imgDefaults'}" 
                        alt="imagen de ${character.name}">
                    <p class="character-house"><span>${character.house}</span></p>
                    <p class="character-house"><span>${actor}:</span> ${character.actor}</p>
                    <p class="character-house"><span>Especie:</span> ${character.species}</p>
                    <p class="character-house"><span>Estado:</span> ${status}</p>
                    
                </div>
            </a>
            `;
        }
    }); 
};

function filterCharacters(searchText, data) {
    const filteredCharacters = data.filter(character => {
        return character.name.toLowerCase().includes(searchText);
    });

    showData(filteredCharacters);
}

fetch(url)
    .then(response => response.json())
    .then(database => showData(database))
    .catch(error => console.error('Error fetching data:', error));

$btns.forEach($btn => {
    $btn.addEventListener('click', (e) => {
        const btnHouse = e.currentTarget.id.toLowerCase();
        $divCards.innerHTML = '';
        fetch(url)
        .then(response => response.json())
        .then(database => {
            if (btnHouse === 'all') {
                showData(database);
            } else {
               const filteredData = database.filter(data => data.house.toLowerCase() === btnHouse);
            showData(filteredData);
            }       
            
        });
    });
});

$scrollToTopBtn.addEventListener('click', scrollToTop);

function scrollFunction() {
  const scrollToTopBtn = document.getElementById("scrollToTopBtn");
  if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
    scrollToTopBtn.classList.add("show");
  } else {
    scrollToTopBtn.classList.remove("show");
  }
}

onscroll = () => scrollFunction();

function scrollToTop() {
  scrollTo({top: 0, behavior: 'smooth'});
}

const $input = document.getElementById("buscador");
const $searchBtn = document.getElementById("searchBtn");

$input.addEventListener("focus", function() {
    $searchBtn.classList.remove("hidden"); 
});

document.getElementById("searchForm").addEventListener("submit", function(event) {
    event.preventDefault(); 

    $searchBtn.classList.add("hidden");
});

const $searchForm = document.getElementById('searchForm');
const $searchInput = document.getElementById('buscador');

$searchForm.addEventListener('submit', function(event) {
    event.preventDefault(); 
    const searchText = $searchInput.value.trim().toLowerCase();
    
    fetch(url)
        .then(response => response.json())
        .then(database => {
            filterCharacters(searchText, database);
        })
        .catch(error => console.error('Error fetching data:', error));
});