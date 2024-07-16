import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { AppProps } from 'next/app';

const client = new ApolloClient({
    uri: process.env.NEXT_PUBLIC_GRAPHQL_URI,
    cache: new InMemoryCache(),
});

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <ApolloProvider client={client}>
            <Component {...pageProps} />
        </ApolloProvider>
    );
}

export default MyApp;
