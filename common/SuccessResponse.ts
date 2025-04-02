export class SuccessResponse<T> {
  constructor(public data: T, public status: boolean) {}
}
