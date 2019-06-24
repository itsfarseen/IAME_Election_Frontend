export default function ({ route, app }) {
  const isLoggedIn = window.localStorage.getItem('isLoggedIn')
  if (route.path !== '/' && !isLoggedIn) {
    app.router.replace('/')
  }

  if (route.path === '/' && isLoggedIn) {
    const token = window.localStorage.getItem('loginToken')
    app.router.replace('/dashboard')
    app.$http.setToken(token)
  }
}
