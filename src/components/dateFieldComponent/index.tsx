import React from 'react';

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateField } from '@mui/x-date-pickers/DateField';
import { Dayjs } from 'dayjs';
import 'dayjs/locale/ru';

type Props = {
	sigValue: Dayjs | null;
	setSigValue: (newValue: Dayjs | null) => void;
	label: string;
	validateSigDate: boolean;
};

export const DateFieldComponent: React.FC<Props> = ({
	sigValue,
	setSigValue,
	label,
	validateSigDate,
}) => {
	return (
		<LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru">
			<DemoContainer components={['DateField', 'DateField']}>
				<DateField
					label={label}
					value={sigValue}
					onChange={setSigValue}
					fullWidth={true}
					slotProps={{
						textField: {
							error: validateSigDate,
							helperText: validateSigDate ? 'ошибка в дате' : '',
							sx: {
								'& .MuiInputBase-root': {
									fontSize: 11,

									width: '180px',
									'@media (max-width: 599px)': {
										width: '90px',
									},
								},
								'& .MuiInputLabel-root': {
									fontSize: 11,
								},
							},
						},
					}}
				/>
			</DemoContainer>
		</LocalizationProvider>
	);
};
