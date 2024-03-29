import WizelineHeader from "../components/WizelineHeader";
import { Outlet, Link, useLocation } from "@remix-run/react";
import wizetalk from "../../public/wizetalk_white.png"
import { RiHome2Line, RiEditLine, RiQuestionLine, RiArrowLeftCircleFill } from "react-icons/ri";
import { BiUserCircle } from "react-icons/bi";

export default function AdminStructurePage() {

    const location = useLocation();

    function getPathHeader() {
        if (location.pathname === '/admin/dashboard') {
            return 'Dashboard';
        }
        else if (location.pathname === '/admin/questions') {
            return 'Question Overview';
        }
        else if (location.pathname === '/admin/evaluate') {
            return 'Evaluate Users';
        }
        //Needs to work for every path
        else if (location.pathname.includes('/admin/evaluate/')) {
            return (
                <div>
                    <Link to="/admin/evaluate">
                        <RiArrowLeftCircleFill fontSize="2em" color='#43C2FF' />
                    </Link>
                </div>
            );
        }
    }

    function getActiveTab() {
        if (location.pathname === '/admin/dashboard') {
            return 'Dashboard';
        }
        else if (location.pathname === '/admin/questions') {
            return 'Question Overview';
        }
        else if (location.pathname === '/admin/evaluate' || location.pathname.includes('/admin/evaluate/')) {
            return 'Evaluate Users';
        }
    }

    const pageHeader = getPathHeader();
    const activeTab = getActiveTab();

    return (
        <>
            <section className="flex flex-col h-screen w-full">
                <WizelineHeader />
                <section className="flex h-screen">
                    <div className="w-[15%] p-3.5 bg-wizeblue-100 solid flex-col">
                        <div className="h-[5%]">
                            <img src={wizetalk} />
                        </div>
                        <hr className="mt-2 mb-3" />
                        <div className="flex flex-col ml-2">
                            <div className="w-full p-3">
                                <Link to="/admin/dashboard">
                                    <button className="flex space-x-2 decoration-white hover:underline">
                                        <RiHome2Line color="white" fontSize="1.8rem" />
                                        <p className="text-white invisible md:visible text-xl">Dashboard</p>
                                    </button>
                                </Link>
                            </div>
                            <div className="p-3">
                                <Link to="/admin/questions">
                                    <button className="flex space-x-2 decoration-white hover:underline">
                                        <RiQuestionLine color="white" fontSize="1.8rem" />
                                        <p className="text-white invisible md:visible text-xl">Questions</p>
                                    </button>
                                </Link>
                            </div>
                            <div className="p-3">
                                <Link to="/admin/evaluate">
                                    <button className="flex space-x-2 decoration-white hover:underline">
                                        <RiEditLine color="white" fontSize="1.8rem" />
                                        <p className="text-white invisible md:visible text-xl">Evaluations</p>
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col w-full h-full flex-1">
                        <div className="flex bg-wizewhite-100 items-center p-1">
                            <div className="flex flex-row w-full mx-[2rem] content justify-between">
                                <div className="font-bold text-lg" id='header'>
                                    {pageHeader}
                                </div>
                                <div className="flex flex-row items-center text-xl gap-x-5">
                                    <BiUserCircle color="black" fontSize="1.5em" />
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col flex-1 w-full">
                            <Outlet />
                        </div>
                    </div>
                </section>
            </section>
        </>
    );

}