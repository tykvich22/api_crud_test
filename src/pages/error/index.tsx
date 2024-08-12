import { Box, Container, Typography } from '@mui/material';
import React from 'react';

export const ErrorPage: React.FC = () => {
	return (
		<Container component="main" maxWidth="lg">
			<Box
				sx={{
					textAlign: 'center',

					height: '100vh',
				}}
			>
				<Typography
					fontSize={100}
					component="h1"
					variant="h1"
					color="secondary"
					marginTop={10}
				>
					404
				</Typography>
			</Box>
		</Container>
	);
};
