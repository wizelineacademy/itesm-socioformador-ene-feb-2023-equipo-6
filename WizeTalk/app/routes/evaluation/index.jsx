import { Outlet } from "@remix-run/react";
import WizelineHeader from "../../components/WizelineHeader";


export default function EvaluationMainPage() {
    return(
    <>
    <WizelineHeader />
    <Outlet/>
    </>
    );
}