import { Link } from "@remix-run/react";
import { MdPreview } from "react-icons/md";

export default function UserListItem({ index, name, lastname, score, type, state, id }) {

    function getType() {

        if (type === 1) {
            return "Front-End";
        }
        else if (type === 2) {
            return "Back-End";
        }
        else if (type === 3) {
            return "Full-Stack";
        }
    }

    function statusComponent() {
        if (state === 0 || state === 1) {
            return <div className="w-20 h-2 bg-yellow-400 rounded-lg" />;
        }
        else if (state === 2) {
            return <div className="w-20 h-2 bg-lime-400 rounded-lg" />;
        }
        else if (state === 3) {
            return <div className="w-20 h-2 bg-green-800 rounded-lg" />;
        }
        else if (state === 4) {
            return <div className="w-20 h-2 bg-red-800 rounded-lg" />;
        }
    }

    const statusComp = statusComponent();

    const isType = getType();

    return (
        <tr className="border-b transition duration-200 ease-in-out hover:bg-gray-100">
            <th scope="row" className="px-6 py-2 font-medium text-black whitespace-nowrap">
                {index}
            </th>
            <td className="whitespace-nowrap px-6 py-2 font-medium">
                {name + " " + lastname}
            </td>
            <td className="whitespace-nowrap px-6 py-2">
                {score ? score : "N/A"}
            </td>
            <td className="whitespace-nowrap px-6 py-2">
                {
                    isType
                }
            </td>
            <td className="whitespace-nowrap px-6 py-2">
                {statusComp}
            </td>
            <td className="whitespace-nowrap px-6 py-2">
                <Link to={`/admin/evaluate/${id}`}>
                    <MdPreview fontSize="1.8em" />
                </Link>
            </td>

        </tr>
    );
}