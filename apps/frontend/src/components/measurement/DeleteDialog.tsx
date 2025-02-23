'use client';

import React, { forwardRef } from 'react';
import { useMutation, gql } from '@apollo/client';

const REMOVE_MEASUREMENT = gql`
  mutation RemoveMeasurement($id: Int!) {
    removeMeasurement(id: $id)
  }
`;

interface DeleteDialogProps {
    id: number | null;
    onSuccess?: () => void;
}

const DeleteDialog = forwardRef<HTMLDialogElement, DeleteDialogProps>(
    ({ id, onSuccess }, ref) => {
        const [removeMeasurement, { loading, error }] = useMutation(REMOVE_MEASUREMENT);

        if (id === null) return null;

        const handleDelete = async () => {
            try {
                const result = await removeMeasurement({ variables: { id } });
                if (result && result.data && result.data.removeMeasurement) {
                    alert('Measurement deleted successfully!');
                    if (ref && typeof ref !== 'function' && ref.current) {
                        ref.current.close();
                    }
                    if (onSuccess) onSuccess();
                }
            } catch (e) {
                console.error(e);
            }
        };

        return (
            <dialog ref={ref} className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Delete Measurement</h3>
                    <p>Are you sure you want to delete measurement with ID: {id}?</p>
                    <div className="modal-action">
                        <button
                            type="button"
                            className="btn"
                            onClick={() => {
                                if (ref && typeof ref !== 'function' && ref.current) {
                                    ref.current.close();
                                }
                            }}
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            className="btn btn-error"
                            onClick={handleDelete}
                            disabled={loading}
                        >
                            {loading ? 'Deleting...' : 'Delete'}
                        </button>
                    </div>
                    {error && <p className="text-error mt-2">{error.message}</p>}
                </div>
            </dialog>
        );
    }
);

DeleteDialog.displayName = 'DeleteDialog';
export default DeleteDialog;
