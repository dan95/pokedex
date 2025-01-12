import { Component, Input } from "@angular/core";
import { Pokemon } from "../../models/Pokemon";
import { CommonModule } from "@angular/common";

@Component({
    selector: 'pokedex-pokemon-type',
    templateUrl: './pokedex-pokemon-type.component.html',
    styleUrl: './pokedex-pokemon-type.component.css',
    imports: [CommonModule]
})
export class PokedexPokemonTypeComponent {
    @Input('pokemon')
    public pokemon?: Pokemon;
}