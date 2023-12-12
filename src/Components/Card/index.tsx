import { Card, CardContent, Typography } from '@mui/material';
import React from 'react';

const AbstractComponent = (props : any) => {
  return (
    <Card elevation={4}>
      <CardContent>
        <Typography variant="h5" component="div">
          {props.title}
        </Typography>
        {props.children}
      </CardContent>
    </Card>
  );
};

export default AbstractComponent;
