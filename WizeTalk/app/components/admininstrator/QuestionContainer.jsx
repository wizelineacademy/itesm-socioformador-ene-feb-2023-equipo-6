import { FiTrash2 } from 'react-icons/fi';
import {AiOutlineEdit} from 'react-icons/ai';


export default function QuestionContainer() {

    return (
        <>
            <div className="flex flex-col border-2 rounded-md border-black m-3.5 p-8 gap-5 bg-white">
                <div>
                    <label for="underline_select" class="sr-only">Underline select</label>
                    <select id="underline_select" class="block py-2.5 px-0 w-full text-sm text-black-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none focus:outline-none focus:ring-0 focus:border-gray-200 peer">
                        <option selected>Choose a category</option>
                        <option value="English">English</option>
                        <option value="Front-End">Front-End</option>
                        <option value="Back-End">Back-End</option>
                        <option value="QA">Quality Assurance</option>
                    </select>
                </div>
                <div>
                    <button className="bg-gray-300 rounded-sm w-20">Add</button>
                </div>
                <div>
                    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead class="text-xs text-gray-700 uppercase bg-gray-200">
                                <tr>
                                    <th scope="col" class="px-6 py-3">
                                        Id
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Description
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Value
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Min Time
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Max Time
                                    </th>
                                    <th scope="col" class="px-6 py-3">

                                    </th>
                                    <th scope="col" class="px-6 py-3">

                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr class="bg-white border-b">
                                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                        1
                                    </th>
                                    <td class="px-6 py-4">
                                        Introduction and goals.
                                    </td>
                                    <td class="px-6 py-4">
                                        10
                                    </td>
                                    <td class="px-6 py-4">
                                        60
                                    </td>
                                    <td class="px-6 py-4">
                                        120
                                    </td>
                                    <td class="px-6 py-4">
                                        <button><FiTrash2 /></button>
                                    </td>
                                    <td class="px-6 py-4">
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