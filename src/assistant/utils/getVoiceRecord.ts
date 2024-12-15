import DeviceDetector from "device-detector-js";

// Utility to initialize audio recording
const audioRecorder = {
  audioBlobs: [] as Blob[],
  mediaRecorder: null as MediaRecorder | null,
  streamBeingCaptured: null as MediaStream | null,

  async start() {
    if (!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia)) {
      throw new Error(
        "mediaDevices API or getUserMedia method is not supported in this browser."
      );
    }

    const deviceDetector = new DeviceDetector();
    const userAgent = navigator.userAgent;
    const device = deviceDetector.parse(userAgent);
    const isSafari = device.client?.name === "Mobile Safari";

    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    this.streamBeingCaptured = stream;
    this.mediaRecorder = new MediaRecorder(stream);
    this.audioBlobs = [];

    this.mediaRecorder.addEventListener("dataavailable", (event) => {
      this.audioBlobs.push(event.data);
    });

    this.mediaRecorder.start(isSafari ? 1000 : undefined);
  },

  stop() {
    return new Promise<Blob>((resolve) => {
      const mimeType = this.mediaRecorder?.mimeType;
      this.mediaRecorder?.addEventListener("stop", () => {
        const audioBlob = new Blob(this.audioBlobs, { type: mimeType });
        resolve(audioBlob);
      });
      this.cancel();
    });
  },

  cancel() {
    this.mediaRecorder?.stop();
    this.stopStream();
    this.resetRecordingProperties();
  },

  stopStream() {
    this.streamBeingCaptured?.getTracks().forEach((track) => track.stop());
  },

  resetRecordingProperties() {
    this.mediaRecorder = null;
    this.streamBeingCaptured = null;
  }
};

// Utility function to start the audio recording
export const startAudioRecording = async (
  onRecordingStart: (value: boolean) => void,
  onUnsupportedBrowser: (value: boolean) => void,
  setElapsedTime: (value: string) => void
) => {
  try {
    await audioRecorder.start();
    const audioRecordStartTime = new Date();
    if (onRecordingStart) {
      onRecordingStart(true);
    }
    handleElapsedRecordingTime(
      audioRecordStartTime,
      setElapsedTime,
      () => stopAudioRecording(null),
      1 // Maximum recording time in hours
    );
  } catch (error: unknown) {
    if (
      (error as Error).message.includes(
        "mediaDevices API or getUserMedia method is not supported in this browser."
      )
    ) {
      if (onUnsupportedBrowser) {
        onUnsupportedBrowser(true);
      }
    }
    console.error("Error starting recording: ", error);
  }
};

// Utility function to stop the recording
export const stopAudioRecording = async (
  addRecordingToPreviews: ((blob: Blob) => void) | null
) => {
  clearElapsedTimeTimer();
  const audioBlob = await audioRecorder.stop();
  if (addRecordingToPreviews) {
    addRecordingToPreviews(audioBlob);
  }
};

// Utility function to cancel the audio recording
export const cancelAudioRecording = () => {
  clearElapsedTimeTimer();
  audioRecorder.cancel();
};

// Utility function to handle elapsed recording time
let elapsedTimeTimer: ReturnType<typeof setInterval> | null = null;

export const handleElapsedRecordingTime = (
  startTime: Date,
  setElapsedTime: (value: string) => void,
  stopRecording: () => void,
  maximumRecordingTimeInHours: number
) => {
  clearElapsedTimeTimer();

  elapsedTimeTimer = setInterval(() => {
    const elapsedTime = computeElapsedTime(startTime);
    setElapsedTime(elapsedTime);

    if (
      elapsedTimeReachedMaximumNumberOfHours(
        elapsedTime,
        maximumRecordingTimeInHours
      )
    ) {
      stopRecording();
    }
  }, 1000);
};

const clearElapsedTimeTimer = () => {
  if (elapsedTimeTimer) {
    clearInterval(elapsedTimeTimer);
  }
};

// Utility function to compute elapsed time
export const computeElapsedTime = (startTime: Date) => {
  const endTime = new Date();
  let timeDiff = (endTime.getTime() - startTime.getTime()) / 1000;
  const seconds = Math.floor(timeDiff % 60);
  timeDiff = Math.floor(timeDiff / 60);
  const minutes = timeDiff % 60;
  const hours = Math.floor(timeDiff / 60);

  return hours > 0
    ? `${padLeft(hours, 2)}:${padLeft(minutes, 2)}:${padLeft(seconds, 2)}`
    : `${padLeft(minutes, 2)}:${padLeft(seconds, 2)}`;
};

// Utility function to check if the elapsed time reached the maximum number of hours
export const elapsedTimeReachedMaximumNumberOfHours = (
  elapsedTime: string,
  maximumRecordingTimeInHours: number
) => {
  const [hours] = elapsedTime.split(":");
  return parseInt(hours, 10) >= maximumRecordingTimeInHours;
};

// Utility function to pad numbers
export const padLeft = (num: number, size: number) =>
  num.toString().padStart(size, "0");
