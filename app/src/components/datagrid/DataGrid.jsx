import React, { useState, useMemo } from 'react';
import './DataGrid.css'; // Include CSS file for custom styling

const DataGrid = ({ columns, rows, initialSort = { field: '', direction: 'asc' }, rowsPerPage = 5 }) => {
    const [sortConfig, setSortConfig] = useState(initialSort);
    const [filterText, setFilterText] = useState('');
    const [currentPage, setCurrentPage] = useState(0);

    // we use the useMemo which is a react hook
    // to cache some information
    const sortedRows = useMemo(() => {
        const sorted = [...rows].sort((a, b) => {
            if (!sortConfig.field) return 0;
            const aValue = a[sortConfig.field];
            const bValue = b[sortConfig.field];
            if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
            if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
            return 0;
        });
        return sorted;
    }, [rows, sortConfig]);

    // Filter rows based on the filter text
    const filteredRows = useMemo(() => {
        if (!filterText) return sortedRows;
        return sortedRows.filter(row =>
            columns.some(column =>
                String(row[column.field]).toLowerCase().includes(filterText.toLowerCase())
            )
        );
    }, [filterText, sortedRows, columns]);

    // Get paginated rows
    const paginatedRows = useMemo(() => {
        const start = currentPage * rowsPerPage;
        const end = start + rowsPerPage;
        return filteredRows.slice(start, end);
    }, [currentPage, rowsPerPage, filteredRows]);

    // Handle column sorting
    const handleSort = field => {
        setSortConfig(prevConfig => ({
            field,
            direction: prevConfig.field === field && prevConfig.direction === 'asc' ? 'desc' : 'asc'
        }));
    };

    // Handle pagination
    const handlePageChange = (newPage) => setCurrentPage(newPage);

    return (
        <div className="data-grid">
            <input
                type="text"
                placeholder="Search..."
                value={filterText}
                onChange={e => setFilterText(e.target.value)}
                className="data-grid__search"
            />
            <table className="data-grid__table">
                <thead>
                    <tr>
                        {columns.map(column => (
                            <th
                                key={column.field}
                                onClick={() => handleSort(column.field)}
                                className="data-grid__header-cell"
                            >
                                {column.label}
                                {sortConfig.field === column.field && (
                                    <span>{sortConfig.direction === 'asc' ? ' ▲' : ' ▼'}</span>
                                )}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {paginatedRows.map((row, rowIndex) => (
                        <tr key={rowIndex} className="data-grid__row">
                            {columns.map(column => (
                                <td key={column.field} className="data-grid__cell">
                                    {row[column.field]}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="data-grid__pagination">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 0}
                >
                    Previous
                </button>
                <span>Page {currentPage + 1}</span>
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={(currentPage + 1) * rowsPerPage >= filteredRows.length}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default DataGrid;
