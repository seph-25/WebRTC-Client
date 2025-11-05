/**
 * Gestiona el chat en vivo de la videoconferencia.
 */
export class ChatManager {
    constructor(wsManager) {
        this.wsManager = wsManager;
        this.messages = [];
        this.myUserId = null;
        this.chatPanel = document.getElementById('chatPanel');
        this.chatMessages = document.getElementById('chatMessages');
        this.chatInput = document.getElementById('chatInput');
        this.sendChatBtn = document.getElementById('sendChatBtn');
        this.toggleChatBtn = document.getElementById('toggleChatBtn');
        this.closeChatBtn = document.getElementById('closeChatBtn');

        this.setupEventListeners();
        this.registerMessageHandlers();
    }

    setupEventListeners() {
        this.sendChatBtn.addEventListener('click', () => this.sendMessage());
        this.chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });

        this.toggleChatBtn.addEventListener('click', () => {
            this.chatPanel.classList.toggle('hidden');
        });

        this.closeChatBtn.addEventListener('click', () => {
            this.chatPanel.classList.add('hidden');
        });
    }

    setMyUserId(userId) {
        this.myUserId = userId;
    }

    setTargetUser(userId) {
        this.targetUserId = userId;
    }

    sendMessage() {
        const text = this.chatInput.value.trim();
        if (!text) return;

        // Enviar a través de WebSocket a todos los usuarios
        this.wsManager.send({
            type: 'chat-message',
            text: text,
            userId: this.myUserId,
            timestamp: new Date().toISOString()
        });

        // Mostrar localmente
        this.addMessage({
            text: text,
            userId: this.myUserId,
            isLocal: true,
            timestamp: new Date().toISOString()
        });

        this.chatInput.value = '';
        this.scrollToBottom();
    }

    addMessage(message) {
        this.messages.push(message);

        const messageEl = document.createElement('div');
        messageEl.className = `chat-message ${message.isLocal ? 'local' : 'remote'}`;

        const shortUserId = message.userId.substring(0, 8);
        const author = message.isLocal ? 'Tú' : shortUserId;

        messageEl.innerHTML = `
            <span class="author">${author}</span>
            ${message.text}
        `;

        this.chatMessages.appendChild(messageEl);
        this.scrollToBottom();
    }

    scrollToBottom() {
        setTimeout(() => {
            this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
        }, 0);
    }

    registerMessageHandlers() {
        this.wsManager.onMessage('chat-message', (message) => {
            if (message.userId !== this.myUserId) {
                this.addMessage({
                    text: message.text,
                    userId: message.userId,
                    isLocal: false,
                    timestamp: message.timestamp
                });
            }
        });
    }

    clear() {
        this.messages = [];
        this.chatMessages.innerHTML = '';
    }
}