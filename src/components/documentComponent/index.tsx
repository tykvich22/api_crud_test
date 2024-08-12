import { Box, Grid, IconButton, Tooltip, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Grow from '@mui/material/Grow';
import React from 'react';
import dayjs from 'dayjs';
import {
	deleteDocumentRequest,
	Document,
	setCurrentDocument,
} from '../../redux/actions/documentsActions';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';

export const DocumentComponent: React.FC<Document> = ({
	id,
	documentStatus,
	employeeNumber,
	documentType,
	documentName,
	companySignatureName,
	employeeSignatureName,
	employeeSigDate,
	companySigDate,
}) => {
	const dispatch = useDispatch<AppDispatch>();
	const [isHovered, setIsHovered] = React.useState(false);

	const handleMouseEnter = () => {
		setIsHovered(true);
	};

	const handleMouseLeave = () => {
		setIsHovered(false);
	};

	const handleDeleteDocument = (id: string | undefined) => {
		if (id) {
			dispatch(deleteDocumentRequest(id));
		}
	};

	const handleSelectDocument = (document: Document) => {
		dispatch(setCurrentDocument(document));
	};

	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'space-between',
				backgroundColor: '#FFFFFF',
				borderRadius: 4,
				width: '75%',
				minHeight: '150px',
				m: '12px',
				border: '1px solid #F5F5F5',
				pt: '20px',
				position: 'relative',
				'@media (max-width: 599px)': {
					minHeight: '50px',
					pt: '15px',
				},
			}}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
		>
			<Grow in={isHovered} timeout={500}>
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						position: 'absolute',
						left: -40,
						top: 40,
						'@media (max-width: 599px)': {
							left: -30,
							top: 0,
						},
					}}
				>
					<IconButton
						onClick={() =>
							handleSelectDocument({
								id,
								documentStatus,
								employeeNumber,
								documentType,
								documentName,
								companySignatureName,
								employeeSignatureName,
								employeeSigDate,
								companySigDate,
							})
						}
					>
						<EditIcon sx={{ fontSize: 'small' }} />
					</IconButton>
					<IconButton onClick={() => handleDeleteDocument(id)}>
						<DeleteIcon sx={{ fontSize: 'small' }} />
					</IconButton>
				</Box>
			</Grow>
			<Box
				sx={{
					fontSize: 10,
					display: {
						xs: 'block',
						sm: 'none',
					},
				}}
			>
				{documentName}
			</Box>

			<Grid container spacing="1px">
				<Grid item xs={6}>
					<Typography
						sx={{
							fontSize: 14,
							display: {
								xs: 'none',
								sm: 'block',
							},
						}}
						variant="subtitle2"
						gutterBottom
					>
						{documentName}
					</Typography>
				</Grid>
				<Grid item xs={6}>
					<Typography
						variant="body2"
						gutterBottom
						sx={{
							color: 'secondary.light',
							display: {
								xs: 'none',
								sm: 'block',
							},
						}}
					>
						{documentStatus}
					</Typography>
				</Grid>
				<Grid item xs={6}>
					<Tooltip title="Тип документа" placement="top-start">
						<Typography
							sx={{
								fontSize: 12,
								display: {
									xs: 'none',
									sm: 'block',
								},
							}}
							variant="body2"
							gutterBottom
						>
							{documentType}
						</Typography>
					</Tooltip>
				</Grid>

				<Grid item xs={6}>
					<Tooltip title="Номер сотрудника" placement="top-start">
						<Typography
							sx={{
								fontSize: 12,
								display: {
									xs: 'none',
									sm: 'block',
								},
							}}
							variant="body2"
							gutterBottom
						>
							{employeeNumber}
						</Typography>
					</Tooltip>
				</Grid>
			</Grid>
			<Grid container rowSpacing={0} sx={{ color: '#c5c7cd' }}>
				<Grid item xs={6}>
					<Typography
						sx={{
							fontSize: 10,
							display: {
								xs: 'none',
								sm: 'block',
							},
						}}
						variant="body2"
					>
						подпись компании
					</Typography>
					<Typography
						sx={{
							fontSize: 10,
							display: {
								xs: 'none',
								sm: 'block',
							},
						}}
						variant="body2"
						gutterBottom
					>
						{companySignatureName}
					</Typography>
				</Grid>
				<Grid item xs={6}>
					<Typography
						sx={{
							fontSize: 10,
							display: {
								xs: 'none',
								sm: 'block',
							},
						}}
						variant="body2"
					>
						подпись сотрудника
					</Typography>
					<Typography
						sx={{
							fontSize: 10,
							display: {
								xs: 'none',
								sm: 'block',
							},
						}}
						variant="body2"
						gutterBottom
					>
						{employeeSignatureName}
					</Typography>
				</Grid>
				<Grid item xs={6}>
					<Typography
						sx={{
							fontSize: 10,
							display: {
								xs: 'none',
								sm: 'block',
							},
						}}
						variant="body2"
						gutterBottom
					>
						{dayjs(companySigDate).format('DD/MM/YYYY')}
					</Typography>
				</Grid>
				<Grid item xs={6}>
					<Typography
						sx={{
							fontSize: 10,
							display: {
								xs: 'none',
								sm: 'block',
							},
						}}
						variant="body2"
						gutterBottom
					>
						{dayjs(employeeSigDate).format('DD/MM/YYYY')}
					</Typography>
				</Grid>
			</Grid>
		</Box>
	);
};
