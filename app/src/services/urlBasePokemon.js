import axios from 'axios'

export const urlBase = axios.create({
    baseURL: 'https://pokeapi.co/api/v2',
    timeout: 10000,
    responseType: 'json'
})