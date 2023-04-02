const axios = require("axios");
const { Client } = require("@notionhq/client");

const notion = new Client({ auth: process.env.NOTION_KEY });

const pakeArray = [];

async function getPokemon() {
  await axios
    .get("https://pokeapi.co/api/v2/pokemon/1")
    .then((poke) => {
      
      const pokeData = {
        "name": poke.data.name, 
        "number": poke.data.id,
        "hp": poke.data.stat.[0].base_stat,
        "height": poke.data.height,
        "weight": poke.data.weight,
        "attack": poke.data.attack,
        "defense": poke.data.defense,
        "special-attack": ,
        "special-defense": ,
        "speed": ,
      }
      console.log(name);
    })
    .catch((error) => {
      console.log(error);
    });
}

getPokemon();
