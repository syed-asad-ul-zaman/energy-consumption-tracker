import Link from "next/link";

export interface Column<T> {
    header: string;
    accessor: keyof T | ((row: T) => React.ReactNode);
}

interface DataTableProps<T> {
    columns: Column<T>[];
    data: T[];
}

function normalizeCellValue(value: unknown): React.ReactNode {
    if (value === null || value === undefined) return '';
    if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
        return value;
    }
    return value as React.ReactNode;
}

export default function DataTable<T>({ columns, data }: DataTableProps<T>) {
    return (
        <div className="overflow-x-auto shadow-lg rounded-lg">
            <table className="table table-zebra w-full">
                <thead>
                    <tr>
                        {columns.map((col, index) => (
                            <th key={index} className="text-center">{col.header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {columns.map((col, colIndex) => {
                                const rawValue =
                                    typeof col.accessor === 'function' ? col.accessor(row) : row[col.accessor];
                                const cellValue = normalizeCellValue(rawValue);
                                return (
                                    <td key={colIndex} className="whitespace-nowrap">
                                        {cellValue}
                                    </td>
                                );
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
