import workInProgress from "../../public/work-in-progress.png";

export default function AdminDashboard() {
  return (
    <div className="flex items-center justify-center m-auto mt-32">
      <figure className="max-w-xs">
        <img className="h-auto max-w-full" src={workInProgress} />
      </figure>
    </div>
  );
}