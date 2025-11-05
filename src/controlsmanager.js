/**
 * Gestiona los controles de audio, video y participantes.
 */
export class ControlsManager {
    constructor(peerManager) {
        this.peerManager = peerManager;
        this.toggleMicBtn = document.getElementById('toggleMicBtn');
        this.toggleCameraBtn = document.getElementById('toggleCameraBtn');
        this.participantCount = document.getElementById('participantCount');

        this.audioEnabled = true;
        this.videoEnabled = true;
        this.participantCountValue = 1;

        this.setupEventListeners();
    }

    setupEventListeners() {
        this.toggleMicBtn.addEventListener('click', () => this.toggleAudio());
        this.toggleCameraBtn.addEventListener('click', () => this.toggleVideo());
    }

    toggleAudio() {
        if (!this.peerManager.localStream) return;

        this.audioEnabled = !this.audioEnabled;
        this.peerManager.localStream.getAudioTracks().forEach(track => {
            track.enabled = this.audioEnabled;
        });

        this.updateMicButton();
    }

    toggleVideo() {
        if (!this.peerManager.localStream) return;

        this.videoEnabled = !this.videoEnabled;
        this.peerManager.localStream.getVideoTracks().forEach(track => {
            track.enabled = this.videoEnabled;
        });

        this.updateCameraButton();
    }

    updateMicButton() {
        if (this.audioEnabled) {
            this.toggleMicBtn.classList.remove('inactive');
            this.toggleMicBtn.title = 'Desactivar micrófono';
        } else {
            this.toggleMicBtn.classList.add('inactive');
            this.toggleMicBtn.title = 'Activar micrófono';
        }
    }

    updateCameraButton() {
        if (this.videoEnabled) {
            this.toggleCameraBtn.classList.remove('inactive');
            this.toggleCameraBtn.title = 'Desactivar cámara';
        } else {
            this.toggleCameraBtn.classList.add('inactive');
            this.toggleCameraBtn.title = 'Activar cámara';
        }
    }

    updateParticipantCount(count) {
        this.participantCountValue = count;
        const plural = count === 1 ? 'participante' : 'participantes';
        this.participantCount.textContent = `👥 ${count} ${plural}`;
    }

    addParticipant() {
        this.updateParticipantCount(this.participantCountValue + 1);
    }

    removeParticipant() {
        if (this.participantCountValue > 1) {
            this.updateParticipantCount(this.participantCountValue - 1);
        }
    }
}