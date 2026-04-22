import { Toaster } from 'react-hot-toast'
import Routing from './routing/Routing'

const App = () => {
  return (
    <div className='flex flex-col justify-center items-center h-screen bg-green-50'>
      <Routing />
      <Toaster />
    </div>
  )
}

export default App