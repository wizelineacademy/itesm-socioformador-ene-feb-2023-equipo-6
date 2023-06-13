import { destroyUserSession, getUserFromSession, requireUserSession } from "../data/auth.server";
import { useNavigate, Form, useLoaderData } from "@remix-run/react";
import CircularProgress from '@mui/joy/CircularProgress';
import { getUserInfo } from "../data/evaluation.server";
import { getUserQuestions } from "../data/questions.server";



export default function ResultPage() {

    const navigate = useNavigate();
    const data = useLoaderData();

    console.log(data[1]);

    return (
        <>
            <section className="mx-[20%]">
                <div className="my-[5%]">
                    <h1 className="font-bold text-xl">Your results, {data.name} {data.lastname}</h1>
                </div>
                <div className="border-solid border-black border-2 rounded-md">
                    <div className="flex justify-between mx-[15%] my-5">
                        <div className="flex flex-col">
                            <div>
                                <CircularProgress determinate value={data[0].grammar} size='lg'>
                                    <p>{data[0].grammar}</p>
                                </CircularProgress>
                            </div>
                            <div>Grammar</div>
                        </div>
                        <div className="flex flex-col">
                            <div>
                                <CircularProgress determinate value={data[0].vocabulary} size='lg'>
                                    <p>{data[0].vocabulary}</p>
                                </CircularProgress>
                            </div>
                            <div>Vocabulary</div>
                        </div>
                        <div className="flex flex-col">
                            <div>
                                <CircularProgress determinate value={data[0].coherance} size='lg'>
                                    <p>{data[0].coherance}</p>
                                </CircularProgress>
                            </div>
                            <div>Coherance</div>
                        </div>
                    </div>
                    <hr></hr>
                    <div className="flex justify-center p-[5%]">
                        <div className="mx-[10%]">
                            <h2 className="font-bold">Question Scores</h2>
                            <div className="flex justify-between">
                            <p className="font-bold">1</p><p>{data[1][1][0].subcategoria}</p>
                                <p>{data[1][0][0].score}/{data[1][1][0].value}</p>
                            </div>
                            <div className="flex justify-between">
                            <p className="font-bold">2</p><p>{data[1][1][1].subcategoria}</p>
                                <p>{data[1][0][1].score}/{data[1][1][1].value}</p>
                            </div>
                            <div className="flex justify-between">
                            <p className="font-bold">3</p><p>{data[1][1][2].subcategoria}</p>
                                <p>{data[1][0][2].score}/{data[1][1][2].value}</p>
                            </div>
                            <div className="flex justify-between">
                            <p className="font-bold">4</p><p>{data[1][1][3].subcategoria}</p>
                                <p>{data[1][0][3].score}/{data[1][1][3].value}</p>
                            </div>
                            <div className="flex justify-between">
                            <p className="font-bold">5</p><p>{data[1][1][4].subcategoria}</p>
                                <p>{data[1][0][4].score}/{data[1][1][4].value}</p>
                            </div>
                            <div className="flex justify-between">
                            <p className="font-bold">6</p><p>{data[1][1][5].subcategoria}</p>
                                <p>{data[1][0][5].score}/{data[1][1][5].value}</p>
                            </div>
                            <div className="flex justify-between">
                                <p className="font-bold">7</p><p>{data[1][1][6].subcategoria}</p>
                                <p>{data[1][0][6].score}/{data[1][1][6].value}</p>
                            </div>
                        </div>
                        <div className="mx-[10%]">
                            <div>
                                <h2 className="font-bold">Soft Skills Detected</h2>
                                {/* <p>1 { softSkills[0] } </p> */}
                                {/* <p>2 { softSkills[1] } </p> */}
                                {/* <p>3 { softSkills[2] } </p> */}
                            </div>
                            <div className="mt-5">
                                <h2 className="font-bold">Overall Score</ h2>
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
    return [userInfo, questions];

    //Necesito la informacion del usuario, los soft skills de la tabla de questions y obtener las descripciones de las preguntas que le tocaron al usuario.
}

