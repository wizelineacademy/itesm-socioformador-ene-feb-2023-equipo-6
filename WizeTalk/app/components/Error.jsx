import { FaExclamationCircle } from 'react-icons/fa';

export default function ErrorMessage({ title, children }) {
  return (
    <div className="w-full">
      <div className='flex flex-col p-5 rounded-md shadow bg-white my-[5rem] mx-[30%]'>
        <div className='flex flex-col items-center text-center'>
          <div className="inline-block p-4 bg-wizeblue-100 rounded-full">
            <FaExclamationCircle fontSize={"1.5rem"} />
          </div>
          <h2 className="mt-2 font-semibold text-gray-800">{title}</h2>
          {children}
        </div>
      </div>
    </div>
  );
}