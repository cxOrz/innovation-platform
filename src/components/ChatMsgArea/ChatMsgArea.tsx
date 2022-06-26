import React from 'react'
import { Message } from '../../configs/types'
import styles from './ChatMsgArea.module.css'

interface Props {
  chat: Message[]
}

const ChatMsgArea = ({ chat }: Props) => {

  return (
    <div className={styles.area}>
      {
        chat.map((message, index) => {
          return <ChatBubble key={index} message={message} />
        })
      }
    </div>
  )
}

interface ChatBubbleProps {
  message: Message
}

const ChatBubble = ({ message }: ChatBubbleProps) => {

  return (
    <pre className={message.direction === 0 ? styles.msg_out : styles.msg_in}>
      {message.data}
    </pre>
  )
}

export default ChatMsgArea