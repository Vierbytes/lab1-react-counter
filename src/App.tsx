/**
 * App Component - Main Entry Point
 *
 * This is the root component of the application.
 * I'm importing and rendering the AdvancedCounter component
 * which contains all the lab requirements.
 */

import AdvancedCounter from './AdvancedCounter'
import './App.css'

function App() {
  return (
    <div className="app">
      <AdvancedCounter />
    </div>
  )
}

export default App
