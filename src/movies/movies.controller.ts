import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/Movie.entities';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
    constructor(private readonly moviesService: MoviesService) { }

    @Get()
    getAll(): Array<Movie> {
        return this.moviesService.getAll();
    }
    @Get('/:id')
    getOne(@Param('id') movieId: number): Movie {
        console.log(typeof movieId);
        return this.moviesService.getOne(movieId);
    }
    @Post()
    create(@Body() movieData: CreateMovieDto) {
        console.log(movieData)
        return this.moviesService.create(movieData);
    }
    @Delete('/:id')
    remove(@Param('id') movieId: number) {
        return this.moviesService.deleteOne(movieId);
    }
    @Put('/:id')
    update(@Param('id') movieId: number, @Body() updateData: UpdateMovieDto) {
        return this.moviesService.update(movieId, updateData);
    }
}
