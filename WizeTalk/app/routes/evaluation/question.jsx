import { BsPlay, BsFillPlayFill } from "react-icons/bs";
import { useLoaderData, useNavigate } from "@remix-run/react";
import VideoShow from '~/components/evaluation/VideoShow';
import { useEffect, useState } from "react";
import useSound from "use-sound";
import { getQuestions } from "../../data/questions.server";

export default function QuestionPage() {

    const questions = useLoaderData();

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [seconds, setSeconds] = useState();
    const [audio, setAudio] = useState(questions[0].audio_path)

    const [play, { pause, duration, sound }] = useSound(audio);

    const navigate = useNavigate();

    const handleNextQuestionClick = () => {
        const nextQuestionIndex = currentQuestionIndex + 1;
        setAudio(questions[nextQuestionIndex].audio_path);
        setIsPlaying(false);
        setCurrentQuestionIndex(nextQuestionIndex);
        setSeconds(0);
    }

    function playBtn() {
        setIsPlaying(true);
        play();
    }

    const endTest = () => {
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
            <section>
                <div className="flex justify-center mx-[20%] py-5">
                    <h1 className="text-center font-sans text-lg font-bold">
                        Q{currentQuestionIndex + 1}. {questions[currentQuestionIndex].instructions}
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
                    <input type="range" value={seconds} disabled={true} max={Math.ceil((duration/1000))}/>
                </div>
                <div className="h-[30%] flex justify-center mx-[20%] my-5 rounded-md">                    <VideoShow />
                    <img src="https://elcomercio.pe/resizer/Ypm41sg9TDq9RJ9se2RDUKu5whY=/580x330/smart/filters:format(jpeg):quality(75)/cloudfront-us-east-1.images.arcpublishing.com/elcomercio/KOYACOEIZ5E4HN4TFJXQNTD4QM.jpg" />
                </div>
                <div className="flex justify-center m-20">
                    <div className="inline-flex items-center px-4 py-2 mr-3 text-sm font-medium text-white bg-wizeblue-100 border border-gray-300 rounded-lg">
                        {currentQuestionIndex + 1} / 10
                    </div>
                    {questions[currentQuestionIndex + 1] !== undefined ? 
                        <button onClick={() => handleNextQuestionClick()} className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700">
                        Next
                        <svg aria-hidden="true" className="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                        </button> :
                        <button onClick={() => endTest()} className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700">End Test</button>
                        }
                </div>
            </section >
        </>
    )
}

export async function loader() {
    const questions = await getQuestions();
    return questions;
}