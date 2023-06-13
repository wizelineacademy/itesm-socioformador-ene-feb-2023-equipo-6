import { useLoaderData, Form, useParams } from '@remix-run/react'
import { useEffect, useState } from 'react';
import { ImNotification } from 'react-icons/im';
import { s3Get } from '../aws/s3GetObject';

export default function EvaluationIndividual() {

    const data = useLoaderData();
    const params = useParams();

    const [questionIndex, setQuestionIndex] = useState(0);
    const [questionVideoURL, setQuestionVideoURL] = useState('');
    const [showTranscript, setShowTranscript] = useState(false);

    async function questionSelector() {
        try {
            const blob = await s3Get(data[0].Questions[questionIndex].video_path);
            setQuestionVideoURL(URL.createObjectURL(blob));
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        questionSelector(questionIndex);
    }, [questionIndex]);

    function addUppercase(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    return (
        <>
            <div className='h-full w-full px-10 py-2'>
                <div className='h-[5%] my-2'>
                    <h2 className='font-bold text-lg'>{data[0].name + " " + data[0].lastname}</h2>
                </div>
                <div className='flex flex-col flex-1'>
                    <div className='flex shadow border-l-4 border-wizeblue-100 rounded-sm p-3 justify-around mb-4'>
                        <div className='flex flex-col items-center'>
                            <div className='font-bold'>
                                General Score
                            </div>
                            <h3 className='text-xl font-bold text-green-700'>
                                {data[0].overall ? data[0].overall : "N/A"}
                            </h3>
                        </div>
                        <div className='flex flex-col items-center'>
                            <div className='font-bold'>
                                English Section
                            </div>
                            <h3 className='text-xl font-bold text-green-700'>
                                31/40
                            </h3>
                        </div>
                        <div className='flex flex-col items-center'>
                            <div className='font-bold'>
                                Technical Section
                            </div>
                            <h3 className='text-xl font-bold text-green-700'>
                                53/60
                            </h3>
                        </div>
                        <div className='flex flex-col items-center'>
                            <div className='font-bold'>
                                Main Soft Skills
                            </div>
                            {data[2].map((skill) => (
                                <div>{skill}</div>
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-row">
                        <div></div>
                        <div className='basis-1/5 shadow border-l-4 border-wizeblue-100 rounded-sm p-3 mr-10'>
                            <div className='flex-col'>
                                <button onClick={() => setQuestionIndex(0)} className='border w-full hover:bg-wizeblue-100 hover:text-white active:bg-wizeblue-100 p-1 hover'>Question 1</button>
                                <button onClick={() => setQuestionIndex(1)} className='border w-full hover:bg-wizeblue-100 hover:text-white active:bg-wizeblue-100 p-1 hover'>Question 2</button>
                                <button onClick={() => setQuestionIndex(2)} className='border w-full hover:bg-wizeblue-100 hover:text-white active:bg-wizeblue-100 p-1 hover'>Question 3</button>
                                <button onClick={() => setQuestionIndex(3)} className='border w-full hover:bg-wizeblue-100 hover:text-white active:bg-wizeblue-100 p-1 hover'>Question 4</button>
                                <button onClick={() => setQuestionIndex(4)} className='border w-full hover:bg-wizeblue-100 hover:text-white active:bg-wizeblue-100 p-1 hover'>Question 5</button>
                                <button onClick={() => setQuestionIndex(5)} className='border w-full hover:bg-wizeblue-100 hover:text-white active:bg-wizeblue-100 p-1 hover'>Question 6</button>
                                <button onClick={() => setQuestionIndex(6)} className='border w-full hover:bg-wizeblue-100 hover:text-white active:bg-wizeblue-100 p-1 hover'>Question 7</button>
                                <div className='p-3' />
                                <Form method='POST'>
                                    <input type='hidden' name='id' value={params.evaluation_id} />
                                    <button type='submit' value={1} className='border bg-green-800 text-white w-full hover:bg-green-600 hover:text-white p-1 hover'>Finish Grading</button>
                                </Form>
                            </div>
                        </div>
                        <div className='basis-4/5 shadow border-l-4 border-wizeblue-100 rounded-sm'>
                            {data && questionVideoURL ?
                                (
                                    <div className='w-full'>
                                        <div className='w-full bg-gray-100 flex font-bold p-1 pl-4'>
                                            <p>Question {questionIndex + 1}</p>
                                            <p className='ml-[30%]'>{addUppercase(data[1][questionIndex].categoria)} Section</p>
                                        </div>
                                        <div className='w-full py-3 px-5'>
                                            <p className='my-2'> <span className='font-bold'>Question Description:  </span>{data[1][questionIndex].description}</p>
                                            <div className='flex h-full'>
                                                <div className='flex basis-3/4 border mr-5 justify-center h-80'>
                                                    {questionVideoURL && <iframe className='rounded-lg w-full h-full' src={questionVideoURL} controls />}
                                                </div>
                                                <div className='basis-1/4 h-full w-full'>
                                                    <div className='mb-4'>
                                                        <p className='text-3xl font-bold mb-6'>Score</p>
                                                        <div className='flex ml-5'>
                                                            <Form method='patch' className='flex flex-col' >
                                                                <div className='flex'>
                                                                    <input type='hidden' name='id' value={data[0].Questions[questionIndex].id} />
                                                                    <input name='score' className='w-14 text-2xl border px-2 font-medium rounded-sm' type='number' key={data[0].Questions[questionIndex].score} defaultValue={data[0].Questions[questionIndex].score} />
                                                                    <p className='font-bold text-2xl text-center ml-5'>/{data[1][questionIndex].value}</p>
                                                                </div>
                                                                <div className='mt-5'>
                                                                    <button type='submit' className='h-10 text-white bg-green-800 hover:text-white font-medium rounded-md w-full'>Save</button>
                                                                </div>
                                                            </Form>
                                                        </div>
                                                    </div>
                                                    <div className='w-full mt-32'>
                                                        <button className='w-full h-10 text-white bg-gray-700 hover:bg-gray-300 font-medium px-5 rounded-sm' onClick={() => setShowTranscript(1)}>Show Transcript</button>
                                                        {showTranscript ?
                                                            (
                                                                <div className="h-full w-full overflow-y-auto fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center" onClick={() => setShowTranscript(0)}>
                                                                    <div
                                                                        className="shadow-lg rounded-md"
                                                                        onClick={(event) => event.stopPropagation()}
                                                                    >
                                                                        <div className="flex flex-col bg-white mx-auto max-w-xl rounded-md">
                                                                            <div className='bg-black text-white h-12 flex items-center w-full'>
                                                                                <div className='mx-10 flex justify-between w-full'>
                                                                                    <p className='font-bold overflow-x-auto'>Transcript</p>
                                                                                    <button className='font-bold' onClick={() => setShowTranscript(0)}>x</button>
                                                                                </div>
                                                                            </div>
                                                                            <div className='p-5 h-80'>
                                                                                <div>{data[0].Questions[questionIndex].transcript}</div>
                                                                                <br></br>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )
                                                            : null}
                                                    </div>
                                                    <div className='flex flex-col justify-between'>
                                                        {/* <div>
                                                            <p className='text-lg mb-2 font-semibold'>Skills Detected </p>
                                                            <ul className='text-sm'>
                                                                <li>Flexibility</li>
                                                                <li>Interpersonal Skills</li>
                                                            </ul>
                                                        </div> */}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ) :
                                (
                                    <div className='h-full p-5'>
                                        <div className='w-full grid place-items-center h-full'>
                                            <ImNotification color='gray' fontSize='3.5em' />
                                            <p className='font-bold text-gray-500'>No question was selected or no response has been recorded yet.</p>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div >
            </div>
        </>
    );

}