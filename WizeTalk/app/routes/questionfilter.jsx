import { getCategoryQuestions } from "../data/admin.server";

export const action = async ({request}) => {
    const data = await request.json()
    console.log(data.option)
    return await getCategoryQuestions(data.option);
}

export async function loader() {
    const category_questions = await getCategoryQuestions("english");
    return category_questions;
}