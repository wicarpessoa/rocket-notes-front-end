import axios from 'axios'

export const api = axios.create({
  baseURL: "https://rocket-notes-api-4b4o.onrender.com"
})