import HeaderPage from "@/compenents/Home/HeaderPage";
import ServiceHeader from "@/compenents/Home/service/ServiceHeader";
import AboutUs_HeaderPage from "@/compenents/Home/AboutUs_HeaderPage";

export default function HomePage(){
    return(
        <div className={"overflow-hidden"}>
            <HeaderPage/>
            <ServiceHeader/>
            <AboutUs_HeaderPage/>
        </div>
    )
}