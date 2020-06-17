import React from 'react';

export const InstructionContentField = ({ record = {} }) => <div dangerouslySetInnerHTML={{ __html: record['content']}} />
