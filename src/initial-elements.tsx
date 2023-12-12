import { MarkerType } from "reactflow";

export const nodes = [
  {
    id: "1",
    type: "node",
    data: { heading: "Inicio", content: "" },
    position: { x: 50, y: 200 }
  },
  {
    id: "2",
    type: "node",
    data: { heading: "Fim", content: "" },
    position: { x: 900, y: 200 }
  }
];

export const edges = [
  {
    id: "e1-2",
    source: "1",
    target: "2",
    label: "Conectado",
    type: "smoothstep",
    markerEnd: {
      type: MarkerType.ArrowClosed
    }
  }
];
