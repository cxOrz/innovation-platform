import React from 'react'
import { useParams } from 'react-router-dom'
import { apps } from '../../configs/apps'
import { Category } from '../../configs/apps'

interface Props { }

const AppDetail = (props: Props) => {
  const { id, category } = useParams()
  const data = apps[category as Category][id ? Number(id) : 0]

  return (
    <div>
      <div>
        <img alt='app-logo' src={require(`../../assets/app/logos/${data.picture}`)} />
      </div>
    </div>
  )
}

export default AppDetail