export default class PlaceSelect {
  values: number[]
  options: string[]

  constructor(n: number) {
    this.values = []
    this.options = []

    for (let i = 1; i <= n; i++) {
      this.values.push(i)
      this.options.push(i === 1 ? `${i} place` : `${i} places`)
    }
  }
}
