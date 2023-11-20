import '../../../css/queries/additems.css'
import {useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2';
import axios from 'axios'
function Additems(){
    const inintialvalues = {itemname:"",itemcategory:"",idnumber:"",serialnumber:"",price:"",manufacturedate:"",lifespan:"",itemstatus:"",itempossesionstatus:"unassigned",branch:"",createdBy:""}
    const [formInput,setFormInputs] = useState(inintialvalues)
    const [isSubmit,setIsSubmit] = useState(false)
    const [successmessage,setsuccessmessage]  = useState(false)

    
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
  

  console.log(LoggedInUserId);



    useEffect(() => {
        setsuccessmessage("add items")

         // Retrieve the logged-in user's data from localStorage
    
const userData = localStorage.getItem('user');
if (userData) {
  const user = JSON.parse(userData);
  if (user && user.id) {
    // Set the createdBy field with the user's ID
    const updatedFormInput = { ...formInput, createdBy: user.id };
    setFormInputs(updatedFormInput);
  }
}

    }, []);

    const handleforminputs = (e) => {
        const { name, value } = e.target;
      
        
          // Handle form inputs
          setFormInputs({ ...formInput, [name]: value });
        
      }
    
   
  const submitForm = async (e) => {
    e.preventDefault();

    setIsSubmit(true);
    try {
      const res = await axios.post('http://localhost:8000/api/additems', formInput);

      if (res.data.status === 200) {
        // Item added successfully
        setsuccessmessage("Item added");
        
        
        // Clear the form inputs after successful insertion
        setFormInputs({
          itemname: "",
          itemcategory: "",
          idnumber: "",
          serialnumber:"",
          price:"",
          itemstatus: "",
          itempossesionstatus: ""
        });

        // Show the SweetAlert2 success alert
      Swal.fire({
        title: 'Success!',
        text: 'item added successfully!',
        icon: 'success',
        confirmButtonText: 'OK'
       }).then((result) => {
        // Reload the page after the alert is closed (user clicked "OK")
        window.location.reload();
      });

      } else if (res.data.status === 409) {
        // Item already exists
        setsuccessmessage("Item exists");
       
        // Clear the form inputs after item already exists
        setFormInputs({
          itemname: "",
          itemcategory: "",
          idnumber: "",
          itemstatus: "",
          itempossesionstatus: ""
        });

        // Show the SweetAlert2 success alert
      Swal.fire({
        title: 'warning!',
        text: 'item already exist!',
        icon: 'warning',
        confirmButtonText: 'OK'
       }).then((result) => {
        // Reload the page after the alert is closed (user clicked "OK")
        window.location.reload();
      });
      }
    } catch (error) {
      console.log("Error:", error);
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
        <div className="itemsdiv">
             <pre style={{backgroundColor:'silver'}} hidden>{JSON.stringify(formInput,)}</pre>
             
            <div className='wrappingitemsform'>
                
            <div className="itemsform">
           
                <form onSubmit={submitForm} method='POST'>
                
                    
                    <h2>
                        <span>{successmessage}</span>
                        <span><button><Link to='/assignitems' className='link items'>assign items</Link></button></span> 
                     </h2>
                     
                    <div className="form-inputs">
                        <label>item name</label>
                        <input required type="text" name='itemname' value={formInput.itemname} onChange={handleforminputs}></input>
                       
                    </div>
                    <div className="form-inputs">
                        <label>item category</label>
                        <select name="itemcategory" className="select" value={formInput.itemcategory} onChange={handleforminputs} required>
                            <option value="">choose item category</option>
                            <option value='computer'>computer</option>
                            <option value='phone'>phone</option>
                            <option value='stationary'>stationary</option>
                            <option value='furniture'>furniture</option> 
                       </select> 
                       
                    </div>
                    <div className="form-inputs">
                        <label>item ID</label>
                        <input required type="text" name='idnumber' value={formInput.idnumber} onChange={handleforminputs}></input>
                        
                    </div>
                    <div className="form-inputs">
                        <label>item serial number</label>
                        <input  type="text" name='serialnumber' value={formInput.serialnumber} onChange={handleforminputs}></input>
                        
                    </div>

                    <div className="form-inputs">
                        <label>price</label>
                        <input  type="text" name='price' value={formInput.price} onChange={handleforminputs}></input>
                        
                    </div>

                    <div className="form-inputs">
                        <label>manufactured date</label>
                        <input  type="date" name='manufacturedate' value={formInput.manufacturedate} onChange={handleforminputs}></input>
                        
                    </div>

                    <div className="form-inputs">
                        <label>lifespan</label>
                        <input  type="number" name='lifespan' value={formInput.lifespan} onChange={handleforminputs}></input>
                        
                    </div>
                    <div className="form-inputs">
                        <label>item status</label>
                        <select name="itemstatus" className="select" value={formInput.itemstatus} onChange={handleforminputs} required>
                            <option value="">choose item status</option>
                            <option value='working'>working</option>
                            <option value='not working'>not working</option>
                            <option value='disposed'>disposed</option>
                       </select>    
                       
                    </div>

                    <div className="form-inputs">
                        <label>branch</label>
                        <select name="branch" className="select" value={formInput.branch} onChange={handleforminputs} >
                            <option value="">choose branch belonging</option>
                            <option value='FHL'>FHL</option>
                            <option value='FRT'>FRT</option>
                       </select>    
                       
                    </div>

                    <div className="form-inputs" hidden>
                       <label>Created By</label>
                       <input type="text" name="createdBy" value={formInput.createdBy}  />
                    </div>

                    <div className="form-inputs">
                        <input type="submit" value='add item' onChange={handleforminputs}></input>
                    </div>
                </form>
            </div>
            <div className='systemadditemsquantity'>
                    <div className='card'>
                        <div className='cardheader'><h3>system  items statistics</h3></div>
                        <div className='cardbody'><h1>{itemCount}</h1></div>
                        <div className='cardfooter'></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Additems