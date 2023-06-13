import UserListItem from "./UserListItem";
import { BiSearchAlt2 } from "react-icons/bi";
import { useLoaderData } from "@remix-run/react";

export default function UserList() {

    const users = useLoaderData();

    return (
        <>
            <div className='py-10 px-16'>
                <form className="flex w-full">
                    <div className="">
                        <input type="text" id="simple-search" className="bg-gray-50 text-gray-900 text-sm rounded-lg block w-full p-2" placeholder="Search user" />
                    </div>
                    <div className="flex justify-center pl-2.5">
                        <button>
                            <BiSearchAlt2 size="1.5rem" color="gray" />
                        </button>
                    </div>
                </form>
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                        <div className="overflow-hidden">
                            <table className="min-w-full text-left text-sm font-light">
                                <thead className="font-medium bg-wizeblue-50">
                                    <tr>
                                        <th scope="col" className="px-6 py-2">

                                        </th>
                                        <th scope="col" className="px-6 py-2">
                                            Nombre
                                        </th>
                                        <th scope="col" className="px-6 py-2">
                                            Score
                                        </th>
                                        <th scope="col" className="px-6 py-2">
                                            Tipo de Evaluación
                                        </th>
                                        <th scope="col" className="px-6 py-2">
                                            Estado
                                        </th>
                                        <th scope="col" className="px-6 py-2">

                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map((user, index) => (
                                        <UserListItem key={user.id}
                                            index={index + 1}
                                            name={user.name}
                                            lastname={user.lastname}
                                            score={user.overall}
                                            type={user.evaluation_type}
                                            state={user.status}
                                            id={user.id}
                                        />
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}