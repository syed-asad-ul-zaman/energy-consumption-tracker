'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useQuery, gql } from '@apollo/client';
import DataTable, { Column } from '@/components/ui/DataTable';
import Pagination from '@/components/ui/Pagination';
import AddDialog from '@/components/measurement/AddDialog';
import EditDialog from '@/components/measurement/EditDialog';
import DeleteDialog from '@/components/measurement/DeleteDialog';

interface Measurement {
  id: number;
  gasConsumption: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
  user: {
    id: number;
    name: string;
    email: string;
  };
}

const GET_MEASUREMENTS = gql`
  query GetMeasurements($page: Int!, $limit: Int!) {
    measurements(page: $page, limit: $limit) {
      data {
        id
        gasConsumption
        comment
        createdAt
        updatedAt
        user {
          id
          name
          email
        }
      }
      totalCount
      currentPage
      totalPages
    }
  }
`;

export default function MeasurementsPage() {
  const [page, setPage] = useState(1);
  const limit = 10;
  const { data, loading, error, refetch } = useQuery(GET_MEASUREMENTS, {
    variables: { page, limit },
    fetchPolicy: 'cache-and-network',
  });

  useEffect(() => {
    refetch({ page, limit });
  }, [page, limit, refetch]);

  const [selectedMeasurement, setSelectedMeasurement] = useState<Measurement | null>(null);

  const addDialogRef = useRef<HTMLDialogElement>(null);
  const editDialogRef = useRef<HTMLDialogElement>(null);
  const deleteDialogRef = useRef<HTMLDialogElement>(null);

  const columns: Column<Measurement>[] = [
    { header: 'ID', accessor: 'id' },
    { header: 'Gas Consumption', accessor: 'gasConsumption' },
    { header: 'Comment', accessor: 'comment' },
    { header: 'User', accessor: (row: Measurement) => row.user.name },
    { header: 'Created At', accessor: (row: Measurement) => new Date(row.createdAt).toLocaleString() },
    {
      header: 'Actions',
      accessor: (row: Measurement) => (
        <div className="flex items-center space-x-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-info cursor-pointer"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            onClick={() => {
              setSelectedMeasurement(row);
              editDialogRef.current?.showModal();
            }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15.232 5.232l3.536 3.536M9 11l6-6 3.536 3.536-6 6H9v-3.536zM3 21h18"
            />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-error cursor-pointer"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            onClick={() => {
              setSelectedMeasurement(row);
              deleteDialogRef.current?.showModal();
            }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M1 7h22M8 7V4a1 1 0 011-1h6a1 1 0 011 1v3"
            />
          </svg>
        </div>
      ),
    },
  ];

  let content;
  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-64">
        <span className="loading loading-spinner loading-lg"></span>
        <p className="mt-4 text-lg font-medium text-gray-600">Loading measurements data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-error shadow-lg">
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current flex-shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-12.728 12.728M5.636 5.636l12.728 12.728"></path>
          </svg>
          <span className="ml-2">Error: {error.message}</span>
        </div>
      </div>
    );
  }

  if (data && data.measurements) {
    const { data: measurements, totalCount, totalPages, currentPage } = data.measurements;
    return (
      <div className="p-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Measurements</h2>
          <button className="btn btn-primary" onClick={() => addDialogRef.current?.showModal()}>
            Add Measurement
          </button>
        </div>
        <DataTable<Measurement> columns={columns} data={measurements} />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalCount={totalCount}
          onPageChange={setPage}
        />
        <AddDialog ref={addDialogRef} />
        {selectedMeasurement && (
          <EditDialog
            ref={editDialogRef}
            id={selectedMeasurement.id}
            initialGasConsumption={selectedMeasurement.gasConsumption}
            initialComment={selectedMeasurement.comment}
            onSuccess={() => {
              setSelectedMeasurement(null)
              refetch()
            }}
          />
        )}
        {selectedMeasurement && (
          <DeleteDialog ref={deleteDialogRef} id={selectedMeasurement.id} onSuccess={() => {
            setSelectedMeasurement(null)
            refetch()
          }} />
        )}
      </div>
    );
  } else {
    return (
      <div className="flex flex-col justify-center items-center h-64">
        <div className="alert alert-info shadow-lg max-w-md">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current flex-shrink-0 h-10 w-10"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M12 18a9 9 0 100-18 9 9 0 000 18z"
            />
          </svg>
          <div>
            <h3 className="font-bold">No Data Available</h3>
            <div className="text-sm">
              We couldn’t find any measurement data at the moment.
            </div>
          </div>
        </div>
      </div>
    );
  }
}
