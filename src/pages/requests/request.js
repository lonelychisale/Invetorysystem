import '../../css/items/request.css'
import Logo from '../../images/imagesf.jpg'
import {useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2';
import axios from 'axios'
function RequestItem(){

    const inintialvalues = {email:"",category:"",item:"",subject:"",message:""}
    const [formInput,setFormInputs] = useState(inintialvalues)
    const [isSubmit,setIsSubmit] = useState(false)
    const [successmessage,setsuccessmessage]  = useState(false)
    const [selectedUser, setSelectedUser] = useState('');
    const [users, setUsers] = useState([]);
    const [selectedItem, setSelectedItem] = useState('');
    const [items, setItems] = useState([]);
    const [itemRequestCategorySelected, setItemRequestCategorySelected] = useState(false);


    useEffect(() => {
        setsuccessmessage("invetory items request form")
    }, []);

   useEffect(() => {
  fetchUsers();
  fetchItems(selectedUser); // Pass selectedUser here
}, [selectedUser]); // Include selectedUser in the dependency array


        //getting item id from item database 
        const fetchItems = async (selectedUser) => {
          try {
            if (itemRequestCategorySelected) {
              // If "Item Request" category is selected, do not fetch items
              setItems([]);
              return;
            }

            const response = await axios.get(`http://localhost:8000/api/assigned-items/${encodeURIComponent(selectedUser)}`);
            console.log("Response:", response.data);
            setItems(response.data.items);
        } catch (error) {
            console.error("API Error:", error);
        }
        
      };
      
      

        const handleItemChange = (e) => {
          const selectedItem = e.target.value;
          setSelectedItem(selectedItem); // Update the selected item's value
        
          // Now, update the formInput.item state
          setFormInputs({ ...formInput, item: selectedItem });
        };
        
        

      //getting user id from users databse
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/users');
        setUsers(response.data.users);
      } catch (error) {
        console.error(error);
      }
    };

     //getting user input value
     const handleUserChange = (e) => {
      const selectedEmail = e.target.value;
      setSelectedUser(selectedEmail); // Update the selected user's email



    
      // Now, update the formInput.email state
      setFormInputs({ ...formInput, email: selectedEmail });
    };
    

    const handleforminputs = (e) =>{ 
        const {name,value} = e.target

        setFormInputs({...formInput,[name]:value})
        
    
    }

   
  const submitForm = async (e) => {
    e.preventDefault();

    setIsSubmit(true);
    try {
      const apiUrl = formInput.category === "requests"
  ? 'http://localhost:8000/api/requests' // Submit to requests table
  : 'http://localhost:8000/api/reports'; // Submit to reports table


      const res = await axios.post(apiUrl, formInput);

      console.log(formInput)

      let toastMessage = '';

      if (res.data.status === 200) {
        // Determine the toast message based on the selected category
        toastMessage = formInput.category === "requests"
          ? 'Request sent successfully'
          : 'Report sent successfully';
      } else if (res.data.status === 409) {
        // Determine the conflict message based on the selected category
        toastMessage = formInput.category === "requests"
          ? 'Request already exists'
          : 'Report already exists';
      }
  
      setsuccessmessage(toastMessage);
  
      if (res.data.status === 200) {
        setFormInputs(inintialvalues);
  
        Swal.fire({
          title: 'Success!',
          text: `${toastMessage}! You will receive a response through your email.`,
          icon: 'success',
          confirmButtonText: 'OK'
        }).then((result) => {
          window.location.reload();
        });
      } else if (res.data.status === 409) {
        setFormInputs({
          email: '',
          subject: '',
          message: ''
        });
  
        Swal.fire({
          title: 'Warning!',
          text: `${toastMessage}!`,
          icon: 'warning',
          confirmButtonText: 'OK'
        }).then((result) => {
          window.location.reload();
        });
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };
  
  
  const toggleItemRequestCategory = (e) => {
    const selectedCategory = e.target.value;
    setFormInputs({ ...formInput, category: selectedCategory });

    if (selectedCategory === 'requests') {
      setItemRequestCategorySelected(true);
      // Reset the item selection
      setFormInputs({ ...formInput, item: '' });
    } else {
      setItemRequestCategorySelected(false);
    }
  };

  


    //database items statistics
   const [itemCount, setItemCount] = useState(0);

   useEffect(() => {
       fetchItemCount();
   }, []);

   const fetchItemCount = async () => {
       try {
           const response = await axios.get('http://localhost:8000/api/itemscount');
           setItemCount(response.data.itemCount);
       } catch (error) {
           console.error(error);
       }
   };


  

    return(
        <div className="requestitem">
             <pre hidden  style={{backgroundColor:'red'}} >{JSON.stringify(formInput,)}</pre>
            <div className="form">
           
                <form  onSubmit={submitForm} method='POST'>
                    <img src={Logo}></img>
                    <h1>invetory items  report form</h1>
                    <div className="formgroup">
                        <label>email adress</label>
                        <select name='email'  value={selectedUser} onChange={handleUserChange} required>
                            <option value="">select your email</option>
                                   {users.map((user) => (
                            <option key={user.id} value={user.id}>
                                    {user.fullname} ({user.email})
                          </option>
                                   ))}
                        </select>   
                    </div>

                    <div className="formgroup">
                        <label>report category</label>
                        <select
                             name="category"
                             value={formInput.category}
                             onChange={handleforminputs}
                             required
                        >
                             <option>select report category</option>
                             <option value="requests">item request</option>
                             <option value="reports">item issues report</option>
                        </select>
                    </div>

                    {/* Conditionally render the item field */}
                    {formInput.category === "requests" ? null : (
                    <div className="formgroup">
                        <label>item</label>
                        <select
                             name="item"
                             value={selectedItem}
                             onChange={handleItemChange}
                             required
                        >
                            <option value="">Select Item</option>
                            {items.map((item) => (
                            <option key={item.id} value={item.id}>
                               {item.itemname} (Serial Number: {item.idnumber})
                            </option>
                             ))}
                        </select>
                    </div>
                     )}

                    <div className="formgroup">
                        <label>subject</label>
                        <input type="text" name='subject' value={formInput.subject} onChange={handleforminputs} required></input>
                    </div>
                    <div className="formgroup">
                        <label>message</label>
                        <textarea  name='message' value={formInput.message} onChange={handleforminputs} required></textarea>
                    </div>
                    <div className="formgroup">
                        <input type="submit" value='send request'></input>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default RequestItem;