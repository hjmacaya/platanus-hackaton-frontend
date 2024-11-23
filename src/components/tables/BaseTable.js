'use client';
import { FaTrash, FaEdit, FaEye, FaDownload } from 'react-icons/fa';

const Table = ({ data, styleVariant = 'style1', onView, onEdit, onDownload, onDelete }) => {
  if (!data || data.length === 0) {
    return <p className="text-center">No data available.</p>;
  }

  // Extract table headers from object keys
  const headers = Object.keys(data[0]);

  return (
    <div className="overflow-x-auto mx-10">
      <table className={`min-w-full ${getTableStyles(styleVariant)}`}>
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={header} className={getHeaderCellStyles(styleVariant)}>
                {header.charAt(0).toUpperCase() + header.slice(1)}
              </th>
            ))}
            <th className={getHeaderCellStyles(styleVariant)}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr
              key={idx}
              className={getRowStyles(styleVariant, idx)}
            >
              {headers.map((header) => (
                <td key={header} className={getCellStyles(styleVariant)}>
                  {row[header]}
                </td>
              ))}
              <td className={getCellStyles(styleVariant)}>
                <div className="flex justify-center space-x-2">
                  <button
                    onClick={() => onView(row)}
                    className="text-blue-600 hover:text-blue-800"
                    title="View"
                  >
                    <FaEye />
                  </button>
                  <button
                    onClick={() => onEdit(row)}
                    className="text-yellow-600 hover:text-yellow-800"
                    title="Edit"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => onDownload(row)}
                    className="text-green-600 hover:text-green-800"
                    title="Download"
                  >
                    <FaDownload />
                  </button>
                  <button
                    onClick={() => onDelete(row)}
                    className="text-red-600 hover:text-red-800"
                    title="Delete"
                  >
                    <FaTrash />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Helper functions to get styles based on variant
const getTableStyles = (variant) => {
  switch (variant) {
    case 'style2':
      return 'border-collapse border border-gray-300';
    case 'style3':
      return '';
    default:
      return 'divide-y divide-gray-200';
  }
};

const getHeaderCellStyles = (variant) => {
  switch (variant) {
    case 'style2':
      return 'px-6 py-3 border border-gray-300 bg-gray-100 text-left text-sm font-medium text-gray-700';
    case 'style3':
      return 'px-6 py-3 bg-primary text-white text-left text-sm font-semibold';
    default:
      return 'px-6 py-3 bg-gray-50 text-left text-sm font-medium text-gray-700';
  }
};

const getCellStyles = (variant) => {
  switch (variant) {
    case 'style2':
      return 'px-6 py-4 border border-gray-300 text-sm text-gray-700';
    case 'style3':
      return 'px-6 py-4 text-sm text-gray-800';
    default:
      return 'px-6 py-4 text-sm text-gray-700';
  }
};

const getRowStyles = (variant, idx) => {
  switch (variant) {
    case 'style3':
      return 'hover:bg-gray-100';
    default:
      return idx % 2 === 0 ? 'bg-white' : 'bg-gray-50';
  }
};

export { Table };
