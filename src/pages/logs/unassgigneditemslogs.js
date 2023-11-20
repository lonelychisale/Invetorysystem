import React, { useState, useEffect } from 'react';
import axios from 'axios';
function UnassignedItemsLogs(){
    const [deleteLogs, setDeleteLogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const deletedUsersResponse = await axios.get('http://localhost:8000/api/getunassigneditemlogs');
                
                if (deletedUsersResponse.data.status === 200) {
                    const combinedLogs = [
                        ...deletedUsersResponse.data.unassgneditmelogs,
                       
                    ];
                    setDeleteLogs(combinedLogs);
                    setLoading(false);
                } else {
                    setLoading(false);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    let deleteLogsTable = null;

    if (loading) {
        deleteLogsTable = <tr><td colSpan="4">Data loading...</td></tr>;
    } else if (deleteLogs.length === 0) {
        deleteLogsTable = <tr><td colSpan="4">No deleted logs available.</td></tr>;
    } else {
        deleteLogsTable = deleteLogs.map((log) => (
            <tr key={log.id}>
                <td style={{ textTransform: 'lowercase' }}>{log.unassigninguser.fullname}({log.unassigninguser.email})</td>
                <td>{log.unassigneditem.item.itemname}({log.unassigneditem.item.idnumber})</td>
                <td>{log.created_at}</td>
            </tr>
        ));
    }

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Unassigning item User</th>
                        <th>item name</th>
                        <th>Time unassigned</th>
                    </tr>
                </thead>
                <tbody>{deleteLogsTable}</tbody>
            </table>
        </div>
    );

}

export default UnassignedItemsLogs