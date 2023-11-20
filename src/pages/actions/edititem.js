import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';


function EditItem() {
  const { id } = useParams();

  const [item, setItem] = useState(null);
  const [updateMessage,setUpdateMessage] = useState("")

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/getspecificitem/${id}`);
        setItem(response.data.item);
      } catch (error) {
        console.error(error);
      }
    };

    fetchItem();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItem({ ...item, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:8000/api/edititems/${id}`, item);
      console.log(response.data);
      if(response.data.status==200){
        setUpdateMessage("item details changed successfully")
    }
    else{
      setUpdateMessage("failed to change user details")
    }
    } catch (error) {
      console.error(error);
      
    }
  };

  if (!item) {
    return <div>Loading...</div>;
  }

  return (
    <div className="itemsdiv">
      <pre style={{ backgroundColor: 'silver' }} hidden>
        {JSON.stringify(item)}
      </pre>
      <div className="wrappingitemsform">
        <div className="itemsform">
          <form onSubmit={handleSubmit} method="POST">
          <h2 style={{textAlign:'center',textTransform:'capitalize',opacity:'0.7',fontFamily:'serif'}}>{updateMessage}</h2>
  
            <div className="form-inputs">
              <label>item name</label>
              <input type="text" name="itemname" value={item.itemname} onChange={handleChange} />
            </div>
            <div className="form-inputs">
              <label>item category</label>
              <select name="itemcategory" onChange={handleChange} value={item.itemcategory}>
                <option>select item category</option>
                <option value="computer">computer</option>
                <option value="phone">phone</option>
                <option value="stationary">stationary</option>
                <option value="furniture">furniture</option>
              </select>
            </div>
            <div className="form-inputs">
              <label>item ID</label>
              <input type="text" name="idnumber" value={item.idnumber} onChange={handleChange} />
            </div>
            <div className="form-inputs">
              <label>item serial number</label>
              <input type="text" name="serialnumber" value={item.serialnumber} onChange={handleChange} />
            </div>

            <div className="form-inputs">
              <label>price</label>
              <input type="text" name="price" value={item.price} onChange={handleChange} />
            </div>
            <div className="form-inputs">
              <label>item status</label>
              <select name="itemstatus" value={item.itemstatus} onChange={handleChange}>
                <option>select item status</option>
                <option value="working">working</option>
                <option value="not working">not working</option>
                <option value="disposed">disposed</option>
              </select>
            </div>
            <div className="form-inputs">
              <input type="submit" value="edit item" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditItem;
