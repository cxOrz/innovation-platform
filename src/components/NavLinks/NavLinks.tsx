import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import NavBarStyles from '../NavigationBar/NavigationBar.module.css'

export interface LinkProps {
  to: string,
  label: string,
  isActive: boolean
}
type Props = {
  linkProps: LinkProps[]
}

const NavLinks = ({ linkProps }: Props) => {
  return (
    <>
      {
        linkProps.map((link) => {
          return <Link key={link.to} to={link.to} className={`${NavBarStyles.navbar_item} ${link.isActive ? NavBarStyles.navbar_item_active : ''}`}>{link.label}</Link>
        })
      }
    </>
  )
}

export default NavLinks