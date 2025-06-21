export default abstract class BaseClient<T> {
  public constructor(protected api: T) {
    this.api = api
  }
}
