'use client';

import React, { forwardRef } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useMutation, gql } from '@apollo/client';
import { useFormStatus } from 'react-dom';

type FormValues = {
    gasConsumption: number;
    comment: string;
};

const CREATE_MEASUREMENT = gql`
  mutation CreateMeasurement($input: CreateMeasurementInput!) {
    createMeasurement(input: $input) {
      gasConsumption
      comment
    }
  }
`;

const AddDialog = forwardRef<HTMLDialogElement>((props, ref) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormValues>();

    const [createMeasurement, { error, loading }] = useMutation(CREATE_MEASUREMENT);

    const { pending } = useFormStatus();

    const onSubmit: SubmitHandler<FormValues> = async (values) => {
        try {
            const result = await createMeasurement({ variables: { input: values } });
            if (result && result.data) {
                alert('Measurement added successfully!');
                reset();
                if (ref && typeof ref !== 'function' && ref.current) {
                    ref.current.close();
                }
            }
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <dialog ref={ref} className="modal">
            <form method="dialog" className="modal-box" onSubmit={handleSubmit(onSubmit)}>
                <h3 className="font-bold text-lg">Add Measurement</h3>
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
                    <button type="submit" className="btn btn-primary" disabled={loading || pending}>
                        {loading || pending ? 'Saving...' : 'Add'}
                    </button>
                </div>
                {error && <p className="text-error mt-2">{error.message}</p>}
            </form>
        </dialog>
    );
});

AddDialog.displayName = 'AddDialog';
export default AddDialog;
