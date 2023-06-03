import EvaluationIndividual from '../components/admininstrator/EvaluationIndividual';
import { getUserEvaluation } from '../data/admin.server';

export default function AdminEvaluationIndividualModal() {
    return (
            <EvaluationIndividual />
    );
}

export async function loader({request, params}) {
    const userInfo = await getUserEvaluation(params.evaluation_id);
    return userInfo;
}