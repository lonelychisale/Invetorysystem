import React, { useState, useEffect } from 'react';
import axios from 'axios';

function EditLogs() {
    const [deleteLogs, setDeleteLogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const deletedUsersResponse = await axios.get('http://localhost:8000/api/getediteduserlogs');
                const deletedItemsResponse = await axios.get('http://localhost:8000/api/getediteditemlogs');

                if (deletedUsersResponse.data.status === 200 && deletedItemsResponse.data.status === 200) {
                    const combinedLogs = [
                        ...deletedUsersResponse.data.deleteduserlogs,
                        ...deletedItemsResponse.data.deleteditemlogs,
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
        deleteLogsTable = <tr><td colSpan="4">No edited logs available.</td></tr>;
    } else {
        deleteLogsTable = deleteLogs.map((log) => (
            <tr key={log.id}>
              <td style={{ textTransform: 'lowercase' }}>{log.editinguser.email}</td>
              <td>
            {log.category === 'users' ? `${log.editeduser.fullname} (${log.editeduser.email})` : 'Item edited'}
            {log.category === 'items' ? `${log.editeditem.itemname} (${log.editeditem.idnumber})` : ''}
        </td>
              <td>{log.category}</td>
              <td>{log.created_at}</td>
            </tr>
          ));
          
    }

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>editing User</th>
                        <th>edited User/Item</th>
                        <th>table name</th>
                        <th>Time edited</th>
                    </tr>
                </thead>
                <tbody>{deleteLogsTable}</tbody>
            </table>
        </div>
    );
}

export default EditLogs;
