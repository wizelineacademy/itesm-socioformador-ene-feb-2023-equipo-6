import { Form, useNavigate, Link, useParams, useMatches, useNavigation } from '@remix-run/react';


export default function QuestionForm() {

    const navigation = useNavigation();

    const params = useParams();

    const matches = useMatches();
    const questions = matches.find((match) => match.id === 'routes/admin.questions').data;
    const questionData = questions.find((question) => question.id === Number(params.question_id));

    if (params.id && !expenseData) {
        return <p>Invalid Question</p>;
    }

    const defaultValues = questionData ? {
        description: questionData.description,
        value: questionData.value,
        minTime: questionData.min_time,
        maxTime: questionData.max_time,
        instruction: questionData.instruction,
        category: questionData.categoria,
    } : {
        description: '',
        value: '',
        minTime: '',
        maxTime: '',
        instruction: '',
        category: '',
    };

    const isSubmitting = navigation.state !== 'idle';

    return (
        <Form method={questionData ? 'patch' : 'post'} id='questionForm'>
            <div
                className="justify-center items-center flex">
                <div className="">
                    {/*content*/}
                    <div className="flex flex-col">
                        {/*header*/}
                        <div className="flex items-start p-5 border-b border-solid border-slate-200">
                            <h3 className="text-xl font-semibold">
                                {questionData ? 'Edit Question' : 'Add Question'}
                            </h3>
                        </div>
                        {/*body*/}
                        <div className="relative p-6 flex-auto">
                            <div className='flex gap-x-20'>
                                <div className='flex flex-col gap-y-5'>
                                    <div className='flex flex-col'>
                                        <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-90">Category</label>
                                        <select required id="category" name="category" maxLength={60} className='block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300'>
                                            <option value=''>Select a category</option>
                                            <option value='english'>English</option>
                                            <option value='front-end'>Front End</option>
                                            <option value="back-end">Back End</option>
                                            <option value="database">Database</option>
                                            <option value="devops">DevOps</option>
                                            <option value="qa">Quality Assurance</option>
                                        </select>
                                    </div>
                                    <div className='flex flex-col'>
                                        <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-90">Description</label>
                                        <input required form='questionForm' type="text" id="description" name="description" maxLength={45} className='block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300' defaultValue={defaultValues.description} />
                                    </div>
                                    <div>
                                        <label htmlFor="instruction" className="block mb-2 text-sm font-medium text-gray-90">Instruction</label>
                                        <textarea required name='instruction' id="instruction" rows="3" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300" placeholder="Write instructions for this question..." defaultValue={defaultValues.instruction}></textarea>
                                    </div>
                                </div>
                                <div className='flex flex-col gap-y-5'>
                                    <div>
                                        <label htmlFor="minTime" className="block mb-2 text-sm font-medium text-gray-90">Min Time: </label>
                                        <input required id="minTime" type='number' name="minTime" defaultValue={defaultValues.minTime} min="30" step="5" max="180" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300" />
                                    </div>
                                    <div>
                                        <label htmlFor="maxTime" className="block mb-2 text-sm font-medium text-gray-90">Max Time: </label>
                                        <input required id="maxTime" type='number' name="maxTime" defaultValue={defaultValues.maxTime} min="30" step="5" max="180" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300" />
                                    </div>
                                    <div>
                                        <label htmlFor="value" className="block mb-2 text-sm font-medium text-gray-90">Value: </label>
                                        <input required id="value" type='number' name="value" defaultValue={defaultValues.value} min="1" step="1" max="10" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300" />
                                    </div>
                                </div>
                            </div>
                            <div className='my-5'>
                                <label htmlFor="voiceFile" className="block mb-2 text-sm font-medium text-gray-90">Add voice file:</label>
                                <input id="voiceFile" type='file' accept=".mp3,audio/*"></input>
                            </div>
                        </div>
                        {/*footer*/}
                        <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                            <Link to="..">
                                <div
                                    className="text-black background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                >
                                    Close
                                </div>
                            </Link>
                            <button
                                className="bg-wizeblue-100 text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg mr-1 mb-1 ease-linear transition-all duration-150"
                                type="submit"
                            >
                                {isSubmitting ? 'Submitting...' : questionData ? 'Update' : 'Add'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Form>
    );
}