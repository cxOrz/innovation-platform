import React from 'react'
import styles from './ChatMsgArea.module.css'

interface Props {
  chat: string[]
}

const ChatMsgArea = ({ chat }: Props) => {

  return (
    <div className={styles.msgArea}>
      {
        chat.map((message, index) => {
          return <ChatBubble key={index} direction={index % 2 === 0 ? 'out' : 'in'} message={message} />
        })
      }
    </div>
  )
}

interface ChatBubbleProps {
  direction: 'in' | 'out'
  message: string
}

const ChatBubble = ({ direction, message }: ChatBubbleProps) => {

  return (
    <div className={direction === 'out' ? styles.msg_out : styles.msg_in}>
      {message}
    </div>
  )
}

export default ChatMsgArea