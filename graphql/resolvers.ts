
let cartItems: any[] = [
    { id: '1', product: { id: '1', name: 'Product A', price: 10.0 }, quantity: 1 },
    { id: '2', product: { id: '2', name: 'Product B', price: 15.0 }, quantity: 2 },
    { id: '3', product: { id: '3', name: 'Product C', price: 20.0 }, quantity: 1 },
];

const resolvers = {
    Query: {
        cartItems: () => cartItems,
    },
    Mutation: {
        checkout: () => {
            try {
                cartItems = [];
                return true;
            } catch (error) {
                console.error('Error during checkout:', error);
                return false;
            }
        },
    },

};

export default resolvers;
