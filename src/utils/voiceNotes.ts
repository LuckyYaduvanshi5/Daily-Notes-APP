
// Voice recording utilities

export const startRecording = async (): Promise<MediaRecorder | null> => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream);
    const audioChunks: BlobPart[] = [];

    mediaRecorder.addEventListener('dataavailable', (event) => {
      audioChunks.push(event.data);
    });

    mediaRecorder.start();
    return mediaRecorder;
  } catch (error) {
    console.error('Error accessing microphone:', error);
    return null;
  }
};

export const stopRecording = (mediaRecorder: MediaRecorder): Promise<string> => {
  return new Promise((resolve) => {
    const audioChunks: BlobPart[] = [];

    mediaRecorder.addEventListener('dataavailable', (event) => {
      audioChunks.push(event.data);
    });

    mediaRecorder.addEventListener('stop', () => {
      const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
      const audioUrl = URL.createObjectURL(audioBlob);
      resolve(audioUrl);
    });

    mediaRecorder.stop();
    mediaRecorder.stream.getTracks().forEach(track => track.stop());
  });
};
