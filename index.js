const axios = require("axios");
const { Client } = require("@notionhq/client")

const notion = new Client({ auth: process.env.NOTION_KEY })

const pokeArray = []

async function getPokemon() {
  
  for  (let i = 3; i <= 10; i ++) {
    await axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`)
      .then((poke) => {
      
      const typesArray = []
      
      for (let type of poke.data.types) {
        const typeObj = {
          "name": type.type.name
        }
        typesArray.push(typeObj)
      }          
      
      const processedName = poke.data.species.name.split(/_/).map((name) => {
        
      })
      
      const sprite = (!poke.data.sprotes.front_default) ? poke.data.sprites.other['official-artwork'].front_default : poke.data.sprotes.front_default
      
      const bulbURL = `https://bulbapedia.bulbagarden.net/wiki/${processedName}_(Pokémon)`

      const pokeData = {
        "name": processedName,
        "number": poke.data.id,
        "types": typesArray,
        "hp": poke.data.stats[0].base_stat,
        "height": poke.data.height,
        "weight": poke.data.weight,
        "attack": poke.data.stats[1].base_stat,
        "defense": poke.data.stats[2].base_stat,
        "special-attack": poke.data.stats[3].base_stat,
        "special-defense": poke.data.stats[4].base_stat,
        "speed": poke.data.stats[5].base_stat,
        "sprite": sprite,
        "artwork": poke.data.sprites.other['official-artwork'].front_default,
        "bulbURL": bulbURL,
      }
      
      console.log(`Fetching ${pokeData.name} from PokeAPI.`)
    
      pokeArray.push(pokeData)
    })
    .catch((error) => {
      console.log(error)
    })
  }

  createNotionPage()
}

getPokemon();

async function createNotionPage() {
  for (let pokemon of pokeArray) {
    
    console.log("Sending Data to Notion")
    const response = await notion.pages.create({
      "parent": {
        "type": "database_id",
        "database_id": process.env.NOTION_DATABASE_ID,
      },
      "properties": {
        "Name": {
          "title": [
            {
              "type": "text",
              "text": {
                "content": pokemon.name
              }
            }
          ]
        },
        "No": {
          "number": pokemon.number,
        },
        "HP": { "number": pokemon.hp },
        "Attack": { "number": pokemon.attack },
        "Defense": { "number": pokemon.defense },
        "Sp. Attack": { "number": pokemon['special-attack'] },
        "Sp. Defense": { "number": pokemon['special-defense'] },
        "Speed": { "number": pokemon.speed },
        "Height": { "number": pokemon.height },
        "Weight": { "number": pokemon.weight },
      }
    })
    console.log(response)
  }
}
