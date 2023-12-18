import React, { memo, useState } from 'react';
// import { getNode } from '../core/repos/Components';
import { Handle , Position } from 'reactflow';
import AbstractComponent from '../Card';
import { Input } from '@mui/material';
import { getNode } from '../Core';



interface NodeProps {
  data: {
    heading: string;
    content: string;
    value: string;
    id: string;
  };
  selected: boolean;
}

  const InputNode2: React.FC<NodeProps> = ({ data, selected }) => {


  const [componentValue, setComponentValue] = useState(data.value);
  const [isConnected, setIsConnected] = useState(false);

  const updateTarget = (value: string) => {
    let targetId = data.id + 1;
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
      <AbstractComponent title={data.heading}>
        <div>{data.content}</div>
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

export default memo(InputNode2);

