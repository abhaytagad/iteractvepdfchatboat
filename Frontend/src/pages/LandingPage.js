import HomeComponent from "../component/HomeComponent";
import Navbar from "../component/Navbar";


function LandingPage(){

    return(
        <div className="flex flex-col ">
            <Navbar/>
            <div>
                <HomeComponent/>
            </div>
        </div>
    )
}
export default LandingPage;