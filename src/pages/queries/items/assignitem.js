import { useEffect, useState } from 'react'
import '../../../css/queries/assignitems.css'
import Swal from 'sweetalert2';
import axios from 'axios'
import { Link } from 'react-router-dom'
function Assignitem(){
    const [users, setUsers] = useState([]);
    const [items, setItems] = useState([]);
    const [selectedUser, setSelectedUser] = useState('');
    const [selectedItem, setSelectedItem] = useState('');
    const [successmessage,setsuccessmessage]  = useState(false)


    useEffect(() => {
        setsuccessmessage("assign items")
    }, []);
  
    useEffect(() => {
      fetchUsers();
      fetchItems();
    }, []);
  

    //getting user id from users databse
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/users');
        setUsers(response.data.users);
      } catch (error) {
        console.error(error);
      }
    };
  

    //getting item id from item database
    const fetchItems = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/getallitems');
        setItems(response.data.items);
      } catch (error) {
        console.error(error);
      }
    };
    

    //getting user input value
    const handleUserChange = (e) => {
      setSelectedUser(e.target.value);
    };
    
    //getting item input value
    const handleItemChange = (e) => {
      setSelectedItem(e.target.value);
    };
  

    const [user, setUser] = useState(null);

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

    //inserting user and item id to the assign item database
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
        const res = await axios.post('http://localhost:8000/api/assigneditems', {
          user_id: selectedUser,
          item_id: selectedItem,
          assignedby:LoggedInUserId,
        });
       
        if(res.data.status === 200){
            console.log(res.data);

          //emptying input fields
          var emptyselecteditem= {item_id:"Select User"}
          var emptyselecteduser = {user_id:"Select Item"}
          setSelectedUser(emptyselecteduser)
          setSelectedItem(emptyselecteditem);  


          Swal.fire({
            title: 'Success!',
            text: 'item assigned successfully!',
            icon: 'success',
            confirmButtonText: 'OK'
           }).then((result) => {
            // Reload the page after the alert is closed (user clicked "OK")
            window.location.reload();
          });
        }

        else if(res.data.status === 409){


          //emptying input fields
          var emptyselecteditem= {item_id:"Select User"}
          var emptyselecteduser = {user_id:"Select Item"}
          setSelectedUser(emptyselecteduser)
          setSelectedItem(emptyselecteditem); 

          Swal.fire({
            title: 'warning!',
            text: 'item already assigned!',
            icon: 'warning',
            confirmButtonText: 'OK'
           }).then((result) => {
            // Reload the page after the alert is closed (user clicked "OK")
            window.location.reload();
          });

        }
       

      } catch (error) {
        console.error(error);
        // Handle error or show a notification
      }
    };



    //database items statistics
   const [assigneditemCount, setAssignedItemCount] = useState(0);

   useEffect(() => {
       fetchAssignedItemCount();
   }, []);

   const fetchAssignedItemCount = async () => {
       try {
           const response = await axios.get('http://localhost:8000/api/assigneitemscount');
           setAssignedItemCount(response.data.assigneditemCount);
       } catch (error) {
           console.error(error);
       }
   };






    return(
        <div className="assignitems">
            <div className="wrap">
                <div className="wrappedassignitems">
                
                    <div className="assignitemsform">
                        <h2>
                            <span>{successmessage}</span>
                            <span><button className='button'><Link to='/additems' className='link items'>add items</Link></button></span> 
                        </h2>
                        <form onSubmit={handleSubmit} method='post'>
                          
                            <div className="formgroup">
                                <label>staff details</label>
                                <select className='select' value={selectedUser} onChange={handleUserChange} required>
                                   <option value="">Select User</option>
                                   {users.map((user) => (
                                   <option key={user.id} value={user.id}>
                                    {user.fullname} ({user.email})
                                  </option>
                                   ))}
                               </select>
                            </div>
                            <div className="formgroup">
                                <label>Item name</label>
                                <select className='select' value={selectedItem} onChange={handleItemChange} required>
                                   <option value="">Select Item</option>
                                   {items.map((item) => (
                                   <option key={item.id} value={item.id}>
                                    {item.itemname } (Serial Number: {item.idnumber })
                                   </option>
                                   ))}
                               </select>

                            </div>
                             
                            <div className="formgroup">
                                <input type='submit' name='submit' value='submit'></input>
                            </div>
                            
                        </form>
                        
                    </div>
                    
                </div>

                <div className='systemassigneditemsquantity'>
                    <div className='card'>
                        <div className='cardheader'><h3>assigned items statistics</h3></div>
                        <div className='cardbody'><h1>{assigneditemCount}</h1></div>
                        <div className='cardfooter'></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Assignitem