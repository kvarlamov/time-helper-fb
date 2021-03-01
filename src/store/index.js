import Vue from 'vue'
import Vuex from 'vuex'

import user from './user'
import target from './target'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        user,
        target
    }
})