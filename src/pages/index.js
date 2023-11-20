import axios from 'axios';
import '../css/index.css'
import { useState,useEffect } from 'react';
import {FaMarker,FaTrashAlt,FaEdit,FaRegBell,FaTimes} from 'react-icons/fa'
import logo from '../images/imagesf.jpg'
import _, { result } from 'lodash';
import { Link } from 'react-router-dom';
import { isLoggedIn } from '../utils/sessionUtils';
import { useNavigate } from 'react-router-dom';

function Inventorydashboard(){
//menu events declarations
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [MenuAccessibilityClass,setMenuAccessibiltyClass]= useState('');
  const [tablecontents,setTablecontent] = useState('')
  const [searchInput, setSearchInput] = useState({
    searchvalue: '',
    category: 'all',
  });
  const [autocompleteSuggestions, setAutocompleteSuggestions] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [role, setRole] = useState('');
 


// Function to get the logged-in user's name from local storage
const getUser = () => {
  const userData = localStorage.getItem('user');
  return userData ? JSON.parse(userData) : null;
};

// Get the logged-in user's data
const userData = getUser();

// Extract the user's name and ID
const userName = userData ? userData.fullname : null;
const LoggedInUserId = userData ? userData.id : null;

console.log(userName);
console.log(LoggedInUserId);

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

  
 

  useEffect(() => {
    // Check if the user is already logged in
    const user = localStorage.getItem('user');
    if (!user) {

      navigate('/login'); 

    }
  }, [navigate]);


  //working on logout
  const handleLogout = async () => {
    try {
      //const response = await axios.post('http://localhost:8000/api/logout');
  
      // Remove user information from local storage if you are storing it
      localStorage.removeItem('user');
  
      // Redirect the user to the login page
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
      console.error('Server error message:', error.response?.data?.message);
    }
  };
  
  


  //working on search form

  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setSearchInput((prevInput) => ({ ...prevInput, [name]: value }));
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    // Fetch search results from the backend based on searchInput
    try {
      const response = await axios.get('http://localhost:8000/api/dashboardsearch', {
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

  //notificatins display event
const [showNotifications, setShowNotifications] = useState(false);
const [showRequest, setShowRequest] = useState(true);
const [showResponse, setShowResponse] = useState(false);

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
    
  };


  const toggleRequest = () => {
    setShowRequest(true);
    setShowResponse(false);
  };

  const toggleResponse = () => {
    setShowRequest(false);
    setShowResponse(true);
  };

  //removing responce dev after clicking the cross sign
  const [isVisible, setIsVisible] = useState(true);







  const [isItemsOpen, setIsItemsOpen] = useState(false);
  const [isUsersOpen, setUsersOpen] = useState(false);
  const [isQueriesOpen,setQueriesOpen] = useState(false)
  const [isItemsqueryOpen,setItemsquery] = useState(false)
  const [isRequestItemsqueryOpen,setRequestItemsquery] = useState(false)
  const [isResponseItemsqueryOpen,setResponsetItemsquery] = useState(false)
  const [isLogsOpen,setLogsOpen] = useState(false);

//menu events
  const toggleItemsMenu = () => {
    setIsItemsOpen(!isItemsOpen);
  };

  const toggleLogsMenu = () =>{
    setLogsOpen(!isLogsOpen);
  }

  const toggleItemRequestMenu = () => {
    setRequestItemsquery(!isRequestItemsqueryOpen);
  };

  const toggleItemResponsesMenu = () => {
    setResponsetItemsquery(!isResponseItemsqueryOpen);
  };

  const toggleUsersMenu = () => {
    setUsersOpen(!isUsersOpen);
  };

  const toggleQueriesMenu = () => {
    setQueriesOpen(!isQueriesOpen)
  }

  const toggleItemsqueryMenu = () => {
    setItemsquery(!isItemsqueryOpen)
  }

    

  // iframe display events diclarations
  const [showTable, setShowTable] = useState(true);
  const [showAddingDepartmentIframe, setShowAddingDepartmentIframe] = useState(false);
  const [showAddingUserIframe, setShowAddingUserIframe] = useState(false);
  const [showAddingItemIframe, setShowAddingItemIframe] = useState(false);
  const [showDisplayingIUsersIframe, setshowDisplayingIUsersIframe] = useState(false);
  const [showDisplayingReportsIframe, setshowDisplayingReportsIframe] = useState(false);
  const [showDisplayingRequestsIframe, setshowDisplayingRequestsIframe] = useState(false);
  const [showDisplayingIStuffsIframe, setshowDisplayingIStuffsIframe] = useState(false);
  const [showDisplayingDepartmentsIframe, setshowDisplayingDepartmentsIframe] = useState(false);
  const [showDisplayLaptopsIframe, setshowDisplayingLaptopsIframe] = useState(false);
  const [showDisplayAllItemsIframe, setshowDisplayingAllItemsIframe] = useState(false);
  const [showDisplayingPhonesIframe, setshowDisplayingPhonesIframe] = useState(false);
  const [showDisplayingDeleteLogsIframe, setshowDisplayingDeleteLogsIframe] = useState(false);
  const [showDisplayingEditLogsIframe, setshowDisplayingEditLogsIframe] = useState(false);
  const [showDisplayingUassignedItemLogsIframe, setshowDisplayingUnassignedItemLogsIframe] = useState(false);
  const [showDisplayingStationaryIframe, setshowDisplayingStationaryIframe] = useState(false);
  const [showDisplayingFurnitureIframe, setshowDisplayingFurnitureIframe] = useState(false);
  const [showDisplayingRequestResponsesIframe, setshowDisplayingRequestResponsesIframe] = useState(false);
  const [showDisplayingReportsResponsesIframe, setshowDisplayingReportsResponsesIframe] = useState(false);
  const [showDisplayingResponsesIframe, setshowDisplayingResponsesIframe] = useState(false);
  const [showDisplayingAssigneditemsIframe, setshowDisplayingAssignedItemsIframe] = useState(false);



  //displaying iframes
  useEffect(() => {
    // Show the table on component mount
    setShowTable(true); 

    // Hide the adding  iframe on component mount
    setShowAddingUserIframe(false); 
    setShowAddingItemIframe(false); 
    setshowDisplayingIUsersIframe(false)
    setshowDisplayingIStuffsIframe(false)
    setshowDisplayingLaptopsIframe(false)
    setshowDisplayingPhonesIframe(false)
    setshowDisplayingStationaryIframe(false)
    setshowDisplayingFurnitureIframe(false)
    setshowDisplayingAssignedItemsIframe(false)
    setshowDisplayingAllItemsIframe(false)
    setshowDisplayingReportsIframe(false);
    setShowAddingDepartmentIframe(false)
    setshowDisplayingDepartmentsIframe(false);
    setshowDisplayingRequestsIframe(false)
    setshowDisplayingDeleteLogsIframe(false);
    setshowDisplayingEditLogsIframe(false);
    setshowDisplayingUnassignedItemLogsIframe(false)
    setshowDisplayingResponsesIframe(false);
    setshowDisplayingRequestResponsesIframe(false);
    setshowDisplayingReportsResponsesIframe(false)

  }, []);


  const handleMenuClick = (menuItem) => {
    //hide the table when a particular iframe is displayed
    setShowTable(false)
    // Show the iframes when particular  menu is clicked
    setShowAddingDepartmentIframe(menuItem === 'adddepartments')
    setshowDisplayingUnassignedItemLogsIframe(menuItem === 'unassigneditemslogs');
    setShowAddingItemIframe(menuItem === 'additem');
    setshowDisplayingIUsersIframe(menuItem === 'adminusers')
    setshowDisplayingIStuffsIframe(menuItem === 'stuffs')
    setshowDisplayingResponsesIframe(menuItem === 'responses')
    setshowDisplayingRequestResponsesIframe(menuItem === 'requestsresponses')
    setshowDisplayingReportsResponsesIframe(menuItem === 'reportsresponses')
    setshowDisplayingDepartmentsIframe(menuItem === 'departments')
    setShowAddingUserIframe(menuItem === 'adduser');  
    setshowDisplayingLaptopsIframe(menuItem ==='laptop')
    setshowDisplayingReportsIframe(menuItem ==='reports')
    setshowDisplayingRequestsIframe(menuItem ==='requests')
    setshowDisplayingFurnitureIframe(menuItem === 'furniture')
    setshowDisplayingPhonesIframe(menuItem === 'phone')
    setshowDisplayingStationaryIframe(menuItem === 'stationary')
    setshowDisplayingAssignedItemsIframe(menuItem === 'assigneditems') 
    setshowDisplayingAllItemsIframe(menuItem === 'allitems')
    setshowDisplayingDeleteLogsIframe(menuItem === 'deletelogs')
    setshowDisplayingEditLogsIframe(menuItem === 'editlogs')
    
    
  };

  const handleDashboard = (menuItem) =>{
    setShowTable(menuItem === 'dashboard');
    window.location.reload();
  }
   


  //displaying data in the table
    const state = {
        items :[],
        loading:true,
    }

    useEffect(() => {
      // Retrieving data from Laravel API
      const itemsRetrieval = async () => {
        try {
          const res = await axios.get('http://localhost:8000/api/getitems');
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
          setLoading(false);
        }
      };
  
      itemsRetrieval();
    }, []);
  
    // Deleting item from the database
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
            {role === 'ICT' ? (
              <button>
                <Link className='actionslink' to={`/edititem/${item.id}`}>
                  <FaEdit />
                </Link>
              </button>
            ) : (
              <button disabled>
                <FaEdit />
              </button>
            )}
          </td>
          <td>
            {role === 'ICT' ? (
              <button onClick={() => deleteItem(item.id)}>
                <FaTrashAlt />
              </button>
            ) : (
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
            <td>{result.itempossesionstatus} </td>
            <td>{result.remainingLifespan}  years</td>
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


    const [reports, setReports] = useState([]);
    const [requests, setRequests] = useState([]);

    useEffect(() => {
      fetchReports(LoggedInUserId);
      fetchRequests(LoggedInUserId);
    }, [LoggedInUserId]);
    


    //getting reports from reports table
    const fetchReports = async (id) => {
      try {
        const response = await axios.get(`http://localhost:8000/api/allreports/${id}`);
        setReports(response.data.reports);
        console.log(reports)
      } catch (error) {
        console.error(error);
      }
    };

     //getting item id from item database
     const fetchRequests = async (id) => {
      try {
        const response = await axios.get(`http://localhost:8000/api/allrequests/${id}`);
        setRequests(response.data.requests);
      } catch (error) {
        console.error(error);
      }
    };

    const combinedRequestsAndReports = [...requests, ...reports];


//notification statistics
const [totalUnviewedCount, setTotalUnviewedCount] = useState(0); // Initialize with 0 or the initial value you prefer

    // Function to fetch the total unviewed count
  const fetchTotalUnviewedCount = async (id) => {
    try {
      const response = await axios.get(`http://localhost:8000/api/totalunviewedcount/${id}`);
      setTotalUnviewedCount(response.data.totalUnviewedCount);
    } catch (error) {
      console.error(error);
    }
  };

  // Call this function to fetch the total count of unviewed items
  useEffect(() => {
    fetchTotalUnviewedCount(LoggedInUserId);
  }, []);
    


    const [subjectDetails, setSubjectDetails] = useState(null);
    const [subjectType, setSubjectType] = useState(null); // To track if it's a 'request' or 'report'
  

       // Function to insert data into viewrequests or viewreports table
const insertViewData = async (userId, subjectId, type) => {
  try {
    const response = await axios.post(`http://localhost:8000/api/insert-view-data`, {
      userId,
      subjectId,
      type,
    });
    console.log("Inserted View Data:", response.data);
    // Handle success or error if needed
  } catch (error) {
    console.error(error);
    // Handle error if needed
  }
};

    // Function to fetch report details by ID
const fetchReportDetails = async (id) => {
  try {
    const response = await axios.get(`http://localhost:8000/api/subject/reports/${id}`);
    console.log("Fetched Report Details:", response.data);
    
    // Fetch user details associated with the report
    const userResponse = await axios.get(`http://localhost:8000/api/user/${response.data.reports[0].user_id}`);
    const reportWithUser = {
      ...response.data,
      user: userResponse.data, // Include user details in the report object
    };
    
    setSubjectDetails(reportWithUser);
    setSubjectType('reports');

    // Now, insert data into viewreports table
    insertViewData(LoggedInUserId, id, 'reports'); // Insert the logged-in user's ID
  } catch (error) {
    console.error(error);
  }
};

// Function to fetch request details by ID
const fetchRequestDetails = async (id) => {
  try {
    const response = await axios.get(`http://localhost:8000/api/subject/requests/${id}`);
    console.log("Fetched Request Details:", response.data);
    
    // Fetch user details associated with the request
    const userResponse = await axios.get(`http://localhost:8000/api/user/${response.data.requests[0].user_id}`);
    const requestWithUser = {
      ...response.data,
      user: userResponse.data, // Include user details in the request object
    };
    
    setSubjectDetails(requestWithUser);
    setSubjectType('requests');

    // Now, insert data into viewrequests table
    insertViewData(LoggedInUserId, id, 'requests');
  } catch (error) {
    console.error(error);
  }
};




// Call this function when a subject is clicked
const handleSubjectClick = (id, type) => {
  if (type === 'reports') {
    fetchReportDetails(id);
  } else if (type === 'requests') {
    fetchRequestDetails(id);
  }
};



    

 console.log("subjectDetails:", subjectDetails);

 const [isHidden, setIsHidden] = useState(false);

 const handleHide = () => {
   // Toggle the value of isHidden when the FaTimes icon is clicked
   setIsHidden(!isHidden);
   window.location.reload();
 };

 const [isFormVisible, setIsFormVisible] = useState(false);

 const handleToggleForm = () => {
   setIsFormVisible(!isFormVisible);
 };

  const [responseMessage, setResponseMessage] = useState('');

   const handleResponseSubmit = async (e) => {
    e.preventDefault();
    const data = {
      user_id: LoggedInUserId,
      message: responseMessage,
    };


    const sendEmail = async (recipientEmail, subject, message) => {
      try {
        // Define the email data
        const emailData = {
          recipientEmail: recipientEmail,
          subject: subject,
          message: message,
        };
    
        // Make an API request to your Laravel backend to send the email
        const response = await axios.post('http://localhost:8000/api/sendresponseemail', emailData);
    
        if (response.status === 200) {
          console.log('Email sent successfully');
        } else {
          console.error('Email sending failed');
        }
      } catch (error) {
        console.error('Error sending email:', error);
      }
    };

    // Define email data variables
  let recipientEmail;
  let subject;
  let message;
    

    if (role === 'ICT') {
      
    
     if (subjectType === 'requests') {
      data.request_id =subjectDetails.requests[0].id;
      await axios.post('http://localhost:8000/api/requestresponse', data);

      // Set email data for requests
      recipientEmail = subjectDetails.user.email;
      subject = subjectDetails.requests[0].subject;
      message = responseMessage;

      console.log(recipientEmail);

    } else if (subjectType === 'reports') {
      data.report_id = subjectDetails.reports[0].id;
      await axios.post('http://localhost:8000/api/reportresponse', data);
      

      // Set email data for reports
      recipientEmail = subjectDetails.user.email;
      subject = subjectDetails.reports[0].subject;
      message = responseMessage;

    }

    // Send an email if the user has the 'ICT' role
    sendEmail(recipientEmail, subject, message);

  }

  else{
     
    if (subjectType === 'requests') {
      data.request_id =subjectDetails.requests[0].id;
      await axios.post('http://localhost:8000/api/requestresponse', data);
    } else if (subjectType === 'reports') {
      data.report_id = subjectDetails.reports[0].id;
      await axios.post('http://localhost:8000/api/reportresponse', data);
    }
  }

    

    // Clear the response message and hide the form
    setResponseMessage('');
    setIsFormVisible(false);
  }




 
  //displaying all responses from database

  const [responses, setResponses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios.get(`http://localhost:8000/api/all-responses/${LoggedInUserId}`)
      .then((response) => {
        setResponses(response.data.responses)
        console.log(response.data)
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  }, [LoggedInUserId]);



   //event once the response id is clicked
   const [selectedResponse, setSelectedResponse] = useState(null);


   const handleResponseClick = (response) => {
    setSelectedResponse(response);

   
    console.log("responses : " ,response.id);
  
    const data = {
      user_id: LoggedInUserId,
      response_id: response.id,
    };
    console.log("response id is:",data.response_id ,"and user id is", data.user_id)
   

  
if (response.hasOwnProperty("request")) {
  // Make a POST request to insert into viewrequestresponse
  axios.post('http://localhost:8000/api/viewrequestresponse', data)
    .then((response) => {
      // Handle the response as needed
    })
    .catch((error) => {
      // Handle errors
    });
} else if (response.hasOwnProperty("report")) {
      // Make a POST request to insert into viewreportresponse
      axios.post('http://localhost:8000/api/viewreportresponse', data)
        .then((response) => {
          // Handle the response as needed
        })
        .catch((error) => {
          // Handle errors
        });
    }
    
  };
  

  



 return(
        <div className="inventorydashboard">
          
            <div className="header">
                <div className="leftheader">
                    <img src={logo} alt='frt logo'></img>
                </div>
                <div className="rightheader">
                   <span><FaRegBell></FaRegBell><span onClick={toggleNotifications}>{totalUnviewedCount}</span></span>
                    <button>{userName}</button>


                    {showNotifications && (
  <div className="notificationscontents">
    <h4>
      <span onClick={toggleRequest} className={showRequest ? 'active' : ''}>
        Request
      </span>{' '}
      |{' '}
      <span onClick={toggleResponse} className={showResponse ? 'active' : ''}>
        Response
      </span>
    </h4>

    {showRequest && (
      <ul className="requests">
        {combinedRequestsAndReports &&
          combinedRequestsAndReports.length > 0 &&
          combinedRequestsAndReports.map((item) => (
            <li key={item.id} onClick={() => handleSubjectClick(item.id, item.category)}>
              {item.subject}
            </li>
          ))}
      </ul>
    )}

    {showResponse && isLoading ? (
      <p>Loading responses...</p>
    ) : (
      showResponse && (
        <ul className="response">
          {responses.map((response, index) => (
            <li key={index} onClick={() => handleResponseClick(response)}>
              Response to {response.request ? 'Request: ' + response.request.subject : (response.report ? 'Report: ' + response.report.subject : 'Subject Not Found')}
            </li>
          ))}
        </ul>
      )
    )}
  </div>
)}

                  
                </div>

                
               
            </div>
            

            {subjectDetails && !isHidden  && (

           <div className='notificationmaindivs'>

            <div className='requestmaindiv'>
              <div className='card'>
                 <h5><FaTimes onClick={handleHide}></FaTimes></h5>
                 <h3><span>{subjectType === 'requests' ? subjectDetails.requests[0].subject : subjectDetails.reports[0].subject}</span> <span>{subjectDetails.user.fullname}</span></h3>
    
                
                      {/* Render subject details */}
 
               
                  <p> {subjectType === 'requests' ? subjectDetails.requests[0].message : subjectDetails.reports[0].message}</p>
    

                  <div>
                     {isFormVisible ? (
                    // Display the form when isFormVisible is true
                     <div className='responseform'>
                        <form onSubmit={handleResponseSubmit}>
                           <div className='formgroup'>
                              <textarea placeholder='write a response'
                                 value={responseMessage}
                                 onChange={(e) => setResponseMessage(e.target.value)}
                               ></textarea>
                           </div>
                           <input type='submit' value='send'></input>
                         </form>
                       </div>
                      ) : (
                     // Display the <h3> when isFormVisible is false
                        <h3 className='reply' onClick={handleToggleForm}>respond</h3>
                      )}
                   </div>
                </div>
          </div>

       
            </div>
            
            

            )}

 {selectedResponse && (
            <div className='responsemaindiv' >
              <div className='card'>
                <h5 onClick={handleHide}><FaTimes ></FaTimes></h5>
                <h3>
                <span>
  {selectedResponse.type != 'request' && selectedResponse.request
    ? selectedResponse.request.subject
    : selectedResponse.report
    ? selectedResponse.report.subject
    : 'Subject Not Found'}
</span>

                   <span>lonely chisale</span></h3>
                <p>{selectedResponse.message}</p>
          
                <h3 className='reply'>by: {selectedResponse.user.fullname}</h3>
              </div>
            </div>
 )}

            <div className='content'>
                <div className='menu'>
                    <ul>
                        <li onClick={() => handleDashboard('dashboard')}>dashboard</li>
                        <li onClick={toggleItemsMenu}>items</li>
                        {isItemsOpen &&(
                            <ul className='dropdown items'>
                                <li onClick={() => handleMenuClick('allitems')}>all items</li>
                                <li onClick={() => handleMenuClick('laptop')}>computers</li>
                                <li onClick={() => handleMenuClick('phone')}>phones</li>
                                <li onClick={() => handleMenuClick('stationary')}>stationary</li>
                                <li onClick={() => handleMenuClick('furniture')}>furniture</li>
                                <li onClick={() => handleMenuClick('assigneditems')}>assigned items</li>
                            </ul>
                        )}
                        
                        <li onClick={toggleItemRequestMenu}>Reports & Requests</li>
                        {isRequestItemsqueryOpen &&(
                            <ul className='dropdown requestitems'>
                                <li onClick={() => handleMenuClick('requests')}>requests</li>
                                <li onClick={() => handleMenuClick('reports')}>reports</li> 
                                <li onClick={() => handleMenuClick('responses')} hidden>responses</li>  
                            </ul>
                        )}
                          <li onClick={toggleItemResponsesMenu}>Responses</li>
                        {isResponseItemsqueryOpen &&(
                            <ul className='dropdown requestitems'>
                                <li onClick={() => handleMenuClick('requestsresponses')}>requests responses</li>
                                <li onClick={() => handleMenuClick('reportsresponses')}>reports responses</li> 
                                  
                            </ul>
                        )}
                        <li onClick={() => handleMenuClick('departments')}>departments</li>
                        <li onClick={() => handleMenuClick('stuffs')}>users</li>
                      
                        {role === 'ICT' && (
                        <li onClick={toggleQueriesMenu} className={MenuAccessibilityClass}>queries</li>
                        )}
                        {isQueriesOpen && (
                            <ul className='dropdown queris'>
                                <li onClick={() =>handleMenuClick('adddepartments')}>departments</li>
                                <li onClick={() => handleMenuClick('adduser')}>users</li>
                                <li onClick={() => handleMenuClick('additem')}>items</li>
                                
                                
                            </ul>
                        )}
                        <li onClick={toggleLogsMenu} hidden>logs</li>
                        {isLogsOpen && (
                            <ul className='dropdown queris'>
                                <li onClick={() =>handleMenuClick('editlogs')}>edit logs</li>
                                <li hidden onClick={() => handleMenuClick('deletelogs')}>delete logs</li>
                                <li onClick={() => handleMenuClick('unassigneditemslogs')}>unassigned items </li>
                                
                                
                                
                            </ul>
                        )}
                       
                        <li onClick={handleLogout}>logout</li>
                    </ul>
                </div>

                <div className='contentscontainer'>
                    <div className='wrappingcontentcontainer'>
                        <div className='wrappedcontents'>
                            <div className='mainheader'>
                                <h3>inventory management system</h3>
                            </div>
                            <div  className='quantitygadgetsdivs'>
                                <div className='systemgadgets'>
                                    <h3><span>33</span> system items</h3>
                                </div>
                                <div className='signedgadgets'>
                                    <h3><span>66</span> signed items</h3>
                                </div>
                                <div className='unsignedgadgets'>
                                    <h3><span>10</span> unsigned items</h3>
                                </div>
                            </div>
                             
                            {showTable && (
                            <div className='signedgadgets'>
                                <table  borderSpacing='0px' cellSpacing='0px'>
                                    <tr className='tableheader'>
                                        <th colSpan='1'>system items</th>
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
                                        <th>item lifespan remaining</th>
                                        
                                        <th colSpan='2'>actions</th>
                                    </tr>
                                   
                                    {itemstable}

                                       
                                </table>
                            </div>
                            )}

                          
                            

                            <div className='iframes' >
                            {showAddingUserIframe &&(
                                <div  className= 'addingusers'>
                                    <iframe src='/adduser'></iframe>
                                </div>
                            )}

                            


                           {showAddingDepartmentIframe &&(
                                <div  className= 'addingusers'>
                                    <iframe src='/adddepartment'></iframe>
                                </div>
                            )}

                             
                             {showAddingItemIframe &&(
                                <div className='addingstuffs'>
                                    <iframe src='/additems'></iframe>
                                </div>
                             )}


                             {showDisplayingIUsersIframe &&(
                                <div className='showusers'>
                                    <iframe src='/viewadminusers'></iframe>
                                </div>
                             )}


                           {showDisplayingDepartmentsIframe &&(
                                <div className='showdepartments'>
                                    <iframe src='/viewdepartments'></iframe>
                                </div>
                             )}

                            {showDisplayingResponsesIframe &&(
                                <div className='showdepartments'>
                                    <iframe src='/viewresponses'></iframe>
                                </div>
                             )}

                          {showDisplayingRequestResponsesIframe &&(
                                <div className='showdepartments'>
                                    <iframe src='/requestresponses'></iframe>
                                </div>
                             )}

                            {showDisplayingReportsResponsesIframe &&(
                                <div className='showdepartments'>
                                    <iframe src='/reportresponses'></iframe>
                                </div>
                             )}

                             
                           {showDisplayingDeleteLogsIframe &&(
                                <div className='showdepartments'>
                                    <iframe src='/viewdeletelogs'></iframe>
                                </div>
                             )}

                             
                           {showDisplayingEditLogsIframe &&(
                                <div className='showdepartments'>
                                    <iframe src='/vieweditlogs'></iframe>
                                </div>
                             )}

                         {showDisplayingUassignedItemLogsIframe &&(
                                <div className='showdepartments'>
                                    <iframe src='/viewunassigneitemlogs'></iframe>
                                </div>
                             )}

                         {showDisplayingReportsIframe &&(
                                <div className='showdepartments'>
                                    <iframe src='viewreportsRequsts'></iframe>
                                </div>
                             )}
                             
                             {showDisplayingIStuffsIframe &&(
                                <div className='showstuffs'>
                                    <iframe src='/viewstuffs'></iframe>
                                </div>
                             )}

                          {showDisplayingRequestsIframe &&(
                                <div className='showstuffs'>
                                    <iframe src='/viewRequsts'></iframe>
                                </div>
                             )}

                            {showDisplayAllItemsIframe &&(
                                <div className='showallitem'>
                                    <iframe src='/viewallitems'></iframe>
                                </div>
                             )}

                             {showDisplayLaptopsIframe &&(
                                <div className='showitemlaptop'>
                                    <iframe src='/viewlaptops'></iframe>
                                </div>
                             )}

                             {showDisplayingPhonesIframe &&(
                                <div className='showitemphones'>
                                    <iframe src='/viewsphones'></iframe>
                                </div>
                             )}

                             {showDisplayingFurnitureIframe &&(
                                <div className='showitemfurniture'>
                                    <iframe src='/viewfurniture'></iframe>
                                </div>
                             )}

                            {showDisplayingStationaryIframe &&(
                                <div className='showstationary'>
                                    <iframe src='/viewstationary'></iframe>
                                </div>
                            )}
                            
                            {showDisplayingAssigneditemsIframe &&(
                                <div className='showassigneditems'>
                                    <iframe src='/viewassigneditems'></iframe>
                                </div>
                            )}
                            </div>
                             
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Inventorydashboard;