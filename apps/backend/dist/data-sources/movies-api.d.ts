import { RESTDataSource } from "@apollo/datasource-rest";
export declare class MoviesAPI extends RESTDataSource {
    baseURL: string;
    getMovie(id: string): Promise<any>;
    getMostViewedMovies(limit?: string): Promise<any[]>;
}
//# sourceMappingURL=movies-api.d.ts.map