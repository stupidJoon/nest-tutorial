import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/Movie.entities';

@Injectable()
export class MoviesService {
    private movies: Array<Movie> = [];

    getAll(): Array<Movie> {
        return this.movies;
    }
    getOne(id: number): Movie {
        const movie = this.movies.find((movie) => { return movie.id == id; });
        if (!movie) {
            throw new NotFoundException(`Movie with ID ${id} not found`);
        }
        return movie;
    }
    deleteOne(id: number) {
        this.getOne(id);
        this.movies = this.movies.filter((movie) => { return movie.id !== id; });
        return this.movies;
    }
    create(movieData: CreateMovieDto) {
        this.movies.push({ id: this.movies.length + 1, ...movieData });
        return this.movies;
    }
    update(id: number, updateData: UpdateMovieDto) {
        const movie = this.getOne(id);
        this.deleteOne(id);
        this.movies.push({ ...movie, ...updateData });
    }
}
