import { load } from '~/assets/lib/cryptocompare'

export const state = () => ({
  sets: {}
})

export const mutations = {
  save: (state, { src, data }) => (state.sets[src] = data)
}

export const actions = {
  load: async ({ commit }, payload = { from: 'BTC' }) => commit(`save`, { src: payload.from, data: await load(payload) })
}
