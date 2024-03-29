import { useLoaderData, useNavigate, useSubmit } from "@remix-run/react";
import { answeredQuestion, getStoredQuestions, unansweredQuestions } from "../data/questions.server"
import { requireUserSession } from "../data/auth.server";
import { BsPlay, BsFillPlayFill } from "react-icons/bs";
import VideoFunctionality from '../components/evaluation/VideoFunctionality';
import { createContext, useEffect, useState } from "react";
import useSound from "use-sound";
import { finishTest, saveSoftSkills, saveTechAnswers } from "../data/evaluation.server";
import { redirect } from "@remix-run/node";
import { s3GetTranscript } from "../components/aws/getTranscript";
import { getSoftSkills, getTechSkills } from "../data/openai";
import GeneratingResults from "../components/GeneratingResults";



export const audiosContext = createContext({isAudioDone: false})

export default function Questions(){
    const [_questions, userId, env_val, numberQuestion, count] = useLoaderData(); 
    //var question = questions[0];
    const [questions, setQuestions] = useState(_questions); 
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [currentQuestion, setCurrentQuestion] = useState(numberQuestion); 
    const [question, setQuestion] = useState(questions[0]); 
    const [isPlaying, setIsPlaying] = useState(false);
    const [seconds, setSeconds] = useState();
    const [audio, setAudio] = useState(question.audio_path); 
    const [isRecording, setIsRecording] = useState(false); 
    const [isAudioDone, setIsAudioDone] = useState(false); 
    const [isNextAvailable, setIsNextAvailable] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const submit = useSubmit(); 
    

    //Modificar el path del audio por el del servidor
    const [play, { pause, duration, sound }] = useSound(question.audio_path, {onend: () => {
        setIsAudioDone(true); 
    },});

    const navigate = useNavigate();

    async function playBtn() {
        setIsPlaying(true);
        setAudio(question.audio_path); 
        play();
    }

    useEffect(() => {
        if (currentQuestionIndex < questions.length) {
          setQuestion(questions[currentQuestionIndex]);
          setAudio(questions[currentQuestionIndex].audio_path);
        }
      }, [questions, currentQuestionIndex]);

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    useEffect(() => {
        const interval = setInterval(() => {
            if (sound) {
                setSeconds(sound.seek([]));
            }
        }, 500);
        return () => clearInterval(interval);
    }, [sound]);

    async function nextQuestion(){
        setIsNextAvailable(false); 
        setIsAudioDone(false); 
        if(isRecording){
            setIsRecording(false); 
        }
        if(currentQuestionIndex + 1 <= count){
            //question = questions[currentQuestionIndex + 1];
            setCurrentQuestionIndex(currentQuestionIndex + 1);  
            setCurrentQuestion(currentQuestion + 1); 
            setQuestion(questions[currentQuestionIndex + 1]); 
            setIsPlaying(false); 
        } 

    }

    async function endTest(){
        if(isRecording){
            setIsRecording(false); 
        }
        await smth(2000); 
        setIsLoading(true); 
    }

    return(
        <>
            {!isLoading ? (<section className="flex flex-col justify-between">
                <div className="my-[1%]">
                    <div className="flex justify-center mx-[20%] py-5">
                        <h1 className="text-center font-sans text-lg font-bold">
                            Q{currentQuestion}. {question.instruction}
                        </h1>
                    </div>

                    <div className="flex justify-center drop-shadow-xl h-16 bg-white mx-[35%] items-center rounded-lg px-5">
                        {!isPlaying ?
                            (<button onClick={playBtn}>
                                <BsFillPlayFill size={40} color="#43C2FF" />
                            </button>)
                            : (
                                <BsPlay size={40} color="#43C2FF" />
                            )}
                        <input className="w-[60%]" type="range" value={seconds} disabled={true} max={Math.ceil((duration / 1000))} />
                    </div>
                </div>

                <audiosContext.Provider value={{isAudioDone: isAudioDone, isRecording: isRecording, setIsRecording: setIsRecording, isNextAvailable: isNextAvailable, setIsNextAvailable: setIsNextAvailable, question:question, userId:userId, env_val: env_val, currentQuestion: currentQuestion}}>
                    <div className="flex justify-center my-[3%] rounded-md">
                        <VideoFunctionality/>
                    </div>       
                </audiosContext.Provider>

                <div className="flex justify-center">
                    <div className="flex items-center justify-center bg-wizeblue-100 rounded-md h-10 w-20 mr-40">
                        <div className="font-bold text-white text-center">{currentQuestion} / 7</div>
                    </div>
                    {(currentQuestion !== 7)?
                        <button disabled={!isNextAvailable} onClick={() => nextQuestion()} className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-wizeblue-100 hover:border-gray-300 border rounded-lg disabled:opacity-50">
                            Next {audiosContext.time}
                            <svg aria-hidden="true" className="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                        </button> : 
                        <button disabled={!isNextAvailable} onClick={() => endTest()} className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:border-gray-300 hover:text-gray-700">End Test</button>
                    }
                </div> 
                                

            </section>) : (<GeneratingResults />)}
        </>
    )
}

export async function loader({request}){
    
    const userId = await requireUserSession(request);
    var env = process.env; 

    const questions = await unansweredQuestions(userId); 
    var count = 0; 
    
    for(question in questions){
        count = parseInt(question) + 1; 
    }

    const numberQuestion = 7 - count + 1; 

    if(numberQuestion <= 7){
        return [questions, userId, env, numberQuestion, count];
    }

    else{
        return redirect('/evaluation/results'); 
    }

}

export async function action({request}){
    var env = process.env; 
    if(request.method == "PUT"){
        answeredQuestion(await getStoredQuestions()); 
        return redirect('/evaluation/questions'); 
    }

    else if(request.method == "POST"){
        const formData = await request.formData(); //Get the newNote Forms information
        const noteData = Object.fromEntries(formData);
         const blob = noteData.blob; 
        const videoName = noteData.videoName; 
        const keys = process.env; 
        const user = noteData.user; 
        const question = noteData.question;  
        const questionId = noteData.questionId; 
        const questionCategory = noteData.questionCategory; 
        const questionValue = noteData.questionValue; 
        
        await smth(20000); 

        const transcript = await s3GetTranscript(videoName, keys, question, user);
        if(questionCategory == "english"){
            const result = await getSoftSkills(transcript, question, keys, user); 
            await saveSoftSkills(questionId, user, result, transcript, videoName);
        }

        else{
            const result = await getTechSkills(transcript, question, keys, user, questionValue); 
            await saveTechAnswers(questionId, user, result, transcript, videoName);
        }
        if(noteData.currentQuestion == 7){
            await finishTest(env, user); 
            redirect('/evaluation/results'); 
        }

    }

    else{

    }
    return null; 
}


async function smth(n){
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
      }    
      await sleep(n); 
    return null; 
}