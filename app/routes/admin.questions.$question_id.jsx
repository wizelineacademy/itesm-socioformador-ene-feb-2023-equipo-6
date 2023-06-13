import Modal from "../components/Modal";
import QuestionForm from "../components/admininstrator/QuestionForm";
import { deleteQuestion, updateQuestion } from "../data/admin.server";
import { redirect } from "@remix-run/node";

export default function UpdateQuestionsPage() {
    return (
        <Modal>
            <QuestionForm />
        </Modal>
    )
}

export async function action({ params, request }) {
    const questionId = params.question_id;
    if (request.method === 'PATCH') {

        const formData = await request.formData();
        const questionData = Object.fromEntries(formData);

        try {
            //validation
        } catch (error) {
            return error;
        }

        await updateQuestion(questionId, questionData);
        return redirect('/admin/questions');
    } else if (request.method === 'DELETE') {
        await deleteQuestion(questionId);
        return redirect('/admin/questions');
    }
}