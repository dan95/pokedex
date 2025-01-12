import { Component, Input } from "@angular/core";
import { Pokemon } from "../../models/Pokemon";
import { CommonModule } from "@angular/common";

@Component({
    selector: 'pokedex-sensor',
    templateUrl: './pokedex-sensor.component.html',
    styleUrl: './pokedex-sensor.component.css',
    imports: [CommonModule]
})
export class PokedexSensorComponent {
    @Input('pokemon')
    public pokemon: Pokemon = <Pokemon>{};

    async playAudio(): Promise<void> {
        if (!this.pokemon?.cry) {
            return;
        }

        const audio = new Audio(this.pokemon.cry);

        await audio.play();
    }
}