import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import "antd/dist/antd.css";
import { BrowserRouter as Router } from "react-router-dom";

import App from "./App";
import rootReducer from "./store";

const store = createStore(rootReducer, applyMiddleware(thunk));// Redux store oluşturuluyor

// Redux store'u, React uygulamasına entegre etmek için Provider kullanılıyor
ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);
