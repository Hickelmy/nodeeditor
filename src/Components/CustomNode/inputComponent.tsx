import React, { useState } from 'react';
// import { getNode } from '../core/repos/Components';
import { Handle , Position } from 'reactflow';
import AbstractComponent from '../Card';
import { Input } from '@mui/material';
import { getNode } from '../Core';

export default function InputComponent(props: any) {
  const [componentValue, setComponentValue] = useState(props.data.value);
  const [isConnected, setIsConnected] = useState(false);

  const updateTarget = (value: string) => {
    let targetId = props.id + 1;
    let target = getNode(targetId);
    target.data.execute(target, value);
  };

  const changeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComponentValue(e.target.value);
    if (isConnected) {
      updateTarget(e.target.value);
    }
  };

  const transmit = (params: any) => {
    setIsConnected(true);
    let target = getNode(params.target);
    target.data.execute(target, componentValue);
  };

  return (
    <>
      <AbstractComponent title={'Input'}>
        <Input onChange={changeValue} />
        <Handle
          // id="b" 
          type="source"
          position={Position.Right}
          style={{ background: '#555', width: '10px', height: '10px' }}
          onConnect={(params: any) => transmit(params)}
        />


      </AbstractComponent>
    </>
  );
}
