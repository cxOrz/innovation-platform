import React from 'react'
import { Link } from 'react-router-dom';
import styles from './Tag.module.css'

interface Props {
  children?: React.ReactNode;
  to: string
}

const Tag = ({ children, to }: Props) => {
  return (
    <Link to={to} className={styles.tag}>{children}</Link>
  )
}

export default Tag