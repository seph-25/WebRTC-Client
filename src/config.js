/**
 * @file config.js
 * Configuración de la aplicación.
 * Los valores se cargan desde variables de entorno para mantener seguridad.
 */

const config = {
  // WebSocket server URL from environment variable
  // Fallback to localhost for development if not specified
  WEBSOCKET_URL: process.env.WEBSOCKET_URL || "ws://localhost:3000",

  // Server port
  PORT: process.env.PORT || 3000,

  // Environment mode
  NODE_ENV: process.env.NODE_ENV || "development",
};

export default config;
