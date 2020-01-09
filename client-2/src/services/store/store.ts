import Vue from 'vue';
import { Invoice } from '../../models/invoice'



const state = Vue.observable({ 
  auth: process.env.NODE_ENV === 'development' ? {
    isAuthenticated: true,
    userId: '1234',
    accessToken: '45566'
  } : null,
  loading: false,
  invoices: [],
  user: null
});

export const getters = {
  auth: () => state.auth,
  loading: () => state.loading,
  invoices: () => state.invoices,
  user: () => state.user
};

export const mutations = {
  setAuth: (val: any) => ( state.auth = val ),
  setLoading: (val: boolean) => ( state.loading = val ),
  setInvoices: (val: any) => ( state.invoices = val ),
  setUser: (val: any) => ( state.user = val)
};

// https://dev.to/f3ltron/vue-2-6-6-release-part3-vue-observable-21dk