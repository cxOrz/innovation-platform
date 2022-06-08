import React from 'react'
import styles from './Feature.module.css'

interface Props {
  title: string,
  desc: string
}

const Feature = ({ title, desc }: Props) => {
  return (
    <div className={styles.feature}>
      <h2>{title}</h2>
      <p className={styles.feature_description}>{desc}</p>
    </div>
  )
}

export default Feature