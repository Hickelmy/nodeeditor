import React, { useCallback, useEffect, useState, useRef } from "react";
import ReactFlow, {
  addEdge,
  Background,
  useNodesState,
  useEdgesState,
  ReactFlowProvider,
  Edge,
  Node as ReactFlowNode,
  // Panel,
  // useReactFlow,
  // MiniMap,
  Controls,
  MiniMap,
} from "reactflow";

// Components
import Node from "../Components/CustomNode/MessageNode";

import ColorSelectorNode from "./CustomNode/Test/customColorPicker";

// Utils
import {
  nodes as initialNodes,
  edges as initialEdges,
} from "../initial-elements";

// Styles
import "reactflow/dist/style.css";
import "./dnd.css";
import "./updatenode.css";
import Sidebar from "./Sidebar/Sidebar";
import InputNode from "./CustomNode/InputNode/index";
// import { darkTheme, lightTheme } from "./theme";

// const getNodeId = () => `randomnode_${+new Date()}`;

interface NodeData {
  heading: string;
  content: string;
}

interface CustomNode extends ReactFlowNode {
  data: NodeData;
}
const nodeTypes = {
  node: Node,
  color: ColorSelectorNode,
  inputNode : InputNode,
};

// interface FlowInstance {
//   toObject(): any;
// }

let id = 0;
const getId = (): string => `dndnode_${id++}`;
const flowKey = "flow";
// const defaultViewport = { x: 0, y: 0, zoom: 1.5 };

const OverviewFlow: React.FC = () => {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLInputElement>(null);
  // const [rfInstance, setRfInstance] = useState<FlowInstance | null>(null);
  const [reactFlowInstance, setReactFlowInstance] = useState<any | null>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState<any>(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>(initialEdges);
  const [selectedNode, setSelectedNode] = useState<CustomNode | null>(null);
  const [isSelected, setIsSelected] = useState(false);
  // const [typeSelected, setTypeSelected] = useState("");
  const [mode, setMode] = useState("dark");
  // const [nodes, setNodes, onNodesChange] = useNodesState<ReactFlowNode>([]);
  // const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);

  // const { setViewport } = useReactFlow();


  const [newAddNode, setNewAddNode] = useState(() => {
    const storedValue = localStorage.getItem("newAddNode");
    return storedValue ? parseInt(storedValue, 10) : 1;
  });

  useEffect(() => {
    const handleStorageChange = () => {
      const storedValue = localStorage.getItem("newAddNode");
      setNewAddNode(storedValue ? parseInt(storedValue, 10) : 1);
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  useEffect(() => {
    const savedMode = localStorage.getItem("mode");
    setMode(savedMode || "light");

    const savedNodes = localStorage.getItem(flowKey);
    setNodes(savedNodes ? JSON.parse(savedNodes) : initialNodes);

    const savedEdges = localStorage.getItem(flowKey);
    setEdges(savedEdges ? JSON.parse(savedEdges) : initialEdges);
  }, []);

  const onInit = (reactFlowInstance: any): void =>
    setReactFlowInstance(reactFlowInstance);

  const onDragOver = (event: React.DragEvent<HTMLDivElement>): void => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  const onDrop = useCallback(
    (event: any) => {
      event.preventDefault();
      const type = event.dataTransfer.getData("application/reactflow");
      console.log("type : ", type);

      // check if the dropped element is valid
      if (typeof type === "undefined" || !type) {
        return;
      }

      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const newNode = {
        id: getId(),
        type,
        position,
        data: { label: `${type} node` },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance]
  );

  const onConnect = (connection: Edge | any): void => {
    setEdges((eds) =>
      addEdge(
        { ...connection, type: "smoothstep", markerEnd: { type: "step" } },
        eds
      )
    );
  };

  const [nodeName, setNodeName] = useState("");

  useEffect(() => {
    const node = nodes.filter((node) => node.selected);
    if (node[0]) {
      setSelectedNode(node[0]);
      setIsSelected(true);
    } else {
      setSelectedNode(null);
      setIsSelected(false);
    }
  }, [nodes]);

  useEffect(() => {
    setNodeName(selectedNode?.data?.content || "");
  }, [selectedNode]);

  useEffect(() => {
    textRef?.current?.focus();
  }, [selectedNode]);

  useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === selectedNode?.id) {
          node.data = {
            ...node.data,
            content: nodeName || " ",
          };
        }
        return node;
      })
    );
  }, [nodeName, setNodes, selectedNode]);

  const nodeColor = (node: any) => {
    switch (node.type) {
      case "input":
        return "#6ede87";
      case "output":
        return "#6865A5";
      default:
        return "#ff0072";
    }
  };

  return (
    <>
      {/* <button onClick={saveHandler}>Save</button> */}
      <div className="dndflow">
        <ReactFlowProvider>
          <div className="reactflow-wrapper" ref={reactFlowWrapper}>
            <ReactFlow
              nodes={nodes}
              edges={edges}
              nodeTypes={nodeTypes}
              // defaultViewport={defaultViewport}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              onInit={onInit}
              onDrop={onDrop}
              fitView
              snapToGrid
              onDragOver={onDragOver}
              attributionPosition="top-right"
              // style={{ background: theme.bg }}
            >
              <Background color="#aaa" gap={16} />
            </ReactFlow>
          </div>

          <MiniMap
            nodeColor={nodeColor}
            nodeStrokeWidth={3}
            zoomable
            pannable
            position="bottom-left"
          />

          <Sidebar
            isSelected={isSelected}
            textRef={textRef}
            nodeName={nodeName}
            setNodeName={setNodeName}
          />
          <Controls />
        </ReactFlowProvider>
      </div>
    </>
  );
};

export default OverviewFlow;
