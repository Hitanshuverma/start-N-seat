const apiKey: string = '1291e26ff4b56d38513688f0f8b511e4';

export const baseImagePath = (size : string, path : string)=>{
    return `https://image.tmdb.org/t/p/${size}${path}`
}

export const nowPlayingMovies: string = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}`;

export const upcomingMovies: string = `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}`;

export const popularMovies: string = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`;

export const topRatedMovies: string = `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}`;


export const searchMovies = (keyword : string) => {
    return `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${keyword}`
};

export const movieDetails = (id : number) => {
    return `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`;
};

export const movieCastDetails = (id : number) => {
    return `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apiKey}`;
};
