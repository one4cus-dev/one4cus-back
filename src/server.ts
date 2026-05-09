// src\server.ts
import { buildApp } from "./app.js";
import { appConfig } from "./config/app-config.js";

async function startServer() {
  try {
    const app = await buildApp();

    await app.listen({
      port: appConfig.port,
      host: appConfig.host
    });

    app.log.info(`Server running on host=${appConfig.host}, port=${appConfig.port}`);
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

void startServer();