import React, { useState } from "react";
import styled from "styled-components";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextareaAutosize,
  Box,
  Container,
  Paper,
  SelectChangeEvent,
  TextField,
} from "@mui/material";

const StyledContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
`;

const StyledPaper = styled(Paper)`
  width: 100%;
  max-width: 400px;
  padding: 16px; /* Adicionei padding para manter um espaçamento interno consistente */
`;

const EditLabel = styled(InputLabel)`
  margin-top: 12px; /* Ajustei o espaçamento para manter a estética */
`;

const EditTextarea = styled(TextareaAutosize)`
  width: 100%;
`;

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
  const [selectedOption, setSelectedOption] = useState<string>("");

  const handleOptionChange = (event: SelectChangeEvent) => {
    setSelectedOption(event.target.value as string);
  };

  const renderForm = () => {
    switch (selectedOption) {
      case "1":
        return (
          <div>
            <TextField
              id="outlined-basic"
              label="Outlined"
              variant="outlined"
            />
            <TextField id="filled-basic" label="Filled" variant="filled" />
            <TextField
              id="standard-basic"
              label="Standard"
              variant="standard"
            />
          </div>
        );
      case "2":
        return (
          <div>
            <EditLabel>Detalhes da Máquina:</EditLabel>
          </div>
        );
      case "3":
        return (
          <div>
            <EditLabel>Detalhes do Grupo:</EditLabel>
          </div>
        );
      default:
        return null;
    }
  };

  return (

    <div className="updatenode__controls">
    <label>Editar Nome </label>
    <textarea
      ref={textRef}
      value={nodeName}
      onChange={(evt) => setNodeName(evt.target.value)}
    />
  </div>


    // <div className="updatenode__controls">
    //   <StyledContainer>
    //     <StyledPaper>

    //       <Box mt={2}>
    //         <EditLabel>Editar Nome:</EditLabel>
    //         <EditTextarea
    //           ref={textRef}
    //           value={nodeName}
    //           onChange={(evt) => setNodeName(evt.target.value)}
    //           minRows={3}
    //         />
    //       </Box>

    //         <InputLabel>Selecionar opção:</InputLabel>
    //         <Select
    //           value={selectedOption}
    //           onChange={handleOptionChange}
    //           label="Selecionar opção"
    //         >
    //           <MenuItem value="">Selecione...</MenuItem>
    //           <MenuItem value="1">Processo</MenuItem>
    //           <MenuItem value="2">Máquinas</MenuItem>
    //           <MenuItem value="3">Grupos</MenuItem>
    //         </Select>

        

    //       <Box mt={2}>{renderForm()}</Box>
    //     </StyledPaper>
    //   </StyledContainer>
    // </div>
  );
};

export default EditMessage;
