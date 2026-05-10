export class UserEmailAlreadyExistsException extends Error {
  constructor() {
    super('User already exists');
  }
}
