import React from 'react';
import LightTheme from './SVGComponents/LightTheme';
import DarkTheme from './SVGComponents/DarkTheme';
import ToggleTheme from './SVGComponents/ToggleTheme';
import { Board } from '../interfaces/IBoard';
import BoardIcon from './SVGComponents/BoardIcon';

type AllBoardsProps = {
	boards: Board[];
	setSelectedBoard: React.Dispatch<React.SetStateAction<string>>;
	selectedBoard: string;
};
const AllBoards = ({
	boards,
	selectedBoard,
	setSelectedBoard,
}: AllBoardsProps) => {
	true;
	const btnAddTaskClass = 'fill-purple';

	const handleSelectBoard = (board: Board) => {
		setSelectedBoard(board.name);
	};

	return (
		<div className="bg-white absolute w-[16.5rem] top-20 ml-[3.375rem] rounded-lg py-[1.188rem]">
			<span className="inline-block text-medium-grey text-12px font-semiBold tracking-2.4px mb-[1.188rem] pl-6">
				ALL BOARDS ({boards.length})
			</span>
			{boards.map((board: Board) => {
				const isSelected = selectedBoard === board.name;
				const iconClass = isSelected ? 'fill-white' : 'fill-purple';
				return (
					<React.Fragment key={board.board_id}>
						<div
							onClick={() => handleSelectBoard(board)}
							className={`flex items-center gap-3 h-12 text-m-heading pl-6 mr-6 rounded-e-full ${
								isSelected ? 'bg-purple' : ''
							}`}
						>
							<BoardIcon iconClass={iconClass} />
							<span
								className={`${isSelected ? 'text-white' : 'text-medium-grey'}`}
							>
								{board.name}
							</span>
						</div>
					</React.Fragment>
				);
			})}
			<div className="flex items-center gap-3 h-12 text-m-heading pl-6 text-purple">
				<BoardIcon iconClass={btnAddTaskClass} />
				<span> + Create New Board</span>
			</div>
			<div className="bg-light-bg flex items-center justify-center gap-6 h-12 rounded-md mt-4 mx-4">
				<LightTheme />
				<ToggleTheme />
				<DarkTheme />
			</div>
		</div>
	);
};

export default AllBoards;