
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import {CssBaseline} from "@mui/material";
import { Provider } from "react-redux";

import { createTheme, ThemeProvider } from "@mui/material";
import { store } from "./redux/store.ts";

const theme = createTheme({
  palette: {
    primary: {
      main: "rgb(0, 118, 139)",
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
 
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <Provider store={store}>
      <App />
      </Provider>
    </ThemeProvider>

);
