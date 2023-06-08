import { FiTrash2 } from 'react-icons/fi';
import { AiOutlineEdit } from 'react-icons/ai';
import { useState } from 'react';
import { Form } from '@remix-run/react';
import QuestionForm from './QuestionForm';


export default function QuestionContainer() {

    const [showModal, setShowModal] = useState(false);

    console.log(showModal);

    return (
        <>
            <div className="flex flex-col border-2 rounded-md border-black m-3.5 p-8 gap-5 bg-white">
                <div>
                    <label htmlFor="underline_select" className="sr-only">Underline select</label>
                    <select id="underline_select" className="block py-2.5 px-0 w-full text-sm text-black-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none focus:outline-none focus:ring-0 focus:border-gray-200 peer">
                        <option defaultValue>Choose a category</option>
                        <option value="English">English</option>
                        <option value="Front-End">Front-End</option>
                        <option value="Back-End">Back-End</option>
                        <option value="QA">Quality Assurance</option>
                    </select>
                </div>
                <div>
                    <button onClick={() => setShowModal(true)} className="bg-gray-300 rounded-sm w-20">Add</button>
                </div>
                <> {showModal ? (
                    <>
                        <div
                            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                        >
                            <div className="relative w-auto my-6 mx-auto max-w-3xl">
                                {/*content*/}
                                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                    {/*header*/}
                                    <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                        <h3 className="text-xl font-semibold">
                                            Add Question
                                        </h3>
                                        <button
                                            className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                            onClick={() => setShowModal(false)}
                                        >
                                            x
                                        </button>
                                    </div>
                                    {/*body*/}
                                    <div className="relative p-6 flex-auto">
                                        <QuestionForm />
                                    </div>
                                    {/*footer*/}
                                    <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                        <button
                                            className="text-black background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                            type="button"
                                            onClick={() => setShowModal(false)}
                                        >
                                            Close
                                        </button>
                                        <button
                                            className="bg-wizeblue-100 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                            type="button"
                                            onClick={() => setShowModal(false)}
                                        >
                                            Save Changes
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                    </>
                ) : null} </>
                <div>
                    <div className="relative overflow-x-auto shadow-md sm:rounded-sm">
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-200">
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
                            <tbody>
                                <tr className="bg-white border-b">
                                    <th scope="row" className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap">
                                        1
                                    </th>
                                    <td className="px-6 py-2">
                                        Introduction and goals.
                                    </td>
                                    <td className="px-6 py-2">
                                        10
                                    </td>
                                    <td className="px-6 py-2">
                                        60
                                    </td>
                                    <td className="px-6 py-2">
                                        120
                                    </td>
                                    <td className="px-6 py-2">
                                        <button><FiTrash2 /></button>
                                    </td>
                                    <td className="px-6 py-2">
                                        <button><AiOutlineEdit /></button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}