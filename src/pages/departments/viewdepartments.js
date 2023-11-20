import {FaMarker,FaTrashAlt,FaEdit} from 'react-icons/fa'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import _ from 'lodash';
import { Link } from 'react-router-dom';
function ViewDepartments(){
    
    const [assignedItems, setAssignedItems] = useState([]);
    
    const state = {
      items :[],
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
        const response = await axios.get('http://localhost:8000/api/searchdeprtments', {
          params: searchInput,
        });
        setSearchResults(response.data.departments);
      } catch (error) {
        console.error(error);
      }
    };
  
   


  const itemsRetrieval = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/getdepartments');
      console.log(res);

      if (res.data.status === 200) {
        setState({
          items: res.data.departmets,
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


     


   
// Deleting assigned item from the database
const deleteAssignedItem = async (assignedItemId) => {
  try {
    const response = await axios.delete(`http://localhost:8000/api/deletedepartment/${assignedItemId}`);
    console.log(response.data);
    window.location.reload();
  } catch (error) {
    console.error(error);
    // Handle error or display error message
  }
};



let itemstable = "";
if (tablestate.loading) {
  itemstable = (
    <tr>
      <td colSpan='4'>departments loading</td>
    </tr>
  );
}
else if (tablestate.items.length === 0) {
  itemstable = (
    <tr>
      <td colSpan='9'>there are no departments in the database </td>
    </tr>
  );
}
else {
  itemstable = tablestate.items.map((item) => (
    
  
<tr key={item.id}>
<td>{item.name}</td>
<td>{item.branch}</td>
<td>{item.leader}</td>

<td style={{textAlign:'center'}}>
      {role === 'ICT' ? ( // Check if the user has the role 'ICT'
        <button onClick={() => deleteAssignedItem(item.id)}>
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
    
    itemstable = searchResults.map((result) => (
  

      <tr key={result.id}>
        <td>{result.fullname}</td>
        <td>{result.email}</td>
        <td>{result.itemname}</td>
        <td>{result.itemcategory}</td>
        <td>{result.itemstatus}</td>
        <td>{result.idnumber}</td>
        <td>{result.time}</td>
        
        <td>
          <button onClick={() => deleteAssignedItem(result.id)}>
            <FaTrashAlt />
          </button>
        </td>
      </tr>
      ));

}



 



    return(
        
        <div className="viewassigneditems" style={{overflowX:'hidden'}}>
            <div className="wrapviewassigneditems">
                <div className="wrappedassigneditems">
                    <table cellSpacing={0} style={{width:'100%'}}>
                        <tr>
                            <th style={{width:'20%'}}>Departments</th>
                            <th colSpan={7}>
                            <form onClick={handleSearchSubmit}>
                                    <div className='searchinputs'>
                                        <input
                                        style={{color:'gray'}}
                                        type='search'
                                        name='searchvalue'
                                        value={searchInput.searchvalue}
                                        onChange={handleSearchChange}
                                        className='search gadget'
                                        autoComplete="off"
                                         placeholder='search by branch name.......'></input>
                                        <input type='submit' value='search'></input>
                                                    
                                    </div>
                                </form>
                            </th>
                        </tr>
                        <tr>
                            <th>Department name</th>
                            <th>Branch</th>
                            <th>Department Leader</th>
                            <th colSpan={1}>actions</th>
                        </tr>
                        <tbody>
                          { itemstable }
                      </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default ViewDepartments;