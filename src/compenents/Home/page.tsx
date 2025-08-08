import HeaderPage from "@/compenents/Home/HeaderPage";
import ServiceHeader from "@/compenents/Home/service/ServiceHeader";
import AboutUs_HeaderPage from "@/compenents/Home/AboutUs_HeaderPage";
import Why_Choosiness_Us from "@/compenents/Home/Why_Choosiness_Us";
import OurStudent_And_Tour from "@/compenents/Home/OurStudent_And_Tour/OurStudent_And_Tour";

export default function HomePage(){
    return(
        <div className={"overflow-hidden"}>
            <HeaderPage/>
            <ServiceHeader/>
            <AboutUs_HeaderPage/>
            <Why_Choosiness_Us/>
            <OurStudent_And_Tour/>
        </div>
    )
}