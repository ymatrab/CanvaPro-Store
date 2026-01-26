export const base44 = {
    entities: {
        ChatMessage: {
            create: async (data) => {
                console.log('Mock ChatMessage create:', data);
                return { id: Date.now().toString(), ...data };
            }
        },
        Order: {
            create: async (data) => {
                console.log('Mock Order create:', data);
                return { id: Date.now().toString(), ...data };
            }
        }
    }
};
