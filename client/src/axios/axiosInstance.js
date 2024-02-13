import axios from "axios";

const instance=axios.create({ 
  // baseURL:'http://localhost:8080'
  baseURL:'https://home-appliances-beige.vercel.app'
})

export const baseURL='https://home-appliances-beige.vercel.app'
// export const baseURL='http://localhost:8080'

export default instance