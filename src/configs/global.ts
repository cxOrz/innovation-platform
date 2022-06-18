import tcb from '@cloudbase/js-sdk'

export const TargetName = 'RC-Fishing'

export const tcb_app = tcb.init({
  env: 'cloudbase-1a4211'
})

export const tcb_auth = tcb_app.auth({ persistence: 'local' })

export const tcb_db = tcb_app.database()