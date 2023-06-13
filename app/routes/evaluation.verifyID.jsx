import { Form, Link, useLoaderData } from "@remix-run/react"
import { requireUserSession } from "../data/auth.server";
import { getUserInfo, testStatus} from "../data/evaluation.server";
import { redirect } from "@remix-run/node";
import { prisma } from "../data/database.server";

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
                            <Form method='post' action="/logout" className="block w-32 bg-red-500 font-bold border-solid border-2 border-black text-center rounded-md text-white">
                                <button classname="text-center">Notify Error</button>
                            </Form>
                            <div className="w-20"></div>
                            {/* <Link to="/evaluation/instructions"> */}
                            <Form method='post' className="block w-32 bg-green-500 font-bold border-solid border-2 border-black text-center rounded-md text-white">
                                <button classname="text-center">Validate</button>
                            </Form>
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
    if (request.method !== 'POST') {
        throw json(
        {
            message: 'Invalid request method',
        },
            { status: 400 });
    }

    else{
        const userSession = await requireUserSession(request); 
    
        const userTest = await prisma.user.findUnique({
            where: {
                id: userSession,
            }
        }); 
    
        //Extraer preguntas por primera vez
        if(userTest.status == (0 || 1)){
            return redirect("/evaluation/instructions"); 
        }

        else{
            return redirect("/evaluation/results"); 
        }
    }
    
}

