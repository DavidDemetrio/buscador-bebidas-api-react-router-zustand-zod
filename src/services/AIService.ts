import { streamText } from 'ai';
import openrouter from '../lib/ai';

export default {
    async generateRecipe(prompt: string) {
        const result = streamText({
            model: openrouter('meta-llama/llama-4-maverick:free'),
            prompt
        })

        return result.textStream        
    }
}