import EvaluationIndividual from '../components/admininstrator/EvaluationIndividual';
import { getUserEvaluation } from '../data/admin.server';

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

        console.log(saveScore);

        try {
            //validation
        } catch (error) {
            return error;
        }

        return null;
    }

}
