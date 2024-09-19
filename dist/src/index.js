"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const compression_1 = __importDefault(require("compression"));
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
const config_1 = __importDefault(require("../config"));
const router_1 = __importDefault(require("./v1/router"));
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use((0, cors_1.default)());
app.use((0, compression_1.default)());
app.use((0, cookie_parser_1.default)());
app.use(body_parser_1.default.json());
app.get("/", (req, res) => {
    res.send("welcome to api mongo ts");
});
app.use("/v1", router_1.default);
config_1.default.then(() => {
    console.log("Connected to MongoDB");
    // Only listen on port if in development mode
    if (process.env.NODE_ENV === "development") {
        app.listen(port, () => {
            console.log(`Server running in development mode at http://localhost:${port}`);
        });
    }
}).catch((err) => {
    console.error("Failed to connect to MongoDB:", err);
});
exports.default = app;
//# sourceMappingURL=index.js.map