import {useState, useEffect} from "react";
import data from "./data.js";

function App() {

  const [search, setSearch] = useState("")
  const [result, setResult] = useState([])

  useEffect(()=> {
      if (search){
        setResult(data.filter(item => item.title.toLowerCase().includes(search.toLowerCase())))
      } else {
          setResult([])
      }
  }, [search])

  return (
    <>
        <div className="w-[500px] my-5 mx-auto relative">
            <input
                className="w-full h-10 rounded-md px-4 focus:outline-none"
                placeholder="search something..."
                type="text"
                onChange={(e)=> setSearch(e.target.value)}/>
            {result && (
                <div className="mt-2 absolute w-full rounded-md bg-white">
                    {result.map((item) => (
                        <div className="px-4 py-2 border-solid border-b-2 border-slate-200" key={item.id}>
                            {item.title}
                        </div>
                    ))}
                </div>
            )}
        </div>
    </>
  )
}

export default App
