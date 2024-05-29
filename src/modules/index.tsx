import ImageComponent from '@/components/ImageComponent';
import Slider_component from '@/components/Slider';
import dynamic from 'next/dynamic';
import { useGetImpactorFoortprintQuery } from '@/redux/services/Auth/authApi';

const FooterPointGraph = dynamic(() => import('@/components/Graphs/FooterPointGraph'), { ssr: false });
const ImpactPulseChart = dynamic(() => import('@/components/Graphs/ImpactPulseChart'), { ssr: false });

const giftServices = [
  { title: "Grocery", content: "Gift grocery to your impactees", image: "images/dashboard/grocery.png", color: "bg-green-50" },
  { title: "EarnTech", content: "Gift IT skills training to your Impactee", image: "images/dashboard/earn-tech.png", color: "bg-blue-100" },
  { title: "Education", content: "Gift education to your impactees", image: "images/dashboard/education.png", color: "bg-pink-50" },
  { title: "Health", content: "Gift health services to your impactees", image: "images/dashboard/health.png", color: "bg-blue-50" },
];


export const  Dashboard_slider=[
  "images/dashboard-slider/dashboard-slider-img.png",
  "images/dashboard-slider/dashboard-slider-img.png",
  
]

  // const {data: getImpactorFoortprint}= useGetImpactorFoortprintQuery();

  // console.log(getImpactorFoortprint, "getImpactorFoortprint")


const FooterPointData = [
  { name: 'Grocery', value: 400, color: "#73CF31" },
  { name: 'Education', value: 200, color: "#D0432B" },
  { name: 'Flood Relief', value: 300, color: "#1487A4" },
  { name: 'Direct Giving', value: 200, color: "#D83764" },
  { name: 'ImpacTech', value: 300, color: "#345698" },
  { name: 'EarnTech', value: 200, color: "#01CAFE" },
];


const HomeModule = () => {
  return (
    <div className=''>
      <div className='lg:w-[84%]  lg:ml-[15%] mt-24 lg:mt-20 mb-28 w-full flex flex-col lg:flex-row '>
        <div className='lg:w-[70%] w-full '>
          <div className='w-[90%] mx-auto'>
            
            <Slider_component images={Dashboard_slider} />


            {/* Donate to NGOs */}
            <div className='bg-white  p-3 rounded-xl shadow-lg mt-8 '>
              <div className='flex justify-between p-5 rounded-xl bg-blue-50'>
                <div>
                  <h1 className='text-primary font-bold'>Donate to NGOs</h1>
                  <p className='text-[10px]'>Donate to organizations directly of your choice</p>
                </div>
                <div>
                  <ImageComponent img="images/dashboard/ngos.svg" />
                </div>
              </div>
            </div>

            {/* Gift Services */}
            <div className='bg-white rounded-xl p-3 mt-4 shadow-lg '>
              <h1 className='text-primary font-bold pb-5'>Gift Services</h1>
              <div className='grid md:grid-cols-2 gap-5'>
                {giftServices.map((item, index) => (
                  <div key={index} className={`py-8 p-3 ${item.color} rounded-xl flex justify-between`}>
                    <div>
                      <h1 className='text-primary font-bold'>{item.title}</h1>
                      <p className='text-[10px]'>{item.content}</p>
                    </div>
                    <div>
                      <ImageComponent img={item.image} className="w-16" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Zakat Goal */}
            <div className='bg-white rounded-xl p-3 mt-4 shadow-lg '>
              <div className='bg-gray-100 p-5'>
                <p className='text-[10px]'>Zakat Goal</p>
                <h1 className='text-primary font-bold'>Monthly zakat goal</h1>
                <div className='lg:w-[50%] rounded h-2 bg-gray-200'>
                  <div className='bg-danger w-[70%] rounded h-full'></div>
                  <div className='flex justify-between'>
                    <p className='text-[10px]'>6 days left</p>
                    <p className='text-[10px]'>70% donated</p>
                  </div>
                </div>
                <p className='text-[10px] mt-5'>32,000 donated of 100,000 zakat goal</p>
                <p className='text-[10px]'>Based on your input, get a random alpha numeric string. The random string generator creates a series of numbers and letters that have no pattern.</p>
              </div>
            </div>

            {/* Feature */}
            <div className='mt-5  shadow-lg'>
              <h1 className='text-primary font-bold ml-2'>Feature</h1>
              <ImageComponent img="images/earn-tech.png" />
            </div>
          </div>
        </div>

        {/*  Sidebar */}
        <div className='lg:w-[30%] w-full mt-8 lg:mt-0  p-2 bg-light shadow-lg'>
          <div className=' w-[90%] lg:w-[98%] mx-auto bg-white rounded p-3'>
            <h1 className='font-semibold text-center'>Impact Footprint</h1>
            <FooterPointGraph data={FooterPointData}  />
            <div className='grid grid-cols-2 m-3 pb-3'>
              {FooterPointData.map((item, i) => (
                <div className='flex items-center' key={i}>
                  <div className='w-3 h-3 rounded-full mr-2' style={{ backgroundColor: item.color }}></div>
                  <p className='text-[12px]'>{item.name}</p>
                </div>
              ))}
            </div>
          </div>

          <div className='w-[90%] mx-auto lg:w-[98%]  grid  place-items-center bg-white rounded mt-5 '>
            <h1 className=' p-3 font-semibold '>Impact pulse</h1>
            <ImpactPulseChart  />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeModule;
