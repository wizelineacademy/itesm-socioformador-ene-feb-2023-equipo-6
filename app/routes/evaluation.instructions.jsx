import { Link } from "@remix-run/react"
import { requireUserSession } from "../data/auth.server";

export default function () {
    return (
        < >
            <container>
                <div className="mx-[25%] py-8">
                    <section className="flex items-center flex-col ">
                        <h1 className="font-bold text-lg">Instructions</h1>
                        <p className="text-center py-8">
                            During this evaluation you will be scored based on your ability to speak in a clear and coherent manner. Additionally you will be evaluated on the correct use of vocabulary and grammar.
                        </p>
                    </section>
                    <section>
                        <p className="pb-8">Instructions:</p>
                        <ol className="list-decimal list-inside space-y-1">
                            <li>You will have 30 minutes to complete a set of 10 questions.</li>
                            <li>All answers will be recorded on video for their evaluation, make sure your camera and microphone are working correctly and the room you are in is as silent as possible.</li>
                            <li>For each question, there will be an audio explaining it. You will have 15 seconds after the audio finishes to start developing your answer.</li>
                            <li>Be aware that not all questions are the same length, a message will be visible telling you the recommended length for the answer. </li>
                            <li>Once the timer of the question has finished, the answer you provided will be uploaded as your final answer.  </li>
                        </ol>
                    </section>
                    <div className="flex justify-between py-10">
                        <Link>
                            <span className="block w-32 bg-wizeblue-300 font-bold border-solid border-4 border-wizeblue-100 text-center rounded-md">
                                Test Video
                            </span>
                        </Link>
                        <Link to="/evaluation/question">
                            <span className="block w-32 bg-wizeblue-100 text-white font-bold border-solid border-4 border-wizeblue-100 rounded-md text-center">
                                Start Test
                            </span>
                        </Link>
                    </div>
                </div>
            </container>
        </ >
    );
}


export async function loader({ request }) {
    await requireUserSession(request);
    return null;
}