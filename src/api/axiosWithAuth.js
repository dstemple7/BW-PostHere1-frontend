import axios from 'axios'
export * from 'axios'

export default function axiosWithAuth() {
  const token = localStorage.getItem('token')
  console.log(token)
  return axios.create({
    headers: {
      Authorization: `Bearer ${token}`,
    },
    baseURL: 'https://dstemple7-posthere.herokuapp.com',
  })
}
