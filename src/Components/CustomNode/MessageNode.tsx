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

const Node: React.FC<NodeProps> = ({ data, selected }) => {
  // const customTitle: React.CSSProperties = {
  //   ...style.title,
  //   backgroundColor: "#08c9bd",
  // };

  // const nodeStyle: React.CSSProperties = {
  //   ...style.body,
  //   ...(selected ? style.selected : {}),
  // };

  return (
    <div className="text-updater-node"    style={{background: "#08c9bd" }}>
      <div>
        <div >{data.heading}</div>
        <div style={style.contentWrapper}>{data.content}</div>
      </div>
      <Handle type="source" position={Position.Right} id="b" />
      <Handle type="target" position={Position.Left} id="a" />
    </div>
  );
};

export default memo(Node);
