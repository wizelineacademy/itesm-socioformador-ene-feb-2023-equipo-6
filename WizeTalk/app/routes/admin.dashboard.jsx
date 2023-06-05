import { useState, useEffect } from "react";
import LineChart from "../components/admininstrator/LineChart";
import { getDashboardData } from "../data/admin.server";
import { useLoaderData } from "react-router-dom";

export default function AdminDashboard() {

  const data = useLoaderData();

  console.log(data);

  const UserData = [
    {
      id: 1,
      year: 2016,
      userGain: 80000,
      userLost: 823,
    },
    {
      id: 2,
      year: 2017,
      userGain: 45677,
      userLost: 345,
    },
    {
      id: 3,
      year: 2018,
      userGain: 78888,
      userLost: 555,
    },
    {
      id: 4,
      year: 2019,
      userGain: 90000,
      userLost: 4555,
    },
    {
      id: 5,
      year: 2020,
      userGain: 4300,
      userLost: 234,
    },
  ];

  const [userData, setUserData] = useState({
    labels: UserData.map((data) => data.year),
    datasets: [{
      label: "User Scores",
      data: UserData.map((data) => data.userLost),
    }]
  });

  return (
    <>
      <div className="flex flex-col py-10 px-16 w-full h-full">
        <div className="h-full grid grid-cols-3 grid-rows-3 gap-5">
          <div className="border-4 shadow-md border-wizeblue-100 rounded-md py-4 px-6 flex flex-row justify-between items-center">
            <div className="font-bold">
              <p className="text-md text-center">AI Evaluated</p>
              <p className="text-center text-3xl">43</p>
            </div>
            <div className="font-bold">
              <p className="text-md text-center">Pending Revisions</p>
              <p className="text-center text-3xl">10</p>
            </div>
          </div>
          <div className="flex flex-row items-center justify-between px-12 border-4 shadow-md col-span-2 border-wizeblue-100 rounded-md font-bold">
              <div className="text-center text-md">
                <p>87/100</p>
                <p>English</p>
              </div>
              <div className="text-center text-md">
                <p>87/100</p>
                <p>Front-End</p>
              </div>
              <div className="text-center text-md">
                <p>56/100</p>
                <p>Back-End</p>
              </div>
              <div className="text-center text-md">
                <p>77/100</p>
                <p>Full Stack</p>
              </div>
          </div>
          <div className="border-4 row-span-2 shadow-md border-wizeblue-100 rounded-md">
            <p>Recent Scores</p>

          </div>
          <div className="border-4 col-span-2 row-span-2 shadow-md border-wizeblue-100 rounded-md p-6">
            <LineChart chartData={userData} />
          </div>
        </div>
      </div>
    </>
  );
}


export async function loader(){
  const dashBoardData = await getDashboardData();
  console.log(dashBoardData);

  return dashBoardData;
}