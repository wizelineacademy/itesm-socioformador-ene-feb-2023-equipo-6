

export default function ResultPage() {


    return (
        <>
            <section className="mx-[20%]">
                <div className="my-[5%]">
                    <h1 className="font-bold text-xl">Your Results, John Doe</h1>
                </div>
                <div className="border-solid border-black border-2 rounded-md">
                    <div className="flex justify-between mx-[15%] my-5">
                        <div className="flex flex-col">
                            <div>
                                <h1 className="text-center">70 %</h1>
                            </div>
                            <div>Grammar</div>
                        </div>
                        <div className="flex flex-col">
                        <div>
                                <h1 className="text-center">70 %</h1>
                            </div>
                            <div>Pronunciation</div>
                        </div>
                        <div className="flex flex-col">
                        <div>
                                <h1 className="text-center">70 %</h1>
                            </div>
                            <div>Fluency</div>
                        </div>
                    </div>
                    <hr></hr>
                    <div className="flex justify-center p-[5%]">
                        <div className="mx-[10%]">
                            <h2 className="font-bold">Technical Scores</h2>
                            <div className="flex justify-between">
                                <p>1</p>
                                <p>12/15</p>
                            </div>
                            <div className="flex justify-between">
                                <p>2</p>
                                <p>7/10</p>
                            </div>
                            <div className="flex justify-between">
                                <p>3</p>
                                <p>6/10</p>
                            </div>
                            <div className="flex justify-between">
                                <p>4</p>
                                <p>9/10</p>
                            </div>
                            <div className="flex justify-between">
                                <p>5</p>
                                <p>10/10</p>
                            </div>
                        </div>
                        <div className="mx-[10%]">
                            <div>
                                <h2 className="font-bold">Soft Skills Detected</h2>
                                <p>1</p>
                                <p>2</p>
                                <p>3</p>
                            </div>
                            <div className="mt-5">
                                <h2 className="font-bold">Overall Score</ h2>
                                <div className="flex bg-wizeblue-100 rounded-md h-10 items-center justify-center">
                                    <p className="text-center text-white font-bold ">
                                        {79} / 100
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex justify-end my-[4%]">
                    <button className="w-1/5 h-10 bg-wizeblue-100 text-white font-bold rounded-md">End Test</button>
                </div>
            </section>
        </>
    );
}