import { useEffect, useRef, useState } from "react";
import { Configuration, OpenAIApi } from 'openai';

export default function WebCamRecorder() {
  const [isRecording, setIsRecording] = useState(false);
  const [isDataAvailable, setIsDataAvailable] = useState(false);
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const streamRecorderRef = useRef(null);
  const chunks = useRef([]);
  const [audioAvailable, setIsAudioAvailable] = useState(false);
  const [downloadLink, setDownloadLink] = useState("");
  const [downloadAudioLink, setAudioDownloadLink] = useState("");
  const [audioSource, setAudioSource] = useState("");
  const [videoSource, setVideoSource] = useState("");
  const [audioSourceOptions, setAudioSourceOptions] = useState([]);
  const [videoSourceOptions, setVideoSourceOptions] = useState([]);
  const [error, setError] = useState(null);
  const [audioBlobFile, setAudioBlob] = useState(null);
  const [transcript, setTranscript] = useState("");

  function startRecording() {
    if (isRecording) {
      return;
    }
    if (!streamRef.current) {
      return;
    }
    streamRecorderRef.current = new MediaRecorder(streamRef.current);
    streamRecorderRef.current.start();
    streamRecorderRef.current.ondataavailable = function (event) {
      if (chunks.current) {
        chunks.current.push(event.data);
        setIsDataAvailable(true);
      }
    };
    setIsRecording(true);
  }

  useEffect(

    function () {
      const configuration = new Configuration({
        apiKey: "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",
    });
    //console.log(audioBlub);
      const openai = new OpenAIApi(configuration);
      
      //Async function to transcribe 
      async function trans(blob){
        const res = await openai.createTranscription(
          blob.stream(),
          "whisper-1"
        );
        /*const res = await fetch(`https://api.openai.com/v1/audio/transcriptions`, {
          method: 'POST',
          headers: {
          "Authorization": `Bearer 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`,
          },
          body: blob
  });*/
      console.log(res);
      }

      if (isRecording) {
        return;
      }
      if (chunks.current.length === 0 || !isDataAvailable) {
        return;
      }
      const blob = new Blob(chunks.current, {
        type: "video/mp4",
      });
      const audioBlob = new Blob(chunks.current, {
        type: "audio/mpeg"
      });
      setDownloadLink(URL.createObjectURL(blob));  
      setAudioDownloadLink(URL.createObjectURL(audioBlob));
      setAudioBlob(audioBlob); 
      //getTranscript(audioBlob);
      //Agregar función de WHISPER
      
      chunks.current = [];
      setIsDataAvailable(false);
      setIsAudioAvailable(true); 
      //var trans = getTranscript(audioBlob); 
      blob.lastModified = new Date(); 
      const myFile = new File([audioBlob], 'question.mpeg', {
        type: audioBlob.type,
    });

    var mp4Url = URL.createObjectURL(myFile); 
    const form = new FormData(); 
    form.append('file', audioBlob); 
    form.append('model', 'whisper-1'); 
    console.log(myFile);
    trans(audioBlob); 
    
    },
    [isDataAvailable]
  );

  async function stopRecording() {
    if (!streamRecorderRef.current) {
      return;
    }
    streamRecorderRef.current.stop();
    setIsRecording(false);
  }

  useEffect(
    function () {
      async function prepareStream() {
        function gotStream(stream) {
          streamRef.current = stream;
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        }

        async function getStream() {
          if (streamRef.current) {
            streamRef.current.getTracks().forEach((track) => {
              track.stop();
            });
          }
          const constraints = {
            audio: {
              deviceId: audioSource !== "" ? { exact: audioSource } : undefined,
            },
            video: {
              deviceId: videoSource !== "" ? { exact: videoSource } : undefined,
            },
          };
          try {
            const stream = await navigator.mediaDevices.getUserMedia(
              constraints
            );
            gotStream(stream);
          } catch (error) {
            setError(error);
          }
        }

        function getDevices() {
          return navigator.mediaDevices.enumerateDevices();
        }

        function gotDevices(deviceInfos) {
          const audioSourceOptions = [];
          const videoSourceOptions = [];
          for (const deviceInfo of deviceInfos) {
            if (deviceInfo.kind === "audioinput") {
              audioSourceOptions.push({
                value: deviceInfo.deviceId,
                label: deviceInfo.label || `Microphone ${deviceInfo.deviceId}`,
              });
            } else if (deviceInfo.kind === "videoinput") {
              videoSourceOptions.push({
                value: deviceInfo.deviceId,
                label: deviceInfo.label || `Camera ${deviceInfo.deviceId}`,
              });
            }
          }
          setAudioSourceOptions(audioSourceOptions);
          setVideoSourceOptions(videoSourceOptions);
        }

        await getStream();
        const mediaDevices = await getDevices();
        gotDevices(mediaDevices);
      }
      prepareStream();
    },
    [audioSource, videoSource]
  );

  return (
    <div>
      <div>
        <video className="h-72" ref={videoRef} autoPlay muted playsInline></video>
      </div>
      <div>{error && <p>{error.message}</p>}</div>
    </div>
  );
}