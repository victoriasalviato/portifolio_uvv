import { Component } from '@angular/core';
import { ChatComponent } from './chat/chat.component';
import {InputComponent} from "./input/input.component";
import {HeaderComponent} from "../header/header.component";
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [
    ChatComponent,
    FormsModule,
    InputComponent,
    HeaderComponent,
    CommonModule,
    BrowserModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent { }

