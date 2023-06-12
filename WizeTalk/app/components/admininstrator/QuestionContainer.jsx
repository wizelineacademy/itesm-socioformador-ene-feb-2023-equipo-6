import { useLoaderData } from '@remix-run/react';
import QuestionItem from './QuestionItem';
import { Link } from '@remix-run/react';
import { questionFilter } from '../../routes/admin.questions';
import { useState } from 'react';

export default function QuestionContainer() {
    let hasQuestions;
    const q = useLoaderData();
    const [questions, setQuestions] = useState(q);

    async function getFilteredQuestions(){
        const category = document.getElementById("underline_select").value;
        const filter = await questionFilter(category);
        setQuestions(filter);
    }

    // const getQuestions = async () => {
    //     const data = {
    //         option: 'english',
    //     }
    //     console.log(data);
    //     await fetch("/questionfilter", {
    //         method: "POST",
    //         body: JSON.stringify(data),
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //     });
    // }
    // const questions = getQuestions();
    // console.log(questions);
    var categoryQuestions;
    // questions.forEach(element => {
    //     if (element.categoria == document.getElementById("underline_select").value){
    //         categoryQuestions.push(element);
    //     }
    // });
    const hq = questions && questions.length > 0
    hasQuestions = hq;
    // setHasQuestions(hq);
    return (
        <>
            <div className="flex flex-col border-2 rounded-md border-black m-3.5 p-8 gap-5 bg-white">
                <div>
                    <label htmlFor="underline_select" className="sr-only">Underline select</label>
                    <select onChange = {getFilteredQuestions} id="underline_select" className="block py-2.5 px-0 w-full text-sm text-black-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none focus:outline-none focus:ring-0 focus:border-gray-200 peer">
                        <option defaultValue>Choose a category</option>
                        <option value="english">English</option>
                        <option value="frontend">Front-End</option>
                        <option value="backend">Back-End</option>
                        <option value="fullstack">Full-Stack</option>
                    </select>
                </div>
                <div>
                    <Link to="add">
                        <div className="bg-gray-200 rounded-sm w-20 text-center">Add</div>
                    </Link>
                </div>
                <div>
                    <div className="relative flex-none h-[20.5em] overflow-y-auto shadow-md sm:rounded-sm">
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-black uppercase bg-gray-200">
                                <tr>
                                    <th scope="col" className="px-6 py-2">
                                        Id
                                    </th>
                                    <th scope="col" className="px-6 py-2">
                                        Description
                                    </th>
                                    <th scope="col" className="px-6 py-2">
                                        Value
                                    </th>
                                    <th scope="col" className="px-6 py-2">
                                        Min Time
                                    </th>
                                    <th scope="col" className="px-6 py-2">
                                        Max Time
                                    </th>
                                    <th scope="col" className="px-6 py-2">

                                    </th>
                                    <th scope="col" className="px-6 py-2">

                                    </th>
                                </tr>
                            </thead>
                            <tbody className='text-black'>
                                {hasQuestions && questions.map((question, index) => (
                                    <QuestionItem key={question.id}
                                        index={index + 1}
                                        description={question.description}
                                        value={question.value}
                                        minTime={question.min_time}
                                        maxTime={question.max_time}
                                        id={question.id} />
                                ))}
                                {!hasQuestions && <tr className='text-center'><td colSpan={7}>No questions found</td></tr>}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}
