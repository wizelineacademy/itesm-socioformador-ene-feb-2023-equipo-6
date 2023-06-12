import { Outlet } from "@remix-run/react";
import QuestionContainer from "../components/admininstrator/QuestionContainer";
import { getCategoryQuestions } from "../data/admin.server";


export default function AdminQuestionsPage() {

    return (
        <>
            <section className="flex flex-col m-auto py-10 px-16">
                <QuestionContainer />
                <Outlet />
            </section>
        </>
    );
}

export async function loader() {
    const category_questions = await getCategoryQuestions("english");
    return category_questions;
}