import {FormsModule, NgForm} from "@angular/forms";
import {Component, ElementRef, inject, OnInit, ViewChild} from '@angular/core';
import {MessageService} from "../message.services";
import {Message} from "../message.model";
import {AuthServices} from "../../auth/auth.services";
import {ChatComponent} from "../chat/chat.component";
import {User} from "../../auth/user.model";
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import $ from "jquery";

@Component({
  selector: 'app-message-input',
  standalone: true,
  imports: [FormsModule, ChatComponent, CommonModule, BrowserModule],
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
})

export class InputComponent implements OnInit {
  @ViewChild('input') input?: ElementRef<HTMLElement>;

  messageContent = '';
  messageId?: string;

  private messageService = inject(MessageService);
  private authService = inject(AuthServices);
  private user = this.authService.user();

  constructor() { }

  onSubmit(form: NgForm) {
    console.log('Form is submitting');
    if (!form.valid) {
      console.log('Form is not valid');
      return;
    }

    console.log('Form values', form.value);

    const user = new User(this.user?.name ?? '', this.user?.email ?? '',
      undefined, undefined, undefined, undefined, undefined,
      this.user?._id ?? undefined)
    const messageAux = new Message(form.value.content, user, form.value._id ?? undefined);

    console.log('Message to be sent', messageAux);

    if (form.value._id) {
      console.log('Editing message');
      this.messageService.editMessage(form.value.content, form.value._id).subscribe({
        next: (response) => {
          console.log('Edit response', response);
          if (response) {
          } else {
            console.log('Edit response is null or undefined');
          }
        },
        error: (error) => {
          console.log('Edit error occurred', error);
          if (error) {
            console.error('Edit error occurred', error);
          } else {
            console.error('An unknown error occurred during edit.');
          }
          // Additional error handling logic can be added here
        }
      })
    } else {
      console.log('Adding message');
      this.messageService.addMessage(messageAux).subscribe({
        next: (response) => {
          console.log('Add response', response);
          if (response) {
          } else {
            console.log('Add response is null or undefined');
          }
        },
        error: (error) => {
          console.error('Add error occurred', error);
          if (error) {
            console.error('Add error occurred', error);
          } else {
            console.error('An unknown error occurred during add.');
          }
        }
      })
    }
    form.resetForm();
  }

  ngOnInit(): void {
    $(document).on('edit', (event, message: Message | null) => {
      console.log('Edit has been triggered', message);
      if (message === null || message === undefined) {
        console.error('Null or undefined message received for edit.');
        return;
      }
      if (this.input === null || this.input === undefined) {
        console.error('Null or undefined input element in InputComponent.');
        return;
      }
      try {
        this.messageId = message._id;
        this.messageContent = message.content;

        this.input.nativeElement.focus();
      } catch (error) {
        console.error('Error occurred while trying to focus the input element', error);
      }
    })
  }

}


