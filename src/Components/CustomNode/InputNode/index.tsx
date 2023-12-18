import { TextField } from "@mui/material";
import React, { memo, useState } from "react";
import { Handle, Position } from "reactflow";
import { getNode } from "../../Core";

export default memo(({ data, isConnectable }: any) => {

    const [componentValue, setComponentValue] = useState(data.value);
    const [isConnteted, setIsConnected] = useState(false);
  
    const transmit = (params: any) => {
        setIsConnected(true);
        let target = getNode(params.target);
        target.data.execute(target, componentValue);
      };

  return (
    <>
      {/* <input className="nodrag" type="text" onChange={data.onChange}  /> */}
      <TextField id="outlined-basic" label="Outlined" variant="outlined" />

      <Handle
        type="source"
        position={Position.Right}
        style={{ background: "#555", width: "10px", height: "10px" }}
        onConnect={(params) => transmit(params)}
        //   isConnectable={isConnectable}
      />
    </>
  );
});
