import { useState,useEffect } from "react"
import {FaMarker,FaTrashAlt,FaEdit} from 'react-icons/fa'
import { Link } from 'react-router-dom';
import axios from 'axios';
import _ from 'lodash';
function Viewstuffs(){
    const state = {
        stuffs :[],
        loading:true,
    }
    const [searchInput, setSearchInput] = useState({
      searchvalue: ''
    });

    const [autocompleteSuggestions, setAutocompleteSuggestions] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [tablestate,setState] = useState(state)
    const [user, setUser] = useState(null);
   
    const [role, setRole] = useState('');
  
  
  // Function to get the logged-in user's name from local storage
     const getUser = () => {
      const user = localStorage.getItem('user');
      return user ? JSON.parse(user).fullname : null;
      };
   
  
     const userName = getUser(); // Get the logged-in user's name
  
  //getting logged in user role
     const getRole = () => {
      const user = localStorage.getItem('user');
      return user ? JSON.parse(user).role : null;
    };
  
  
    useEffect(() => {
      // Get the role from local storage and store it in the 'role' state variable
      const userRole = getRole();
      
      setRole(userRole);
    }, []);



     //working on search form

  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setSearchInput((prevInput) => ({ ...prevInput, [name]: value }));
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    // Fetch search results from the backend based on searchInput
    try {
      const response = await axios.get('http://localhost:8000/api/searchuser', {
        params: searchInput,
      });
      setSearchResults(response.data.users);
    } catch (error) {
      console.error(error);
    }
  };

 

      // Retrieving data from Laravel API
  const itemsRetrieval = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/users');
      console.log(res);

      if (res.data.status === 200) {
        setState({
          stuffs: res.data.users,
          loading: false,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const throttledItemsRetrieval = _.throttle(itemsRetrieval, 1000);

  useEffect(() => {
    throttledItemsRetrieval();
    return () => {
      throttledItemsRetrieval.cancel();
    };
  }, []); 


  //deleting user from the database

  const deleteuser = async (id) => {
    try {
        const response = await axios.delete(`http://localhost:8000/api/deleteusers/${id}`);
        console.log(response.data);

        window.location.reload();
       
    } catch (error) {
        console.error(error);
        // Handle error or display error message
    }
};

  


  let stuffsstable = "";
  if (tablestate.loading) {
    stuffsstable = (
      <tr>
        <td colSpan='6'>Data is loading</td>
      </tr>
    );
  } 
  
  else if (tablestate.stuffs.length === 0) {
    stuffsstable= (
      <tr>
        <td colSpan='8'>there are no staffs in the database </td>
      </tr>
    );
  }
  
  else {
    stuffsstable = tablestate.stuffs.map((stuff) => (
    
<tr key={stuff.id}>
    <td>{stuff.fullname}</td>
    <td style={{textTransform:'lowercase'}}>{stuff.email}</td>
    <td>{stuff.department.name}</td>
    <td>{stuff.department.branch}</td>
    <td>{stuff.role}</td>

  
  
 <td>
  {role === 'ICT' ? ( // Check if the user has the role 'ICT'
        <button>
          <Link className='actionslink' to={`/edituser/${stuff.id}`}>
            <FaEdit />
          </Link>
        </button>
      ) : (
        // Render a disabled button if the user doesn't have the 'ICT' role
        <button disabled>
          <FaEdit />
        </button>
      )}
    </td>
    <td>
      {role === 'ICT' ? ( // Check if the user has the role 'ICT'
        <button onClick={() => deleteuser(stuff.id)}>
          <FaTrashAlt />
        </button>
      ) : (
        // Render a disabled button if the user doesn't have the 'ICT' role
        <button disabled>
          <FaTrashAlt />
        </button>
      )}
    </td>
</tr>
));
    }


     // Display the searched data if available
   if (searchResults.length > 0) {
    
    stuffsstable = searchResults.map((result) => (
  

      <tr key={result.id}>
        <td>{result.fullname}</td>
        <td>{result.email}</td>
        <td>{result.department.name}</td>
        <td>{result.role}</td>
        
        <td>
            <button><Link className='actionslink' to={`/edititem/${result.id}`}><FaEdit /></Link>
          </button>
        </td>
        <td>
          <button onClick={() => deleteuser(result.id)}>
            <FaTrashAlt />
          </button>
        </td>
      </tr>
      ));

}


    return(
        <div className="viewstaffs" style={{overflowX:'hidden'}}>
            <div className="wrapstaffs">
                <div className="wrappedstaffs">
                    <table cellSpacing={0}>
                        <tr>
                            <th>staffs</th>
                            <th colSpan={6}>
                               <form onClick={handleSearchSubmit}>
                                    <div className='searchinputs'>
                                        <input
                                        type='search'
                                        name='searchvalue'
                                        value={searchInput.searchvalue}
                                        onChange={handleSearchChange}
                                        className='search gadget'
                                        autoComplete="off"
                                         placeholder='search by stuff name or email.......'></input>
                                        <input type='submit' value='search'></input>
                                                    
                                    </div>
                                </form>
                            </th>
                        </tr>
                        <tr>
                            <th>full name</th>
                            <th>email</th>
                            <th>department</th>
                            <th>branch</th>
                            <th>role</th>
                            <td colSpan={2}>action</td>
                        </tr>
                        <tbody>
                            {stuffsstable}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Viewstuffs