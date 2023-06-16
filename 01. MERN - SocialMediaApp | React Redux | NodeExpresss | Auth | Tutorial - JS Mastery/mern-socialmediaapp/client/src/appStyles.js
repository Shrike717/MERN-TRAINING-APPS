import { createTheme } from "@mui/material/styles";

export const themeApp = createTheme({
	breakpoints: {
		values: {
			laptop: 1024,
			tablet: 870,
			mobile: 0,
			desktop: 1280,
		},
	},
});
