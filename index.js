const axios = require('axios')
const { Client } = require('@notionhq/client')

const notion = new Client ({auth: process.env.NOTION_KEY})

const pakeArray = []

async function getPokemaon() {
  await axios.get('https://pokeapi.co/api/v2/pokemon/1').
}

  const start = 1
  const end = 10
  for (let i = start; <= end; i++){
    const poke = 
      .then((poke) => {
        console.log(poke)
        .catch((error) => {
        console.log(error)