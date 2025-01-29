import React, { useRef, useState } from 'react'
import Avatar from "./../assets/avatar1.jpg";
import { Link } from 'react-router-dom';

const ChatRoom = () => {
  // const messages = [
  //   {
  //     sender: 'You',
  //     message: 'How are you?'
  //   },
  //   {
  //     sender: 'ChatGPT',
  //     message: "I'm good and you"
  //   },
  //   {
  //     sender: 'You',
  //     message: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate sunt nemo deleniti delectus perspiciatis aliquam sequi voluptas, omnis neque perferendis atque tenetur optio, tempore magnam vel hic deserunt, adipisci eaque officia eius! Recusandae eius excepturi, error, voluptates necessitatibus repudiandae autem ipsam dolorum blanditiis illo impedit saepe praesentium, dicta eligendi facilis.'
  //   },
  //   {
  //     sender: 'ChatGPT',
  //     message: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate sunt nemo deleniti delectus perspiciatis aliquam sequi voluptas, omnis neque perferendis atque tenetur optio, tempore magnam vel hic deserunt, adipisci eaque officia eius! Recusandae eius excepturi, error, voluptates necessitatibus repudiandae autem ipsam dolorum blanditiis illo impedit saepe praesentium, dicta eligendi facilis."
  //   },
  // ]
  const [typing, setTyping] = useState(false)
  const [messages, setMessages] = useState([])
  const [message, setMessage] = useState('')

  const inputRef = useRef(null)

  const handleSend = async (e) => {
    e.preventDefault()

    const newMessage = {
      message: message, 
      sender: "You",
      direction: "outgoing"
    }

    inputRef.current.value = ''

    // Update messages
    const newMessages = [...messages, newMessage]
    setMessages(newMessages)

    // Typing indicator
    setTyping(true)

    // Send message to ChatGPT
    await sendMessageToChatGPT(newMessages)
  }

  async function sendMessageToChatGPT(chatMessages) {
    let apiMessages = chatMessages.map(messageObject => {
      let role = ''
      if(messageObject.sender === "ChatGPT") {
        role = "assistant"
      } else {
        role = "user"
      }
      return { role: role, content: messageObject.message }
    })

    const systemMessage = {
      role: "system",
      content: "Explain like a certified mental health professional and be clear about everything relating to mental health"
    }

    const apiRequestBody = {
      "model": "gpt-3.5-turbo",
      "messages": [
        systemMessage,
        ...apiMessages
      ],
      
    }

    await fetch("https://api.openai.com/v1/chat/completions",{
      method: "POST",
      headers: {
        "Authorization": `Bearer ${import.meta.env.VITE_CHATGPT_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(apiRequestBody)
    }).then(data => {
      return data.json()
    }).then(data => {
      setMessages([
        ...chatMessages, {
          message: data.choices[0].message.content,
          sender: "ChatGPT"
        }
      ])
      setTyping(false)
    })
  }

  return (
    <div className='flex gap-10 text-white'>
      <nav className='fixed w-full h-auto px-4 py-2 md:w-[20%] md:h-[100vh] md:py-10 md:px-10 border-b-2 md:border-r-2 border-b-[#1a314d] md:border-r-[#1a314d] flex md:flex-col justify-between top-0 z-50'>
        <div className='flex gap-4 items-center'>
          <img src={Avatar} alt="" className='w-[50px] md:w-[70px] h-[50px] md:h-[70px] object-cover rounded-full' />
          <div>
            <h1 className="text-xl md:text-2xl">Frederick</h1>
            <p className='md:mt-1 text-green-500'>Online</p>
          </div>
        </div>

        <Link className='hidden md:inline-block py-4 px-16 bg-red-500 text-white text-center rounded-full w-full' to={'/'}>
          Logout
        </Link>
      </nav>
      <div className='w-full ml-0 md:w-[80%] h-[100vh] overflow-auto md:ml-[20%]'>
        <div className='md:px-20 px-6 relative h-[100vh]'>
          <div className='w-full md:h-[85%] h-[75%] relative top-20 md:top-5 rounded-lg border border-[#1a314d] bg-[#1a314d] overflow-auto p-5 md:p-10'>
            {
              messages.map((message, i) => (
                message.sender !== 'ChatGPT' ? 
                <div key={i} className='py-3 px-6 bg-[#0e1d30] flex flex-col rounded-xl text-right ml-auto my-2 w-fit md:max-w-[70%] max-w-[90%]'>
                  <span className='font-semibold'>{message.sender}</span>
                  <p>{message.message}</p>
                </div> : 
                <div key={i} className='py-3 px-6 bg-[#0e1d30] flex flex-col rounded-xl my-2 w-fit md:max-w-[70%] max-w-[90%]'>
                  <span className='font-semibold'>Frederick</span>
                  <pre className='font-[Manrope] text-wrap block'>{message.message}</pre>
                </div>
              ))
            }
          </div>
          <form className='flex gap-2 absolute w-[90%] left-[5%] bottom-[20px]' onSubmit={handleSend}>
            <input 
              type="text" className='bg-[#1a314d] w-full py-4 px-4 rounded-full' 
              placeholder='What do you want to know?'
              onChange={e => setMessage(e.target.value)}
              ref={inputRef}
            />
            <button className='py-4 px-5 rounded-full bg-white text-[#0e1d30] font-semibold'>
              <i className="ri-send-plane-line"></i>
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ChatRoom