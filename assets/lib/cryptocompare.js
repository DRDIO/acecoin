import axios from 'axios'

const baseUrl = 'https://min-api.cryptocompare.com/data/'

export async function load ({ from = 'BTC', to = 'USD', limit = 30, aggregate = 3, exchange = 'Coinbase' } = {}) {
  const url = `${baseUrl}histoday?fsym=${from}&tsym=${to}&limit=${limit}&aggregate=${aggregate}&e=${exchange}`
  const res = await axios.get(url)
  return res.data.Data.map(r => r.close)
}
