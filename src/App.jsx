import { useEffect, useState } from 'react'
import Input from './components/Input';
import Display from './components/Display';
import * as zod from 'zod';
import Content from './components/Content';
function App() {
  const [data,setData]=useState({
    email:"",
    name:"",
    country:"",
    age:"",
    password:"",
    emailerr:"",
    passerr:"",
    ageerr:"",
    nameerr:"",
    countryerr:"",
    emailbool:false,
    passbool:false,
    btndisp:false
  });
  useEffect(()=>{
    if(data.emailbool&& data.passbool && parseInt(data.age)>0 && data.country.length>3 && data.name.length>2)
    {
        setData((v)=>{
          return {
            ...v,
            btndisp:true
          }
        })
    }
    else
    {
      setData((v)=>{
        return {
          ...v,
          btndisp:false
        }
      })

    }

  },[data.emailbool,data.passbool,data.name,data.age,data.country])

  function password(e)
  {
      let schema=zod.string().min(8);
      setData((v)=>{
        return {
          ...v,
          [e.target.name]:e.target.value
        }
      })
      let result=schema.safeParse(e.target.value)
      if(result.success)
      {
          setData((v)=>{
            return {
              ...v,
              passerr:"",
              passbool:true
            }
          })
      }
      else{
        setData((v)=>{
          return {
            ...v,
            passerr:"* password must be atleast 8 characters",
            passbool:false  
          }
        })
      }
  }
   
  function email(e)
{
  
  setData((v)=>{
    return {
        ...v,
        [e.target.name]:e.target.value
    }
  });
  console.log("here: ",e.target.value,data)
  let schema=zod.string().email();
    let result=schema.safeParse(e.target.value);
    console.log("result: ",result.success);
    if(result.success)
    {
        setData((v)=>{
          return {
            ...v,
            emailerr:"",
            emailbool:true
          }
        })
    }
    else{
      setData((v)=>{
        return {
          ...v,
          emailerr:"* invaild email",
          emailbool:false
        }
      })
    }
}
  function generic(e)
  {
    if(e.target.name=="age")
    {
      let schema=zod.union([zod.number().gt(0),zod.string().regex(/^\d+$/)]);
      let result=schema.safeParse(parseInt(e.target.value))
      if(result.success)
      {
        setData((v)=>{
          return{
            ...v,
            [e.target.name]:e.target.value,
            ageerr:""
          }
        })
      }
      else
      {
        setData((v)=>{
          return{
            ...v,
            ageerr:"* "+result.error.issues[0].message,
            [e.target.name]:e.target.value
            
          }
        })
      }
    }
else if(e.target.name=="name")
{
  let schema=zod.string().regex(/^[a-zA-Z\s]+$/,{"message":"only letters are allowed in name"}).min(3,{ message: "minimum 3 letters required in name" });
  let result=schema.safeParse(e.target.value)
  if(result.success)
  {
    setData((v)=>{
      return{
        ...v,
        [e.target.name]:e.target.value,
        nameerr:""
      }
    })
  }
  else
  {
    setData((v)=>{
      return{
        ...v,
        nameerr:"* "+result.error.issues[0].message,
        [e.target.name]:e.target.value
        
      }
    })
  }
}
if(e.target.name=="country")
{
  let schema=zod.string().regex(/^[a-zA-Z]+$/,{"message":"only letters are allowed in country"}).min(4,{"message":"invalid country"});
  let result=schema.safeParse(e.target.value)
  if(result.success)
  {
    setData((v)=>{
      return{
        ...v,
        [e.target.name]:e.target.value,
        countryerr:""
      }
    })
  }
  else
  {
    setData((v)=>{
      return{
        ...v,
        countryerr:"* "+result.error.issues[0].message,
        [e.target.name]:e.target.value
        
      }
    })
  }
}

  }

  return (
    <div>
        <p className='text-center text-[25px] font-black text-black py-2'>Signup</p>
        <div className='flex justify-center '>
        <div className='border-[1px] px-8 py-4 rounded-xl'>
          <Display label={"Email"}/>
          <Input func={email} placeholder={"Rajesh@gmail.com"} name={"email"}/>
          <Content content={data.emailerr}/>
          <Display label={"Name"}/>
          <Input func={generic} placeholder={"Rajesh"} name={"name"}/>
          <Content content={data.nameerr}/>
          <Display label={"country"}/>
          <Input func={generic} placeholder={"India"} name={"country"}/>
          <Content content={data.countryerr}/>
          <Display label={"Age"}/>
          <Input func={generic} placeholder={"20"} name={"age"}/>
          <Content content={data.ageerr}/>
          <Display label={"Password"}/>
          <Input func={password} placeholder={"password "} name={"password"}/>
          <Content content={data.passerr}/>
          <div className={data.btndisp ?"bg-black p-1 text-white mt-4 rounded text-center cursor-pointer" : "cursor-not-allowed bg-black p-1 text-white mt-4 rounded text-center" }>Submit</div>
        </div>
        </div>
    </div>
    
  )
}


export default App
