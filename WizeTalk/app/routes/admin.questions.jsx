import { useLoaderData } from "@remix-run/react";
import QuestionContainer from "../components/admininstrator/QuestionContainer";


export default function AdminQuestionsPage() {

    return (
        <>
            <section className="flex flex-col m-auto">
                Question Overview
                <QuestionContainer />
            </section>
        </>
    );
}