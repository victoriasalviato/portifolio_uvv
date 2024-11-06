import { User } from "../auth/user.model";

export class Message {
  constructor(
    public content: string,
    public user: User,
    public _id?: string,
    public createdAt?: Date,
    public updatedAt?: Date
  ) {
    console.log('Message.constructor - Entering constructor');
    this.validateContent(content);
    this.validateUser(user);
    this.validateId(_id);
    this.validateCreatedAt(createdAt);
    this.validateUpdatedAt(updatedAt);
    console.log('Message.constructor - Exiting constructor');
  }

  private validateContent(content: string): void {
    console.log('Validating content:', content);
    if (!content) {
      console.error('Validation failed: content is required');
      throw new Error('content is required');
    }
    console.log('Validation passed for content');
  }

  private validateUser(user: User): void {
    console.log('Validating user:', user);
    if (!user) {
      console.error('Validation failed: user is null or undefined');
      throw new Error('user is required');
    }
    console.log('Validation passed for user');
  }

  private validateId(_id?: string): void {
    console.log('Validating _id:', _id);
    if (typeof _id !== 'string' && _id !== undefined) {
      console.error('Validation failed: _id is not a string or undefined');
      throw new Error('_id must be a string or undefined');
    }
    console.log('Validation passed for _id');
  }

  private validateCreatedAt(createdAt?: Date): void {
    console.log('Validating createdAt:', createdAt);
    if (createdAt !== undefined && !(createdAt instanceof Date)) {
      console.error('Validation failed: createdAt is not a Date or undefined');
      throw new Error('createdAt must be a Date or undefined');
    }
    console.log('Validation passed for createdAt');
  }

  private validateUpdatedAt(updatedAt?: Date): void {
    console.log('Validating updatedAt:', updatedAt);
    if (updatedAt !== undefined && !(updatedAt instanceof Date)) {
      console.error('Validation failed: updatedAt is not a Date or undefined');
      throw new Error('updatedAt must be a Date or undefined');
    }
    console.log('Validation passed for updatedAt');
  }
}

