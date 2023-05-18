
import wizetalk from '../../public/wizetalk.png';
import LoginForm from "~/components/evaluation/LoginForm";
import WizelineHeader from '~/components/WizelineHeader';

import { login } from '../data/auth.server';

export default function Index() {

    return (
        <main>
            <section className="flex flex-col h-screen w-full">
                <WizelineHeader />
                <section className="flex h-screen bg-gradient-to-r from-white via-white via-60% to-wizeblue-100 to-60%">
                    <container className="flex flex-row mx-[15%] space-x-40">
                        <div className='flex items-center'>
                            <LoginForm />
                        </div>
                        <div className="flex items-center">
                            <div className="block max-w-lg p-6 bg-white border border-gray-200 rounded-lg shadow">
                                <img src={wizetalk} />
                            </div>
                        </div>
                    </container>
                </section>
            </section>
        </main>
    );
}

export async function action({ request }) {

    const formData = await request.formData();
    const credentials = Object.fromEntries(formData);

    //return await login(credentials);

    try {
        return await login(credentials);
    } catch (error) {
        if (error.status === 422) {
            return { credentials: error.message };
        }
    }
}