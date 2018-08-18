export class Choice {
  constructor({
    name,
    value,
    checked
  }) {
    this.name = name
    this.value = value
    this.checked = checked || false
  }
}
