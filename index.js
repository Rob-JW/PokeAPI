const axios = require('axios')
const { Client } = require('@notionhq/client')

const notion = new Client ({auth: process.env.NOTION_KEY})

const pakeArray = []

async function getPokemaon() {
  
}