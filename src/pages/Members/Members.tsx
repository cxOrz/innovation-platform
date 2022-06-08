import React from 'react'
import MemberCard from '../../components/MemberCard/MemberCard'
import { members } from '../../configs/members'
import styles from './Members.module.css'

type Props = {}

const Members = (props: Props) => {
  return (
    <div className={styles.container}>
      <header className={styles.head_section}>
        <h1 className={styles.hero_title}>基地成员概况</h1>
        <p className={styles.hero_paragraph}>
          尽可能列出全部成员，若你不在列表中，请发起 Issue 让我们知道。我们也欢迎新成员的加入，如果你想加入我们，请在个人中心提交申请~
        </p>
      </header>
      <section className={styles.primary_section}>
        {
          members.map((member) => {
            return <MemberCard key={member.githubUserName} member={member} />
          })
        }
      </section>
    </div>
  )
}

export default Members