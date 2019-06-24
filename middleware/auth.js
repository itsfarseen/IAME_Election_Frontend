export default function ({ route, app }) {
  console.log(app)
  const isLoggedIn = false
  const requiresLogin = route.meta.some(e => e.requiresLogin)
  if (requiresLogin && !isLoggedIn) {
    app.router.replace('/login')
  }

  if (route.path === '/login' && isLoggedIn) {
    app.router.replace('/dashboard')
  }
}
