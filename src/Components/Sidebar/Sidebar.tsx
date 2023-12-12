import React from "react";
import EditMessage from "./EditMessage";

interface SidebarProps {
  isSelected: boolean;
  textRef: React.RefObject<HTMLInputElement | HTMLTextAreaElement>;
  nodeName: string;
  setNodeName: React.Dispatch<React.SetStateAction<string>>;
}

const Sidebar: React.FC<SidebarProps> = ({
  isSelected,
  textRef,
  nodeName,
  setNodeName,
}) => {
  const onDragStart = (
    event: React.DragEvent<HTMLDivElement>,
    nodeType: string,
    content: string
  ): void => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.setData("content", content);
    event.dataTransfer.effectAllowed = "move";
  };

  
  return (
    <>
      <aside>
        {isSelected ? (
          <EditMessage
            textRef={textRef as React.RefObject<HTMLTextAreaElement>}
            nodeName={nodeName}
            setNodeName={setNodeName}
          />
        ) : (
          <div
            className="dndnode input"
            onDragStart={(event) => onDragStart(event, "node", "message")}
            draggable
          >
            Novo Node
          </div>
        )}
      </aside>
    </>
  );
};

export default Sidebar;
