import api from './api';

export const gameService = {
    getQuestions: async () => {
        const response = await api.get('/questions');
        return response.data;
    },

    submitScore: async (scoreData) => {
        const response = await api.post('/game/score', scoreData);
        return response.data;
    }
};
