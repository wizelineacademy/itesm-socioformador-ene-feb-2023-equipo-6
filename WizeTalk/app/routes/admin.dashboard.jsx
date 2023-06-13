import { useState, useEffect } from "react";
import LineChart from "../components/admininstrator/LineChart";
import { getAvgScores, getDashboardData } from "../data/admin.server";
import { useLoaderData, Link, useNavigate } from "react-router-dom";
import { RiArrowRightSFill } from "react-icons/ri";
import CircularProgress from '@mui/joy/CircularProgress';

export default function AdminDashboard() {

  const data = useLoaderData();

  const [userData, setUserData] = useState({
    labels: ['1-10', '11-20', '21-30', '31-40', '41-50', '51-60', '61-70', '71-80', '81-90', '91-100'],
    datasets: [
      {
        label: 'Total of scores',
        data: [data[4][0], data[4][1], data[4][2], data[4][3], data[4][4], data[4][5], data[4][6], data[4][7], data[4][8], data[4][9]],
      }
    ],
  });

  return (
    <>
      <container className="flex flex-col py-10 px-16 w-full max-h-full">
        <div className="h-full grid grid-cols-3 grid-rows-3 gap-5">
          <div className="border-4 shadow-md border-gray-100 rounded-md">
            <div className="px-6 py-1">
              <p className="mt-2 text center font-bold text-xl mb-2">Evaluation Progress</p>
              <div className="flex flex-row justify-between items-center box-border px-4">
                <div className="font-bold mt-4">
                  <p className="text-center text-3xl">{data ? data[0] + data[1] : 'NA'}</p>
                  <p className="text-md text-center">AI Evaluated</p>
                </div>
                <div className="font-bold mt-4">
                  <p className="text-center text-3xl">{data ? data[0] : 'NA'}</p>
                  <p className="text-md text-center">Pending Revisions</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-2 border-4 shadow-md  border-gray-100 rounded-md font-bold py-1">
            <div className="px-12 py-1">
              <p className="mt-2 text center font-bold text-xl mb-4">Average Scores</p>
              <div className="flex flex-row box-border items-center justify-between mb-2">
                <div className="text-center text-md">
                  <CircularProgress determinate value={data[5][0]} />
                  <p>{data[5][0]}/100</p>
                  <p>English</p>
                </div>
                <div className="text-center text-md">
                  <CircularProgress determinate value={data[5][1]} />
                  <p>{data[5][1]}/100</p>
                  <p>Front-End</p>
                </div>
                <div className="text-center text-md">
                  <CircularProgress determinate value={data[5][2]} />
                  <p>{data[5][2]}/100</p>
                  <p>Back-End</p>
                </div>
                <div className="text-center text-md">
                  <CircularProgress determinate value={data[5][3]} />
                  <p>{data[5][3]}/100</p>
                  <p>Full Stack</p>
                </div>
              </div>
            </div>


          </div>
          <div className="flex flex-col border-4 row-span-2 shadow-md border-gray-100 rounded-md items-center w-full box-border">
            <p className="mt-2 font-bold text-xl mb-4">Recent Scores</p>
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