import { Box, Typography } from '@mui/material';
import React from 'react';
import { DocumentComponent } from '../documentComponent';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { RootState } from '../../redux/reducers';
import { fetchDocumentsRequest } from '../../redux/actions/documentsActions';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export const DocumentsComponent: React.FC = () => {
	const dispatch = useDispatch<AppDispatch>();
	const { documents, error } = useSelector(
		(state: RootState) => state.documents
	);

	React.useEffect(() => {
		dispatch(fetchDocumentsRequest());
	}, [dispatch]);

	return (
		<Box
			sx={{
				p: '5px',
				backgroundColor: '#F5F5F5',
				flex: 1,
				height: '100%',
				marginRight: '8px',
				borderRadius: 2,
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
			}}
		>
			{error || !documents ? (
				<Typography
					sx={{
						fontSize: 12,
					}}
					variant="body2"
					gutterBottom
					color="error"
				>
					Ошибка! Перезагрузите страницу
				</Typography>
			) : documents.length < 1 ? (
				<Box
					display="flex"
					sx={{
						p: 1,
					}}
				>
					<Typography
						sx={{
							fontSize: 16,
						}}
						variant="body2"
						gutterBottom
						color="secondary"
					>
						Создайте свой первый документ!
					</Typography>
					<ArrowForwardIcon sx={{ marginLeft: '5px' }} color="secondary" />
				</Box>
			) : (
				documents.map((document) => (
					<DocumentComponent
						key={document.id}
						id={document.id}
						documentStatus={document.documentStatus}
						employeeNumber={document.employeeNumber}
						documentType={document.documentType}
						documentName={document.documentName}
						companySignatureName={document.companySignatureName}
						employeeSignatureName={document.employeeSignatureName}
						employeeSigDate={document.employeeSigDate}
						companySigDate={document.companySigDate}
					/>
				))
			)}
		</Box>
	);
};
