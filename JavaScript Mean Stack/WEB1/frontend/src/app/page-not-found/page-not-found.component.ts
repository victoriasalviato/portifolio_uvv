import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive} from "@angular/router";
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-page-not-found',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    CommonModule,
    BrowserModule
  ],
  templateUrl: './page-not-found.component.html',
  styleUrl: './page-not-found.component.css'
})
export class PageNotFoundComponent {

}

