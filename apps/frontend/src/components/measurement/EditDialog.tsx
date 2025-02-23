'use client';

import React, { forwardRef } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useMutation, gql } from '@apollo/client';
import { useRouter } from 'next/navigation';

type EditFormValues = {
    gasConsumption: number;
    comment: string;
};

const UPDATE_MEASUREMENT = gql`
  mutation UpdateMeasurement($input: UpdateMeasurementInput!) {
    updateMeasurement(input: $input) {
      id
      gasConsumption
      comment
      createdAt
      updatedAt
      user {
        id
        name
      }
    }
  }
`;

interface EditDialogProps {
    id: number | null;
    initialGasConsumption: number;
    initialComment: string;
    onSuccess?: () => void;
}

const EditDialog = forwardRef<HTMLDialogElement, EditDialogProps>(
    ({ id, initialGasConsumption, initialComment, onSuccess }, ref) => {
        const {
            register,
            handleSubmit,
            reset,
            formState: { errors },
        } = useForm<EditFormValues>({
            defaultValues: {
                gasConsumption: initialGasConsumption,
                comment: initialComment,
            },
        });

        const [updateMeasurement, { loading, error }] = useMutation(UPDATE_MEASUREMENT);

        if (id === null) return null;

        const onSubmit: SubmitHandler<EditFormValues> = async (values) => {
            try {
                const result = await updateMeasurement({
                    variables: { input: { id, ...values } },
                });
                if (result && result.data) {
                    alert('Measurement updated successfully!');
                    reset();
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
                <form method="dialog" className="modal-box" onSubmit={handleSubmit(onSubmit)}>
                    <h3 className="font-bold text-lg">Edit Measurement</h3>
                    <div className="py-4">
                        <label className="block mb-2">
                            Gas Consumption:
                            <input
                                type="number"
                                step="any"
                                className="input input-bordered w-full"
                                {...register('gasConsumption', {
                                    required: 'Gas consumption is required',
                                    valueAsNumber: true,
                                    min: { value: 0.01, message: 'Value must be positive' },
                                })}
                            />
                            {errors.gasConsumption && (
                                <p className="text-error">{errors.gasConsumption.message}</p>
                            )}
                        </label>
                        <label className="block mb-2">
                            Comment:
                            <textarea
                                className="textarea textarea-bordered w-full"
                                {...register('comment')}
                            ></textarea>
                        </label>
                    </div>
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
                        <button type="submit" className="btn btn-primary" disabled={loading}>
                            {loading ? 'Saving...' : 'Save'}
                        </button>
                    </div>
                    {error && <p className="text-error mt-2">{error.message}</p>}
                </form>
            </dialog>
        );
    }
);

EditDialog.displayName = 'EditDialog';
export default EditDialog;
