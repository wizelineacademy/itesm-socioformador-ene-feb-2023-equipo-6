import { useNavigate } from "@remix-run/react";


export default function Modal({ children }) {

    const navigate = useNavigate();

    function closeHandler() {
        navigate('..');
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center" onClick={closeHandler}>
            <div
                className="top-20 mx-auto p-5 w-auto shadow-lg rounded-md bg-white"
                onClick={(event) => event.stopPropagation()}
            >
                {children}
            </div>
        </div>
    );
}