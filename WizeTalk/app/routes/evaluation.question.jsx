import { BsPlay, BsFillPlayFill } from "react-icons/bs";
import { useLoaderData, useNavigate } from "@remix-run/react";
import VideoShow from '../components/evaluation/VideoShow';
import { createContext, useEffect, useState } from "react";
import useSound from "use-sound";
import { getQuestionsDB, getQuestionsJSON } from "../data/questions.server";
import { requireUserSession } from "../data/auth.server";
import { getUserInfo } from "../data/evaluation.server";
import { getEvaluationQuestions } from "../data/evaluation.server";

//export const audioContext = createContext({value: false, question: null, isNext:false}); 
export const audioContext = createContext({isAudioDone: false})

export default function QuestionPage() {

    const questions = useLoaderData();

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    // const [currentQuestionNumber, setCurrentQuestionNumber] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isDone, setIsDone] = useState(false); 
    const [seconds, setSeconds] = useState();
    const [audio, setAudio] = useState(questions[0].audio_path)
    const [isRecordingDone, setRecordingDone] = useState(false); 
    const [stopRecording, setStopRecording] = useState(false); 
    
    const [isRecording, setIsRecording] = useState(false); 
    const [isAudioDone, setIsAudioDone] = useState(false); 
    const [isNextAvailable, setIsNextAvailable] = useState(false); 


    const [play, { pause, duration, sound }] = useSound(audio, {onend: () => {
        console.log('Audio finished'); 
        setIsAudioDone(true); 
    },});

    const navigate = useNavigate();

    const handleNextQuestionClick = () => {
        const nextQuestionIndex = currentQuestionIndex + 1;
        // randomQuestionPicker = randomNoRepeats(questions);
        // randomPick = randomQuestionPicker();
        // const nextQuestionIndex = randomQuestionPicker.index;
        setAudio(questions[nextQuestionIndex].audio_path);
        setIsPlaying(false);
        setCurrentQuestionIndex(nextQuestionIndex);
        // setCurrentQuestionNumber(nextQuestionNumber);
        setSeconds(0);
        //setIsDone(false); 
        //setNext(false); 
        //setStopRecording(true);
        setIsAudioDone(false); 
        if(isRecording){
            setIsRecording(false); 
        }
        setIsNextAvailable(false); 
    }

    async function playBtn() {
        setIsPlaying(true);
        play();
        
    }

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    const endTest = async () => {
        if(isRecording){
            setIsRecording(false); 
        }
        setIsNextAvailable(false); 
        setIsPlaying(false);
        setIsAudioDone(false); 
        await sleep(3000);
        navigate('/evaluation/results');
    }

    useEffect(() => {
        const interval = setInterval(() => {
            if (sound) {
                setSeconds(sound.seek([]));
            }
        }, 500);
        return () => clearInterval(interval);
    }, [sound]);

    return (
        <>
            <section className="flex flex-col justify-between">
                <div className="my-[1%]">
                    <div className="flex justify-center mx-[20%] py-5">
                        <h1 className="text-center font-sans text-lg font-bold">
                            Q{currentQuestionIndex + 1}. {questions[currentQuestionIndex].instruction}
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
                
                <audioContext.Provider value={{isAudioDone: isAudioDone, isRecording: isRecording, setIsRecording: setIsRecording, isNextAvailable: isNextAvailable, setIsNextAvailable: setIsNextAvailable, question:questions[currentQuestionIndex], nextQuestion:handleNextQuestionClick}}>
                    <div className="flex justify-center my-[3%] rounded-md">
                        <VideoShow/>
                    </div>       
                </audioContext.Provider>


                <div className="flex justify-center">
                    <div className="inline-flex items-center px-4 py-2 mr-3 text-sm font-medium text-white bg-wizeblue-100 border border-gray-300 rounded-lg">
                        {currentQuestionIndex + 1} / {questions.length}
                    </div>
                    {questions[currentQuestionIndex + 1] !== undefined ?
                        <button onClick={() => handleNextQuestionClick()} className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700">
                            Next
                            <svg aria-hidden="true" className="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                        </button> :
                        <button onClick={() => endTest()} className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700">End Test</button>
                    }
                </div>
                <a>{isNextAvailable}</a>
            </section >
        </>
    )
}

export async function loader({request}) {
    const userId = await requireUserSession(request); 
    var questions = await getEvaluationQuestions(userId);

    console.log(questions);
    return questions;
}0