import React, { useEffect, useState } from 'react';
import axios from 'axios';
function ReportResponse(){
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
      const response = await axios.get('http://localhost:8000/api/retrivereportresponsesearch', {
        params: searchInput,
      });
      setSearchResults(response.data.reportresponses);
      setData(response.data.data); // Update the data state with search results
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    axios.get('http://localhost:8000/api/retrivereportresponse')
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
          <th >item issues report responses</th>
          <th colSpan='8'>
            <form onSubmit={handleSearchSubmit} className='laptopform'>
              <div className='searchinputs'>
                <input
                  type='search'
                  name='searchvalue'
                  value={searchInput.searchvalue}
                  onChange={handleSearchChange}
                  placeholder='search by item reporter name or request respondent.......'
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
          <th style={{ padding: "15px" }}>report subject</th>
          <th style={{ padding: "15px" }}>report message</th>
          <th style={{ padding: "15px" }}>response</th>
          <th style={{ padding: "15px" }}>responded by</th>
          <th style={{ padding: "15px" }}>responded at</th>
        </tr>

        <tbody>
          {searchResults.length > 0 ? (
            searchResults.map((result) => (
              <tr key={result.id}>
                <td>{result.report.user.fullname}</td>
                <td>{result.report.subject}</td>
                <td>{result.report.message}</td>
                <td>{result.message}</td>
                <td>{result.user.fullname}</td>
                <td>{result.created_at}</td>
              </tr>
            ))
          ) : (
            data.map((reportrespose) => (
              <tr key={reportrespose.id}>
                <td>{reportrespose.report.user.fullname}</td>
                <td>{reportrespose.report.subject}</td>
                <td>{reportrespose.report.message}</td>
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



export default ReportResponse;