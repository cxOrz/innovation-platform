import React from 'react'
import styles from './GlobalLoader.module.css'
interface Props {
  loading: boolean
}

const GlobalLoader = ({ loading }: Props) => {
  return (
    <div>
      {
        loading &&
        <div className={styles.loader}></div>
      }
    </div>
  )
}

export default GlobalLoader