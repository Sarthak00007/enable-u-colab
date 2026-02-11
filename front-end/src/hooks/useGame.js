import { useQuery, useMutation } from '@tanstack/react-query';
import { gameService } from '../services/gameService';

export const useQuestions = () => {
    return useQuery({
        queryKey: ['questions'],
        queryFn: gameService.getQuestions,
        // Keep data fresh but don't over-fetch
        staleTime: 5 * 60 * 1000,
    });
};

export const useSubmitScore = () => {
    return useMutation({
        mutationFn: (scoreData) => gameService.submitScore(scoreData),
    });
};
