import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import useStateWithHistory from "./hooks/useStateWithHistory.ts"

function App() {
  const [value, setValue, goBack, goForward, history] = useStateWithHistory(0)

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
        <button className="backButton" onClick={() => goBack()}>
          Back
        </button>
        <button onClick={() => setValue((value) => value + 1)}>
          count is {value}
        </button>
        <button className="nextButton" onClick={() => goForward()}>
          Next
        </button>
        <div className="history">
          {history}
        </div>
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
