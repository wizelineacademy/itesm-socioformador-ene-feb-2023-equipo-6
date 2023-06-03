import { useLoaderData } from '@remix-run/react'
import { useEffect, useState } from 'react';
import { ImNotification } from 'react-icons/im';
import { s3Get } from '../aws/s3GetObject';

export default function EvaluationIndividual() {

    const data = useLoaderData();

    const [questionIndex, setQuestionIndex] = useState(0);
    const [questionVideoURL, setQuestionVideoURL] = useState('');

    useEffect(() => {

    });

    async function questionSelector() {
        try {
            const blob = await s3Get(data[0].questions[questionIndex].video_path);
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
            <div className='w-full px-10 py-2'>
                <div className='my-2'>
                    <h2 className='font-bold text-lg'>{data[0].name + " " + data[0].lastname}</h2>
                </div>
                <div className='flex flex-col'>
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
                            <div className='text-sm text-green-700 font-bold'>
                                Problem Solving
                            </div>
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
                                <button className='border bg-green-800 text-white w-full hover:bg-green-600 hover:text-white p-1 hover'>Finish Grade</button>
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
                                            <div className='flex '>
                                                <div className='flex basis-3/4 border mr-5 justify-center h-80'>
                                                    {questionVideoURL && <iframe className='rounded-lg w-full h-full' src={questionVideoURL} controls />}
                                                </div>
                                                <div className='basis-1/4 px-4'>
                                                    <div className='mb-3'>
                                                        <p className='text-lg'>Score</p>
                                                        <p className='font-bold text-3xl text-center'>{data[0].questions[questionIndex].score}/{data[1][questionIndex].value}</p>
                                                    </div>
                                                    <div>
                                                        <p className='text-lg mb-2'>Skills Detected </p>
                                                        <ul className='font-bold text-sm'>
                                                            <li>Flexibility</li>
                                                            <li>Interpersonal Skills</li>
                                                        </ul>
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