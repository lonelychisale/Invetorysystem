import '../../../css/adduser.css'
import {useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2';
import axios from 'axios'
import _ from 'lodash';

function Addusers(){

    const inintialvalues = {fullname:"",email:"",department:"",role:"",password:"null"}
    const [formInput,setFormInputs] = useState(inintialvalues)
    const [formerrors,setformerrors] = useState({})
    const [isSubmit,setIsSubmit] = useState(false)
    const [successmessage,setsuccessmessage]  = useState(false)
    const [departments, setDepartments] = useState([]);
    const [selectedDepartment, setSelectedDepartment] = useState('');


    useEffect(() => {
        setsuccessmessage("user registration")
    }, []);


    useEffect(() => {
        fetchDepartments()
      }, []);

     //getting user id from users databse
     const fetchDepartments = async () => {
        try {
          const response = await axios.get('http://localhost:8000/api/getdepartments');
          setDepartments(response.data.departmets);
        } catch (error) {
          console.error(error);
        }
      };

      //getting Department input value
      const handleDepartmentChange = (e) => {
        setSelectedDepartment(e.target.value);
        setFormInputs({ ...formInput, department: e.target.value }); // Update formInput.department
    };
    


    const handleforminputs = (e) =>{
        const {name,value} = e.target

        setFormInputs({...formInput,[name]:value})
    
    }

    if(formInput.role=='Administrator'){
        formInput.password = "adminstrator"

    }
    if(formInput.role=='ICT'){
        formInput.password = "controladmin"
    }
   
    
    const submitForm = async (e) =>{
        e.preventDefault()
        setformerrors(validateform(formInput))
        formInput.department = selectedDepartment;
        
        setIsSubmit(true)
        const res = await axios.post('http://localhost:8000/api/addusers',formInput)
        console.log(formInput.password)
        if(res.data.status === 200){
            console.log(res.data.message)

            var emptyvalues = {fullname:"",email:"",role:"",password:""}
            setFormInputs(emptyvalues)

            Swal.fire({
                title: 'Success!',
                text: 'user added successfully',
                icon: 'success',
                confirmButtonText: 'OK',
                customClass: {
                    container: 'my-custom-alert', // Add your custom class here
                  },
                  customContainerClass: 'my-custom-alert-box', 
               }).then((result) => {
                // Reload the page after the alert is closed (user clicked "OK")
                window.location.reload();
              });
              
        }
        else if(res.data.status === 409){
           
            Swal.fire({
                title: 'warning!',
                text: 'user  already exist!',
                icon: 'warning',
                confirmButtonText: 'OK',
                
               }).then((result) => {
                // Reload the page after the alert is closed (user clicked "OK")
                window.location.reload();
              });
        }
        else{
            setsuccessmessage("registration failed")
        }

       
        
    }

    useEffect(() =>{
        console.log(formerrors)
        if(Object.keys(formerrors).length === 0 && isSubmit){
            console.log(formInput)
        }
    },[formerrors])

    const validateform = (values) =>{
        const errors = {}
       
        return errors

    }

   //database users statistics
   const [userCount, setUserCount] = useState(0);

   useEffect(() => {
       fetchUserCount();
   }, []);

   const fetchUserCount = async () => {
       try {
           const response = await axios.get('http://localhost:8000/api/userscount');
           setUserCount(response.data.userCount);
       } catch (error) {
           console.error(error);
       }
   };


   
    return(
        <div className="usersbody">
            <pre hidden  style={{backgroundColor:'silver'}}>{JSON.stringify(formInput,)}</pre>
            <div className="form">
                <form onSubmit={submitForm} method='post'>
                    <div className='formheader'>
                       <h3>{successmessage}</h3>
                        <h1><Link  className='link'>staff registration</Link></h1>
                    </div>
                    <div className='forms'>
                    <div className="form-group">
                        <label>full name</label>
                        <input type="text" name="fullname" value={formInput.fullname} onChange={handleforminputs} required></input>
                       
                    </div>
                    
                    <div className="form-group">
                        <label>email address</label>
                        <input type="email" name="email" value={formInput.email} onChange={handleforminputs} required></input>
                        
                    </div>
                    
                    <div className="form-group">
                        <label>Department</label>
                        <select name="department" className="select" value={formInput.department} onChange={handleDepartmentChange} required>
                            <option value="">choose department</option>
                            {departments.map((department) => (
                                   <option key={department.id} value={department.id}>
                                    {department.name}
                                  </option>
                                  ))}
                               
                       </select>
                        
                    </div>

                    <div className="form-group">
                        <label>User role</label>
                        <select name="role" className="select" value={formInput.role} onChange={handleforminputs} required>
                            <option value="">choose role</option>
                            <option value="Administrator">administrator</option>
                            <option value="ICT">ICT officer</option>
                            <option value="Stuff">stuff</option>
                            
                       </select>
                        
                    </div>
                    
                    <div className="form-group">
                        
                        <input type="submit" name="submit" value="submit"></input>
                    </div> 

                    </div>
                </form>

                <div className='systemusersquantity'>
                    <div className='card'>
                        <div className='cardheader'><h3>users statistics</h3></div>
                        <div className='cardbody'><h1>{userCount}</h1></div>
                        <div className='cardfooter'></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Addusers;