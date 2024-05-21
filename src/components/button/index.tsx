

const Button = ({text, classname, type}) => {
    return (
      <div className="text-center">
        <button type={type} className={` ${classname}  rounded-lg  text-center  `}>{text}</button>
      </div>
    )
  }
  
  export default Button
  