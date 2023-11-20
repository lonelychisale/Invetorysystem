import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';
function AssignSpecificItem(){
  const [user, setUser] = useState(null);
  const [items, setItems] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState('');
  const [selectedItem, setSelectedItem] = useState('');
  const { id } = useParams();


  useEffect(() => {
    // Fetch the list of users from the API and set the state
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/users');
        setUsers(response.data.users);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUsers();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/items');
      setItems(response.data.items);
    } catch (error) {
      console.error(error);
    }
  };

  const handleItemChange = (e) => {
    setSelectedItem(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const selectedUserId = user?.id;
      const selectedItemId = items.find((item) => item.itemname === selectedItem)?.id;

      if (!selectedUserId || !selectedItemId) {
        console.error('User or Item not found');
        return;
      }

      const response = await axios.post('http://localhost:8000/api/assignitems', {
        user_id: selectedUserId,
        item_id: selectedItemId,
      });
      console.log(response.data);
      // Handle successful assignment
      // Redirect to the view assigned items page
    } catch (error) {
      console.error(error);
      // Handle error or display error message
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

    return(
        <div className="assignitems">
            <div className="wrap">
                <div className="wrappedassignitems">
                
                    <div className="assignitemsform">
                       
                    <form onSubmit={handleSubmit}>
                            <div className="formgroup">
                                <label>staff details</label>
                                <select id="user" value={selectedUserId} onChange={(e) => setSelectedUserId(e.target.value)}>
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
                                <select name="item_id" value={selectedItem} onChange={handleItemChange}>
                                    <option value="">Select Item</option>
                                   {items.map((item) => (
                                   <option key={item.id} value={item.itemname}>
                                   {item.itemname}
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

                
            </div>
        </div>
    )
}

export default AssignSpecificItem