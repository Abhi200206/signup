export default function Input(props)
{
    return (
        <div>
            <input onChange={(e)=>{
               return props.func(e)
            }} className="border-[1px] rounded p-1 m-1" type="text" placeholder={props.placeholder} name={props.name} />
        </div>
    )
}