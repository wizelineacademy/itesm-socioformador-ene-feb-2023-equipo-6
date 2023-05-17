import WizelineHeader from "../components/WizelineHeader";
import { Outlet, Link } from "@remix-run/react";
import wizetalk from "../../public/wizetalk.png"
import { RiHome2Line } from "react-icons/ri";
import { BsQuestionCircle } from "react-icons/bs";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { BiUserCircle } from "react-icons/bi";


export default function AdminStructurePage() {

    return (
        <>
            <section className="flex flex-col h-screen w-full">
                <WizelineHeader />
                <section className="flex h-screen">
                    <div className="w-[15%] p-3.5 bg-wizeblue-100 solid flex-col">
                        <div className="h-10">
                            <img src={wizetalk} />
                        </div>
                        <hr className="my-4" />
                        <div className="pl-3.5 space-y-3.5">
                            <Link to="/admin/dashboard">
                                <button className="flex space-x-2 decoration-white hover:underline">
                                    <RiHome2Line color="white" fontSize="1.5em" />
                                    <p className="text-white">Dashboard</p>
                                </button>
                            </Link>
                            <Link to="/admin/questions">
                                <div className="flex space-x-2 decoration-white hover:underline ">
                                    <BsQuestionCircle color="white" fontSize="1.5em" />
                                    <p className="text-white">Questions</p>
                                </div>
                            </Link>
                            <Link to="/admin/evaluate">
                            <div className="flex space-x-2 decoration-white hover:underline">
                                <HiOutlinePencilAlt color="white" fontSize="1.5em" />
                                <p className="text-white">Evaluate</p>
                            </div>
                            </Link>
                        </div>
                    </div>
                    <div className="w-full flex-1">
                        <div className="h-[4.5rem] flex bg-wizewhite-100 items-center">
                            <div className="flex flex-row w-full mx-[2rem] content justify-between">
                                <div className="font-bold text-xl">
                                    Questions
                                </div>
                                <div className="flex flex-row items-center text-xl gap-x-5">
                                    <BiUserCircle color="black" fontSize="1.5em" />
                                    Admin
                                </div>
                            </div>
                        </div>
                        <div className="flex bg-green-100">
                            <Outlet />
                        </div>
                    </div>
                </section>
            </section>
        </>
    );

}