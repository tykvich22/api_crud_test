import { Box } from '@mui/material';
import React from 'react';
import { NewDocumentButton } from '../newDocumentButton';
import { CurrentDocumentComponent } from '../currentDocumentComponent';

export const DocumentWorkspaceComponent: React.FC = () => {
	return (
		<Box
			sx={{
				backgroundColor: '#F5F5F5',
				flex: 1,
				marginLeft: '8px',
				borderRadius: 2,
			}}
		>
			<NewDocumentButton />
			<CurrentDocumentComponent />
		</Box>
	);
};
