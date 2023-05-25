

export default function UserListItem({index, name, score, type, state}){
 
    return(
        <tr className="border-b transition duration-200 ease-in-out hover:bg-gray-100">
            <th>
                {index}
            </th>
            <td className="whitespace-nowrap px-6 py-2 font-medium">
                {name}
            </td>
            <td className="whitespace-nowrap px-6 py-2">
                {score}
            </td>
            <td className="whitespace-nowrap px-6 py-2">
                {type}
            </td>
            <td className="whitespace-nowrap px-6 py-2">
                {state}
            </td>

        </tr>
    );
}