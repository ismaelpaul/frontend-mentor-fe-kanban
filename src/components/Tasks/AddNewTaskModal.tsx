import { useRef } from 'react';
import useClickOutside from '../../hooks/useClickOutside';
import Button from '../Button/Button';
import { motion } from 'framer-motion';
import TaskForm from './TaskForm';

interface AddNewTaskModalProps {
	setIsAddNewTaskModalOpen: (arg: boolean) => void;
}
const AddNewTaskModal = ({
	setIsAddNewTaskModalOpen,
}: AddNewTaskModalProps) => {
	const modalRef = useRef(null);
	useClickOutside(modalRef, () => setIsAddNewTaskModalOpen(false));

	const btnCreateTaskClass =
		'bg-purple text-white text-13px font-bold py-2 w-full rounded-full';
	const btnCreateTaskText = 'Create Task';

	return (
		<div className="fixed inset-0 flex items-center justify-center z-40">
			<div className="fixed inset-0 bg-black opacity-50"></div>
			<motion.div
				initial={{ scale: 0.7 }}
				animate={{ scale: 1 }}
				transition={{ duration: 0.2 }}
				className="bg-white dark:bg-dark-grey p-6 rounded-md z-50 mx-4 w-screen tablet:w-[30rem]"
				ref={modalRef}
			>
				<h1 className="text-l-heading mb-6 dark:text-white">Add New Task</h1>
				<TaskForm
					setIsAddNewTaskModalOpen={setIsAddNewTaskModalOpen}
					isNewTask={true}
				/>
				<Button
					form={'task-form'}
					type="submit"
					buttonClass={btnCreateTaskClass}
					buttonText={btnCreateTaskText}
				/>
			</motion.div>
		</div>
	);
};

export default AddNewTaskModal;
