
export default function AdminDashboard() {
  return (
    <>
      <div className="flex flex-col py-10 px-16 w-full h-full">
        <div className="h-full grid grid-cols-3 grid-rows-3 gap-5">
          <div className="border-4 shadow-md border-wizeblue-100 rounded-md"></div>
          <div className="border-4 shadow-md col-span-2 border-wizeblue-100 rounded-md"></div>
          <div className="border-4 shadow-md border-wizeblue-100 rounded-md"></div>
          <div className="border-4 shadow-md border-wizeblue-100 rounded-md"></div>
          <div className="border-4 shadow-md border-wizeblue-100 rounded-md"></div>
          <div className="col-span-3 border-4 shadow-md border-wizeblue-100 rounded-md"></div>
        </div>
      </div>
    </>
  );
}