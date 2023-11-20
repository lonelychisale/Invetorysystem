import React, { useState, useEffect } from 'react';
import axios from 'axios';

function DeleteLogs() {
    const [deleteLogs, setDeleteLogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const deletedUsersResponse = await axios.get('http://localhost:8000/api/getdeleteduserlogs');
                const deletedItemsResponse = await axios.get('http://localhost:8000/api/getdeleteditemlogs');

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
        deleteLogsTable = <tr><td colSpan="4">No deleted logs available.</td></tr>;
    } else {
        deleteLogsTable = deleteLogs.map((log) => (
            <tr key={log.id}>
                <td style={{ textTransform: 'lowercase' }}>{log.deletinguser.email}</td>
                <td>
                {log.category === 'users' ? `${log.deleteduser.fullname} (${log.deleteduser.email})` : 'Item edited'}
                {log.category === 'items' ? `${log.deleteditem.itemname} (${log.deleteditem.idnumber})` : ''}
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
                        <th>Deleting User</th>
                        <th>Deleted User/Item</th>
                        <th>table name</th>
                        <th>Time Deleted</th>
                    </tr>
                </thead>
                <tbody>{deleteLogsTable}</tbody>
            </table>
        </div>
    );
}

export default DeleteLogs;
