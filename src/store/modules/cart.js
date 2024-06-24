import axios from 'axios'
export default {
  namespaced: true,
  state () {
    return {
      list: []
    }
  },
  mutations: {
    updateList (state, newList) {
      state.list = newList
    },
    updateCount (state, obj) {
      const item = state.list.find(item => item.id === obj.id)
      item.count = obj.count
    }
  },
  actions: {
    async getList (context) {
      const res = await axios.get('http://localhost:3000/cart')
      context.commit('updateList', res.data)
    },
    async changeCartCount (context, obj) {
      await axios.patch(`http://localhost:3000/cart/${obj.id}`, { count: obj.newCount })
      context.commit('updateCount', { id: obj.id, count: obj.count })
    }
  },
  getters: {
    total (state) {
      return state.list.reduce((sum, item) => sum + item.count, 0)
    },
    totalPrice (state) {
      return state.list.reduce((sum, item) => sum + item.count * item.price, 0)
    }
  },
  modules: {

  }
}
