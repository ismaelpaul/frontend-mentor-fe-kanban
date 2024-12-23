import { useQuery } from '@tanstack/react-query';

import { useNavigate } from 'react-router-dom';

import { useToast } from '../useToast';

import { getAllBoards } from '@/api/kanbanApi';

import { Boards } from '@/interfaces/IBoard';

const useFetchBoards = () => {
	const navigate = useNavigate();
	const toast = useToast();
	const queryKey = ['boards'];

	const { data, isLoading, isError } = useQuery(queryKey, getAllBoards, {
		onError: (err) => {
			if (err instanceof Error) {
				toast.error(err.message);
			}
			navigate('/login');
		},
	});

	const { boards } = (data as Boards) || { boards: [] };

	return { boards, isLoading, isError };
};

export { useFetchBoards };
