class RequiresLoginError { }

export default class {
  constructor(http, debug = false) {
    this.http = http
    this.debug = debug
    if (this.isLoggedIn) {
      this.http.setToken(this.loginToken)
    } else {
      this.http.setToken(false)
    }
  }

  get isLoggedIn() {
    return this.loginToken !== null
  }

  get loginToken() {
    return window.localStorage.getItem('loginToken')
  }

  _setLoggedIn(token) {
    window.localStorage.setItem('loginToken', token)
    this.http.setToken(token)
  }

  _setLoggedOut() {
    window.localStorage.setItem('loginToken', undefined)
    this.http.setToken(false)
  }

  _log(msg) {
    if (this.debug && window.console) {
      window.console.log('[api.js]: ' + msg)
    }
  }

  async _parseResp(resp) {
    if (!resp.ok && resp.status === 401) {
      this._setLoggedOut()
      throw RequiresLoginError()
    }
    if (!resp.ok) {
      const text = await resp.text()
      console.log(text)
      return false
    }
    const json = await resp.json()
    if (!json.success) {
      this._log(json.message)
    }
    return json
  }

  /**
     * Signup as a new user
     * @param {name, email, password} user
     */

  async signup(user) {
    const json = await this._parseResp(await this.http.post('api/signup', user))
    return json
  }

  /**
   * @param {email, password} creds
   */
  async login(creds) {
    const json = await this._parseResp(await this.http.post('api/login', creds))
    if (json.success) {
      const token = json.data
      this._setLoggedIn(token)
    }
    return json
  }

  /**
   * @param {name, boys, girls} klass
   */
  async addClass(klass) {
    const resp = await this.http.post('api/classes', klass, { throwHttpErrors: false })
    const json = await this._parseResp(resp)
    return json
  }

  /**
   * @returns [{id, school_id, name, boys, girls}]
   */
  async getClasses() {
    const resp = await this.http.get('api/classes')
    const json = await this._parseResp(resp)
    return json
  }

  /**
   * @param {name, boys, girls} klass
   */
  async updateClass(id, klass) {
    const resp = await this.http.put('api/classes/' + id, klass)
    const json = await this._parseResp(resp)
    return json
  }

  async deleteClass(id) {
    const resp = await this.http.delete('api/classes/' + id)
    const json = await this._parseResp(resp)
    return json
  }
}
