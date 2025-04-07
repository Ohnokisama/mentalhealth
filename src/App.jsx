import { Home, ChatRoom } from "./pages";
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <>
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route path='/chatroom' element={<ChatRoom />} />
      </Routes>
    </>
  )
}

export default App
