export default function ({ route, app }) {
  const isLoggedIn = window.localStorage.getItem('isLoggedIn')
  if (route.path !== '/' && !isLoggedIn) {
    app.router.replace('/')
  }

  if (route.path === '/' && isLoggedIn) {
    app.router.replace('/dashboard')
  }
}
