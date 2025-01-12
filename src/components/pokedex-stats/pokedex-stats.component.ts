import { Component, Input, OnChanges, OnInit, SimpleChanges } from "@angular/core";
import { Pokemon } from "../../models/Pokemon";
import { CommonModule } from "@angular/common";
import { FormsModule } from '@angular/forms'
import { PokemonEventService } from "../../services/PokemonEventService";
import { ResourceNavigationTypeEnum } from "../../models/ResourceNavigationTypeEnum";
import { PokemonApiService } from "../../services/PokemonApiService";

@Component({
    selector: 'pokedex-stats',
    templateUrl: './pokedex-stats.component.html',
    styleUrl: './pokedex-stats.component.css',
    imports: [
        CommonModule,
        FormsModule
    ]
})
export class PokedexStatsComponent implements OnInit, OnChanges {
    @Input('pokemon')
    public pokemon: Pokemon = <Pokemon>{};
    public pokemonId: number = 0;
    public pokemonDescription?: string;

    constructor(
        private pokemonEventService: PokemonEventService,
        private pokemonApiService: PokemonApiService
    ) {
    }

    async ngOnChanges(changes: SimpleChanges): Promise<void> {
        this.pokemonId = +changes['pokemonId']?.currentValue || changes['pokemon'].currentValue.id  ;
        this.pokemonDescription = await this.pokemonApiService.getPokemonDescription(this.pokemonId);

        console.log(this.pokemonDescription);
    }

    ngOnInit(): void {
        this.pokemonId = this.pokemon.id;
    }

    changePokemon() {
        this.pokemonEventService.changePokemonEvent.next({
            navigationType: ResourceNavigationTypeEnum.SELECT,
            pokemonId: this.pokemonId
        });
    }
}