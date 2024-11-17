import { createRouter, createWebHistory } from 'vue-router'
import ContactsView from '@/views/contacts/ContactsView.vue' 
import ContactDetailsView from '@/views/contacts/ContactDetailsView.vue' 
import CompaniesView from '@/views/CompaniesView.vue' 
import LoginView from '@/views/LoginView.vue'
import PageNotFound from '@/views/PageNotFound.vue'
import AccountsView from '@/views/AccountsView.vue'
import StructuresView from '@/views/StructuresView.vue'
import { useAuthStore } from '@/stores/AuthStore'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      children: [ {
        path: 'contact/:id',
        name: 'contactDetail',
        component: ContactDetailsView,
        props: true
      },
      {
        path: '',
        name: 'contacts',
        alias: "/contacts",
        component: ContactsView
      }]
    },{
      path: '/login',
      name: 'login',
      component: LoginView,
      meta:{
        hideNavbar: true
      },
      beforeEnter: (to, from) =>{
        if(useAuthStore().isUserLoggedIn()){
          return from
        }
      }
    },
    {
      path: '/companies',
      name: 'companies',
      component: CompaniesView,
    },
    {
      path: '/accounts',
      name: 'accounts',
      component: AccountsView,

    },
    {
      path: '/structures',
      name: 'structures',
      component: StructuresView
    },
    {
      path: '/:pathMatch(.*)',
      name: 'pathNotFound',
      component: PageNotFound
    }
    
  ]
})
router.beforeEach((to, from) => {
  if(useAuthStore().isUserLoggedIn()){
    return true
  }
  if (
    to.path === '/login' || 
    to.path === '/' || 
    to.path === '/contacts' ||
    to.name === 'contactDetail' || 
    to.path.startsWith('/contact/') ||
    to.name === 'pathNotFound'
  ) {
    return true; 
  }
  if (to.path === '/accounts' || to.path === '/companies' || to.path === '/structures') {
    return { path: '/login' }
  }
  return {name: 'pathNotFound'}
})

export default router
