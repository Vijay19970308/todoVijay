import react from 'react';
import {BrowserRouter,Route,Switch,Link} from 'react-router';

function userDisplay(props)
const [userData,setUserData]=useState("");
{ 
    return(
       <div>
           <BrowserRouter>
           <Link to="/useList">userList</Link>
           <Link to="/userdetails">userDetails</Link>
           <Switch>
            <Route path="/userList">
            props.data.map((Value,idx)={
                <div><p>Value.firstname</p><p>Value.lastname</p></div>
            });
            </Route>
            <Route path="/userDetails"><</Route>
           </Switch>
           </BrowserRouter>
           </div>
    )
}
export default userDisplay;