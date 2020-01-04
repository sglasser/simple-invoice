import { invoices } from './stores.js';
import { loading } from './stores.js';
import { createInvoice } from './api/invoice-api.js';
import Auth from './auth/auth.js';

class AppFacade {

  constructor () {

  }

  async loadInvoices () {
    try {
      loading.set(true);
      invoices.set(
        [
          {
            id: 1234,
            number: 231,
            recipient: {
              name: 'Big Company',
              address: '123 Main St',
              city: 'Blaine',
              state: 'MN',
              postal: '55449',
              phone: '763-123-5678'
            },
            created: '01/03/2020',
            due: '01/29/2020',
            total: 500.00,
            lineItems: [
              {
                qty: 3,
                desc: 'Coding',
                rate: 100.00,
        
              }
            ]
          }
        ]
      )
    } catch (err) {
      console.log(err);
    } finally {
      loading.set(false);
    }

  }


  async createInvoice (invoice) {
    try {
      loading.set(true);
      const result = await createInvoice(Auth.getIdToken(), invoice);
      // check result if valid
      console.log(result);
      invoices.update(invoices => invoices.push(invoice));
      

    } catch (err) {
      console.log(err);
    } finally {
      loading.set(false);
    }
  }
}

const instance = new AppFacade();
export default instance;