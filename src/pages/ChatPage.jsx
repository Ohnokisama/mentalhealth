import React, { useState } from 'react'
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator } from "@chatscope/chat-ui-kit-react";
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css'

const ChatPage = () => {
  const [typing, setTyping] = useState(false)
  const [messages, setMessages] = useState([])

  const handleSend = async (message) => {
    const newMessage = {
      message: message, 
      sender: "user",
      direction: "outgoing"
    }

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
        role = "sender"
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
    <div className='h-[100vh]'>
      <MainContainer>
        <ChatContainer>
          <MessageList
            typingIndicator={ typing ? <TypingIndicator content="Wura is typing" /> : null}
          >
            {
              messages.map((message, i) => (
                <Message key={i} model={message} />
              ))
            }
          </MessageList>
          <MessageInput placeholder='Type message here' onSend={handleSend} />
        </ChatContainer>
      </MainContainer>
    </div>
  )
}

export default ChatPage