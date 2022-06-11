import { GitHub, Twitter, Web } from '@mui/icons-material'
import Bilibili from '../../assets/icons/bilibili.svg'
import { IconButton } from '@mui/material'
import React from 'react'
import { Member } from '../../configs/members'
import styles from './MemberCard.module.css'

interface Props {
  member: Member
}

const MemberCard = ({ member }: Props) => {
  return (
    <div className={styles.card}>
      <img className={styles.avatar} alt='user-avatar' src={`https://avatars.githubusercontent.com/${member.githubUserName}?s=256`} />
      <h3 className={styles.card_title}>{member.name}</h3>
      <p className={styles.card_description}>{member.description}</p>
      <hr className={styles.hr} />
      <div className={styles.ports}>
        {
          member.github &&
          <IconButton sx={{ width: '2.5rem', height: '2.5rem', backgroundColor: '#f4f5fa', marginX: 1 }}
            target='_blank' href={member.github}>
            <GitHub sx={{ width: '1.25rem', color: '#222831' }} />
          </IconButton>
        }
        {
          member.blog &&
          <IconButton sx={{ width: '2.5rem', height: '2.5rem', backgroundColor: '#f4f5fa', marginX: 1 }}
            target='_blank' href={member.blog}>
            <Web sx={{ width: '1.25rem', color: '#222831' }} />
          </IconButton>
        }
        {
          member.twitter &&
          <IconButton sx={{ width: '2.5rem', height: '2.5rem', backgroundColor: '#f4f5fa', marginX: 1 }}
            target='_blank' href={member.twitter}>
            <Twitter sx={{ width: '1.25rem', color: '#1c9aef' }} />
          </IconButton>
        }
        {
          member.bilibili &&
          <IconButton sx={{ width: '2.5rem', height: '2.5rem', backgroundColor: '#f4f5fa', marginX: 1 }}
            target='_blank' href={member.bilibili}>
            <img alt='bilibili-icon' width='16' src={Bilibili} />
          </IconButton>
        }
      </div>
    </div>
  )
}

export default MemberCard