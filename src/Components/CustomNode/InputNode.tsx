import React, { memo } from "react";
import { Handle, Position } from "reactflow";
import { style } from './MessageNodeStyle';

interface NodeProps {
  data: {
    heading: string;
    content: string;
  };
  selected: boolean;
}

const InputNode45: React.FC<NodeProps> = ({ data, selected }) => {


  return (
    <div className="text-updater-node"    style={{background: "#" ,border: "2px solid #cdc7c4 " , padding: '10px', color: "#e6232a" }}>
      <h1>
        Teste
      </h1>
      <div>
        <div >{data.heading}</div>
        <div style={style.contentWrapper}>{data.content}</div>
      </div>
      <Handle type="source" position={Position.Right} id="b" />
      <Handle type="target" position={Position.Left} id="a" />
    </div>
  );
};

export default memo(InputNode45);
