
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: '/', component: () => import('pages/Index.vue') },
      { path: '/Genericos', component: () => import('pages/genericos.vue') },
      { path: '/CalculoSc', component: () => import('pages/calculoSc.vue') }
     
     
     
     
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
