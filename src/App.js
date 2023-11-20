import {BrowserRouter,Routes,Route} from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Addusers from './pages/queries/users/adduser';
import Department from './pages/queries/departments';
import Additems from './pages/queries/items/additems';
import EditItem from './pages/actions/edititem';
import Addstuffs from './pages/queries/users/stuff';
import Viewlaptops from './pages/items/laptop';
import Viewfurniture from './pages/items/furniture';
import Viewstationary from './pages/items/stationary';
import ViewDepartments from './pages/departments/viewdepartments';
import Viewphones from './pages/items/phones';
import Assignitem from './pages/queries/items/assignitem';
import Inventorydashboard from './pages';
import Viewstuffs from './pages/users/viewstuffs';
import EditUser from './pages/actions/edituser';
import ViewAssigneditems from './pages/items/viewsigneditems';
import Login from './pages/login';
import Viewallitems from './pages/items/allitems';
import { isLoggedIn } from './utils/sessionUtils';
import ResetPassword from './pages/reset';
import RequestItem from './pages/requests/request';
import ViewReportsRequests from './pages/reports&requests';
import ViewAllRequests from './pages/reports&requests/request';
import DeleteLogs from './pages/logs/deletelogs';
import EditLogs from './pages/logs/editlogs';
import UnassignedItemsLogs from './pages/logs/unassgigneditemslogs';
import Responses from './pages/reports&requests/response';
import ResetPasswordfrom from './pages/resetpassword';
import ReportResponse from './pages/response/reportresponse';
import RequestResponse from './pages/response/requestrespnse';




function App() {
 

  return (
  <BrowserRouter>
    <Routes>
       <Route index element={<Login />}></Route>
       <Route path='/login' element={<Login/>}></Route>
       <Route path='/adduser' element={<Addusers />}></Route>
       <Route path='/adddepartment' element={<Department />}></Route>
       <Route path='/addstuffs' element={<Addstuffs />}></Route>
       <Route path='/edituser/:id' element={<EditUser/>}></Route>
       <Route path='/additems' element={<Additems />}></Route>
       <Route path='/assignitems' element={<Assignitem />}></Route>
       <Route path='/viewlaptops' element={<Viewlaptops />}></Route>
       <Route path='/viewfurniture' element={<Viewfurniture />}></Route>
       <Route path='/viewstationary' element={<Viewstationary />}></Route>
       <Route path='/viewsphones' element={<Viewphones />}></Route>
       <Route path='/viewstuffs' element={<Viewstuffs />}></Route>
       <Route path='/viewdepartments' element={<ViewDepartments />}></Route>
       <Route path='/viewassigneditems' element={<ViewAssigneditems />}></Route>
       <Route path='/edititem/:id' element={<EditItem/>}></Route>
       <Route path='/viewallitems' element={<Viewallitems/>}></Route>
       <Route path='/viewreportsRequsts' element={<ViewReportsRequests/>}></Route>
       <Route path='/viewRequsts' element={<ViewAllRequests/>}></Route>
       <Route path='/viewdeletelogs' element={<DeleteLogs/>}></Route>
       <Route path='/viewunassigneitemlogs' element={<UnassignedItemsLogs/>}></Route>
       <Route path='/vieweditlogs' element={<EditLogs/>}></Route>
       <Route path='/requestitem' element={<RequestItem/>}></Route>
       <Route path='/viewresponses' element={<Responses/>}></Route>
       <Route path='/resetpassword' element={<ResetPassword />}></Route>
       <Route path='/resetpasswordform' element={<ResetPasswordfrom />}></Route>
       <Route path='/requestresponses' element={<RequestResponse />}></Route>
       <Route path='/reportresponses' element={<ReportResponse />}></Route>
       
       <Route
          path="/invetorysystem"
          element={<Inventorydashboard />}
        />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
