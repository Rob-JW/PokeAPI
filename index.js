const axios = require("axios");
const { Client } = require("@notionhq/client");

const notion = new Client({ auth: process.env.NOTION_KEY });

const pakeArray = [];

async function getPokemon() {
  await axios
    .get("https://pokeapi.co/api/v2/pokemon/1")
    .then((poke) => {
      
      const pokeData = {
        
      }
      console.log(name);
    })
    .catch((error) => {
      console.log(error);
    });
}

getPokemon();
