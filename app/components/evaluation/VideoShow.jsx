import { useContext, useEffect, useRef, useState } from "react";
import { Configuration, OpenAIApi } from 'openai';
import { audioContext } from "../../routes/evaluation.question";
import { s3Upload } from "../aws/s3";

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
  const [seconds, setSeconds] = useState(0);
  const [videoBlob, setBlob] = useState(null); 
  const val = useContext(audioContext); 
  const [questionId, setQuestionId] = useState(null);

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
    setQuestionId(val.question.id);
    setIsRecording(true);
    console.log(val.question.max_time);
    console.log('Recording...'); 
    val.setIsRecording(true); 
  }

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  useEffect(
    function() {
      async function stopTimer(){
        await sleep(1000); 

        if(isRecording && seconds >= 0 && seconds < val.question.min_time){
          setSeconds(seconds + 1);
          console.log("Stop 1");
        }
        
        else if(seconds >= val.question.min_time && val.isNextAvailable == false && val.isRecording){
          console.log('Can Stop'); 
          val.setIsNextAvailable(true); 
          setSeconds(seconds + 1); 
          console.log("Stop 2");
        }

        else if(seconds >= val.question.min_time && val.isRecording && seconds < val.question.max_time){
          setSeconds(seconds + 1); 
          console.log("Stop 3");
        }

        else if(seconds >= val.question.min_time && seconds < val.question.max_time && !val.isRecording){
          stopRecording(); 
          console.log("Stop 4");
        }

        else if(seconds == val.question.max_time){
          console.log("Max time reached");
          stopRecording(); 
        }
      }
      
      stopTimer();
    }, [isRecording, seconds]
  )

  useEffect(
    function (){
      async function stopTimer(){
        await sleep(val.question.max_time*1000); 
        if(isRecording && val.question.max_time <= seconds){
          stopRecording(); 
          val.setIsNextAvailable(true); 
        }
      }

      console.log(val); 

      if(val.isAudioDone == true && val.isRecording == false && val.isNextAvailable == false){
        startRecording(); 
        //console.log('Question ', val.question);
        stopTimer(); 
        console.log('Recording'); 
      }
    }, [val]
  )




  useEffect(

    function () {
      const configuration = new Configuration({
        apiKey: "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",
    });
    //console.log(audioBlub);
      const openai = new OpenAIApi(configuration);

      const API_TOKEN = "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";
      const API_ENDPOINT = "https://api.openai.com/v1/audio/transcriptions";
  
        /*const res = await fetch(`https://api.openai.com/v1/audio/transcriptions`, {
          method: 'POST',
          headers: {
          "Authorization": `Bearer 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`,
          },
          body: blob
  });*/

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
      setBlob(blob);
      setAudioBlob(audioBlob); 

      const videoName = val.userId + '_' + questionId + '.mp4'; 
      const audioName = val.userId + '_' + questionId + '.mp3';
      console.log(questionId, val.question.audio_path);

      s3Upload(blob, videoName, val.env_val, val.userId, questionId); 
      
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
    },
    [isDataAvailable]
  );

  async function stopRecording() {
    if (!streamRecorderRef.current) {
      return;
    }
    streamRecorderRef.current.stop();
    setSeconds(0); 
    setIsRecording(false);
    val.setIsRecording(false); 
    console.log('Stop Recording'); 
    console.log(videoBlob);
    console.log('Stopped audioContext ', audioContext.audio)
    setIsDataAvailable(false);
    //s3Upload(videoBlob); 
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
      <a>{seconds}</a>
      <div>{error && <p>{error.message}</p>}</div>
    </div>
  );
}