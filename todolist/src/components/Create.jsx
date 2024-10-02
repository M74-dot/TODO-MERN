import React, {useState} from "react"
import axios from 'axios'

const Create = () =>{
    const [task,setTask] = useState("")
    const handleAdd = async()=>{
      try{
        const response = await axios.post("http://localhost:3000/add",{task:task})
        console.log(response.data)
        setTask("")
      }catch(err){
        console.log(err)
      }
    }
    const handleSubmit = (e)=>{
      e.preventDefault();
    }
  return(
    <form onSubmit={handleSubmit} className="w-[500px] flex flex-row gap-3 mt-5">
      <input 
        type="text"
        value={task}
        onChange={(e)=>setTask(e.target.value)}
        className="w-full border border-gray-700 rounded py-2 pl-5"
        placeholder="Enter Taks"
      />
      <button 
        className="border rounded bg-black text-white px-5 py-2"
        onClick={handleAdd}
      >
        Add
      </button>
    </form>
  )
}

export default Create;