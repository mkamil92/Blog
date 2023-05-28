import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import PageNotFound from "./PageNotFound";
export default function Post({postData}){
    const navigate = useNavigate()
    return(
        <div>
        {postData ?
            <div className="text-center m-4 p-5 shadow-lg rounded">
                <img src="https://cdn.logojoy.com/wp-content/uploads/2018/05/30164225/572.png" alt="" width={'25%'} className="img-fluid" />
                <h2 className="m-3">
                    Title: {postData.title}<br/>
                </h2>
                <h5 className="m-3">
                        <span className="text-primary">Description:</span><br/>
                        {postData.description}
                </h5>
            </div>
            :
            <h1 className="text-danger m-5">Page not found!</h1>
           
        }
        </div>
        
    )
}