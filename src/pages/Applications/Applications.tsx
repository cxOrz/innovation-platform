import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import AppCard from '../../components/AppCard/AppCard';
import { apps } from '../../configs/apps';
import { TargetName } from '../../configs/global';
import { useAppSelector } from '../../hooks/redux';
import { selectUser } from '../../stores/user/userSlice';
import styles from './Applications.module.css';

type Props = {};

const Applications = (props: Props) => {
  const navigate = useNavigate();
  const user = useAppSelector(selectUser).data;

  return (
    <div className={styles.container}>
      {
        window.location.pathname === '/apps' ?
          <>
            <section className={styles.section}>
              <h3 className={styles.category_name}># 基地应用</h3>
              <div className={styles.category}>
                <AppCard click={() => { navigate('/apps/apply-app'); }} newTab data={{
                  title: '应用提交',
                  note: '将你开发的应用提交至此',
                  description: '你可以提交你开发的应用，审核过后会添加到应用页面，供大家使用。',
                  picture: 'apply-my-app.webp',
                  url: `https://github.com/${TargetName}/innovation-platform/edit/main/src/configs/apps.ts`,
                  category: 'base'
                }} />
                { // 超级管理
                  user?.role === 0 &&
                  <>
                    <AppCard click={() => { navigate('/apps/base/' + 0); }} data={apps.base[0]} />
                  </>
                }
                { // 超级管理、普通管理
                  user?.role <= 1 &&
                  <>
                    <AppCard click={() => { navigate('/apps/base/' + 1); }} data={apps.base[1]} />
                    <AppCard click={() => { navigate('/apps/base/' + 2); }} data={apps.base[2]} />
                    <AppCard click={() => { navigate('/apps/base/' + 3); }} data={apps.base[3]} />
                    <AppCard click={() => { navigate('/apps/base/' + 4); }} data={apps.base[4]} />
                  </>
                }
                { // 超级管理、普通管理、成员
                  user?.role <= 2 &&
                  <>
                    <AppCard click={() => { navigate('/apps/base/' + 5); }} data={apps.base[5]} />
                  </>
                }
                { // 超级管理、普通管理、成员、普通用户
                  user?.role !== undefined &&
                  <>
                    <AppCard click={() => { navigate('/apps/base/' + 6); }} data={apps.base[6]} />
                  </>
                }
                {
                  apps.base.slice(7).map((app, i) => {
                    return <AppCard key={i} click={() => { navigate('/apps/base/' + (i + 7)); }} data={app} />;
                  })
                }
              </div>
            </section >
            <section className={styles.section}>
              <h3 className={styles.category_name}># 前端开发</h3>
              <div className={styles.category}>
                {
                  apps.frontend.map((app, i) => {
                    return <AppCard key={i} click={() => { navigate('/apps/frontend/' + i); }} data={app} newTab />;
                  })
                }
              </div>
            </section>
            <section className={styles.section}>
              <h3 className={styles.category_name}># 推荐学习</h3>
              <div className={styles.category}>
                {
                  apps.learn.map((app, i) => {
                    return <AppCard key={i} click={() => { navigate('/apps/learn/' + i); }} data={app} newTab />;
                  })
                }
              </div>
            </section>
            <section className={styles.section}>
              <h3 className={styles.category_name}># 实用工具</h3>
              <div className={styles.category}>
                {
                  apps.tools.map((app, i) => {
                    return <AppCard key={i} click={() => { navigate('/apps/tools/' + i); }} data={app} newTab />;
                  })
                }
              </div>
            </section>
          </>
          :
          <Outlet />
      }
    </div >
  );
};

export default Applications;