import axios from 'axios';
import '../../css/index.css'
import '../../css/items/allitems.css'
import { useState,useEffect } from 'react';
import {FaMarker,FaTrashAlt,FaEdit} from 'react-icons/fa'

import _ from 'lodash';
import { Link } from 'react-router-dom';
function Viewallitems(){
     //displaying data in the table
     const state = {
        items :[],
        loading:true,
    }

    const [tablestate,setState] = useState(state)
    const [searchInput, setSearchInput] = useState({
      searchvalue: '',
      category: 'all',
    });
    const [autocompleteSuggestions, setAutocompleteSuggestions] = useState([]);
    const [searchResults, setSearchResults] = useState([]);

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
      const response = await axios.get('http://localhost:8000/api/search', {
        params: searchInput,
      });
     
      
      const searchitems = response.data.items;
      const updatedsearchresults = searchitems.map(result => {
        const manufacturingDate = new Date(result.itemmanufactureddate);
        const setLifespan = parseInt(result.itemlifespan);
        const currentDate = new Date();
        const manufacturingYear = manufacturingDate.getFullYear();
        const currentYear = currentDate.getFullYear();
        const timeDifference = currentYear - manufacturingYear;
        const remainingLifespan = setLifespan - timeDifference;
      
        console.log('Remaining Lifespan:', remainingLifespan); // Add this line
      
        return { ...result, remainingLifespan };
      });
      
 
      setSearchResults(updatedsearchresults);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // Fetch autocomplete suggestions from the backend based on searchInput
    const fetchAutocompleteSuggestions = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/autocomplete', {
          params: {
            search: searchInput.searchvalue,
          },
        });
        setAutocompleteSuggestions(response.data.suggestions);
      } catch (error) {
        console.error(error);
      }
    };

    // Fetch autocomplete suggestions only if there is a search query
    if (searchInput.searchvalue.trim().length > 0) {
      fetchAutocompleteSuggestions();
    } else {
      // If no search query, reset the autocomplete suggestions
      setAutocompleteSuggestions([]);
    }
  }, [searchInput.searchvalue]);

  const handleAutocompleteSelect = (suggestion) => {
    // When a user selects an autocomplete suggestion, update the search input
    setSearchInput((prevInput) => ({ ...prevInput, searchvalue: suggestion }));
    // Clear the autocomplete suggestions after selection
    setAutocompleteSuggestions([]);
  };
  

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);


  // Retrieving data from Laravel API
  const itemsRetrieval = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/getallitems');
      console.log(res);

      if (res.data.status === 200) {
        const itemsData = res.data.items;
            // Calculate remaining lifespan and update item data
            const updatedItems = itemsData.map(item => {
              const manufacturingDate = new Date(item.itemmanufactureddate);
              const setLifespan = parseInt(item.itemlifespan);
              const currentDate = new Date();
              const manufacturingYear = manufacturingDate.getFullYear();
              const currentYear = currentDate.getFullYear();
              console.log(currentYear)
              console.log(manufacturingYear);
              const timeDifference = currentYear - manufacturingYear;
              const remainingLifespan = setLifespan - timeDifference ;
              return { ...item, remainingLifespan };
            });
  
            setItems(updatedItems);
            setLoading(false);
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


   //deleting item from the database
   const deleteItem = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:8000/api/deleteitems/${id}`);
      console.log(res.data);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  let itemstable = "";
  
  if (loading) {
    itemstable = (
      <tr>
        <td colSpan='10'>Data is loading</td>
      </tr>
    );
  } else if (items.length === 0) {
    itemstable = (
      <tr>
        <td colSpan='10'>There are no items in the database</td>
      </tr>
    );
  } else {
    itemstable = items.map((item) => (
      <tr key={item.id}>
        <td>{item.itemname}</td>
        <td>{item.itemcategory}</td>
        <td>{item.idnumber}</td>
        <td>{item.serialnumber}</td>
        <td>{item.price}</td>
        <td>{item.itemstatus}</td>
        <td>{item.itempossesionstatus}</td>
        <td>{item.remainingLifespan}  years</td>
        <td>
 {role === 'ICT' ? ( // Check if the user has the role 'ICT'
        <button>
          <Link className='actionslink' to={`/edititem/${item.id}`}>
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
        <button onClick={() => deleteItem(item.id)}>
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
        <td>{result.itemname}</td>
        <td>{result.itemcategory}</td>
        <td>{result.idnumber}</td>
        <td>{result.serialnumber}</td>
        <td>{result.price}</td>
        <td>{result.itemstatus}</td>
        <td>{result.itempossesionstatus}</td>
        <td>{result.remainingLifespan}</td>
    
       
        <td>
{role === 'ICT' ? ( // Check if the user has the role 'ICT'
        <button>
          <Link className='actionslink' to={`/edititem/${result.id}`}>
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
        <button onClick={() => deleteItem(result.id)}>
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


  return(
      <div className='signedgadgets allitems'>
         <table  borderSpacing='0px' cellSpacing='0px' className='allitems'>
            <tr className='tableheader'>
                <th colSpan='1'>all system items</th>
                <th colSpan='11'>
                <form onSubmit={handleSearchSubmit}>
                                             <div className='searchinputs'>
                                                <input
                                                   
                                                   type='search'
                                                   name='searchvalue'
                                                   value={searchInput.searchvalue}
                                                   onChange={handleSearchChange}
                                                   placeholder='search by item name or item ID.......'
                                                   className='search gadget'
                                                   autoComplete="off" // Disable browser's built-in autocomplete
                                                />
                                               <select
                                                  name='category'
                                                  value={searchInput.category}
                                                  onChange={handleSearchChange}
                                               >
                                                  <option value='all'>all items</option>
                                                  <option value='computer'>computer</option>
                                                  <option value='phone'>phones</option>
                                                  <option value='furniture'>furniture</option>
                                                  <option value='stationary'>stationary</option>
                                               </select>
                                               <input type='submit' value='search' />
                                             </div>
                                           </form>
                                                             
                                      </th>
             </tr>
            <tr>
                <th>item name</th>
                <th>item category</th>
                <th>item ID</th>
                <th>serial number</th>
                <th>price</th>
                <th>status</th>
                <th>item possession</th>
                <th>item remaining lifespan</th>
                <th colSpan='2'>actions</th>
            </tr>
                                   
            {itemstable}

                                       
       </table>
    </div>
                            

  )
}

export default Viewallitems;