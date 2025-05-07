"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = handler;
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("./swagger");
let server;
let isReady = false;
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        cors: true,
    });
    app.set('trust proxy', true);
    (0, swagger_1.setupSwagger)(app);
    await app.listen(process.env.PORT || 3303);
    server = app.getHttpServer();
    isReady = true;
    return app;
}
async function handler(req, res) {
    if (!isReady)
        await bootstrap();
    return server(req, res);
}
bootstrap();
//# sourceMappingURL=main.js.map