import React, { useState, useEffect, useRef } from "react"
import data from "./data.js"

type SearchResult = {
  id: number
  title: string
}

function App(): JSX.Element {
  const [search, setSearch] = useState<string>("")
  const [result, setResult] = useState<SearchResult[]>([])
  const searchRef = useRef<HTMLDivElement | null>(null)

  const isTyping: boolean = search.trim().length > 0

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleClickOutside = (e: MouseEvent): void => {
    const targetNode = e.target as Node
    if (searchRef.current && !searchRef.current.contains(targetNode)) {
      setSearch("")
    }
  }

  useEffect(() => {
    if (isTyping) {
      setResult(
        data.filter((item) =>
          item.title.toLowerCase().includes(search.toLowerCase()),
        ),
      )
    } else {
      setResult([])
    }
  }, [search])

  return (
    <>
      <div className="w-[500px] my-5 mx-auto relative" ref={searchRef}>
        <input
          className={`w-full h-10 ${
            isTyping ? "rounded-t-md" : "rounded-md"
          } px-4 focus:outline-none`}
          placeholder="search something..."
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {result.length > 0 && (
          <div
            className={
              isTyping
                ? "absolute w-full rounded-b-md bg-white"
                : "absolute w-full rounded-md bg-white"
            }
          >
            {result.map((item) => (
              <div className="px-4 py-2" key={item.id}>
                {item.title}
              </div>
            ))}
          </div>
        )}
        {isTyping && result.length === 0 && (
          <div className="px-4 py-2 rounded-b-md bg-white text-slate-400">
            <i>no match with {search}</i>
          </div>
        )}
      </div>
    </>
  )
}

export default App
