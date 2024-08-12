import {
	Box,
	Button,
	Grid,
	TextField,
	Typography,
	useTheme,
} from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';
import { DateFieldComponent } from '../dateFieldComponent';
import dayjs, { Dayjs } from 'dayjs';
import DoneIcon from '@mui/icons-material/Done';
import {
	addDocumentRequest,
	Document,
	editDocumentRequest,
} from '../../redux/actions/documentsActions';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/reducers';
import { AppDispatch } from '../../redux/store';

export const CurrentDocumentComponent: React.FC = () => {
	const theme = useTheme();
	const { currentDocument } = useSelector(
		(state: RootState) => state.documents
	);
	const dispatch = useDispatch<AppDispatch>();

	const [sigDate, setSigDate] = React.useState({
		employeeSigDate: currentDocument
			? dayjs(currentDocument.employeeSigDate)
			: dayjs(),
		companySigDate: currentDocument
			? dayjs(currentDocument.companySigDate)
			: dayjs(),
	});

	const [validateSigDate, setValidateSigDate] = React.useState({
		companySigDate: false,
		employeeSigDate: false,
	});

	const handleChange = (field: string, value: any) => {
		setSigDate((prevData) => ({
			...prevData,
			[field]: value,
		}));
	};

	const handleSigValidate = (field: string, value: Dayjs | null) => {
		const isFuture = dayjs().isBefore(dayjs(value));
		const isValid = dayjs(value).isValid();
		const isTooOld = dayjs(value).isBefore(dayjs('1900-01-01'));

		const isValidate = !isFuture && isValid && !isTooOld;

		setValidateSigDate((prevData) => ({
			...prevData,
			[field]: !isValidate,
		}));

		handleChange(field, value);
	};

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<Document>({
		defaultValues: {
			documentName: currentDocument ? currentDocument.documentName : '',
			documentType: currentDocument ? currentDocument.documentType : '',
			documentStatus: currentDocument ? currentDocument.documentStatus : '',
			employeeNumber: currentDocument ? currentDocument.employeeNumber : '',
			companySignatureName: currentDocument
				? currentDocument.companySignatureName
				: '',
			employeeSignatureName: currentDocument
				? currentDocument.employeeSignatureName
				: '',
		},
	});

	React.useEffect(() => {
		if (currentDocument) {
			reset({
				documentName: currentDocument.documentName,
				documentType: currentDocument.documentType,
				documentStatus: currentDocument.documentStatus,
				employeeNumber: currentDocument.employeeNumber,
				companySignatureName: currentDocument.companySignatureName,
				employeeSignatureName: currentDocument.employeeSignatureName,
			});
		} else {
			reset({
				documentName: '',
				documentType: '',
				documentStatus: '',
				employeeNumber: '',
				companySignatureName: '',
				employeeSignatureName: '',
			});
		}
	}, [currentDocument, reset]);

	React.useEffect(() => {
		if (currentDocument) {
			setSigDate({
				employeeSigDate: dayjs(currentDocument.employeeSigDate),
				companySigDate: dayjs(currentDocument.companySigDate),
			});
		} else {
			setSigDate({
				employeeSigDate: dayjs(),
				companySigDate: dayjs(),
			});
		}
	}, [currentDocument]);

	const onSubmit = (data: Document) => {
		const document = {
			...data,
			companySigDate: sigDate.companySigDate.toISOString(),
			employeeSigDate: sigDate.employeeSigDate.toISOString(),
		};
		console.log(document);

		if (currentDocument) {
			dispatch(editDocumentRequest(currentDocument.id, document));
		} else {
			dispatch(addDocumentRequest(document));
		}
	};

	return (
		<Box
			sx={{
				marginTop: '10px',
				backgroundColor: '#FFFFFF',
				borderBottomRightRadius: 8,
				borderBottomLeftRadius: 8,
				textAlign: 'start',
				paddingBottom: '20px',
			}}
		>
			<Box
				component="form"
				onSubmit={handleSubmit(onSubmit)}
				noValidate
				sx={{ p: '1px 25px' }}
			>
				<Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
					<Grid item xs={6}>
						<Box
							sx={{
								display: 'flex',
								flexDirection: 'column',
								marginTop: '15px',
							}}
						>
							<TextField
								variant="standard"
								size="small"
								sx={{ width: '75%' }}
								id="documentName"
								type="text"
								{...register('documentName', {
									required: 'Наименование обязательно',
								})}
								error={!!errors.documentName}
							/>
							<Typography
								sx={{
									fontSize: 11,
									color: errors.documentName ? theme.palette.error.main : '',
								}}
								variant="body2"
								gutterBottom
							>
								имя документа:
							</Typography>
						</Box>
					</Grid>
					<Grid item xs={6}>
						<Box
							sx={{
								display: 'flex',
								flexDirection: 'column',
								marginTop: '15px',
							}}
						>
							<TextField
								variant="standard"
								size="small"
								sx={{ width: '75%' }}
								id="documentType"
								type="text"
								{...register('documentType', {
									required: 'Тип обязателен',
								})}
								error={!!errors.documentType}
							/>
							<Typography
								sx={{
									fontSize: 11,
									color: errors.documentType ? theme.palette.error.main : '',
								}}
								variant="body2"
								gutterBottom
							>
								тип документа:
							</Typography>
						</Box>
					</Grid>
					<Grid item xs={6}>
						<Box sx={{ display: 'flex', flexDirection: 'column' }}>
							<TextField
								variant="standard"
								size="small"
								sx={{ width: '75%' }}
								id="documentStatus"
								type="text"
								{...register('documentStatus', {
									required: 'Статус обязателен',
								})}
								error={!!errors.documentStatus}
							/>
							<Typography
								sx={{
									fontSize: 11,
									color: errors.documentStatus ? theme.palette.error.main : '',
								}}
								variant="body2"
								gutterBottom
							>
								статус документа:
							</Typography>
						</Box>
					</Grid>
					<Grid item xs={6}>
						<Box sx={{ display: 'flex', flexDirection: 'column' }}>
							<TextField
								variant="standard"
								size="small"
								sx={{ width: '75%' }}
								id="employeeNumber"
								type="text"
								{...register('employeeNumber', {
									required: 'Номер обязателен',
								})}
								error={!!errors.employeeNumber}
							/>
							<Typography
								sx={{
									fontSize: 11,
									color: errors.employeeNumber ? theme.palette.error.main : '',
								}}
								variant="body2"
								gutterBottom
							>
								номер документа:
							</Typography>
						</Box>
					</Grid>
					<Grid item xs={6}>
						<Box sx={{ display: 'flex', flexDirection: 'column' }}>
							<TextField
								variant="standard"
								size="small"
								sx={{ width: '75%' }}
								id="companySignatureName"
								type="text"
								{...register('companySignatureName', {
									required: 'Подпись обязательна',
								})}
								error={!!errors.companySignatureName}
							/>
							<Typography
								sx={{
									fontSize: 11,
									color: errors.companySignatureName
										? theme.palette.error.main
										: '',
								}}
								variant="body2"
								gutterBottom
							>
								подпись компании:
							</Typography>
						</Box>
					</Grid>
					<Grid item xs={6}>
						<Box sx={{ display: 'flex', flexDirection: 'column' }}>
							<TextField
								variant="standard"
								size="small"
								sx={{ width: '75%' }}
								id="employeeSignatureName"
								type="text"
								{...register('employeeSignatureName', {
									required: 'Подпись обязательна',
								})}
								error={!!errors.employeeSignatureName}
							/>
							<Typography
								sx={{
									fontSize: 11,
									color: errors.employeeSignatureName
										? theme.palette.error.main
										: '',
								}}
								variant="body2"
								gutterBottom
							>
								подпись сотрудника:
							</Typography>
						</Box>
					</Grid>
					<Grid item xs={6}>
						<Box
							sx={{
								display: 'flex',
								flexDirection: 'column',
								'& .MuiStack-root': {
									overflow: 'hidden',
								},
							}}
						>
							<DateFieldComponent
								sigValue={sigDate.companySigDate}
								setSigValue={(newValue) =>
									handleSigValidate('companySigDate', newValue)
								}
								validateSigDate={validateSigDate.companySigDate}
								label="Подпись компании"
							/>

							<Typography
								sx={{
									fontSize: 11,
								}}
								variant="body2"
								gutterBottom
							>
								дата подписи компании:
							</Typography>
						</Box>
					</Grid>
					<Grid item xs={6}>
						<Box
							sx={{
								display: 'flex',
								flexDirection: 'column',
								'& .MuiStack-root': {
									overflow: 'hidden',
								},
							}}
						>
							<DateFieldComponent
								sigValue={sigDate.employeeSigDate}
								setSigValue={(newValue) =>
									handleSigValidate('employeeSigDate', newValue)
								}
								validateSigDate={validateSigDate.employeeSigDate}
								label="Подпись сотрудника"
							/>
							<Typography
								sx={{
									fontSize: 11,
								}}
								variant="body2"
								gutterBottom
							>
								дата подписи сотрудника:
							</Typography>
						</Box>
					</Grid>
					<Box
						sx={{
							display: 'flex',
							m: '15px 0 0 15px',
							'@media (max-width: 599px)': {
								m: '15px 0 0 0',
							},
						}}
					>
						{' '}
						{currentDocument ? (
							<Button
								disabled={
									validateSigDate.companySigDate ||
									validateSigDate.employeeSigDate
								}
								type="submit"
								sx={{
									fontSize: 13,
									'@media (max-width: 599px)': {
										fontSize: 9,
									},
								}}
							>
								<DoneIcon fontSize="small" />
								сохранить изменения
							</Button>
						) : (
							<Button
								disabled={
									validateSigDate.companySigDate ||
									validateSigDate.employeeSigDate
								}
								type="submit"
								sx={{
									fontSize: 13,
									'@media (max-width: 599px)': {
										fontSize: 9,
									},
								}}
							>
								<DoneIcon fontSize="small" />
								новый документ
							</Button>
						)}
					</Box>
				</Grid>
			</Box>
		</Box>
	);
};
