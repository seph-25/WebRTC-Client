/**
 * @file VideoConferenceApp.js
 * Clase principal que orquesta toda la aplicación de videoconferencia.
 * Integra WebRTC, WebSocket, UI, Chat y Controles.
 */
import config from "./config.js";
import { PeerConnectionManager } from "./PeerConnectionManager.js";
import { WebSocketManager } from "./WebSocketManager.js";
import { WebRTCManager } from "./WebRTCManager.js";
import { UIManager } from "./UIManager.js";
import { ChatManager } from "./chatmanager.js";
import { ControlsManager } from "./controlsmanager.js";

export class VideoConferenceApp {
  constructor(localVideoElement) {
    this.localVideoElement = localVideoElement;
    this.peerManager = new PeerConnectionManager();
    this.wsManager = new WebSocketManager(config.WEBSOCKET_URL);
    this.rtcManager = new WebRTCManager(
      this.peerManager,
      UIManager,
      this.wsManager
    );
    this.chatManager = new ChatManager(this.wsManager);
    this.controlsManager = new ControlsManager(this.peerManager);
  }

  async start() {
    this.peerManager.setRtcManager(this.rtcManager);

    await this.setupLocalMedia();
    this.registerWebSocketHandlers();
    this.wsManager.connect();
  }

  async setupLocalMedia() {
    try {
      const stream = await this.peerManager.setupLocalStream();
      this.localVideoElement.srcObject = stream;
      console.log("Stream local obtenido y listo.");
      this.updateConnectionStatus(true);
    } catch (error) {
      console.error("Error al configurar el stream local:", error);
      alert(
        "No se pudo acceder a la cámara y al micrófono. Por favor, verifica los permisos y refresca la página."
      );
      throw error;
    }
  }

  registerWebSocketHandlers() {
    this.wsManager.onMessage("assign-id", (message) => {
      console.log("Evento recibido: assign-id", message);
      this.rtcManager.setMyUserId(message.userId);
      this.chatManager.setMyUserId(message.userId);
      console.log(`ID de usuario asignado: ${message.userId}`);
    });

    this.wsManager.onMessage("user-joined", (message) => {
      console.log("Procesando evento: user-joined", message);
      this.rtcManager.handleUserJoined(message.userId);
      this.controlsManager.addParticipant();
    });

    this.wsManager.onMessage("existing-users", (message) => {
      console.log("Procesando evento: existing-users", message);
      message.userIds.forEach((userId) =>
        this.rtcManager.handleUserJoined(userId)
      );
      this.controlsManager.updateParticipantCount(message.userIds.length + 1);
    });

    this.wsManager.onMessage("user-left", (message) => {
      console.log("Procesando evento: user-left", message);
      this.rtcManager.handleUserLeft(message.userId);
      this.controlsManager.removeParticipant();
    });

    this.wsManager.onMessage("offer", (message) => {
      console.log("Procesando evento: offer (oferta)", message);
      this.rtcManager.handleOffer(message.fromUserId, message.offer);
    });

    this.wsManager.onMessage("answer", (message) => {
      console.log("Procesando evento: answer (respuesta)", message);
      this.rtcManager.handleAnswer(message.fromUserId, message.answer);
    });

    this.wsManager.onMessage("ice-candidate", (message) => {
      console.log("Procesando evento: ice-candidate (candidato ICE)", message);
      this.rtcManager.handleIceCandidate(message.fromUserId, message.candidate);
    });
  }

  updateConnectionStatus(connected) {
    const statusIndicator = document.getElementById("statusIndicator");
    const statusText = document.getElementById("statusText");

    if (connected) {
      statusIndicator.classList.add("connected");
      statusText.textContent = "Conectado";
    } else {
      statusIndicator.classList.remove("connected");
      statusText.textContent = "Desconectado";
    }
  }
}
