export class NotFoundError extends Error {
  public msg: string;
  public status: number;

  public constructor(msg: string, status: number) {
    super();
    this.msg = msg;
    this.status = status;
  }
}
export default NotFoundError;
