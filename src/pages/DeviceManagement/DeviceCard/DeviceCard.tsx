import React from 'react';
import styles from './DeviceCard.module.css';

type Props = {
  style?: React.CSSProperties;
  actived?: boolean;
  data: {
    title: string;
    subtitle: string;
    img: string;
  };
  type: string;
  onClick: (params: any) => void;
};

const DeviceCard = (props: Props) => {
  const setType = () => {
    props.onClick(props.type);
  };

  return (
    <div
      className={`${props.actived ? styles.actived + ' ' : ''}${styles.container}`}
      onClick={setType}
      style={props.style}
    >
      <img src={props.data.img} />
      <h3>{props.data.title}</h3>
      <span>{props.data.subtitle}</span>
    </div>
  );
};

export default DeviceCard;