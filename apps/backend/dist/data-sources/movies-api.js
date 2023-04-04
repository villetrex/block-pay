"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoviesAPI = void 0;
const datasource_rest_1 = require("@apollo/datasource-rest");
class MoviesAPI extends datasource_rest_1.RESTDataSource {
    constructor() {
        super(...arguments);
        this.baseURL = "https://movies-api.example.com/";
    }
    getMovie(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.get(`movies/${encodeURIComponent(id)}`);
        });
    }
    getMostViewedMovies(limit = "10") {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.get("movies", {
                params: {
                    per_page: limit,
                    order_by: "most_viewed",
                },
            });
            return data.results;
        });
    }
}
exports.MoviesAPI = MoviesAPI;
