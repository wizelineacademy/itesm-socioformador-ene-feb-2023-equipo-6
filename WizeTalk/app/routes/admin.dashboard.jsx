import { useState, useEffect } from "react";
import LineChart from "../components/admininstrator/LineChart";
import { getDashboardData } from "../data/admin.server";
import { useLoaderData, Link, useNavigate } from "react-router-dom";
import { RiArrowRightSFill } from "react-icons/ri";
import CircularProgress from '@mui/joy/CircularProgress';

export default function AdminDashboard() {

  const data = useLoaderData();
  const fecha = new Date(data[3][0].date_finished).getMonth() + 1;
  console.log(fecha);

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
    labels: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
    datasets: [
      {
      data: [
        [90, 10],
        [80, 5],
        [70, 10],
        [60, 5],
      ],
      }
    ],
});

  return (
    <>
      <container className="flex flex-col py-10 px-16 w-full max-h-full">
        <div className="h-full grid grid-cols-3 grid-rows-3 gap-5">
          <div className="border-4 shadow-md border-gray-100 rounded-md px-6 flex flex-row justify-between items-center box-border">
            <div className="font-bold">
              <p className="text-md text-center">AI Evaluated</p>
              <p className="text-center text-3xl">{data ? data[0] : 'NA'}</p>
            </div>
            <div className="font-bold">
              <p className="text-md text-center">Pending Revisions</p>
              <p className="text-center text-3xl">{data ? data[0] - data[1] : 'NA'}</p>
            </div>
          </div>
          <div className="flex flex-row box-border items-center justify-between px-12 border-4 shadow-md col-span-2 border-gray-100 rounded-md font-bold">
            <div className="text-center text-md">
              <CircularProgress determinate value={87} />
              <p>87/100</p>
              <p>English</p>
            </div>
            <div className="text-center text-md">
              <CircularProgress determinate value={87} />
              <p>87/100</p>
              <p>Front-End</p>
            </div>
            <div className="text-center text-md">
              <CircularProgress determinate value={56} />
              <p>56/100</p>
              <p>Back-End</p>
            </div>
            <div className="text-center text-md">
              <CircularProgress determinate value={77} />
              <p>77/100</p>
              <p>Full Stack</p>
            </div>
          </div>
          <div className="flex flex-col border-4 row-span-2 shadow-md border-gray-100 rounded-md items-center w-full box-border">
            <p className="mt-2 text center font-bold text-xl mb-4">Recent Scores</p>
            <div className="mb-4 relative overflow-x-auto shadow-md">
              <table className="w-full text-md text-left">
                <thead className="text-md bg-gray-200">
                  <tr>
                    <th scope="col" className="px-4 py-3">
                      Name
                    </th>
                    <th scope="col" className="py-3">
                      Score
                    </th>
                    <th scope="col" className="py-3">

                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data ? data[2].map((user) => (
                    <tr key={user.id} className="w-full border-b-2 text-left">
                      <td scope="row" className="px-7 py-2">{user.name} {user.lastname}</td>
                      <td className="px-7 py-2">{user.overall}</td>
                      <td className="px-2 py-2"><Link to={`/admin/evaluate/${user.id}`}><RiArrowRightSFill fontSize={'1.5em'} /></Link></td>
                    </tr>
                  )
                  ) : null}
                </tbody>
              </table>
            </div>
          </div>
          <div className="border-4 col-span-2 row-span-2 shadow-md border-gray-100 rounded-md box-border p-6">
            <LineChart chartData={userData} />
          </div>
        </div>
      </container>
    </>
  );
}

export async function loader() {
  const dashboardData = await getDashboardData();
  return dashboardData;
}