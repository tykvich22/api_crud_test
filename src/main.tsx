import React from 'react';
import ReactDOM from 'react-dom/client';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import { Provider } from 'react-redux';
import store from './redux/store';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { Auth } from './pages/auth';
import { Home } from './pages/home';
import { ErrorPage } from './pages/error';

const theme = createTheme({
	palette: {
		mode: 'light',
		primary: {
			main: '#82b1ff',
		},
		secondary: {
			main: '#ff80ab',
		},
		background: {
			default: '#FAFAFA',
		},
		error: {
			main: '#f44336',
		},
	},
});

const router = createHashRouter([
	{
		path: '/auth',
		element: <Auth />,
	},
	{
		path: '/',
		element: <Home />,
		errorElement: <ErrorPage />,
	},
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<Provider store={store}>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<RouterProvider router={router} />
			</ThemeProvider>
		</Provider>
	</React.StrictMode>
);
