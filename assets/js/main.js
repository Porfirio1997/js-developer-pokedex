const pokemonList = document.getElementById('pokemonList')

const loadPreviousButton = document.getElementById('loadPreviousButton')
const loadMoreButton = document.getElementById('loadMoreButton')

const PreviousGenerationButton = document.getElementById('PreviousGeneration')
const NextGenerationButton = document.getElementById('NextGeneration')
const mainHeader = document.getElementById('mainHeader')

const limit = 10
let maxRecords = 151
let lowestId = 0 
let offset = 0
let genNumber = 1


function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        </li>
    `
}

function loadPokemonItens(offset, limit, genNumber = 1) {
    mainHeader.innerHTML = `Pokedex  ${genNumber}º geração `
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })

}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNextPage = offset + limit
    pokemonList.innerHTML = "";
    if (qtdRecordsWithNextPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit, genNumber)
        alert("upper limit reached")
    } else {
        loadPokemonItens(offset, limit, genNumber)
    }
})

loadPreviousButton.addEventListener('click', () => {
    if( (offset-limit) >= lowestId) {
        offset -= limit
        pokemonList.innerHTML = "";
        loadPokemonItens(offset, limit, genNumber)
    }
    else 
        alert("lower limit reached")

    
})

NextGenerationButton.addEventListener('click', () => {
    if (genNumber != 9) genNumber++;
    let gen = pokemonGeneration.find((ex) => ex.Generation == genNumber)
    offset = gen.firstInGen
    lowestId = gen.firstInGen

    maxRecords = gen.lastInGen
    loadPokemonItens(offset, limit, genNumber)
    pokemonList.innerHTML = "";
})

PreviousGenerationButton.addEventListener('click', () => {
    if (genNumber > 1) genNumber--;
    let gen = pokemonGeneration.find((ex) => ex.Generation == genNumber)
    offset = gen.firstInGen
    lowestId = gen.firstInGen

    maxRecords = gen.lastInGen
    loadPokemonItens(offset, limit, genNumber)
    pokemonList.innerHTML = "";
})



const pokemonGeneration = [
    {
        firstInGen: 0,
        lastInGen: 151,
        Generation: 1
    }
    ,
    {
        firstInGen: 152,
        lastInGen: 251,
        Generation: 2
    },
    {
        firstInGen: 252,
        lastInGen: 386,
        Generation: 3
    },
    {
        firstInGen: 387,
        lastInGen: 493,
        Generation: 4
    },
    {
        firstInGen: 387,
        lastInGen: 649,
        Generation: 5
    },
    {
        firstInGen: 650,
        lastInGen: 721,
        Generation: 6
    },
    {
        firstInGen: 722,
        lastInGen: 809,
        Generation: 7
    },
    {
        firstInGen: 810,
        lastInGen: 905,
        Generation: 8
    },
    {
        firstInGen: 906,
        lastInGen: 1021,
        Generation: 9
    }
]