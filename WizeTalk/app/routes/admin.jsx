import WizelineHeader from "../components/WizelineHeader";
import wizetalk from "../../public/wizetalk.png"

export default function AdminStructurePage(){

    return(
        <main>
            <WizelineHeader />
            <section className="flex">
                <div className="w-[30%] h-full bg-white border solid">
                    Columna Selector
                    <div>
                    <img src={wizetalk} />
                    </div> 
                </div>
                <div className="bg-blue">
                    Pagina Info
                </div>
            </section>
        </main>
    );

}