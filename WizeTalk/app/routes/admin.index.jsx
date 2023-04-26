import { Outlet } from "@remix-run/react";


export default function AdminMainPage() {
    return(
    <>
    <h1>Admin Menu</h1>
    <Outlet/>
    </>
    );
}