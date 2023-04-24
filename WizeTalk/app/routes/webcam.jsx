import { useEffect, useRef, useState } from "react";
import { useLoaderData } from '@remix-run/react';
import { Configuration, OpenAIApi } from 'openai';
import { json } from '@remix-run/node';
import { getQuestions } from '../data/questions';
import { getTranscript } from "../data/api";

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
      const myFile = new File([blob], 'question.mp4', {
        type: blob.type,
    });
    var mp4Url = URL.createObjectURL(myFile); 
    const form = new FormData(); 
    form.append('data', blob, 'video.mp4'); 
    getTranscript(blob);
    
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
        <select
          id="videoSource"
          name="videoSource"
          value={videoSource}
          onChange={(e) => setVideoSource(e.target.value)}
        >
          {videoSourceOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <div>
        <select
          id="audioSource"
          name="audioSource"
          value={audioSource}
          onChange={(e) => setAudioSource(e.target.value)}
        >
          {audioSourceOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <div>
        <video ref={videoRef} autoPlay muted playsInline></video>
      </div>
      <div>
        <button onClick={startRecording} disabled={isRecording}>
          Grabar
        </button>
        <button onClick={stopRecording} disabled={!isRecording}>
          Parar
        </button>
      </div>
      <div>
        {downloadLink && <video src={downloadLink} controls></video>}
        {downloadLink && (
          <a href={downloadLink} download="file">
            Descargar
          </a>
        )}
        {downloadAudioLink && <audio src={downloadAudioLink} controls></audio>}
        {downloadAudioLink && (
          <a href={downloadAudioLink} download="file">
            Descargar Audio
          </a>
        )}
        <p>{transcript}</p>
      </div>
      <div>{error && <p>{error.message}</p>}</div>
    </div>
  );
}