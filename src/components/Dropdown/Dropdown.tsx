import React from 'react';
import { useState } from 'react';
import ChevronUp from '../SVGComponents/ChevronUp';
import ChevronDown from '../SVGComponents/ChevronDown';
import { Options } from '../../interfaces/IOptionsDropdown';

interface DropDownProps {
	selectedOption: Options;
	options: Options[];
	setSelectedOption: (arg: Options) => void;
	isParentTaskModal: boolean;
}
const Dropdown = ({
	selectedOption,
	options,
	setSelectedOption,
	isParentTaskModal,
}: DropDownProps) => {
	const [isOpen, setIsOpen] = useState(false);

	const handleOptionClick = (option: Options) => {
		if (!isParentTaskModal) {
			setSelectedOption(option);
			setIsOpen(false);
		}
	};

	return (
		<div className="flex items-center gap-2 relative cursor-pointer mt-2">
			<button
				type="button"
				className="flex items-center justify-between border border-medium-grey border-opacity-25 px-4 py-3 rounded w-full focus:border-purple"
				onClick={() => setIsOpen(!isOpen)}
			>
				<span className="text-l-body dark:text-white leading-[100%]">
					{selectedOption.label}
				</span>
				{isOpen ? <ChevronUp /> : <ChevronDown />}
			</button>
			{isOpen && (
				<ul className="flex flex-col gap-2 bg-white absolute w-full rounded-lg top-14 p-4">
					{options.map((option, index) => {
						return (
							<React.Fragment key={index}>
								<li
									className={`text-l-body text-medium-grey ${
										isParentTaskModal ? 'cursor-not-allowed' : 'cursor-pointer'
									}`}
									onClick={() => handleOptionClick(option)}
								>
									{option.label}
								</li>
							</React.Fragment>
						);
					})}
				</ul>
			)}
		</div>
	);
};

export default Dropdown;
