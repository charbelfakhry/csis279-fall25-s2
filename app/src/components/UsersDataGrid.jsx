import React from 'react';
import DataGrid from './datagrid/DataGrid';

const UsersDataGrid = () => {
    const columns = [
        { label: 'ID', field: 'user_id' },
        { label: 'Name', field: 'user_name' },
        { label: 'Age', field: 'user_age' },
        { label: 'Country', field: 'user_country_name' }
    ];

    const rows = [
        { user_id: 1, user_name: 'Alice', user_age: 25, user_country_name: 'USA' },
        { user_id: 2, user_name: 'Bob', user_age: 30, user_country_name: 'Canada' },
        { user_id: 3, user_name: 'Charlie', user_age: 35, user_country_name: 'UK' },
        { user_id: 4, user_name: 'Dave', user_age: 40, user_country_name: 'Australia' },
        { user_id: 5, user_name: 'Eve', user_age: 45, user_country_name: 'New Zealand' },
        { user_id: 6, user_name: 'Frank', user_age: 50, user_country_name: 'Germany' },
        { user_id: 7, user_name: 'Grace', user_age: 28, user_country_name: 'France' },
        { user_id: 8, user_name: 'Hannah', user_age: 22, user_country_name: 'Brazil' }
    ];

    return (
        <div>
            <h1>User Reusable DataGrid Example</h1>
            <DataGrid columns={columns} rows={rows} />
        </div>
    );
};

export default UsersDataGrid;
