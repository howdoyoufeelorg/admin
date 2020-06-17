import React from 'react';
import Chip from '@material-ui/core/Chip';

export const InstructionContentField = ({ record = {} }) => <Chip label={record['language'].toUpperCase() + " => "+ record['content']} />;
