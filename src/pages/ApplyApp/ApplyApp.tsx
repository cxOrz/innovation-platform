import React from 'react'
import { Button, Tooltip } from '@mui/material'
import QrCodeIcon from '@mui/icons-material/QrCode';
import styles from './ApplyApp.module.css'
import { QRCodeCanvas } from 'qrcode.react'

interface Props { }

const ApplyApp = (props: Props) => {
  return (
    <div>
      <div className={styles.content}>
        <div className={styles.image_wrapper}>
          <img className={styles.background_blur} alt='background' src='/assets/app/logos/apply-my-app.webp' />
          <div className={styles.image_cover}></div>
          <img className={styles.app_logo} alt='app-logo' src='/assets/app/logos/apply-my-app.webp' />
        </div>
        <div className={styles.content_info}>
          <h1>应用提交</h1>
          <p>将你开发的网页提交到应用页面中</p>
          <p>分类：基地应用</p>
          <div className={styles.button_group}>
            <Button variant='contained' disableElevation
              onClick={() => {
                window.open('https://github.com/cxOrz/innovation-platform/edit/main/src/configs/apps.ts', '_blanked')
              }}
              sx={{
                mr: '1rem',
                color: '#393e46',
                backgroundColor: '#e5e5ea',
                transition: 'all 200ms',
                ":hover": {
                  color: 'white',
                  backgroundColor: 'black'
                }
              }}>前往提交</Button>
            <Tooltip arrow title={
              <QRCodeCanvas value='https://github.com/cxOrz/innovation-platform/edit/main/src/configs/apps.ts' />
            }>
              <Button variant='contained' disableElevation>手机扫码<QrCodeIcon fontSize='small' /></Button>
            </Tooltip>
          </div>
        </div>
      </div>
      <hr className={styles.hr} />
      <div className={styles.secondary_content}>
        <p><strong>⚡请仔细阅读以下内容⚡</strong></p>
        <div className={styles.readlist}>
          <strong># 请确保</strong>
          <ul>
            <li>应用功能一切稳定</li>
            <li>应用有价值，有用，原则上宁缺毋滥</li>
            <li>应用样式与基地门户一致，以免带来不和谐的体验</li>
          </ul>
          <strong># 如何提交</strong>
          <p>
            在 GitHub 仓库，找到 /src/configs/apps.ts 文件，找到 apps 对象的 base 数组，在其中添加自己的应用信息。
            完成后，提交 pull request，如果一切良好那么等待合并。
          </p>
          <p>合并后，下次构建项目，你的应用将出现在基地应用一栏。</p>
        </div>
      </div>
    </div>
  )
}

export default ApplyApp