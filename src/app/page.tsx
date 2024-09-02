import Head from 'next/head';
import SignIn from '@/components/SignIn';
const ExamplePage = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
          <SignIn />
            <Head>
                <title>Example Page</title>
                <meta name="description" content="This is an example page" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className="text-center">
                <h1 className="text-4xl font-bold text-blue-600 mb-4">Welcome to the Example Page!</h1>
                <p className="text-lg text-gray-700">This is a simple example of a page created with TypeScript and Tailwind CSS.</p>
            </main>

            <div className="absolute bottom-0 w-full text-center p-4 bg-gray-200">
                <p>Powered by Next.js</p>
            </div>
        </div>
    );
};

export default ExamplePage;
