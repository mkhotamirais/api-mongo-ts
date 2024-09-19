"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MONGO_URL = void 0;
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const compression_1 = __importDefault(require("compression"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const router_1 = __importDefault(require("./v1/router"));
exports.MONGO_URL = "mongodb+srv://mkhotami:mkhotami@mydbcluster.zlvfqus.mongodb.net/api-mongo-ts?retryWrites=true&w=majority";
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use((0, compression_1.default)());
app.use((0, cookie_parser_1.default)());
app.use(body_parser_1.default.json());
const server = http_1.default.createServer(app);
app.get("/", (req, res) => {
    res.send("hello");
});
app.use("/v1", router_1.default);
server.listen(8080, () => {
    console.log("Server is running on http://localhost:8080");
});
mongoose_1.default.Promise = Promise;
mongoose_1.default.connect(exports.MONGO_URL).then(() => console.log("MongoDB connected"));
mongoose_1.default.connection.on("error", (error) => console.log(error));
//# sourceMappingURL=index.js.map