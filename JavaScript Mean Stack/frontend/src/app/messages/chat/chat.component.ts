import {FormsModule} from "@angular/forms";
import {Component, inject, OnInit} from '@angular/core';
import {Message} from '../message.model';
import {MessageService} from '../message.services';
import {DatePipe, NgClass} from "@angular/common";
import {AuthServices} from "../../auth/auth.services";
import $ from "jquery";

@Component({
  selector: 'app-message-chat',
  standalone: true,
  imports: [
    FormsModule,
    NgClass,
    DatePipe
  ],
  templateUrl: './chat.component.html',
})
export class ChatComponent implements OnInit {
  messages: Message[] = [];
  private authService = inject(AuthServices);
  user = this.authService.user();

  constructor(private messageService: MessageService) {
  }

  ngOnInit() {
    setInterval(() => {
      this.messageService.getMessages()
        .subscribe({
            next: (messages: Message[]) => {
              this.messages = messages;
            },
            error: (error: any) => {
              console.log(error);
            }
          }
        );
    }, 1000,1);

    $('#chat').on('DOMNodeInserted', function () {
      $(this).animate({scrollTop: 100000000});
    })
  }

  onEdit(id: any) {
    const message = this.messages.find((message) => message._id === id)
    $(document).trigger('edit', message)
  }

  onDelete(id: any) {
    this.messageService.deleteMessage(id).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (error) => {
        console.log(error);
      }
    })
  }
}
