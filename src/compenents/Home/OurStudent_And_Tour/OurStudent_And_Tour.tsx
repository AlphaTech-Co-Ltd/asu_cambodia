import OurStudent_And_Tour_Card from "@/compenents/Home/OurStudent_And_Tour/OurStudent_And_Tour_Card";

export default function OurStudent_And_Tour(){
    return (
        <div className={"pt-16 pb-16"}>
            <div className={"text-center"}>
                <h1 className={"uppercase text-lg font-bold sm:text-xl md:text-2xl text-blue-950 dark:text-white"}>
                    Our Students and Partnerships
                </h1>
                <h1 className={"text-xl sm:text-3xl md:text-4xl mt-1 font-bold"}>
                    Supporting students in global study and exchange programs
                </h1>
            </div>
            <div className={"w-[80%] mx-auto mt-16 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10"}>
                <div>
                    <OurStudent_And_Tour_Card
                        image={"/image/IMG_4504.JPG"}
                        title={"Our Students"}
                        description={
                            "BELTEI students explore international learning at Angelo State University, gaining invaluable academic and cultural experience."
                        }/>
                </div>
                <div>
                    <OurStudent_And_Tour_Card
                        image={"/image/503258466_726188439965318_3019062951891452803_n.jpg"}
                        title={"Partnerships"}
                        description={
                            "Strong collaborations with RUPP and BELTEI expand opportunities for students in study, research, and exchange programs."
                        }/>
                </div>
                <div>
                    <OurStudent_And_Tour_Card
                        image={"/image/504285887_726188199965342_3404744937419028424_n.jpg"}
                        title={"Events"}
                        description={
                            "Exciting events and tours for BELTEI students promote global exposure, networking, and hands-on learning experiences."
                        }/>
                </div>
            </div>
        </div>
    );
}
