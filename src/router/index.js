const routes = [{
  path: '/',
  redirect: '/cesonblog'
}, {
  path: '/cesonblog',
  component: () => import('views/cesonBlog/CesonBlog')
}, {
  path: '/blogbytype',
  component: () => import('views/blogByType/BlogByType'),
}, {
  path: '/blogbytype/:tid',
  component: () => import('views/blogByType/BlogByType'),
}, {
  path: '/blogbytag',
  component: () => import('views/blogByTag/BlogByTag')
}, {
  path: '/blogbytag/:gid',
  component: () => import('views/blogByTag/BlogByTag')
}, {
  path: '/about',
  component: () => import('views/about/About')
}, {
  path: '/archives',
  component: () => import('views/archives/Archives')
}, {
  path: '/search',
  component: () => import('views/search/Search')
}, {
  path: '/blog',
  component: () => import('views/blog/Blog')
}, {
  path: '/blog/:bid',
  component: () => import('views/blog/Blog')
}, {
  path: '/traffic',
  component: () => import('views/traffic/Traffic')
}]

const router = new VueRouter({
  routes,
  mode: "history",
})

router.beforeEach((to, from, next) => {
  next()
})

export default router