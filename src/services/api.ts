import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://10.10.0.22:8000/',
})