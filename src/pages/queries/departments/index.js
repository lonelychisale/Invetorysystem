import '../../../css/queries/additems.css'
import {useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2';
import axios from 'axios'
function Department(){
    const inintialvalues = {name:"",branch:"",leader:""}
    const [formInput,setFormInputs] = useState(inintialvalues)
    const [isSubmit,setIsSubmit] = useState(false)
    const [successmessage,setsuccessmessage]  = useState(false)


    useEffect(() => {
        setsuccessmessage("add departments")
    }, []);

    const handleforminputs = (e) =>{ 
        const {name,value} = e.target

        setFormInputs({...formInput,[name]:value})
    
    }
    
   
  const submitForm = async (e) => {
    e.preventDefault();

    setIsSubmit(true);
    try {
      const res = await axios.post('http://localhost:8000/api/adddepartments', formInput);

      if (res.data.status === 200) {
        // Item added successfully
        setsuccessmessage("department added");
        
        
        // Clear the form inputs after successful insertion
        setFormInputs({
          name: "",
          branch: "",
          leader: "",
          
        });

        // Show the SweetAlert2 success alert
      Swal.fire({
        title: 'Success!',
        text: 'department added successfully!',
        icon: 'success',
        confirmButtonText: 'OK'
       }).then((result) => {
        // Reload the page after the alert is closed (user clicked "OK")
        window.location.reload();
      });

      } else if (res.data.status === 409) {
        // Item already exists
        setsuccessmessage("Department exists");
       
        // Clear the form inputs after item already exists
        setFormInputs({
          name: "",
          branch: "",
          leader: ""
        });

        // Show the SweetAlert2 success alert
      Swal.fire({
        title: 'warning!',
        text: 'Department already exist!',
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
           const response = await axios.get('http://localhost:8000/api/departmentscounts');
           setItemCount(response.data.DepartmentCount);
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
          
                </h2>
                
               <div className="form-inputs">
                   <label>department name</label>
                   <input required type="text" name='name' value={formInput.name} onChange={handleforminputs}></input>
                  
               </div>
               <div className="form-inputs">
                   <label>Department branch</label>
                   <select name="branch" className="select" value={formInput.branch} onChange={handleforminputs} required>
                       <option value="">choose Department branch</option>
                       <option value='FHL'>FHL</option>
                       <option value='FRT'>FRT</option>
      
                  </select> 
                  
               </div>
               <div className="form-inputs">
                   <label>Department leader</label>
                   <input required type="text" name='leader' value={formInput.leader} onChange={handleforminputs}></input>
                   
               </div>
               <div className="form-inputs">
                   <input type="submit" value='add item' onChange={handleforminputs}></input>
               </div>
           </form>
       </div>
       <div className='systemadditemsquantity'>
               <div className='card'>
                   <div className='cardheader'><h3>Departments statistics</h3></div>
                   <div className='cardbody'><h1>{itemCount}</h1></div>
                   <div className='cardfooter'></div>
               </div>
           </div>
       </div>
   </div>
    )
}

export default Department;