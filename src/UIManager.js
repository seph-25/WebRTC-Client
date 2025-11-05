const videoGrid = document.getElementById('videoGrid');

/**
 * Gestiona la creación y eliminación de elementos de video con etiquetas.
 */
export const UIManager = {
    createVideoElement: (userId) => {
        // Crear contenedor de video
        const videoContainer = document.createElement('div');
        videoContainer.id = `video-container-${userId}`;
        videoContainer.style.position = 'relative';
        videoContainer.style.borderRadius = '16px';
        videoContainer.style.overflow = 'hidden';

        // Crear video
        const videoElement = document.createElement('video');
        videoElement.id = `video-${userId}`;
        videoElement.autoplay = true;
        videoElement.playsInline = true;
        videoElement.style.width = '100%';
        videoElement.style.height = '100%';
        videoElement.style.objectFit = 'cover';
        videoElement.style.backgroundColor = 'black';
        videoElement.style.display = 'block';

        // Crear etiqueta de usuario
        const label = document.createElement('div');
        label.className = 'video-label';
        const shortId = userId.substring(0, 8);
        label.textContent = `👤 ${shortId}`;

        // Ensamblar
        videoContainer.appendChild(videoElement);
        videoContainer.appendChild(label);
        videoGrid.appendChild(videoContainer);

        return videoElement;
    },

    removeVideoElement: (userId) => {
        const videoContainer = document.getElementById(`video-container-${userId}`);
        if (videoContainer) {
            videoContainer.remove();
        }
    }
};