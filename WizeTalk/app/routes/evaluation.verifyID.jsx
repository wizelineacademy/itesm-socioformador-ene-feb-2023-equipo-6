import { Link, useLoaderData } from "@remix-run/react"
import { requireUserSession } from "../data/auth.server";
import { getUserInfo, testStatus} from "../data/evaluation.server";


export default function VerifyIdPage() {

    const user = useLoaderData();



    return (
        < >
            <div className="">
                <section className="h-screen flex items-center flex-col my-auto justify-center mt-[-7em]">
                    <h1 className="font-bold text-lg">Verify Your Credentials</h1>
                    <div className="border-4 border-black rounded-md p-4 mt-10">
                        <div className="my-4">
                            <div className="flex">
                                <p className="font-bold mr-4">
                                    Name:
                                </p>
                                <p>
                                    {user.name}
                                </p>
                            </div>
                            <div className="flex">
                                <p className="font-bold mr-4">
                                    Lastname:
                                </p>
                                <p>
                                    {user.lastname}
                                </p>
                            </div>
                        </div>
                        <div className="mt-4 flex justify-around">
                            <Link>
                                <span className="block w-32 bg-red-500 font-bold border-solid border-2 border-black text-center rounded-md text-white">
                                    Notify Error
                                </span>
                            </Link>
                            <div className="w-20"></div>
                            {/* <Link to="/evaluation/instructions"> */}
                            <form method="post">
                                <button type = "submit" className="block w-32 bg-green-500 font-bold border-solid border-2 border-black text-center rounded-md text-white">
                                    Validate
                                </button>
                            </form>
                            {/* </Link> */}
                        </div>
                    </div>
                </section>
            </div>
        </ >
    );
}

export async function loader({ request }) {
    const userId = await requireUserSession(request);    
    const userInfo = await getUserInfo(userId);
    
    return userInfo;
}
export async function action({ request }) {
    return await testStatus(request);

    //     const updateStatus = await prisma.user.update({
    //         where: {id: userId}
    //     });
    //     return null;
}

