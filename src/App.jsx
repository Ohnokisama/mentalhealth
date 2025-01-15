import { useState } from 'react'
import { Home, ChatPage, ChatRoom } from "./pages";
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <>
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route path='/chat' element={<ChatPage />} />
        <Route path='/chatroom' element={<ChatRoom />} />
      </Routes>
    </>
  )
}

export default App
