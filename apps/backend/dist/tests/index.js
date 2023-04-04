"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../app"));
describe("GET /", () => {
    it("responds with a 404 and error message in json", done => {
        (0, supertest_1.default)(app_1.default)
            .get("/")
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(404, { message: "Nothing to see here" }, done);
    });
});
