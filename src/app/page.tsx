import Head from 'next/head';
import SignIn from '@/components/SignIn';
import Pic1 from '@/assets/PIc1.png'
import Image from 'next/image';

const Card = ({pic,heading,data}:{data:String,heading:String,pic:String}) =>{
    return (
        <div className='bg-pink-400 p-2 flex flex-col items-center'>
            <Image src={Pic1} alt=""/>
            <h1 className='text-2xl font-semibold px-3 text-center'>
                Uninterrupted billing operations
            </h1>
            <p className='px-2 text-center font-medium'>
                Experience smooth checkout with tablet, mobile, and desktop-based Touch POS systems that ensure smooth checkout, even offline.
            </p>
        </div>
    )
}


const ExamplePage = () => {
    return (
        <div className="min-h-screen bg-gray-100">
            {/* Nav */}
          <div className='flex w-full justify-between bg-black text-white px-4 py-4 pl-10 font-serif font-bold pt-5'>
            <h1 className='text-4xl'>BaristoBridge</h1>
            <div className='my-auto bg-red-500 px-3 py-1 mr-8 text-xl font-bold rounded-lg'><SignIn/></div>
          </div>


            {/* Hero One */}

          <div className='flex w-full flex-col pt-10 bg-stone-300 min-h-screen px-20'>
            <h1 className='text-center text-5xl font-sans font-bold'>Why choose Baristo Bridge ?</h1>
            <div className='grid grid-cols-4 gap-4 pt-16'>
                <Card da/>
                {/* <Card />
                <Card />
                <Card />
                <Card /> */}
            </div>

          </div>
            
        
        


        </div>
    );
};

export default ExamplePage;
