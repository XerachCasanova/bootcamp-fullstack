
const Field = ({label, value, handle}) => {

    return(<p>{label} <input value={value} onChange={handle}/></p>)
} 


export default Field