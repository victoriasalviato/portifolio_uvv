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
    return this.http.post(this.baseUrl + 'messages/save', message, {headers: this.headers}).pipe(
      map((response: any) => {
        const newMessage = response.data;
        const user = new User(newMessage.user.name, newMessage.user.email, undefined, undefined,
          undefined, undefined, undefined, newMessage.user._id);
        this.messageService.push(new Message(newMessage.content, user, newMessage._id, newMessage.createdAt));
        return response.message;
      }),
      catchError((error: any) => this.errorHandler(error, 'addMessage()'))
    );
  }

  editMessage(content: string, _id: string) {
    return this.http.put(this.baseUrl + 'messages/edit/' + _id, {content: content}, {headers: this.headers}).pipe(
      map((response: any) => {
        const content = response.data.content;
        const updatedAt = response.data.updatedAt;
        const _id = response.data._id;
        const message = this.messageService.find((message) => message._id === _id);
        if (message) {
          message.content = content;
          message.updatedAt = updatedAt;
        }
        return response.message;
      }),
      catchError((error: any) => this.errorHandler(error, 'editMessage()'))
    )
  }


  deleteMessage(_id: string) {
    return this.http.delete(this.baseUrl + 'messages/delete/' + _id, {headers: this.headers}).pipe(
      map((response: any) => {
        const _id = response.data._id;
        const message = this.messageService.find((message) => message._id === _id);
        if (message) {
          this.messageService.splice(this.messageService.indexOf(message), 1);
        }
        return response.message;
      }),
      catchError((error: any) => this.errorHandler(error, 'deleteMessage()'))
    )
  }

  getMessages(): Observable<any> {
    return this.http.get(this.baseUrl + 'messages', {headers: this.headers}).pipe(
      map((response: any) => {
        const messages = response.data;
        let transformedMessages: Message[] = [];
        for (let message of messages) {
          const user = new User(message.user.name, message.user.email,
            undefined, undefined, undefined, undefined,
            undefined, message.user._id);
          transformedMessages.push(new Message(message.content, user, message._id, message.createdAt, message.updatedAt));
        }
        this.messageService = transformedMessages;
        return transformedMessages;
      }),
      catchError((error: any) => this.errorHandler(error, 'getMessages()'))
    )
  }

  errorHandler(error: any, info: string): Observable<any> {
    throw ({
      info: info,
      error_server: error,
      error_client: 'Client error: errorHandler : occurred error in the service.'
    })
  }


}
