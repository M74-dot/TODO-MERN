import React,{useState, useEffect} from "react"
import Create from "./Create";
import axios from "axios";


const Home = () =>{
    const [todos,setTodos] = useState([])
    useEffect(()=>{
      const fetchData = async () =>{
        try{
          const result = await axios.get("http://localhost:3000/get")
          setTodos(result.data);
          // console.log(result.data)
        }catch(err){
          console.log(err)
        }
      } 
      fetchData()
    },[])

    const handleDone = async (id) =>{
      console.log(id)
      try{
        const result = await axios.put(`http://localhost:3000/update/${id}`)
        const updatedTodo = result.data
        setTodos(todos.map(todo => (todo._id === updatedTodo._id ? updatedTodo : todo)));

        console.log(result)
      }catch(err){
        console.log(err)
      }
    }

    const handleDelete = async(id) =>{
      try{
        const result = await axios.delete(`http://localhost:3000/delete/${id}`)
        setTodos(todos.filter(todo => todo._id !== id));
        console.log(result)
      }catch(err){
        console.log(err)
      }
    }
  return(
    <div className="flex flex-col items-center mt-[50px] max-w-[500px]  m-auto">
      <h1 className="text-3xl font-bold">TODO List</h1>
      <Create/>
        {
            todos.length === 0 
            ?
            <div className="mt-5"><h2 className="text-2xl font-bold">No Records</h2></div>
            :
            <ul className="w-full flex flex-col gap-3 h-[400px] overflow-y-auto mt-5">
                {todos.map((todo) => (
                  <li 
                    key={todo._id} 
                    className="flex flex-row bg-black text-white p-3 rounded text-xl"
                  >
                    <div className="mr-5">
                      <input
                        type="checkbox"
                        className="ml-3 w-5 h-5"
                        checked={todo.done}
                        onChange={()=>handleDone(todo._id)}
                      />
                    </div>
                    {todo.task}
                    <button
                      className="border rounded bg-red-600 px-3 py-1 ml-auto"
                      onClick={()=>handleDelete(todo._id)}
                    >
                      Delete
                    </button>
                  </li>
                ))}
            </ul>
        }
    </div>
  )
}

export default Home;