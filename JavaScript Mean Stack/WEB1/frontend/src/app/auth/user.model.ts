import { Message } from "../messages/message.model";

export class User {
  constructor(
    public name: string,
    public email: string,
    public password?: string,
    public termos?: boolean,
    public sexo?: string,
    public dataNascimento?: Date,
    public messages?: Message[],
    public _id?: string,
    public createdAt?: Date,
    public updatedAt?: Date,
  ) {
    try {
      if (!name || !email) {
        throw new Error('Name and email are required fields');
      }
      if (dataNascimento && !(dataNascimento instanceof Date)) {
        throw new Error('dataNascimento must be a valid Date');
      }
      this.messages = messages || [];
      this.createdAt = createdAt || new Date();
      this.updatedAt = updatedAt || new Date();
      console.log('User.constructor - User instance created successfully.');
    } catch (error) {
      console.error('User.constructor - Error initializing User:', error);
      throw error;
    }
  }
}

