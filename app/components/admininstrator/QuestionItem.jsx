import { FiTrash2 } from "react-icons/fi";
import { AiOutlineEdit } from "react-icons/ai";
import { Link } from "@remix-run/react";
import { useFetcher } from "react-router-dom";


export default function QuestionItem({ index, description, value, minTime, maxTime, id }) {

    const fetcher = useFetcher();

    function deleteQuestionItemHandler() {
        /* const proceed = confirm("Are you sure you want to delete this question?");
        if (!proceed) {
            return;
        } */
        fetcher.submit(null, {
            method: "DELETE",
            action: `/admin/questions/${id}`
        });
    }

    return (
        <tr className="bg-white border-b w-full">
            <th scope="row" className="px-6 py-2 font-medium text-black whitespace-nowrap">
                {index}
            </th>
            <td className="px-6 py-2 w-full">
                {description}
            </td>
            <td className="px-6 py-2">
                {value}
            </td>
            <td className="px-6 py-2">
                {minTime}
            </td>
            <td className="px-6 py-2">
                {maxTime}
            </td>
            <td className="px-6 py-2">
                <button id="deletear" onClick={deleteQuestionItemHandler}><FiTrash2 /></button>
            </td>
            <td className="px-6 py-2">
                <Link to={`/admin/questions/${id}`}>
                    <AiOutlineEdit />
                </Link>
            </td>
        </tr>
    )
}