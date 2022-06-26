import React, { useState } from 'react'

const useErrorMsg = (errors: string[]) => {
  const [error, setError] = useState({ status: false, msg: '' })

  function dispatchMsg(id: number, status: boolean) {
    setError({ status: status, msg: errors[id] })
  }

  return [error, dispatchMsg] as const
}

export default useErrorMsg