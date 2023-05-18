import { destroyUserSession, requireUserSession } from "../data/auth.server";
import { useNavigate, Form, useLoaderData } from "@remix-run/react";
import { getUserInfo, getSoftSkills } from "../data/evaluation.server";



export default function ResultPage() {
    
    const navigate = useNavigate();
    const user = useLoaderData()[0];
    const softSkills = useLoaderData()[1];


    function endTest() {
        destroyUserSession({ request })
        navigate('/evaluation/results');
    }

    function randomNum(min,max){
        return Math.floor(Math.random() * (max - min + 1) ) + min;
    }


    return (
        <>
            <section className="mx-[20%]">
                <div className="my-[5%]">
                    <h1 className="font-bold text-xl">Your Results, { user.name } { user.lastname }</h1>
                </div>
                <div className="border-solid border-black border-2 rounded-md">
                    <div className="flex justify-between mx-[15%] my-5">
                        <div className="flex flex-col">
                            <div>
                                <h1 className="text-center">{ randomNum(70, 99) } %</h1>
                            </div>
                            <div>Grammar</div>
                        </div>
                        <div className="flex flex-col">
                        <div>
                                <h1 className="text-center">{ randomNum(70, 99) } %</h1>
                            </div>
                            <div>Pronunciation</div>
                        </div>
                        <div className="flex flex-col">
                        <div>
                                <h1 className="text-center">{ randomNum(70, 99) } %</h1>
                            </div>
                            <div>Fluency</div>
                        </div>
                    </div>
                    <hr></hr>
                    <div className="flex justify-center p-[5%]">
                        <div className="mx-[10%]">
                            <h2 className="font-bold">Technical Scores</h2>
                            <div className="flex justify-between">
                                <p>1</p>
                                <p>{ randomNum(9, 15) }/15</p>
                            </div>
                            <div className="flex justify-between">
                                <p>2</p>
                                <p>{ randomNum(7, 10) }/10</p>
                            </div>
                            <div className="flex justify-between">
                                <p>3</p>
                                <p>{ randomNum(7, 10) }/10</p>
                            </div>
                            <div className="flex justify-between">
                                <p>4</p>
                                <p>{ randomNum(7, 10) }/10</p>
                            </div>
                            <div className="flex justify-between">
                                <p>5</p>
                                <p>{ randomNum(7, 10) }/10</p>
                            </div>
                        </div>
                        <div className="mx-[10%]">
                            <div>
                                <h2 className="font-bold">Soft Skills Detected</h2>
                                <p>1 { softSkills[0] } </p>
                                <p>2 { softSkills[1] } </p>
                                <p>3 { softSkills[2] } </p>
                            </div>
                            <div className="mt-5">
                                <h2 className="font-bold">Overall Score</ h2>
                                <div className="flex bg-wizeblue-100 rounded-md h-10 items-center justify-center">
                                    <p className="text-center text-white font-bold ">
                                        { randomNum(70, 99) } / 100
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex justify-end my-[4%]">
                <Form method='post' action="/logout" className="w-1/5 h-10 bg-wizeblue-100 text-white font-bold rounded-md flex justify-center">
                    <button classname="text-center">End Test</button>
                </Form>
                </div>
            </section>
        </>
    );
}

export async function loader({ request }) { 
    const userId = await requireUserSession(request);
    const userInfo = await getUserInfo(userId);
    const softSkills = await getSoftSkills();
    console.log(softSkills);
    return [userInfo, softSkills];
}