import {useState, useEffect, useRef} from "react";
import data from "./data.js";

function App() {

  const [search, setSearch] = useState("")
  const [result, setResult] = useState([])
  const searchRef = useRef()

  const isTyping = search.replace(/\s+/, "").length > 0

  useEffect(()=> {
      document.addEventListener("mousedown", handleClickOutside)
      return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleClickOutside = (e) => {
      if (!searchRef.current.contains(e.target)){
          setSearch("")
      }
  }

  useEffect(()=> {
      if (isTyping){
        setResult(data.filter(item => item.title.toLowerCase().includes(search.toLowerCase())))
      } else {
          setResult([])
      }
  }, [search])

  return (
    <>
        <div className="w-[500px] my-5 mx-auto relative" ref={searchRef}>
            <input
                className={isTyping ? "w-full h-10 rounded-t-md px-4 focus:outline-none" : "w-full h-10 rounded-md px-4 focus:outline-none"}
                placeholder="search something..."
                type="text"
                value={search}
                onChange={(e)=> setSearch(e.target.value)}/>
            {result && (
            <div className={isTyping ? "absolute w-full rounded-b-md bg-white" : "absolute w-full rounded-md bg-white"}>
                {result.map((item) => (
                    <div className="px-4 py-2" key={item.id}>
                        {item.title}
                    </div>
                ))}
            </div>
            )}
            {isTyping && result && <div className="px-4 py-2 rounded-b-md bg-white text-slate-400"><i>no match with {search}</i></div>}
        </div>
    </>
  )
}

export default App
