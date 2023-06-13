import EvaluationIndividual from '../components/admininstrator/EvaluationIndividual';
import { getUserEvaluation, setScore, setEvaluationState } from '../data/admin.server';
import { redirect } from "@remix-run/node";

export default function AdminEvaluationIndividualModal() {
    return (
        <EvaluationIndividual />
    );
}

export async function loader({ request, params }) {
    const userInfo = await getUserEvaluation(params.evaluation_id);
    return userInfo;
}

export async function action({ request }) {

    if (request.method === 'PATCH') {

        const formData = await request.formData();
        const saveScore = Object.fromEntries(formData);

        try {
            setScore(saveScore);
        } catch (error) {
            console.log(error);
        }
        return null;
    }

    if (request.method === 'POST'){

        const formData = await request.formData();
        const evaluationID = Object.fromEntries(formData);

        try {
            setEvaluationState(evaluationID);
        } catch (error) {
            console.log(error);
            return error;
        }

        return redirect('/admin/evaluate');
    }

}
