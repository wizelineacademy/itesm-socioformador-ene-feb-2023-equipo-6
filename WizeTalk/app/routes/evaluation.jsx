import { Outlet } from "@remix-run/react";
import WizelineHeader from "../components/WizelineHeader";
import { getUserFromSession, requireUserSession } from "../data/auth.server";

export default function EvaluationMainPage() {
    return(
    <>
    <WizelineHeader />
    <Outlet/>
    </>
    );
}

export async function loader({ request }) {
    await requireUserSession(request);

    return getUserFromSession(request);
}