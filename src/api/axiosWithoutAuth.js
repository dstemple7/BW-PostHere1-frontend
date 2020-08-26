import axios from 'axios'
export * from 'axios'

export default function axiosWithoutAuth() {
  return axios.create({
    baseURL: 'https://dstemple7-posthere.herokuapp.com',
  })
}
