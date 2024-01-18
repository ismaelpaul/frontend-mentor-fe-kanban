import { useRef } from 'react';
import useClickOutside from '../../hooks/useClickOutside';
import { motion } from 'framer-motion';
import Button from '../Button/Button';
import TextInput from '../Input/TextInput';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ColumnSubmit } from '../../models/Column';
import { ColumnName, ColumnsInput } from '../../interfaces/IColumn';
import { addNewColumnsByBoardId } from '../../api/kanbanApi';
import useBoardStore from '../../store/boardStore';
interface AddNewColumnModalPros {
	setIsAddNewColumnModalOpen: (arg: boolean) => void;
}
const AddNewColumnModal = ({
	setIsAddNewColumnModalOpen,
}: AddNewColumnModalPros) => {
	const boardId = useBoardStore((state) => state.boardId);

	const modalRef = useRef(null);
	useClickOutside(modalRef, () => setIsAddNewColumnModalOpen(false));

	const btnAddNewColumnClass =
		'bg-purple text-white text-13px font-bold py-2 w-full rounded-full mt-6 hover:bg-purple-hover';
	const btnAddNewColumnText = 'Add New Column';
	const labelClass = 'text-body text-medium-grey dark:text-white font-bold';
	const inputClass =
		'dark:bg-dark-grey dark:text-white border border-medium-grey border-opacity-25 rounded px-4 py-2 mt-3 text-l-body w-full cursor-pointer hover:border-purple focus:outline-none';
	const errorClass = 'text-red text-l-body absolute';

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(ColumnSubmit),
	});

	const submitData: SubmitHandler<ColumnsInput> = async (data) => {
		const newColumn = [data];
		await addNewColumnsByBoardId(boardId, newColumn);
		reset();
		setIsAddNewColumnModalOpen(false);
	};

	const onSubmit = handleSubmit(submitData);

	console.log(errors, '<<<< errors');

	return (
		<div className="fixed inset-0 flex items-center justify-center z-40">
			<div className="fixed inset-0 bg-black opacity-50"></div>
			<motion.div
				initial={{ scale: 0.7 }}
				animate={{ scale: 1 }}
				transition={{ duration: 0.2 }}
				className="bg-white dark:bg-dark-grey p-6 rounded-md z-50 mx-4 w-screen tablet:mx-0 tablet:w-[30rem] relative"
				ref={modalRef}
			>
				<h1 className="text-l-heading mb-6 dark:text-white">Add New Column</h1>
				<form id="column-form" onSubmit={onSubmit}>
					<label htmlFor="name" className={labelClass}>
						Column Name
					</label>
					<TextInput
						register={register}
						name="name"
						className={`${inputClass} ${
							errors.name ? 'border border-red/100' : ''
						}`}
						placeholder={'eg. Urgent'}
					/>
					{errors.name && (
						<span className={`${errorClass} right-10 bottom-[5.8rem]`}>
							{errors?.name.message}
						</span>
					)}
				</form>
				<Button
					form={'column-form'}
					buttonClass={btnAddNewColumnClass}
					buttonText={btnAddNewColumnText}
					type="submit"
				/>
			</motion.div>
		</div>
	);
};

export default AddNewColumnModal;
