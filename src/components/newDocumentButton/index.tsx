import { Box, Button } from '@mui/material';
import React from 'react';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { setCurrentDocument } from '../../redux/actions/documentsActions';

export const NewDocumentButton: React.FC = () => {
	const dispatch = useDispatch<AppDispatch>();
	const handleSetCurrentDocument = () => {
		dispatch(setCurrentDocument(null));
	};
	return (
		<Box
			sx={{
				p: 1,
				backgroundColor: '#FFFFFF',
				borderTopRightRadius: 8,
				borderTopLeftRadius: 8,
				textAlign: 'start',
			}}
		>
			<Box sx={{ display: 'flex' }}>
				<Button
					onClick={handleSetCurrentDocument}
					sx={{
						fontSize: 13,
						'@media (max-width: 599px)': {
							fontSize: 9,
						},
					}}
				>
					<AddBoxIcon fontSize="small" />
					новый документ
				</Button>
			</Box>
		</Box>
	);
};
