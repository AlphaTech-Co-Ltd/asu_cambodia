import OurStudent_And_Tour_Card from "@/compenents/Home/OurStudent_And_Tour/OurStudent_And_Tour_Card";

export default function OurStudent_And_Tour(){
    return (
        <div className={"pt-16 pb-16"}>
            <div className={"text-center"}>
                <h1 className={"uppercase text-lg font-bold sm:text-xl md:text-2xl text-blue-950 dark:text-white"}>
                    Our Student And Tour
                </h1>
                <h1 className={"text-xl sm:text-3xl md:text-4xl mt-1 font-bold"}>
                    We helped many get U.S<br/> visas for study and travel
                </h1>
            </div>
            <div className={"w-[80%] mx-auto mt-16 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10"}>
                <div>
                    <OurStudent_And_Tour_Card
                        image={"/image/IMG_4504.JPG"}
                        title={"Our Students"}
                        description={"" +
                            "Presentations by distinguished speakers and partner institutions from various countries, including Angelo State University, to staff, professors of BELTEI International University, and students of BELTEI International School"}/>
                </div>
                <div>
                    <OurStudent_And_Tour_Card
                        image={"/image/IMG_4505.JPG"}
                        title={"Partnerships"}
                        description={"" +
                            "Presentations by distinguished speakers and partner institutions from various countries, including Angelo State University, to staff, professors of BELTEI International University, and students of BELTEI International School"}/>
                </div>
                <div>
                    <OurStudent_And_Tour_Card
                        image={"/image/IMG_4506.JPG"}
                        title={"Event"}
                        description={"" +
                            "Presentations by distinguished speakers and partner institutions from various countries, including Angelo State University, to staff, professors of BELTEI International University, and students of BELTEI International School"}/>
                </div>
            </div>
        </div>
    );
}