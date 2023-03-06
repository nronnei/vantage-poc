export class NotFoundError extends Error {
  constructor(message: any) {
    super(message);
    this.name = this.constructor.name;
  }
}
