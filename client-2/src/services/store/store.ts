import Vue from 'vue';
import { Invoice } from '../../models/invoice'



const state = Vue.observable({ 
  auth: process.env.NODE_ENV === 'development' ? {
    isAuthenticated: true,
    userId: '1234',
    accessToken: '45566'
  } : null,
  loading: false,
  invoices: []
});

export const getters = {
  auth: () => state.auth,
  loading: () => state.loading,
  invoices: () => state.invoices
};

export const mutations = {
  setAuth: (val: any) => ( state.auth = val ),
  setLoading: (val: boolean) => ( state.loading = val ),
  setInvoices: (val: any) => ( state.invoices = val )
};
