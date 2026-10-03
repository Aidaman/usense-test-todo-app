import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  imports: [MatButton, MatIcon],
  selector: 'app-title-bar',
  styleUrl: './title-bar.scss',
  templateUrl: './title-bar.html',
})
export class TitleBar {}
