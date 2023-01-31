import axios from 'axios'

const TOKEN = 'cf9v5jqad3ia9brrmh70cf9v5jqad3ia9brrmh7g'

export default axios.create({
  baseURL: 'https://finnhub.io/api/v1',
  params: {
    token: TOKEN
  }
})
