import { Outlet } from "@remix-run/react";
import UserList from "../components/admininstrator/UserList";
import { getEvaluationUsers } from "../data/admin.server";

export default function EvaluationAdminPage() {
  return (
    <>
      <Outlet />
      <div className="flex flex-col mx-auto min-h-full w-full">
        <UserList />
      </div>
    </>
  );
}

export async function loader() {
  const users = await getEvaluationUsers();
  return users;
}