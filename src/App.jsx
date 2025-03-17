import { useState,useEffect } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';
import Swal from "sweetalert2";
import { div } from 'three/examples/jsm/nodes/Nodes.js';


function App() {

  // usestate state for a single task
 const [task, setTask] = useState("");
//  usestate for list tasks
 const [tasks, setTasks] = useState([]);

//  useEffect to load the tasks array from local storage
useEffect(() => {
  let taskString=localStorage.getItem("tasks");
  if(taskString){
    let tasks=JSON.parse(localStorage.getItem("tasks"));
    setTasks(tasks);
  }
}, []);


//  function to store array of tasks in local storage of browser
const saveToLocalStorage=()=>{
  localStorage.setItem("tasks",JSON.stringify(tasks));
}
  // function to handle click on add button 
  const handleAdd=()=>{
    setTasks([...tasks,{id:uuidv4(),task, isCompleted:false}])
    setTask("")
    saveToLocalStorage();
  }
  // function to handle click on edit button
  const handleEdit=(e,id)=>{
    // this will filter the task with id
    let t=tasks.filter(item=>item.id===id);
    // this will set usestate (settask) to this clicked task 
    setTask(t[0].task);
    // this will delete the task from array
    let newTasks=tasks.filter(item=>{
      return item.id!==id;
    });
    setTasks(newTasks);
    saveToLocalStorage();

  }
  // function to handle click on delete button
    const handleDelete = (e,id) => {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#1E3A8A",
        confirmButtonText: "Yes, delete it!"
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire("Deleted!", "Your task has been deleted.", "success");
            let newTasks=tasks.filter(item=>{
              return item.id!==id;
            })
            setTasks(newTasks);
        }
    });
    saveToLocalStorage();
  }
  // function to handle the change in input
  const handleChange=(e)=>{
  setTask(e.target.value);

  }
  // function to handle checkbox
  const handleCheckbox=(e)=>{
  let id= e.target.name;
  let index=tasks.findIndex(item=>{
      return item.id===id;
  })
  let newTasks=[...tasks];
  newTasks[index].isCompleted = !newTasks[index].isCompleted;
  setTasks(newTasks);
  saveToLocalStorage();

  }
  return (
    <>
    <Navbar/>
      <div className="contain shadow-md shadow-blue-950 bg-cyan-600 m-9 rounded-b-sm p-5">
        <div className="font-bold text-2xl"><h1>Add a Task</h1></div>
        <div className="addtodo flex items-center gap-5">
        <div className="addinput"><input onChange={handleChange} value={task} className='bg-amber-50 h-7 p-2 w-[400px] rounded-md focus:outline-blue-900' type="text" /></div>
         <div className="addbtn"><button onClick={handleAdd} className='bg-blue-950 text-white px-3 py-1 rounded-sm cursor-pointer hover:bg-blue-900'>Add</button></div>
        </div>
        <div className="yourtodos font-bold text-2xl mt-5"><h1>Your Tasks</h1></div>
        <div className="todos">
          {tasks.length===0 && <div>No Tasks to display.</div>}
        {tasks.map(item=>{
            return  <div key={item.id} className="todo flex gap-3 my-2 items-center text-blue-900 font-bold">
              <input className='hover:cursor-pointer' onChange={handleCheckbox} value={item.isCompleted} type="checkbox" name={item.id}  />
            <div className={item.isCompleted?"line-through":""}>{item.task}</div>
            <div className="editButton"><button onClick={(e)=>{handleEdit(e,item.id)}} className='bg-blue-950 text-white px-3 py-1 rounded-sm cursor-pointer hover:bg-blue-900'>Edit</button></div>
            <div className="deleteButton"><button onClick={(e)=>{handleDelete(e,item.id)}} className='bg-blue-950 text-white px-3 py-1 rounded-sm cursor-pointer hover:bg-blue-900'>Delete</button></div>
          </div>
        })
        
        }
        </div>
      </div>
    </>
  )
}

export default App
