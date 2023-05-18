import { Form } from '@remix-run/react';
import { useCallback } from 'react';

export default function QuestionForm() {

    return (
        <Form method={'post'}>
            <div className='flex gap-x-20'>
                <div className='flex flex-col gap-y-5'>
                    <div className='flex flex-col'>
                        <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-90">Description</label>
                        <input type="text" id="title" name="title" required maxLength={60} className='block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300' />
                    </div>
                    <div>
                        <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-90">Instruction</label>
                        <textarea id="message" rows="3" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="Write instructions for this question..."></textarea>
                    </div>
                </div>
                <div className='flex flex-col gap-y-5'>
                    <div>
                        <label htmlFor="minTime" className="block mb-2 text-sm font-medium text-gray-90">Min Time: </label>
                        <input id="minTime" type='number' name="minTime" defaultValue={30} min="30" step="5" max="180" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300" />
                    </div>
                    <div>
                        <label htmlFor="maxTime" className="block mb-2 text-sm font-medium text-gray-90">Max Time: </label>
                        <input id="maxTime" type='number' name="maxTime" defaultValue={120} min="30" step="5" max="180" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300" />
                    </div>
                </div>
            </div>
            <div className='my-5'>
                <label htmlFor="voiceFile" className="block mb-2 text-sm font-medium text-gray-90">Add voice file:</label>
                <input id="voiceFile" type='file' accept=".mp3,audio/*"></input>
            </div>
        </Form>
    );
}