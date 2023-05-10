import React from 'react';
import styles from './GridItem.module.css';

interface GridItemProps {
  _id: string;
  realname: string;
  total: number;
  today: number;
  on: boolean;
}

function hourToLevel(hours: number) {
  if (hours > 2) return 4;
  if (hours > 1.5) return 3;
  if (hours > 1) return 2;
  if (hours > 0.5) return 1;
  return 0;
}

function GridItem(props: GridItemProps) {
  return (
    <div className={styles.box} data-level={hourToLevel(props.today)} data-id={props._id} data-on={`${props.on}`}>
      <span className={styles.name}>{props.realname}</span>
      <span className={styles.today}>{props.today}</span>
      <span className={styles.total}>{props.total} hr</span>
    </div>
  );
}

export default GridItem;