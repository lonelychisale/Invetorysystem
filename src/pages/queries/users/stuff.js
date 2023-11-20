import '../../../css/addstuffs.css'
import {useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

function Addstuffs(){

    const inintialvalues = {fullname:"",email:"",organisationbraching:"",department:"",position:""}
    const [formInput,setFormInputs] = useState(inintialvalues)
    const [formerrors,setformerrors] = useState({})
    const [isSubmit,setIsSubmit] = useState(false)

    const handleforminputs = (e) =>{
        const {name,value} = e.target

        setFormInputs({...formInput,[name]:value})
    
    }

    const submitForm = async (e) =>{
        e.preventDefault()
        setformerrors(validateform(formInput))
        
        setIsSubmit(true)
        const res = await axios.post('http://localhost:8000/api/addstuffs',formInput)

        if(res.data.status === 200){
            console.log(res.data.message)
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

        if(!values.fullname){
            errors.fullname = "full name is requred"
        }
        if(!values.email){
            errors.email = "email is required"
        }
        if(!values.organisationbraching){
           errors.organisationbraching = "branch of the organisation is required" 
        }
        if(!values.department){
            errors.department = "department is required" 
         }
         if(!values.position){
            errors.position = "position is required" 
         }
        return errors

    }




   
    return(
        <div className="usersbody">
            <pre style={{backgroundColor:'silver'}}>{JSON.stringify(formInput,)}</pre>
            <div className="form">
                <form onSubmit={submitForm} method='post'>
                    <div className='formheader'>
                       <h3>stuff registration</h3>
                        <h1><Link to='/Adduser' className='link'>admin registration</Link></h1>
                    </div>
                    <div className='forms'>
                    <div className="form-group">
                        <label>full name</label>
                        <input type="text" name="fullname" value={formInput.fullname} onChange={handleforminputs}></input>
                        <p style={{color:'red'}}>{formerrors.fullname}</p>
                    </div>
                    
                    <div className="form-group">
                        <label>email address</label>
                        <input type="email" name="email" value={formInput.email} onChange={handleforminputs}></input>
                        <p style={{color:'red'}}>{formerrors.email}</p>
                    </div>


 
                    <div className="form-group">
                        <label>organisation branch</label>
                        <select name='organisationbraching' value={formInput.organisationbraching} onChange={handleforminputs}>
                            <option value='FHL'>FHL</option>
                            <option value='FRT'>FRT</option>
                        </select>
                        <p style={{color:'red'}}>{formerrors.organisationbraching}</p>
                    </div>

                     
                    <div className="form-group">
                        <label>department</label>
                        <select name='department' value={formInput.department} onChange={handleforminputs}>
                            <option value='ICT'>ICT</option>
                            <option value='RADIO'>RADIO</option>
                            <option value='CALL CENTER'>CALL CENTER</option>
                            <option value='ADMINISTRATION'>ADMINISTRATION</option>
                            <option value='MEAL'>MEAL</option>
                            <option value='ACCOUNTS'>ACCOUNTS</option>
                        </select>
                        <p style={{color:'red'}}>{formerrors.department}</p>
                    </div>
                     
                    <div className="form-group">
                        <label>Position</label>
                        <select name='position' value={formInput.position} onChange={handleforminputs}>
                            <option value='CEO'>CEO</option>
                            <option value='ICT officer'>ICT officer</option>
                        </select>
                        <p style={{color:'red'}}>{formerrors.position}</p>
                    </div>

                    <div className="form-group">
                        
                        <input type="submit" name="submit" value="submit"></input>
                    </div> 

                    </div>
                </form>
                <div className='systemusersquantity'>
                    <div className='card'>
                        <div className='cardheader'><h3>stuffs statistics</h3></div>
                        <div className='cardbody'><h1>31</h1></div>
                        <div className='cardfooter'></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Addstuffs;