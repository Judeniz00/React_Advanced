import { Route } from "react-router-dom";
import { Layout } from "antd";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import PrivateRoute from "./components/PrivateRoute";
import Categories from "./components/Categories";
import Records from "./components/Records";
import AppHeader from "./components/AppHeader";
import Logout from "./components/Logout";
import OyunTahtasi from "./components/xox";

const { Content, Footer } = Layout;

function App() {
  return (
    <Layout>
      <AppHeader />
      <Content className="site-layout" style={{ padding: "50px", marginTop: 64 }}>
        <Route path="/register" component={SignUp} />
        <Route path="/login" component={Login} />
        <PrivateRoute path="/categories" component={Categories} />
        <PrivateRoute path="/records" component={Records} />
        <Route path="/logout" component={Logout} />
        {/* OyunTahtasi'nı burada görüntüleme */}
        <OyunTahtasi />
      </Content>
      <Footer style={{ textAlign: "center" }}> 
      </Footer>
    </Layout>
  );
}

export default App;
