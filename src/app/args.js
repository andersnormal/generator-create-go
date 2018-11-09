export default class Args {
  constructor({ appName, type, go11modules }) {
    this.appName = appName || this.appName
    this.type = type || this.type
    this.go11modules = go11modules || this.go11modules
  }
}
