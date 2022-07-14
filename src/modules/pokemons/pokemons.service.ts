import { Injectable, Query } from '@nestjs/common';
import { Pokemon, PokemonClient } from 'pokenode-ts';
import { forkJoin, from, map, Observable, switchMap } from 'rxjs';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { PokemonDto } from './dto/pokemon.dto';
import { QueryPokemonDto } from './dto/query-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';

@Injectable()
export class PokemonsService {
  cache = 1000 * 60 * 60;
  create(createPokemonDto: CreatePokemonDto) {
    return 'This action adds a new pokemon';
  }

  findAll(@Query() query: QueryPokemonDto): Observable<PokemonDto[]> {
    const api = new PokemonClient({ cacheOptions: { maxAge: this.cache } });
    const { offset, limit } = query;
    return from(api.listPokemons(offset, limit)).pipe(switchMap(pokemons => {
      const pokemonDetailsList: Observable<PokemonDto>[] = [];

      for (const pokemon of pokemons.results) {
        const pokemonDetails = from(api.getPokemonByName(pokemon.name)).pipe(map((pokemonDetail: Pokemon) => {
          return new PokemonDto(pokemonDetail);
        }))
        pokemonDetailsList.push(pokemonDetails)
      }
      return forkJoin(pokemonDetailsList);
    }));
  }

  findOne(id: number) {
    return `This action returns a #${id} pokemon`;
  }

  update(id: number, updatePokemonDto: UpdatePokemonDto) {
    return `This action updates a #${id} pokemon`;
  }

  remove(id: number) {
    return `This action removes a #${id} pokemon`;
  }
}
