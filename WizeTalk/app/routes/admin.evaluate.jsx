import workInProgress from "../../public/work-in-progress.png";
import UserList from "../components/admininstrator/UserList";


export default function EvaluationAdminPage() {
  return (
    <>
      <div className="flex flex-col mx-auto mt-3.5 min-h-full">
        <UserList />
      </div>
    </>
  );
}