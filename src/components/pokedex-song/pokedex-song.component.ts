import { Component, OnInit } from "@angular/core";
import { Environment } from "../../env";
import { CommonModule } from "@angular/common";

@Component({
    selector: 'pokedex-song',
    templateUrl: './pokedex-song.component.html',
    styleUrl: './pokedex-song.component.css',
    imports: [
        CommonModule
    ]
})
export class PokedexSongComponent implements OnInit {
    audio?: HTMLAudioElement;
    public isPlaying: boolean = false;

    ngOnInit(): void {
        this.audio = new Audio(Environment.pokemonSoundtrack);
        this.audio!.loop = true;
        this.audio.currentTime = 6.5;
    }

    playAudio(): void {
        this.audio?.play();
        this.isPlaying = true;
    }

    stopAudio(): void {
        this.audio?.pause();
        this.isPlaying = false;
    }
}