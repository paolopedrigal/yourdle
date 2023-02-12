import NavBar from "../components/NavBar";
import Answers from "../components/Answers";

function CreateYourdle() {

    return (
        <div>
            <NavBar moreInfo={false}/>
            <Answers />
        </div>

    );
}

export default CreateYourdle;