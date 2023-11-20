import React, { useEffect, useState } from 'react';
import axios from 'axios';

function RequestResponse() {
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
      const response = await axios.get('http://localhost:8000/api/retriverequestresponsesearch', {
        params: searchInput,
      });
      setSearchResults(response.data.requestresponses);
      setData(response.data.data); // Update the data state with search results
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    axios.get('http://localhost:8000/api/retriverequestresponse')
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
          <th >item issues requests responses</th>
          <th colSpan='8'>
            <form onSubmit={handleSearchSubmit} className='laptopform'>
              <div className='searchinputs'>
                <input
                  type='search'
                  name='searchvalue'
                  value={searchInput.searchvalue}
                  onChange={handleSearchChange}
                  placeholder='search by item requester name or request respondent.......'
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
          <th style={{ padding: "15px" }}>request subject</th>
          <th style={{ padding: "15px" }}>request message</th>
          <th style={{ padding: "15px" }}>response</th>
          <th style={{ padding: "15px" }}>responded by</th>
          <th style={{ padding: "15px" }}>responded at</th>
        </tr>

        <tbody>
          {searchResults.length > 0 ? (
            searchResults.map((result) => (
              <tr key={result.id}>
                <td>{result.request.user.fullname}</td>
                <td>{result.request.subject}</td>
                <td>{result.request.message}</td>
                <td>{result.message}</td>
                <td>{result.user.fullname}</td>
                <td>{result.created_at}</td>
              </tr>
            ))
          ) : (
            data.map((reportrespose) => (
              <tr key={reportrespose.id}>
                <td>{reportrespose.request.user.fullname}</td>
                <td>{reportrespose.request.subject}</td>
                <td>{reportrespose.request.message}</td>
                <td>{reportrespose.message}</td>
                <td>{reportrespose.user.fullname}</td>
                <td>{reportrespose.created_at}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default RequestResponse;
