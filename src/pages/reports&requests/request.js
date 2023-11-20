import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ViewAllRequests() {
  const [data, setData] = useState([]);
  const [searchInput, setSearchInput] = useState({
    searchvalue: '',
  });
  const [searchResults, setSearchResults] = useState([]);
  const [tablestate, setState] = useState({
    items: [],
    loading: true,
  });

  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setSearchInput((prevInput) => ({ ...prevInput, [name]: value }));
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get('http://localhost:8000/api/requestsearch', {
        params: searchInput,
      });
      setSearchResults(response.data.request || []);
      setData(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    axios.get('http://localhost:8000/api/all-requests')
      .then((response) => {
        setData(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="viewrequestsreports">
      <table cellSpacing={0}>
        <tr className='tableheader'>
          <th>item requests</th>
          <th colSpan='8'>
            <form onSubmit={handleSearchSubmit} className='laptopform'>
              <div className='searchinputs'>
                <input
                  type='search'
                  name='searchvalue'
                  value={searchInput.searchvalue}
                  onChange={handleSearchChange}
                  placeholder='search by item requester name or email.......'
                  className='search gadget'
                  autoComplete="off"
                />
                <input type='submit' value='search' />
              </div>
            </form>
          </th>
        </tr>

        <tr>
          <th style={{ padding: "15px" }}>requested by</th>
          <th style={{ padding: "15px" }}>subject</th>
          <th style={{ padding: "15px" }}>message</th>
          <th style={{ padding: "15px" }}>time</th>
        </tr>

        <tbody>
          {searchResults.length > 0 ? (
            searchResults.map((item) => (
              <tr key={item.id}>
                <td>{item.user.fullname}</td>
                <td>{item.subject}</td>
                <td>{item.message}</td>
                <td>{item.created_at}</td>
              </tr>
            ))
          ) : (
            data.map((item) => (
              <tr key={item.id}>
                <td>{item.user.fullname}</td>
                <td>{item.subject}</td>
                <td>{item.message}</td>
                <td>{item.created_at}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ViewAllRequests;
