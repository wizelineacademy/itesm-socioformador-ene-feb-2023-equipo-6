
import { Outlet } from '@remix-run/react';
import wizetalk from '../wizetalk.png';
import LoginForm from "~/components/evaluation/LoginForm";
import WizelineHeader from '~/components/WizelineHeader';

export default function LoginPage() {

    return (
        <main>
            <WizelineHeader />
            <section className="flex min-h-screen bg-gradient-to-r from-white via-white via-60% to-wizeblue-100 to-60%">
            <container className="flex flex-row m-auto space-x-40">
                <LoginForm />
                <div className="flex items-center">
                    <div className="block max-w-lg p-6 bg-white border border-gray-200 rounded-lg shadow">
                    <img src={wizetalk} />
                    </div>
                </div>
            </container>
            </section>
        </main>
    );
}