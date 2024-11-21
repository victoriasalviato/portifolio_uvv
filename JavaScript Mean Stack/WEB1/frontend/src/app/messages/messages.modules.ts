import {ChatComponent} from './chat/chat.component';  // Ajuste o caminho conforme necessário
import { MessagesComponent } from './messages.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    ChatComponent,  // Declare o ChatComponent aqui
    MessagesComponent,
    // Outros componentes
  ],
  imports: [
    CommonModule,
    // Outros módulos
  ],
})
export class MessagesModule {}
