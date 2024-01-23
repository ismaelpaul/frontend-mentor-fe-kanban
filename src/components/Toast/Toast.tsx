import { useEffect, useRef } from 'react';
import Cross from '../SVGComponents/Cross';
import SuccessIcon from '../SVGComponents/SuccessIcon';
import ErrorIcon from '../SVGComponents/ErrorIcon';
import WarningIcon from '../SVGComponents/WarningIcon';
import { useToast } from '../../hooks/useToast';
import { motion } from 'framer-motion';
import { IToast } from '../../interfaces/IToast';

const toastTypes: Record<
	string,
	{
		icon: JSX.Element;
		progressBarClass: string;
		title: string;
	}
> = {
	success: {
		icon: <SuccessIcon />,
		progressBarClass: 'bg-success',
		title: 'Success!',
	},
	warning: {
		icon: <WarningIcon />,
		progressBarClass: 'bg-warning',
		title: 'Warning!',
	},
	error: {
		icon: <ErrorIcon />,
		progressBarClass: 'bg-error',
		title: 'Error!',
	},
};

const Toast = ({ message, type, id }: IToast) => {
	const { title, icon, progressBarClass } = toastTypes[type];

	const toast = useToast() as IToast;

	const timerID = useRef<number | null>(null);

	const handleClose = () => {
		toast.remove(id);
	};

	useEffect(() => {
		timerID.current = setTimeout(() => {
			handleClose();
		}, 4000);

		return () => {
			clearTimeout(timerID.current || undefined);
		};
	}, []);

	return (
		<aside className={'bg-white dark:bg-dark-grey rounded-lg max-w-sm'}>
			<div className="flex flex-col p-4 gap-2">
				<div className="flex flex-row items-center gap-2">
					<span>{icon}</span>
					<span className={`text-${type} text-m-heading`}>{title}</span>
					<button className="ml-auto" onClick={handleClose}>
						<Cross />
					</button>
				</div>
				<p className="text-m-heading font-regular text-black dark:text-white">
					{message}
				</p>
			</div>
			<div className="absolute bottom-0 top-0 w-full h-1">
				<motion.div
					initial={{ width: '100%' }}
					animate={{ width: '0%' }}
					transition={{ duration: 4, ease: 'linear' }}
					className={`h-full rounded-tl-lg rounded-tr-lg ${progressBarClass}`}
				></motion.div>
			</div>
		</aside>
	);
};

export default Toast;