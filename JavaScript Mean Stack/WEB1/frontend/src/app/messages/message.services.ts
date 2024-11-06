import {inject, Injectable} from "@angular/core";
import {Message} from "./message.model";
import {HttpClient} from "@angular/common/http";
import {catchError, map, Observable} from "rxjs";
import {User} from "../auth/user.model";

@Injectable()
export class MessageService {
  private messageService: Message[] = [];
  private baseUrl: string = 'http://localhost:3000/';
  private http = inject(HttpClient);
  private headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + localStorage.getItem('token')
  }

  addMessage(message: Message) {
    if (!message) {
      console.error('Error: message is null or undefined');
      console.log('Error: message is null or undefined', message);
      throw ({info: 'addMessage()', error_server: 'message is null or undefined', error_client: 'Client error: addMessage() : occurred error in the service.'});
    }

    return this.http.post(this.baseUrl + 'messages/save', message, {headers: this.headers}).pipe(
      map((response: any) => {
        console.log('HTTP response received:', response);
        const newMessage = response?.data;
        if (!newMessage) {
          console.error('Error: response.data is null or undefined');
          console.log('Error: response.data is null or undefined', response);
          throw ({info: 'addMessage()', error_server: 'response.data is null or undefined', error_client: 'Client error: addMessage() : occurred error in the service.'});
        }

        const user = new User(newMessage.user.name, newMessage.user.email, undefined, undefined,
          undefined, undefined, undefined, newMessage.user._id);
        if (!user) {
          console.error('Error: user is null or undefined');
          console.log('Error: user is null or undefined', user);
          throw ({info: 'addMessage()', error_server: 'user is null or undefined', error_client: 'Client error: addMessage() : occurred error in the service.'});
        }

        this.messageService.push(new Message(newMessage.content, user, newMessage._id, newMessage.createdAt));
        return response.message;
      }),
      catchError((error: any) => this.errorHandler(error, 'addMessage()'))
    );
  }

  editMessage(content: string, _id: string) {
    if (!_id) {
      console.error('Error: _id is null or undefined');
      throw ({info: 'editMessage()', error_server: '_id is null or undefined', error_client: 'Client error: editMessage() : occurred error in the service.'});
    }

    return this.http.put(this.baseUrl + 'messages/edit/' + _id, {content: content}, {headers: this.headers}).pipe(
      map((response: any) => {
        const responseData = response?.data;
        if (!responseData) {
          console.error('Error: response.data is null or undefined');
          throw ({info: 'editMessage()', error_server: 'response.data is null or undefined', error_client: 'Client error: editMessage() : occurred error in the service.'});
        }

        const content = responseData.content;
        const updatedAt = responseData.updatedAt;
        const message = this.messageService.find((message) => message._id === _id);
        if (!message) {
          console.error('Error: message not found in messageService');
          throw ({info: 'editMessage()', error_server: 'message not found', error_client: 'Client error: editMessage() : occurred error in the service.'});
        }

        message.content = content;
        message.updatedAt = updatedAt;

        return response.message;
      }),
      catchError((error: any) => this.errorHandler(error, 'editMessage()'))
    );
  }


  deleteMessage(_id: string) {
    if (!_id) {
      console.error('Error: _id is null or undefined');
      throw ({info: 'deleteMessage()', error_server: '_id is null or undefined', error_client: 'Client error: deleteMessage() : occurred error in the service.'});
    }

    console.log('deleteMessage() called with _id:', _id);
    return this.http.delete(this.baseUrl + 'messages/delete/' + _id, {headers: this.headers}).pipe(
      map((response: any) => {
        console.log('HTTP response received:', response);
        const _id = response?.data?._id;
        if (_id === null || _id === undefined) {
          console.error('Error: response.data is null or undefined');
          throw ({info: 'deleteMessage()', error_server: 'response.data is null or undefined'});
        }
        const message = this.messageService.find((message) => message._id === _id);
        if (message) {
          const index = this.messageService.indexOf(message);
          if (index === -1) {
            console.error('Error: Message not found in messageService');
            throw ({info: 'deleteMessage()', error_server: 'Message not found in messageService'});
          }
          console.log('Deleting message at index', index);
          this.messageService.splice(index, 1);
        } else {
          console.log('No message found with _id', _id);
        }
        return response.message;
      }),
      catchError((error: any) => this.errorHandler(error, 'deleteMessage()'))
    )
  }

  getMessages(): Observable<any> {
    console.log('getMessages() called');
    return this.http.get(this.baseUrl + 'messages', {headers: this.headers}).pipe(
      map((response: any) => {
        console.log('HTTP response received:', response);
        const messages = response?.data;
        if (messages === null || messages === undefined) {
          console.error('Error: response.data is null or undefined');
          throw ({info: 'getMessages()', error_server: 'response.data is null or undefined', error_client: 'Client error: getMessages() : occurred error in the service.'});
        }

        let transformedMessages: Message[] = [];
        for (let message of messages) {
          if (message === null || message === undefined) {
            console.error('Error: message is null or undefined');
            throw ({info: 'getMessages()', error_server: 'message is null or undefined', error_client: 'Client error: getMessages() : occurred error in the service.'});
          }

          const user = new User(message.user?.name, message.user?.email,
            undefined, undefined, undefined, undefined,
            undefined, message.user?._id);
          if (user === null || user === undefined) {
            console.error('Error: user is null or undefined');
            throw ({info: 'getMessages()', error_server: 'user is null or undefined', error_client: 'Client error: getMessages() : occurred error in the service.'});
          }

          transformedMessages.push(new Message(message.content, user, message._id, message.createdAt, message.updatedAt));
        }
        this.messageService = transformedMessages;
        console.log('Transformed messages:', transformedMessages);
        return transformedMessages;
      }),
      catchError((error: any) => this.errorHandler(error, 'getMessages()'))
    );
  }

  errorHandler(error: any, info: string): Observable<any> {
    if (error === null || error === undefined) {
      console.error('Error Info:', info);
      console.error('Server Error:', 'error is null or undefined');
    } else {
      console.error('Error Info:', info);
      console.error('Server Error:', error);
    }

    if (error.error === null || error.error === undefined) {
      throw ({
        info: info,
        error_server: 'error.error is null or undefined',
        error_client: 'Client error: errorHandler : occurred error in the service.'
      });
    } else {
      throw ({
        info: info,
        error_server: error.error,
        error_client: 'Client error: errorHandler : occurred error in the service.'
      });
    }
  }


}


