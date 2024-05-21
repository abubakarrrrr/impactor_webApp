import { countryData, genderData, nationality } from '@/modules/SignpModule/signup_data';


export const SelectGender = ({icon, placeholder, onChange, name , register}) => {
  

  return (
    <div className='relative'>
      <select
        {...register}
        name={name}
        id={name}
        className='rounded h-9  w-full focus:shadow-outline border border-gray-100 focus:border-primary pl-14 shadow-md focus:outline-none'
        placeholder={placeholder}
        onChange={onChange}
      >
        {genderData.map((val, index) => (
          <option key={index} value={val} className="border border-gray-100 rounded-md text-gray-500">{val}</option>
        ))}
      </select>
      <img src={icon} alt="icon" className='absolute top-2 left-3' />
    </div>
  );
}

export const SelectCountry = ({ icon, placeholder, onChange, name, register }) => {
  

  return (
    <div className='relative'>
      <select
        {...register}
        name={name}
        id={name}
        className='rounded h-9 w-full focus:shadow-outline border border-gray-100 focus:border-primary pl-14 shadow-md focus:outline-none'
        placeholder={placeholder}
        onChange={onChange}
      >
        {countryData.map((val, index) => (
          <option
            key={index}
            value={val}
            className="border-b border-gray-100 text-gray-500 pt-10"
            style={{ borderBottomWidth: '1px' }}
          >
            {val}
          </option>
        ))}
      </select>
      <img src={icon} alt="icon" className='absolute top-2 left-3' />
    </div>
  );
}

export const SelectNationality = ({ icon, placeholder, onChange, name , register}) => {
  

  return (
    <div className='relative'>
      <select
        {...register}
        name={name}
        id={name}
        className='rounded h-9 w-full focus:shadow-outline border border-gray-100 focus:border-primary pl-14 shadow-md focus:outline-none'
        placeholder={placeholder}
        onChange={onChange}
      >
        {nationality.map((val, index) => (
          <option
            key={index}
            value={val}
            className="border-b border-gray-100 text-gray-500 pt-10"
            style={{ borderBottomWidth: '1px' }}
          >
            {val}
          </option>
        ))}
      </select>
      <img src={icon} alt="icon" className='absolute top-2 left-3' />
    </div>
  );
}
