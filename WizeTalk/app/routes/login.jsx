
import wizetalk from '../wizetalk.png';
import LoginForm from "~/components/evaluation/LoginForm";
import WizelineHeader from '~/components/WizelineHeader';

export default function LoginPage() {

    return (
        <main>
            <WizelineHeader />
            <section class="flex min-h-screen bg-gradient-to-r from-white via-white via-60% to-wizeblue-100 to-60%">
            <container class="flex flex-row m-auto space-x-40">
                <LoginForm />
                <div class="flex items-center">
                    <div class="block max-w-lg p-6 bg-white border border-gray-200 rounded-lg shadow">
                    <img src={wizetalk} />
                    </div>
                </div>
            </container>
            </section>
        </main>
    );
}