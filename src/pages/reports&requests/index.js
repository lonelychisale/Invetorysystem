import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ViewReportsRequests() {
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
      const response = await axios.get('http://localhost:8000/api/reportsearch', {
        params: searchInput,
      });
      setSearchResults(response.data.reports);
      setData(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    axios.get('http://localhost:8000/api/all-requests-and-reports')
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
          <th>item issues reports</th>
          <th colSpan='8'>
            <form onSubmit={handleSearchSubmit} className='laptopform'>
              <div className='searchinputs'>
                <input
                  type='search'
                  name='searchvalue'
                  value={searchInput.searchvalue}
                  onChange={handleSearchChange}
                  placeholder='search by item issue reporter or item ID.......'
                  className='search gadget'
                  autoComplete="off"
                />
                <input type='submit' value='search' />
              </div>
            </form>
          </th>
        </tr>

        <tr>
          <th style={{ padding: "15px" }}>reported by</th>
          <th style={{ padding: "15px" }}>item name</th>
          <th style={{ padding: "15px" }}>subject</th>
          <th style={{ padding: "15px" }}>message</th>
          <th style={{ padding: "15px" }}>time</th>
        </tr>

        <tbody>
          {searchResults.length > 0 ? (
            searchResults.map((item) => (
              <tr key={item.id}>
                <td>{item.user.fullname}</td>
                <td>{item.item.itemname}({item.item.idnumber})</td>
                <td>{item.subject}</td>
                <td>{item.message}</td>
                <td>{item.created_at}</td>
              </tr>
            ))
          ) : (
            data.map((item) => (
              <tr key={item.id}>
                <td>{item.user.fullname}</td>
                <td>{item.item.itemname}({item.item.idnumber})</td>
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

export default ViewReportsRequests;
