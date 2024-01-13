import { useEffect, useRef, useState } from 'react';
import useClickOutside from '../../hooks/useClickOutside';
import { useQueryClient } from '@tanstack/react-query';
import useBoardStore from '../../store/boardStore';
import { IColumns } from '../../interfaces/IColumn';
import { motion } from 'framer-motion';
import Button from '../Button/Button';
import BoardForm from './BoardForm';
import { BoardSubmit } from '../../interfaces/IBoard';

interface EditBoardModalProps {
	setIsEditBoardModalOpen: (arg: boolean) => void;
}

const EditBoardModal = ({ setIsEditBoardModalOpen }: EditBoardModalProps) => {
	const [boardData, setBoardData] = useState<Partial<BoardSubmit>>({});

	const boardId = useBoardStore((state) => state.boardId);

	const queryClient = useQueryClient();

	const selectedBoard = useBoardStore((state) => state.selectedBoard);

	const queryColumnsKey = ['columns', boardId];

	const { columns }: IColumns = queryClient.getQueryData(queryColumnsKey) || {
		columns: [],
	};

	const btnSaveChangesClass =
		'bg-purple text-white text-13px font-bold py-2 w-full rounded-full';
	const btnSaveChangesText = 'Save Changes';

	const modalRef = useRef(null);
	useClickOutside(modalRef, () => setIsEditBoardModalOpen(false));

	useEffect(() => {
		if (selectedBoard || columns) {
			setBoardData({ ...selectedBoard, columns });
		}
	}, [selectedBoard, columns]);

	return (
		<div className="fixed inset-0 flex items-center justify-center z-40">
			<div className="fixed inset-0 bg-black opacity-50"></div>
			<motion.div
				initial={{ scale: 0.7 }}
				animate={{ scale: 1 }}
				transition={{ duration: 0.2 }}
				className="bg-white dark:bg-dark-grey p-6 rounded-md z-50 mx-4 w-screen tablet:mx-0 tablet:w-[30rem]"
				ref={modalRef}
			>
				<h1 className="text-l-heading mb-6 dark:text-white">Edit Board</h1>
				<BoardForm
					boardData={boardData}
					isNewBoard={false}
					setIsEditBoardModalOpen={setIsEditBoardModalOpen}
				/>
				<Button
					form={'board-form'}
					type="submit"
					buttonClass={btnSaveChangesClass}
					buttonText={btnSaveChangesText}
				/>
			</motion.div>
		</div>
	);
};

export default EditBoardModal;
