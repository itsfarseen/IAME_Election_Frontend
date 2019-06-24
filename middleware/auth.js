export default function ({ app, route }) {
  const isLoggedIn = app.$api.isLoggedIn
  const requiresLogin = route.meta.some(e => e.requiresLogin)
  if (requiresLogin && !isLoggedIn) {
    app.router.replace('/login')
  }

  if (route.path === '/login' && isLoggedIn) {
    app.router.replace('/dashboard')
  }
}
