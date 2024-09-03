import Head from 'next/head';
import SignIn from '@/components/SignIn';
import Pic1 from '@/assets/PIc1.png'
import Pic2 from '@/assets/Pic2.png'
import Pic3 from '@/assets/Pic3.png'
import Pic4 from '@/assets/Pic4.png'
import Frankie from '@/assets/Frankie.avif'
import Image, { StaticImageData } from 'next/image';
import bg from '@/assets/bg.jpeg'

const Card = ({pic,heading,data}:{data:String,heading:String,pic:StaticImageData}) =>{
    return (
        <div className='p-2 flex flex-col items-center bg-white rounded-xl'>
            <Image src={pic} alt="" className='h-44 w-44'/>
            <h1 className='text-3xl font-semibold px-5 py-2'>
                {heading}
            </h1>
            <p className='px-5 font-medium text-lg'>
                {data}
            </p>
        </div>
    )
}

const FrankieComp = ({heading,data}:{heading:String,data:String}) =>{
    return(
        <div>
            <h1 className='text-xl text-green-500'>{heading}</h1>
            <h1 className='text-4xl'>{data}</h1>
        </div>
    )
}


const ExamplePage = () => {
    return (
        <div className="min-h-screen bg-gray-100">
            {/* Nav */}
          <div className='flex w-full justify-between text-black px-4 py-4 pl-10 font-serif font-bold pt-5'>
            <h1 className='text-4xl'>BaristoBridge</h1>
            <div className='my-auto bg-red-500 px-3 py-1 mr-8 text-xl font-bold rounded-lg'><SignIn/></div>
          </div>

          {/* Hero zero */}

          <div className="relative min-h-screen flex flex-col items-center pt-16">
            <div
                className="absolute inset-0 bg-cover bg-center opacity-30"
                style={{
                backgroundImage: `url(${bg.src})`,
                }}
            ></div>
            <h1 className="text-center w-1/3 text-6xl font-serif mx-auto font-bold relative z-10">
                A point of sale you can depend on
            </h1>
            <p className="w-1/2 mx-auto text-2xl pt-24 relative z-10">
                <span className="font-semibold">Baristo Bridge</span> Point of Sale is intuitive, reliable online and offline, and offers a wide range of options to meet all your business needs. Set it up in minutes, start selling in seconds, and keep both your staff and clients satisfied!
            </p>
            <div className="w-full flex items-center pt-10 relative z-10">
                <button className="bg-blue-900 text-white font-bold text-2xl px-10 py-3 mt-10 rounded-lg mx-auto">
                Get Started
                </button>
            </div>
        </div>


            {/* Hero One */}

          <div className='flex w-full flex-col pt-10 bg-amber-100 pb-10 px-20'>
            <h1 className='text-center text-5xl font-sans font-bold'>Why choose Baristo Bridge ?</h1>
            <div className='grid grid-cols-4 gap-4 pt-16'>
                <Card pic={Pic1} data={'Experience smooth checkout with tablet, mobile, and desktop-based Touch POS systems that ensure smooth checkout, even offline.'} heading={'Uninterrupted billing operations'}/>
                
                <Card pic={Pic2} data={'Offers, discounts, and happy hours are tailored to each guest, encouraging them to become regular customers!'} heading={'CRM & Loyalty'}/>

                <Card pic={Pic3} data={'Generate real-time dashboards using our restaurant POS software with more than 350+ MIS reports for smart decision making'} heading={'Smart Reports'}/>

                <Card pic={Pic4} data={'Establish a comprehensive production plan, manage Bill of materials, calculate accurate production costs, and prepare every dish with the perfect blend of ingredients.'} heading={'Prepare, plan, and provide'}/>
            </div>

            

          </div>

          {/* Hero two */}

          <div className='bg-black text-white pt-10 flex flex-col items-center w-full px-10 pb-10'>
            <h1 className='text-5xl font-bold pb-10 mx-auto'>
                Meet Frankie. He traded paper orders for profitability.
            </h1>
            <div className='flex flex-row space-x-10 w-full px-20'>
                <Image src={Frankie} alt='' className='border border-white rounded-lg'/>

                <div className='flex flex-col justify-between space-y-3'>
                    <FrankieComp heading={'Increase sales'} data={'22% increase in alcohol sales'}/>
                    <FrankieComp heading={'Minimize mistakes'} data={'57% fewer voids due to out-of-stock items'}/>
                    <FrankieComp heading={'More efficient service'} data={'12 hours saved per week by staff'}/>
                    <FrankieComp heading={'More happy customers'} data={'35% fewer refunds'}/>
                </div>
            </div>
            <div className='flex px-20 w-full space-x-10 pt-10'>
                <div className='w-1/2'>
                    <h1 className='text-2xl pb-8'>How it started</h1>
                    <p>Frankie DiCarlantonio runs Scaffidi’s Restaurant & Tavern, and four other brands, in Steubenville, Ohio. He came to Square looking for a technology partner with a modern POS to sync with his carryout and delivery service and make his staff more efficient. He wanted to cut costs (subscriptions, labor, paper, “everything we spend money on”) and generally automate and grow his business.</p>
                </div>
                <div className='w-1/2'>
                    <h1 className='text-2xl pb-8'>How it’s going</h1>
                    <p>Frankie uses Square to run his restaurants — the KDS and handheld POS, as well as online ordering, plus tools for invoices (for catering), loyalty, and gift cards. No more staff traffic jams around the central POS station, and his diners are delighted by better, faster service. Business is thriving.</p>
                </div>
            </div>
          </div>


           
            
        
        
          {/* <footer className="absolute bottom-0 w-full text-center p-4 bg-gray-200 ">
                    <p>Powered by Next.js</p>
          </footer> */}

        </div>
    );
};

export default ExamplePage;
