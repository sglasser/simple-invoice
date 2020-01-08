import Vue from 'vue';

const state = Vue.observable({ 
  auth: null,
  loading: false
});

export const getters = {
  auth: () => state.auth,
  loading: () => state.loading
};

export const mutations = {
  setAuth: (val: any) => ( state.auth = val ),
  setLoading: (val: boolean) => ( state.loading = val )
};
