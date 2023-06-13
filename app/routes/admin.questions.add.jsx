import QuestionForm from "../components/admininstrator/QuestionForm";
import Modal from '../components/Modal';
import { redirect } from "@remix-run/node";
import { addQuestion } from "../data/admin.server";

export default function AdminQuestionsAdd() {
    return (
        <Modal>
            <QuestionForm />
        </Modal>
    )
};

export async function action({ request }) {

    const formData = await request.formData();
    const questionData = Object.fromEntries(formData);

    try {
        //add validation
    } catch (error) {
        return error;
    }

    await addQuestion(questionData);
    
    return redirect('/admin/questions');
}