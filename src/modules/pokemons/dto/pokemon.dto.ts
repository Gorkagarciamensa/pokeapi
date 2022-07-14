import { Pokemon } from "pokenode-ts";


const DEFAULT_IMAGE = 'https://pokenode-ts-docs-gabb-c.vercel.app/img/red-pokeball.svg'

export class PokemonDto {
    constructor({ id, name, sprites }: Partial<Pokemon>) {
        this.id = id;
        this.name = name;
        this.image = sprites.other.home.front_default || DEFAULT_IMAGE;
    }

    id: number;
    name: string;
    image: string;
}