import { FormsModule } from "@angular/forms";
import { RouterLink, RouterLinkActive } from "@angular/router";
import { Component, Input, inject, OnInit } from '@angular/core';
import { Message } from '../message.model';
import { MessageService } from '../message.services';
import { DatePipe, NgClass, CommonModule } from "@angular/common";
import { AuthServices } from "../../auth/auth.services";
import $ from "jquery";

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink,
    RouterLinkActive,
    CommonModule,
    DatePipe,
    NgClass
  ],
  styleUrls: ['./chat.component.css'],
  templateUrl: './chat.component.html',
})
export class ChatComponent implements OnInit {
  @Input() message: { user: { _id: string; name: string } } | undefined;
  @Input() user: { _id: string } | undefined;
  messages: Message[] = [];
  private authService = inject(AuthServices);
  authenticatedUser = this.authService.user(); // Renomeado para evitar conflitos

  constructor(private messageService: MessageService) {
    if (!this.messageService) {
      console.error('ChatComponent received null or undefined messageService');
      throw new Error('ChatComponent received null or undefined messageService');
    }
    console.log('Exiting ChatComponent constructor.');
  }

  ngOnInit() {
    console.log('Entering ngOnInit() method.');
    setInterval(() => {
      this.messageService.getMessages()
        .subscribe({
          next: (messages: Message[] | null | undefined) => {
            if (!messages) {
              console.error('ngOnInit() received null or undefined messages:', messages);
              return;
            }
            this.messages = messages;
          },
          error: (error: any) => {
            console.error('An error occurred during message retrieval:', error);
          }
        });
    }, 1000);

    $('#chat').on('DOMNodeInserted', function () {
      $(this).animate({ scrollTop: $(this)[0].scrollHeight });
    });
  }

  onEdit(id: any) {
    const message = this.messages.find((message) => message._id === id);
    if (!message) {
      console.error('onEdit() received null or undefined message for id:', id);
      return;
    }

    $(document).trigger('edit', message);
  }

  onDelete(id: any) {
    if (!id) {
      console.error('onDelete() received null or undefined id:', id);
      return;
    }

    this.messageService.deleteMessage(id).subscribe({
      next: (response) => {
        if (!response) {
          console.error('onDelete() received null or undefined response:', response);
          return;
        }
        console.log('Message deleted successfully:', response);
      },
      error: (error: any) => {
        console.error('An error occurred during message deletion:', error);
      }
    });
  }

  // Função trackById para otimizar o *ngFor
  trackById(index: number, item: Message): string {
    return item._id || 'unknown';  // Retorna 'unknown' se _id for undefined ou null
  }
}
