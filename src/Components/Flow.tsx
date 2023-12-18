import React, { useCallback, useEffect, useState, useRef } from "react";
import ReactFlow, {
  addEdge,
  Background,
  useNodesState,
  useEdgesState,
  ReactFlowProvider,
  Edge,
  Node as ReactFlowNode,
  Panel,
  // useReactFlow,
  // MiniMap,
  Controls,
  MiniMap,
} from "reactflow";

// Components
import Node from "../Components/CustomNode/MessageNode";




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
import { darkTheme, lightTheme } from "./theme";


const getNodeId = () => `randomnode_${+new Date()}`;

interface NodeData {
  heading: string;
  content: string;
}

interface CustomNode extends ReactFlowNode {
  data: NodeData;
}



interface FlowInstance {
  toObject(): any;
}

let id = 0;
const getId = (): string => `dndnode_${id++}`;
const flowKey = "flow";
// const defaultViewport = { x: 0, y: 0, zoom: 1.5 };

const OverviewFlow: React.FC = () => {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLInputElement>(null);
  const [rfInstance, setRfInstance] = useState<FlowInstance | null>(null);
  const [reactFlowInstance, setReactFlowInstance] = useState<any | null>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState<any>(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>(initialEdges);
  const [selectedNode, setSelectedNode] = useState<CustomNode | null>(null);
  const [isSelected, setIsSelected] = useState(false);
  const [typeSelected, setTypeSelected] = useState('');
  const [mode, setMode] = useState("dark");
  // const [nodes, setNodes, onNodesChange] = useNodesState<ReactFlowNode>([]);
  // const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);

  // const { setViewport } = useReactFlow();
  const nodeTypes = { node:  Node };

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

  const onDrop = (event: React.DragEvent<HTMLDivElement>): void => {
    console.log("Event: ", event.dataTransfer.getData("application/reactflow"));

    event.preventDefault();
    if (!reactFlowWrapper.current) return;

    const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();

    const type = event.dataTransfer.getData("application/reactflow");
    const label = event.dataTransfer.getData("content");

    setTypeSelected(type)

    const position = reactFlowInstance?.project({
      x: event.clientX - reactFlowBounds.left,
      y: event.clientY - reactFlowBounds.top,
    });

    if (position && type === "node") {
      const newNode: CustomNode = {
        id: getId(),
        type,
        position,
        data: { heading: `Novo Node`, content: label },
      };

      setNodes((es) => es.concat(newNode));
      setSelectedNode(newNode);
    }

    if (position && type === "process_node") {

      const InputNode: CustomNode = {
        id: getId(),
        type,
        position,
        data: { heading: `Novo Processo`, content: label },
      };

      setNodes((es) => es.concat(InputNode));
      setSelectedNode(InputNode);
    }

    if (position && type === "group_node") {

      const groupNode: CustomNode = {
        id: getId(),
        type,
        position,
        data: { heading: `Novo Grupo`, content: label },
      };

      setNodes((es) => es.concat(groupNode));
      setSelectedNode(groupNode);

    }

    if (position && type === "machine_node") {

      const machineNode: CustomNode = {
        id: getId(),
        type,
        position,
        data: { heading: `Nova Maquina`, content: label },
      };

      setNodes((es) => es.concat(machineNode));
      setSelectedNode(machineNode);
    }
  };

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

  const theme = mode === "light" ? lightTheme : darkTheme;

  const toggleMode = () => {
    setMode((m) => (m === "light" ? "dark" : "light"));
  };

  const onAdd = useCallback(() => {
    const incrementY = 100;
    const startX = 100;

    const newAddNode = nodes.length + 1;
    localStorage.setItem("newAddNode", String(newAddNode));

    const lastNodeY =
      nodes.length === 0 ? 0 : nodes[nodes.length - 1].position.y;

    const newNode = {
      id: getNodeId(),
      data: { label: `Node: ${newAddNode}` },
      type: "Node",
      position: {
        x: startX,
        y: lastNodeY + incrementY,
      },
    };

    setNodes((nds) => nds.concat(newNode));

    //  // Atualize o valor de newAddNode após adicionar um novo nó
    // setNewAddNode((prevValue) => prevValue + 1);

    // // Armazene o novo valor de newAddNode no localStorage
    // localStorage.setItem('newAddNode', String(newAddNode));
  }, [setNodes, nodes]);

  const onSave = useCallback(() => {
    if (rfInstance) {
      const flow = rfInstance.toObject();
      localStorage.setItem(flowKey, JSON.stringify(flow));
    }
  }, [rfInstance]);

  // const onRestore = useCallback(() => {
  //   const restoreFlow = async () => {
  //     const flow = localStorage.getItem(flowKey);

  //     if (flow !== null) {
  //       const parsedFlow = JSON.parse(flow);

  //       if (parsedFlow) {
  //         const { x = 0, y = 0, zoom = 1 } = parsedFlow.viewport || {};
  //         setNodes(parsedFlow.nodes || []);
  //         setEdges(parsedFlow.edges || []);
  //         // setViewport({ x, y, zoom });
  //       }
  //     }
  //   };

  //   restoreFlow();
  // }, [setNodes, setEdges]);

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
              style={{ background: theme.bg }}
            >
              <Background color="#aaa" gap={16} />
            </ReactFlow>
          </div>
          {/* <MiniMap
            nodeStrokeColor={(n) => {
              if (n.type === "input") return "#0041d0";
              if (n.type === "selectorNode") return theme.bg;
              if (n.type === "output") return "#ff0072";
            }}
            nodeColor={(n) => {
              if (n.type === "selectorNode") return theme.bg;
              return "#fff";
            }}
          /> */}

          <MiniMap
            nodeColor={nodeColor}
            nodeStrokeWidth={3}
            zoomable
            pannable
          />

          <Panel position="bottom-right">
            <button onClick={onSave}>Salvar</button>
            {/* <button onClick={onRestore}>Resetar</button> */}
            <button onClick={onAdd}>Adicionar um Node</button>
            <button onClick={toggleMode}>Toggle Dark Mode</button>
          </Panel>

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
