# WebRTC Video Conference Client

Una aplicación de videoconferencia en tiempo real usando WebRTC y WebSockets.

## 🚀 Configuración Inicial

### Requisitos
- Node.js 18+ 
- npm, yarn o pnpm

### Instalación

1. **Clonar el repositorio**
```bash
git clone https://github.com/seph-25/WebRTC-Client.git
cd WebRTC-Client
```

2. **Instalar dependencias**
```bash
pnpm install
# o si usas npm/yarn:
# npm install
# yarn install
```

3. **Configurar variables de entorno**
```bash
# Copiar el archivo de ejemplo
cp .env.example .env
```

4. **Editar `.env` con tus valores**
```env
WEBSOCKET_URL=https://tu-servidor-websocket.com
PORT=3000
NODE_ENV=development
```

### Ejecución

**Modo Desarrollo**
```bash
pnpm start
```

La aplicación estará disponible en `http://localhost:3000`

## 📁 Estructura del Proyecto

```
src/
├── index.html                 # Interfaz HTML principal
├── script.js                  # Punto de entrada del cliente
├── config.js                  # Configuración centralizada
├── VideoConferenceApp.js      # Orquestador principal
├── WebSocketManager.js        # Gestión de WebSocket
├── WebRTCManager.js           # Gestión de WebRTC
├── PeerConnectionManager.js   # Gestión de conexiones P2P
└── UIManager.js              # Gestión de interfaz
```

## 🔒 Seguridad

- ❌ **NUNCA** commitees el archivo `.env` con credenciales reales
- ✅ Usa `.env.example` como plantilla para otros desarrolladores
- ✅ Las variables de entorno se cargan desde `.env` en desarrollo
- ✅ En producción, configura las variables en tu plataforma (Azure, Heroku, etc.)

## 🔧 Variables de Entorno Disponibles

| Variable | Descripción | Valor Defecto |
|----------|-------------|---------------|
| `WEBSOCKET_URL` | URL del servidor WebSocket | `ws://localhost:3000` |
| `PORT` | Puerto del servidor Express | `3000` |
| `NODE_ENV` | Entorno de ejecución | `development` |

## 📝 Notas

- El proyecto usa módulos ES6 (`import`/`export`)
- La configuración está centralizada en `src/config.js`
- Todas las conexiones pasan por la capa de WebSocket para señalización

## 📄 Licencia

ISC

---

**¿Necesitas ayuda?** Contacta al equipo de desarrollo.
