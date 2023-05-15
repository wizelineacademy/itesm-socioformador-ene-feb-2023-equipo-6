import WizelineHeader from "../components/WizelineHeader";
import wizetalk from "../../public/wizetalk.png"
import { RiHome2Line } from "react-icons/ri";
import { BsQuestionCircle } from "react-icons/bs";
import { HiOutlinePencilAlt } from "react-icons/hi";

export default function AdminStructurePage() {

    return (
        <main>
            <WizelineHeader />
            <section className="flex h-screen">
                <div className="w-[15%] p-3.5 bg-wizeblue-100 solid flex-col">
                    <div>
                        <img src={wizetalk} />
                    </div>
                    <hr className="my-4" />
                    <div className="pl-3.5">
                        <div className="flex">
                            <RiHome2Line color="white" fontSize="1.5em" />
                            <p className="text-white">Dashboard</p>
                        </div>
                        <div className="flex">
                            <BsQuestionCircle color="white" fontSize="1.5em" />
                            <p className="text-white">Editar Preguntas</p>
                        </div>
                        <div className="flex">
                            <HiOutlinePencilAlt color="white" fontSize="1.5em" />
                            <p className="text-white">Evaluar</p>
                        </div>
                    </div>
                </div>
                <div className="bg-blue">
                    <div>
                        Evaluar
                    </div>
                </div>
            </section>
        </main>
    );

}