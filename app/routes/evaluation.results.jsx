import { destroyUserSession, getUserFromSession, requireUserSession } from "../data/auth.server";
import { useNavigate, Form, useLoaderData } from "@remix-run/react";
import CircularProgress from '@mui/joy/CircularProgress';
import { getUserInfo } from "../data/evaluation.server";
import { getUserQuestions } from "../data/questions.server";



export default function ResultPage() {

    const navigate = useNavigate();
    const data = useLoaderData();

    function addUppercase(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    return (
        <>
            <section className="mx-[20%]">
                <div className="my-[3%]">
                    <h1 className="font-bold text-xl">Your results, {data[0].name} {data[0].lastname}</h1>
                </div>
                <div className="border-solid border-black border-2 rounded-md">
                    <div className="flex justify-between mx-[15%] my-5">
                        <div className="flex flex-col items-center">
                            <div>
                                <CircularProgress determinate variant="outlined" value={data[0].grammar} size='lg'>
                                    <p>{data[0].grammar}%</p>
                                </CircularProgress>
                            </div>
                            <div className="font-bold text-lg mt-2">Grammar</div>
                        </div>
                        <div className="flex flex-col items-center">
                            <div>
                                <CircularProgress determinate variant="outlined" value={data[0].vocabulary} size='lg'>
                                    <p>{data[0].vocabulary}%</p>
                                </CircularProgress>
                            </div>
                            <div className="font-bold text-lg mt-2">Vocabulary</div>
                        </div>
                        <div className="flex flex-col items-center">
                            <div>
                                <CircularProgress determinate variant="outlined" value={data[0].coherence} size='lg'>
                                    <p>{data[0].coherence}%</p>
                                </CircularProgress>
                            </div>
                            <div className="font-bold text-lg mt-2">Coherance</div>
                        </div>
                    </div>
                    <hr className="mx-[10%]"></hr>
                    <div className="flex p-[5%] mx-[10%]">
                        <div className="mr-10">
                            <h2 className="font-bold text-xl mb-2">Question Scores</h2>
                            <div className="flex justify-between">
                                <p className="mr-10">{data[1][1][0].subcategoria}</p>
                                <p className="font-bold ml-5">{data[1][0][0].score}/{data[1][1][0].value}</p>
                            </div>
                            <div className="flex justify-between">
                                <p className="mr-10">{data[1][1][1].subcategoria}</p>
                                <p className="font-bold">{data[1][0][1].score}/{data[1][1][1].value}</p>
                            </div>
                            <div className="flex justify-between">
                                <p className="mr-10">{data[1][1][2].subcategoria}</p>
                                <p className="font-bold">{data[1][0][2].score}/{data[1][1][2].value}</p>
                            </div>
                            <div className="flex justify-between">
                                <p className="mr-10">{data[1][1][3].subcategoria}</p>
                                <p className="font-bold">{data[1][0][3].score}/{data[1][1][3].value}</p>
                            </div>
                            <div className="flex justify-between">
                                <p className="mr-10">{data[1][1][4].subcategoria}</p>
                                <p className="font-bold">{data[1][0][4].score}/{data[1][1][4].value}</p>
                            </div>
                            <div className="flex justify-between">
                                <p className="mr-10">{data[1][1][5].subcategoria}</p>
                                <p className="font-bold">{data[1][0][5].score}/{data[1][1][5].value}</p>
                            </div>
                            <div className="flex justify-between">
                                <p className="mr-10">{data[1][1][6].subcategoria}</p>
                                <p className="font-bold">{data[1][0][6].score}/{data[1][1][6].value}</p>
                            </div>
                        </div>
                        <div className="">
                            <div>
                                <h2 className="font-bold text-xl mb-2">Soft Skills Detected</h2>
                                {data[2].map((skill) => (
                                    <div>{addUppercase(skill)}</div>
                                ))}
                            </div>
                            <div className="mt-5">
                                <h2 className="font-bold text-xl mb-2">Overall Score</ h2>
                                <div className="flex bg-wizeblue-100 rounded-md h-10 items-center justify-center">
                                    <p className="text-center text-white font-bold ">
                                        {data[0].overall} / 100
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex justify-end my-[4%]">
                    <Form method='post' action="/logout" className="w-1/5 h-10 bg-wizeblue-100 text-white font-bold rounded-md flex justify-center">
                        <button className="text-center">End Test</button>
                    </Form>
                </div>
            </section>
        </>
    );
}

export async function loader({ request }) {
    const userId = await getUserFromSession(request);
    const questions = await getUserQuestions(userId);
    const userInfo = await getUserInfo(userId);

    const softSkills = userInfo.softskills.split(',');

    return [userInfo, questions, softSkills];
    //Necesito la informacion del usuario, los soft skills de la tabla de questions y obtener las descripciones de las preguntas que le tocaron al usuario.
}

