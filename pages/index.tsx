import { useQuery, useMutation, gql } from '@apollo/client';

const GET_CART_ITEMS = gql`
  query GetCartItems {
    cartItems {
      product {
        id
        name
        price
      }
      quantity
    }
  }
`;

const CHECKOUT = gql`
  mutation Checkout {
    checkout
  }
`;

const CheckoutPage = () => {
  const { loading, error, data, refetch } = useQuery(GET_CART_ITEMS);
  const [checkoutMutation, { loading: checkoutLoading, error: checkoutError }] = useMutation(CHECKOUT);

  const handleCheckout = async () => {
    try {
      const { data } = await checkoutMutation();
      if (data.checkout) {
        refetch();
        alert('Checkout successful!');
      } else {
        alert('Checkout failed.');
      }
    } catch (error) {
      console.error('Error during checkout:', error);
      alert('Failed to checkout. Please try again later.');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
      <div>
        <h1>Cart Products</h1>
        {!data.cartItems.length && <p>No products</p>}
        {data.cartItems.map((item) => (
            <div key={item.product.id}>
              <p>{item.product.name} - ${item.product.price} - Quantity: {item.quantity}</p>
            </div>
        ))}
        <button onClick={handleCheckout} disabled={checkoutLoading || !data.cartItems.length}>
          {checkoutLoading ? 'Processing...' : 'Checkout'}
        </button>
        {checkoutError && <p>Error: {checkoutError.message}</p>}
      </div>
  );
};

export default CheckoutPage;
