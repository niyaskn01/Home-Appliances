import axios from "axios";

const instance=axios.create({
  baseURL:'https://home-appliances-xi.vercel.app'
})

export const baseURL='https://home-appliances-xi.vercel.app'

export default instance