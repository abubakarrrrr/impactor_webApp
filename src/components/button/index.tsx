

const Button = ({text, classname, type, onclick}) => {
    return (
      <div className="text-center">
        <button type={type} className={` ${classname}  rounded-lg  text-center  `} 
        onClick={onclick}>{text}</button>
      </div>
    )
  }
  
  export default Button
  