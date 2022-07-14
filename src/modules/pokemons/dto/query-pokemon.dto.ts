
import { Transform } from 'class-transformer';
import {
    IsInt, IsOptional
} from 'class-validator';
import { toNumber } from 'src/shared/helpers/helpers';

const MAX_POKEMON = 1154;

export class QueryPokemonDto {
    @Transform(({ value }) => toNumber(value, { default: 0, min: 0, max: MAX_POKEMON - 1 }))
    @IsInt()
    @IsOptional()
    offset: number = 0;

    @Transform(({ value }) => toNumber(value, { default: 18, min: 18, max: MAX_POKEMON }))
    @IsInt()
    @IsOptional()
    limit: number = 18;
}