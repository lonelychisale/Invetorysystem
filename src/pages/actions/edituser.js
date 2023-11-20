import '../../css/adduser.css'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

function EditUser(){

    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [updateMessage,setUpdateMessage] = useState("")
  

    useEffect(() => {
    const fetchUser= async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/getspecificuser/${id}}`);
        setUser(response.data.user);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:8000/api/editusers/${id}`, user);
      console.log(response.data);
      // Perform any additional actions after successful update
      if(response.data.status==200){
          setUpdateMessage("successfully changed user details")
      }
      else{
        setUpdateMessage("failed to change user details")
      }
        
    } catch (error) {
      console.error(error);
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

 

   
    return(
        <div className="usersbody">
            <pre hidden style={{backgroundColor:'silver'}}>{JSON.stringify(user,)}</pre>
            <div className="form">
                <form onSubmit={handleSubmit} method='post'>
                  <h2 style={{textAlign:'center',textTransform:'capitalize',opacity:'0.7',fontFamily:'serif'}}>{updateMessage}</h2>
                  <div className='forms'>
                    
                    <div className="form-group">
                        <label>full name</label>
                        <input type="text" name="fullname" value={user.fullname} onChange={handleChange}></input>
                    </div>
                    
                    <div className="form-group">
                        <label>email address</label>
                        <input type="email" name="email" value={user.email} onChange={handleChange}></input>
                    </div>
                    
                    <div className="form-group">
                        <label>User role</label>
                        <select className='select' name='role' value={user.role} onChange={handleChange}>
                            <option>choose role</option>
                            <option value='Administrator'>administrator</option>
                            <option value='ICT'>ICT officer</option>
                            <option value='Stuff'>stuff</option>
                        </select>
                       
                    </div>
                    <div className="form-group">
                        
                        <input type="submit" name="submit" value="Edituser"></input>
                    </div> 

                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditUser;