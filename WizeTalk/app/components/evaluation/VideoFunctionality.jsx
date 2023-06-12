import { useContext, useEffect, useRef, useState } from "react";
import { Configuration, OpenAIApi } from 'openai';
import { audiosContext } from "../../routes/evaluation.questions";
import { s3Upload } from "../aws/s3";
import { getUserFromSession } from "../../data/auth.server";
import { Request } from "@remix-run/node";
import { getOutputAudio } from "../aws/getOutputAudio";
import { prismaTest } from "../aws/prismaTest";
import { useSubmit } from "@remix-run/react";

export default function WebCamRecord() {
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
  const [startRecordingState, setStartRecordingState] = useState(false); 
  const [seconds, setSeconds] = useState(0);
  const [videoBlob, setBlob] = useState(null); 
  const val = useContext(audiosContext); 
  const [questionId, setQuestionId] = useState(null);
  const [question, setQuestion] = useState(null); 
  const submit = useSubmit();

  //Start recording 
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
    setQuestion(val.question); 
    console.log('Recording...'); 
    val.setIsRecording(true); 
  }

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  //Function to make Next available including stopRecording 
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

  //Start recording after the audio is done and start the functionality to stop when the max time is reached
  useEffect(
    function (){
      async function stopTimer(){
        await sleep(val.question.max_time*1000); 
        if(isRecording && val.question.max_time <= seconds){
          stopRecording(); 
          val.setIsNextAvailable(true); 
        }
      }

      if(val.isAudioDone == true && val.isRecording == false && val.isNextAvailable == false){
        startRecording(); 
        //console.log('Question ', val.question);
        stopTimer(); 
        console.log('Recording'); 
      }
    }, [val]
  )



  //Create the final video and upload to S3
  useEffect(

    function () {

      async function trial(){
        s3Upload(blob, videoName, val.env_val, val.userId, question); 
        var formData = new FormData();
        formData.append("questionJSON", question); 
        formData.append("blob", blob); 
        formData.append("videoName", videoName); 
        formData.append("keys", val.env_val), 
        formData.append("user", val.userId), 
        formData.append("question", question.description);
        formData.append("questionId", question.id);  
        formData.append("transcript", 'Transcript in here'); 
        formData.append("scores", {"score": 5, "grammar": 4}); 
        formData.append("user", val.userId); 
        formData.append("questionId", question.id); 
        formData.append("questionCategory", question.categoria); 
        formData.append("questionValue", question.value); 
        formData.append("currentQuestion", val.currentQuestion); 
        submit(formData, {method: "POST"}); 
        /* if(smth == "COMPLETE"){
          const transcript = await s3GetTranscript(name, keys, question, user_id);
          console.log("El transcript de functionality: ", transcript); 
          const scores = await getEnglishScore(transcript, question, keys, _user_id); 
          console.log("Scores in functionality: ", scores); 
          console.log("Returned from s3Upload: ", smth); 
        }

        else{
          console.log("No pasó s3Upload"); 
        } */
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
      setBlob(blob);
      setAudioBlob(audioBlob); 

      const videoName = val.userId + '_' + questionId + '.mp4'; 

      console.log("Question in Functionality: ", question); 
      
      chunks.current = [];
      setIsDataAvailable(false);
      setIsAudioAvailable(true); 
      trial(); 
    },
    [isDataAvailable]
  );

  //Stop recording function 
  async function stopRecording() {
    if (!streamRecorderRef.current) {
      return;
    }
    streamRecorderRef.current.stop();
    setSeconds(0); 
    setIsRecording(false);
    val.setIsRecording(false); 
    console.log('Stop Recording'); 
    setIsDataAvailable(false);
  }

  //Function to get webcam and microphone
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
