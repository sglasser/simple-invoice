import Vue from 'vue';

const state = Vue.observable({ 
  auth: {}
});

export const getters = {
  auth: () => state.auth
}

export const mutations = {
    setAuth: (val: any) => ( state.auth = val )
}