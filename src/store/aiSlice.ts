import { StateCreator } from 'zustand';
import AIService from '../services/AIService';

export type AISlice = {
    recipe: string
    generateRecipe: (prompt: string) => Promise<void>
}

export const createAISlice: StateCreator<AISlice, [], [], AISlice> = (set) => ({
    recipe: '',
    generateRecipe: async (prompt) => {
        const data = await AIService.generateRecipe(prompt);
        
        
        for await(const textData of data) {
            console.log(textData);
            set(state => ({
                recipe: state.recipe + textData
            }))
        }
        
    }
})