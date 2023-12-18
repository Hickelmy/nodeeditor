import React from "react";
import EditMessage from "./EditMessage";
import { Avatar, Stack } from "@mui/material";
import "./sidebar.css";

// interface SidebarProps {
//   isSelected: boolean;
//   textRef: React.RefObject<HTMLInputElement | HTMLTextAreaElement>;
//   nodeName: string;
//   setNodeName: React.Dispatch<React.SetStateAction<string>>;
// }

const Sidebar: React.FC<any> = ({
  isSelected,
  textRef,
  nodeName,
  setNodeName,
}) => {
  // const onDragStart = (event :any, nodeType:any, name:any, image:any) => {
  //   event.dataTransfer.setData("application/reactflow", nodeType);
  //   event.dataTransfer.setData("name", name);
  //   event.dataTransfer.setData("image", image);
  //   event.dataTransfer.effectAllowed = "move";
  // };

  const onDragStart = (event: any, nodeType: any, content: any) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.setData("content", content);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <>
      <aside style={{ paddingRight: 35}}>
        {isSelected ? (
          <EditMessage
            textRef={textRef as React.RefObject<HTMLTextAreaElement>}
            nodeName={nodeName}
            setNodeName={setNodeName}
          />
        ) : (
          <>
            <h4>Dados</h4>

            <ul className="category">
              <li data-number="#">
                <div
                  className="dndnode process"
                  onDragStart={(event) => onDragStart(event, "node", "message")}
                  draggable
                >
                  Novo Node
                </div>
              </li>
              <li data-number="#">
                <div
                  className="dndnode input"
                  onDragStart={(event) => onDragStart(event, "inputNode", "A")}
                  draggable
                >
                  <Avatar
                    alt="A"
                    draggable
                    src="https://cdn-icons-png.flaticon.com/512/9558/9558316.png"
                  />
                  INPUT
                </div>
              </li>
              <li data-number="#">
                <div
                  className="dndnode input"
                  onDragStart={(event) => onDragStart(event, "default", "B")}
                  draggable
                >
                  <Avatar
                    alt="B"
                    draggable
                    src="https://cdn-icons-png.flaticon.com/512/2432/2432746.png"
                  />
                  DEFAULT
                </div>
              </li>
              <li data-number="#">
                <div
                  className="dndnode input"
                  onDragStart={(event) => onDragStart(event, "output", "C")}
                  draggable
                >
                  <Avatar
                    alt="C"
                    draggable
                    src="https://cdn-icons-png.flaticon.com/512/9821/9821343.png"
                  />
                  OUTPUT
                </div>
              </li>

              <li data-number="#">
                <div
                  className="dndnode input"
                  onDragStart={(event) => onDragStart(event, "color", "D")}
                  draggable
                >
                  <Avatar
                    alt="C"
                    draggable
                    src="https://cdn-icons-png.flaticon.com/512/5046/5046947.png"
                  />
                  Color
                </div>
              </li>
            </ul>
            
            <h4>Imagens</h4>
            <div className="gallery">
              <img
                src="https://static.vecteezy.com/system/resources/previews/006/852/804/original/abstract-blue-background-simple-design-for-your-website-free-vector.jpg"
                alt=""
              />
              <img
                src="https://images4.newscred.com/Zz1kNmFkYmFmNzhlNGIxMWViYTU1ZDFmYjg0ZWI5MTc4Zg=="
                alt=""
              />
              <img
                src="https://t3.ftcdn.net/jpg/03/44/67/38/360_F_344673825_6fU6IORyipkYpfU1mg2vmxtHxDToUO6Q.jpg"
                alt=""
              />
              <img
                src="https://i.pinimg.com/736x/71/78/80/71788000897dcc9b4129b1e8c4197f8a.jpg"
                alt=""
              />
              <img
                src="https://www.creativefabrica.com/wp-content/uploads/2020/02/04/Purple-Abstract-Webpage-Background-Graphics-1.jpg"
                alt=""
              />
              <img
                src="https://images.saymedia-content.com/.image/t_share/MTc4NzM1OTc4MzE0MzQzOTM1/how-to-create-cool-website-backgrounds-the-ultimate-guide.png"
                alt=""
              />
            </div>

            <h4>Historico</h4>
        <ul className="archive">
            <li>aug 2023</li>
            <li>sept 2023</li>
            <li>nov 2023</li>
            <li>dec 2023</li>
        </ul>
          </>
        )}
      </aside>
    </>
  );
};

export default Sidebar;
