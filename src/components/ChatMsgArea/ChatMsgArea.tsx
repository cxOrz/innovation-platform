import React from 'react'
import { Message } from '../../configs/types'
import styles from './ChatMsgArea.module.css'

interface Props {
  chat: Message[]
  direction: 0 | 1
}

const ChatMsgArea = ({ chat, direction }: Props) => {

  return (
    <div className={styles.area}>
      {
        chat.map((message, index) => {
          return <ChatBubble key={index} message={message} direction={direction} />
        })
      }
    </div>
  )
}

interface ChatBubbleProps {
  message: Message
  direction: 0 | 1
}

const ChatBubble = ({ message, direction }: ChatBubbleProps) => {

  return (
    <pre className={message.direction === direction ? styles.msg_out : styles.msg_in}>
      {message.data}
    </pre>
  )
}

export default ChatMsgArea