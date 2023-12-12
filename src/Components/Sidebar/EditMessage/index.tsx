import React from "react";

interface EditMessageProps {
  textRef: React.RefObject<HTMLTextAreaElement>;
  nodeName: string;
  setNodeName: React.Dispatch<React.SetStateAction<string>>;
}

const EditMessage: React.FC<EditMessageProps> = ({
  textRef,
  nodeName,
  setNodeName,
}) => {
  return (
    <>
      <div className="updatenode__controls">
        <label>Editar Nome </label>
        <textarea
          ref={textRef}
          value={nodeName}
          onChange={(evt) => setNodeName(evt.target.value)}
        />

        <label>Editar Valor </label>
        <textarea
          ref={textRef}
          value={nodeName}
          onChange={(evt) => setNodeName(evt.target.value)}
        />

        <label>Editar Tipo </label>
        <textarea
          ref={textRef}
          value={nodeName}
          onChange={(evt) => setNodeName(evt.target.value)}
        />

      </div>
    </>
  );
};

export default EditMessage;
