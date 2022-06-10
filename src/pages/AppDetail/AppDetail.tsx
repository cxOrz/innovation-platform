import React from 'react'
import { useParams } from 'react-router-dom'
import { apps } from '../../configs/apps'

interface Props { }

const AppDetail = (props: Props) => {
  const { id } = useParams()
  const data = apps[id ? Number(id) : 0]

  return (
    <div>
      <div>
        <img src={require(`../../assets/app/logos/${data.picture}`)} />
      </div>
    </div>
  )
}

export default AppDetail