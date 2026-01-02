// ===== Referências aos elementos do DOM =====

// Container onde os cards dos Pokémon serão renderizados
const poke_container = document.getElementById('poke-container')

// Input de busca (nome ou ID)
const search_input = document.getElementById('search-input')

// Botão "carregar mais"
const load_more_btn = document.getElementById('load-more-btn')

// Indicador de carregamento
const loading = document.getElementById('loading')

// Modal de detalhes do Pokémon
const modal = document.getElementById('pokemon-modal')
const modal_body = document.getElementById('modal-body')

// Botão de fechar o modal
const close_btn = document.querySelector('.close')


// ===== Estados da aplicação =====

// Quantidade atual de Pokémon carregados
let current_count = 20

// Guarda todos os Pokémon já carregados da API
let all_pokemon = []

// Guarda os Pokémon filtrados (busca ou tipo)
let filtered_pokemon = []

// Filtro atual por tipo
let current_filter = 'all'


// ===== Mapa de cores por tipo =====

// Cada tipo de Pokémon tem uma cor de fundo
const colors = {
    fire: '#FDDFDF',
    grass: '#DEFDE0',
    electric: '#FCF7DE',
    water: '#DEF3FD',
    ground: '#f4e7da',
    rock: '#d5d5d4',
    fairy: '#fceaff',
    poison: '#98d7a5',
    bug: '#f8d5a3',
    dragon: '#97b3e6',
    psychic: '#eaeda1',
    flying: '#F5F5F5',
    fighting: '#E6E0D4',
    normal: '#F5F5F5',
    ghost: '#8a8a9e',
    ice: '#c7f0ff'
}

// Lista com todos os tipos principais (keys do objeto colors)
const main_types = Object.keys(colors)


// ===== Função principal de carregamento =====

// Busca vários Pokémon de uma vez, até o limite informado
const fetchPokemons = async (limit) => {
    // Mostra o loading
    loading.style.display = 'block'

    const promises = []

    // Começa do próximo Pokémon que ainda não foi carregado
    for (let i = all_pokemon.length + 1; i <= limit; i++) {
        promises.push(getPokemon(i))
    }

    // Aguarda todas as requisições terminarem
    await Promise.all(promises)

    // Esconde o loading
    loading.style.display = 'none'

    // Renderiza os Pokémon na tela
    renderPokemons()
}


// ===== Busca de um Pokémon específico =====

// Faz fetch de um Pokémon pelo ID
const getPokemon = async (id) => {
    try {
        const url = `https://pokeapi.co/api/v2/pokemon/${id}`
        const res = await fetch(url)
        const data = await res.json()

        // Salva o Pokémon no array global
        all_pokemon.push(data)
    } catch (error) {
        console.error(`Erro ao carregar Pokémon ${id}:`, error)
    }
}


// ===== Renderização =====

// Decide quais Pokémon mostrar e renderiza os cards
const renderPokemons = () => {
    // Limpa o container antes de renderizar de novo
    poke_container.innerHTML = ''

    // Se houver filtro, usa ele. Senão, mostra todos
    const pokemon_to_show = filtered_pokemon.length > 0
        ? filtered_pokemon
        : all_pokemon

    // Cria um card para cada Pokémon
    pokemon_to_show.forEach(pokemon => {
        createPokemonCard(pokemon)
    })
}


// ===== Criação do card =====

// Cria o HTML de um Pokémon individual
const createPokemonCard = (pokemon) => {
    const pokemonEl = document.createElement('div')
    pokemonEl.classList.add('pokemon')

    // Nome formatado
    const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1)

    // ID com zero à esquerda (001, 025, etc)
    const id = pokemon.id.toString().padStart(3, '0')

    // Tipos do Pokémon
    const poke_types = pokemon.types.map(type => type.type.name)

    // Tipo principal (primeiro que bater com a lista)
    const type = main_types.find(type => poke_types.includes(type))

    // Cor de fundo baseada no tipo
    const color = colors[type] || '#F5F5F5'
    pokemonEl.style.backgroundColor = color

    // Badges de todos os tipos
    const all_types = poke_types.map(type =>
        `<span class="type-badge" style="background-color: ${colors[type] || '#777'}">${type}</span>`
    ).join('')

    // Estrutura do card
    pokemonEl.innerHTML = `
        <div class="img-container">
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png" alt="${name}">
        </div>
        <div class="info">
            <span class="number">#${id}</span>
            <h3 class="name">${name}</h3>
            <div class="types">${all_types}</div>
        </div>
    `

    // Abre o modal ao clicar no card
    pokemonEl.addEventListener('click', () => openModal(pokemon))

    // Adiciona o card ao container
    poke_container.appendChild(pokemonEl)
}


// ===== Modal =====

// Abre o modal com detalhes completos do Pokémon
const openModal = async (pokemon) => {
    const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1)
    const id = pokemon.id.toString().padStart(3, '0')

    const poke_types = pokemon.types.map(type => type.type.name)
    const type = main_types.find(type => poke_types.includes(type))
    const color = colors[type] || '#F5F5F5'

    // Badges de tipo
    const all_types = poke_types.map(type =>
        `<span class="type-badge" style="background-color: ${colors[type] || '#777'}">${type}</span>`
    ).join('')

    // Estatísticas com barra proporcional
    const stats = pokemon.stats.map(stat => `
        <div class="stat-row">
            <span class="stat-name">${stat.stat.name}:</span>
            <div class="stat-bar-container">
                <div class="stat-bar" style="width: ${(stat.base_stat / 200) * 100}%"></div>
            </div>
            <span class="stat-value">${stat.base_stat}</span>
        </div>
    `).join('')

    // Lista de habilidades
    const abilities = pokemon.abilities.map(ability =>
        `<span class="ability-badge">${ability.ability.name}</span>`
    ).join('')

    // Conteúdo do modal
    modal_body.innerHTML = `
        <div class="modal-header" style="background-color: ${color}">
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png" alt="${name}">
            <div class="modal-header-info">
                <h2>${name} <span class="number">#${id}</span></h2>
                <div class="types">${all_types}</div>
            </div>
        </div>
        <div class="modal-details">
            <div class="detail-section">
                <h3>Informações</h3>
                <p><strong>Altura:</strong> ${pokemon.height / 10} m</p>
                <p><strong>Peso:</strong> ${pokemon.weight / 10} kg</p>
                <p><strong>Experiência Base:</strong> ${pokemon.base_experience}</p>
            </div>
            <div class="detail-section">
                <h3>Habilidades</h3>
                <div class="abilities">${abilities}</div>
            </div>
            <div class="detail-section">
                <h3>Estatísticas</h3>
                <div class="stats">${stats}</div>
            </div>
        </div>
    `

    // Exibe o modal
    modal.style.display = 'block'
}


// ===== Fechamento do modal =====

// Fecha ao clicar no X
close_btn.addEventListener('click', () => {
    modal.style.display = 'none'
})

// Fecha ao clicar fora do conteúdo
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none'
    }
})


// ===== Busca por nome ou ID =====

search_input.addEventListener('input', (e) => {
    const search_term = e.target.value.toLowerCase()

    // Se não houver busca, mantém apenas o filtro de tipo
    if (search_term === '') {
        filtered_pokemon = current_filter === 'all'
            ? []
            : all_pokemon.filter(p =>
                p.types.some(t => t.type.name === current_filter)
            )
    } else {
        // Base da busca depende do filtro atual
        const base_pokemon = current_filter === 'all'
            ? all_pokemon
            : all_pokemon.filter(p =>
                p.types.some(t => t.type.name === current_filter)
            )

        // Filtra por nome ou ID
        filtered_pokemon = base_pokemon.filter(pokemon =>
            pokemon.name.toLowerCase().includes(search_term) ||
            pokemon.id.toString().includes(search_term)
        )
    }

    renderPokemons()
})


// ===== Filtro por tipo =====

const filter_buttons = document.querySelectorAll('.filter-btn')

filter_buttons.forEach(btn => {
    btn.addEventListener('click', () => {
        // Atualiza o botão ativo
        filter_buttons.forEach(b => b.classList.remove('active'))
        btn.classList.add('active')

        const type = btn.dataset.type
        current_filter = type

        // Limpa o campo de busca
        search_input.value = ''

        // Aplica o filtro
        if (type === 'all') {
            filtered_pokemon = []
        } else {
            filtered_pokemon = all_pokemon.filter(pokemon =>
                pokemon.types.some(t => t.type.name === type)
            )
        }

        renderPokemons()
    })
})


// ===== Carregar mais Pokémon =====

load_more_btn.addEventListener('click', () => {
    current_count += 20

    // Limite máximo da PokeAPI
    if (current_count > 898) current_count = 898

    fetchPokemons(current_count)
})


// ===== Inicialização =====

// Primeira carga de Pokémon
fetchPokemons(current_count)
