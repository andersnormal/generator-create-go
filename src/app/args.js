export default class Args {
  constructor({ appName, type }) {
    this.appName = appName || this.appName
    this.type = type || this.type
  }
}
