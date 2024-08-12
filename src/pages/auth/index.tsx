import {
	Alert,
	Box,
	Button,
	CircularProgress,
	Container,
	Grow,
	TextField,
	Typography,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { loginRequest } from '../../redux/actions/authActions';

import { AppDispatch } from '../../redux/store';
import { RootState } from '../../redux/reducers';
import { useNavigate } from 'react-router-dom';
import React from 'react';

type FormValue = {
	username: string;
	password: string;
};

export const Auth: React.FC = () => {
	const dispatch = useDispatch<AppDispatch>();
	const authState = useSelector((state: RootState) => state.auth);
	const { username, token, loading, error } = authState;
	const navigate = useNavigate();
	const [isError, setIsError] = React.useState(false);

	React.useEffect(() => {
		if (username && token) {
			navigate('/');
		}
	}, [username, token]);

	React.useEffect(() => {
		if (error) {
			setIsError(true);

			const timer = setTimeout(() => {
				setIsError(false);
			}, 2500);

			return () => clearTimeout(timer);
		}
	}, [error]);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormValue>({
		defaultValues: {
			username: '',
			password: '',
		},
	});

	const onSubmit = (data: FormValue) => {
		const { username, password } = data;
		dispatch(loginRequest(username, password));
	};
	return (
		<>
			<Grow in={isError} timeout={500}>
				<Alert
					severity="error"
					sx={{
						position: 'absolute',
						width: '100%',
						zIndex: -1,
						top: 0,
					}}
				>
					{error === 'Access deny' ? 'Неправильный логин или пароль' : error}
				</Alert>
			</Grow>

			<Container component="main" maxWidth="xs">
				<Box
					sx={{
						marginTop: 8,
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						textAlign: 'center',
					}}
				>
					<Typography component="h1" variant="h5">
						Вход
					</Typography>
					<Box
						color="secondary"
						component="form"
						onSubmit={handleSubmit(onSubmit)}
						noValidate
						sx={{ mt: 1 }}
					>
						<TextField
							disabled={loading}
							color="secondary"
							size="medium"
							margin="normal"
							fullWidth
							id="name"
							label="Имя"
							type="text"
							autoFocus
							{...register('username', { required: 'Имя обязательно' })}
							error={!!errors.username}
							helperText={errors.username ? 'Введите имя пользователя!' : ''}
						/>
						<TextField
							disabled={loading}
							color="secondary"
							size="medium"
							margin="normal"
							fullWidth
							id="password"
							label="Пароль"
							type="password"
							error={!!errors.password}
							helperText={errors.password ? 'Введите пароль!' : ''}
							{...register('password', { required: 'Пароль обязателен' })}
						/>

						{loading ? (
							<CircularProgress color="secondary" size={30} />
						) : (
							<Button
								color="secondary"
								size="large"
								type="submit"
								variant="contained"
								sx={{ mt: 1, mb: 2, borderRadius: 2 }}
							>
								Войти
							</Button>
						)}
					</Box>
				</Box>
			</Container>
		</>
	);
};
