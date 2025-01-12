import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PokedexFrameComponent } from '../components/pokedex-frame/pokedex-frame.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    PokedexFrameComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Pokédex';
}
