import { Outlet } from "@remix-run/react";
import QuestionContainer from "../components/admininstrator/QuestionContainer";
import { getCategoryQuestions, getAllQuestions } from "../data/admin.server";

export const questionFilter = async (category) => {
    const data = {
        option: category,
    }
    console.log(data);
    const a = await fetch("/questionfilter", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
        },
    });
    return await a.json();
    // console.log(res);
    // const questions = getQuestions();
}

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
     /* const category_questions = await getCategoryQuestions('english');
     return category_questions; */
    return await getAllQuestions();
}