import {FormsModule, NgForm} from "@angular/forms";
import {Component, ElementRef, inject, OnInit, ViewChild} from '@angular/core';
import {MessageService} from "../message.services";
import {Message} from "../message.model";
import {AuthServices} from "../../auth/auth.services";
import {ChatComponent} from "../chat/chat.component";
import {User} from "../../auth/user.model";
import $ from "jquery";

@Component({
  selector: 'app-message-input',
  standalone: true,
  imports: [FormsModule, ChatComponent],
  templateUrl: './input.component.html',
})

export class InputComponent implements OnInit {
  @ViewChild('input') input: ElementRef | undefined;

  messageContent: string = '';
  messageId: any = null;

  private messageService = inject(MessageService);
  private authService = inject(AuthServices);
  private user = this.authService.user();


  onSubmit(form: NgForm) {
    const user = new User(this.user.name, this.user.email,
      undefined, undefined, undefined, undefined, undefined,
      this.user._id)
    const messageAux = new Message(form.value.content, user, form.value._id ?? undefined);

    if (form.value._id) {
      this.messageService.editMessage(form.value.content, form.value._id).subscribe({
        next: (response) => {
          console.log(response);
        },
        error: (error) => {
          console.log(error);
        }
      })
    } else {
      this.messageService.addMessage(messageAux).subscribe({
        next: (response) => {
          console.log(response);
        },
        error: (error) => {
          console.log(error);
        }
      })
    }
    form.resetForm();
  }

  ngOnInit(): void {
    $(document).on('edit', (event, message) => {
      this.messageId = message._id;
      this.messageContent = message.content;

      this.input?.nativeElement.focus();
    })
  }

}
