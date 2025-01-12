import { Component, OnInit } from "@angular/core";
import { PokedexPortraitComponent } from "../pokedex-portrait/pokedex-portrait.component";
import { PokedexSensorComponent } from "../pokedex-sensor/pokedex-sensor.component";
import { PokedexStatsComponent } from "../pokedex-stats/pokedex-stats.component";
import { PokedexActionPadComponent } from "../pokedex-action-pad/pokedex-action-pad.component";
import { PokemonApiService } from "../../services/PokemonApiService";
import { Pokemon } from "../../models/Pokemon";
import { CommonModule, NgIf } from "@angular/common";
import { PokedexPokemonTypeComponent } from "../pokedex-pokemon-type/pokedex-pokemon-type.component";
import { PokemonEventService } from "../../services/PokemonEventService";
import { ResourceNavigationTypeEnum } from "../../models/ResourceNavigationTypeEnum";
import { Environment } from "../../env";
import { PokemonChangeEvent } from "../../models/PokemonChangeEvent";
import { PokedexSongComponent } from "../pokedex-song/pokedex-song.component";

@Component({
    selector: 'pokedex-frame',
    templateUrl: './pokedex-frame.component.html',
    styleUrl: './pokedex-frame.component.css',
    imports: [
        PokedexSensorComponent,
        PokedexPortraitComponent,
        PokedexStatsComponent,
        PokedexActionPadComponent,
        PokedexPokemonTypeComponent,
        PokedexSongComponent,
        CommonModule
    ]
})
export class PokedexFrameComponent implements OnInit {
    private currentPokemonId: number = 1;
    public pokemon?: Pokemon;

    constructor(
        private pokemonApiService: PokemonApiService,
        private pokemonEventService: PokemonEventService
    ) {
    }

    async ngOnInit(): Promise<void> {
        await this.searchPokemon();

        this.pokemonEventService.changePokemonEvent.subscribe(
            async (pokemonChangeEvent: PokemonChangeEvent) => 
                await this.handlePokemonNavigation(pokemonChangeEvent)
        );
    }

    async searchPokemon(): Promise<void> {
        const pokemon = await this.pokemonApiService.getPokemonById(this.currentPokemonId);

        this.pokemon = pokemon;
    }

    async handlePokemonNavigation(pokemonChangeEvent: PokemonChangeEvent): Promise<void> {
        switch (pokemonChangeEvent.navigationType) {
            case ResourceNavigationTypeEnum.PREVIOUS: {
                if (this.currentPokemonId === 1) {
                    return;
                }

                this.currentPokemonId--;

                break;
            }
            case ResourceNavigationTypeEnum.NEXT: {
                if (this.currentPokemonId === Environment.pokemonMaxCount) {
                    return;
                }

                this.currentPokemonId++;

                break;
            }
            case ResourceNavigationTypeEnum.RESET: {
                this.currentPokemonId = 1;

                break;
            }
            case ResourceNavigationTypeEnum.SELECT: {
                if (pokemonChangeEvent.pokemonId === null || pokemonChangeEvent.pokemonId === undefined) {
                    return;
                }

                if (pokemonChangeEvent.pokemonId < 0 || pokemonChangeEvent.pokemonId > Environment.pokemonMaxCount) {
                    return;
                }

                this.currentPokemonId = pokemonChangeEvent.pokemonId;

                break;
            }
        }

        await this.searchPokemon();
    }
}