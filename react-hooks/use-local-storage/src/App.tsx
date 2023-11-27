import reactLogo from "./assets/react.svg"
import viteLogo from "/vite.svg"
import "./App.css"
import useLocalStorage from "./hooks/useLocalStorageWithEffect"

function App() {
  const [count, setCount] = useLocalStorage("count", "{\"value\": \"0\"}")

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((prevCount) => {
          const countObj = prevCount ? JSON.parse(prevCount) : { value: 0 }
          countObj.value = parseInt(countObj.value) + 1
          return JSON.stringify(countObj)
        })}>
          count is {JSON.parse(count).value}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
