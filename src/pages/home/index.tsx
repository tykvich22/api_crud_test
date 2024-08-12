import {
	Alert,
	Avatar,
	Backdrop,
	Box,
	Button,
	CircularProgress,
	Container,
	Grow,
	Typography,
} from '@mui/material';
import { DocumentWorkspaceComponent } from '../../components/documentWorkspaceComponent';
import { DocumentsComponent } from '../../components/documentsComponent';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/reducers';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import { logout } from '../../redux/actions/authActions';
import { AppDispatch } from '../../redux/store';

export const Home: React.FC = () => {
	const { username, token } = useSelector((state: RootState) => state.auth);
	const { error, loading } = useSelector((state: RootState) => state.documents);
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();
	const [isError, setIsError] = React.useState(false);

	React.useEffect(() => {
		if (!username || !token) {
			navigate('/auth');
		}
	}, []);

	React.useEffect(() => {
		if (error) {
			setIsError(true);

			const timer = setTimeout(() => {
				setIsError(false);
			}, 2500);

			return () => clearTimeout(timer);
		}
	}, [error]);

	const handleLogout = () => {
		localStorage.removeItem('user');
		dispatch(logout());
		navigate('/auth');
	};

	return (
		<>
			<Backdrop
				sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
				open={loading}
			>
				<CircularProgress color="secondary" size={50} />
			</Backdrop>
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
					{error}
				</Alert>
			</Grow>
			<Container component="main" maxWidth="lg">
				<Box
					sx={{
						textAlign: 'center',
					}}
				>
					<Box
						component="header"
						sx={{
							minHeight: '65px',
							p: '5px',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'end',
							borderBottom: '2px solid',
							borderColor: 'secondary.light',
							m: '8px 0',
						}}
					>
						<Avatar
							alt="user"
							src={`/api_crud_test/assets/images/${
								Math.floor(Math.random() * 3) + 1
							}.webp`}
							sx={{
								width: 56,
								height: 56,
								m: 1,
								'@media (max-width: 599px)': {
									width: 36,
									height: 36,
								},
							}}
						/>
						<Typography
							sx={{
								'@media (max-width: 599px)': {
									fontSize: 12,
								},
							}}
						>
							{username}
						</Typography>

						<Button
							sx={{
								'@media (max-width: 599px)': {
									fontSize: 10,
								},
							}}
							size="small"
							color="secondary"
							onClick={handleLogout}
						>
							Выход
						</Button>
					</Box>

					<Box
						sx={{
							display: 'flex',
							justifyContent: 'space-between',
						}}
					>
						<DocumentsComponent />
						<DocumentWorkspaceComponent />
					</Box>
				</Box>
			</Container>
		</>
	);
};
