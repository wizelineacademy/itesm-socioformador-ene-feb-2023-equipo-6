/* import { FiVolume2 } from "react-icons/fi"
import { BiTime } from "react-icons/bi" */
import { BsPlay, BsFillPlayFill } from "react-icons/bs";
import { Link } from "@remix-run/react";
import VideoShow from '~/components/evaluation/VideoShow';

import { useEffect, useState } from "react";
import useSound from "use-sound";
import audio from '../../../public/Chill.wav'


export default function QuestionPage() {

    const [isPlaying, setIsPlaying] = useState(false);
    const [seconds, setSeconds] = useState();
    const [play, { pause, duration, sound }] = useSound(audio);

    function playBtn() {
        setIsPlaying(true);
        play();
    }

    useEffect(() => {
        const interval = setInterval(() => {
            if (sound) {
                setSeconds(sound.seek([]));
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [sound]);

    return (
        <>
            <section>
                <div className="flex justify-center mx-[20%] py-5">
                    <h1 className="text-center font-sans text-lg font-bold">
                        Q1.    For this question, listen to the audio and once it has finished answer what has been asked.
                    </h1>
                    {/* <div className="flex">
                        <FiVolume2 />
                        <BiTime /><p>
                            14:01
                        </p>
                    </div> */}
                </div>
                <div className="flex justify-center drop-shadow-xl h-16 bg-white mx-[35%] items-center rounded-lg px-5">
                    {!isPlaying ?
                        (<button onClick={playBtn}>
                            <BsFillPlayFill size={40} color="#43C2FF" />
                        </button>)
                        : (
                            <BsPlay size={50} color="#43C2FF" />
                        )}
                    <input type="range" value={seconds} defaultValue={0} disabled="true" className="w-full" />
                </div>
                <div className="h-[30%] flex justify-center mx-[20%] my-5 rounded-md">                    <VideoShow />
                            <img src="https://elcomercio.pe/resizer/Ypm41sg9TDq9RJ9se2RDUKu5whY=/580x330/smart/filters:format(jpeg):quality(75)/cloudfront-us-east-1.images.arcpublishing.com/elcomercio/KOYACOEIZ5E4HN4TFJXQNTD4QM.jpg"/>
                </div>
                <div className="flex justify-center m-20">
                    <div className="inline-flex items-center px-4 py-2 mr-3 text-sm font-medium text-white bg-wizeblue-100 border border-gray-300 rounded-lg">
                        1 / 10
                    </div>
                    <Link className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700">
                        Next
                        <svg aria-hidden="true" className="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                    </Link>
                </div>
            </section >
        </>
    )
}