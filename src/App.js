import "./styles.css";
import "./authorizations";
import { isAuthorized } from "./authorizations";

const props = {
  user: {
    id: "pepe",
    session: "123456qwerty",
    roles: ["pepa"],
    scopes: ["pepe"]
  },
  collapsible: false,
  collapsed: false,
  onChange: () => {},
  className: "lala_class",
  children: <strong>lala</strong>
};

const { session, ...user } = props.user;
//const user = {
//  roles: ["pepa"],
//  scopes: ["pepe"]
//};

const config = {
  roles: ["pepe"],
  scopes: ["pepe"]
};

export default function App() {
  const isAuth = isAuthorized(user, config);

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <br />
      <h2>{isAuth.toString()}</h2>
      <h3>{JSON.stringify(user)}</h3>
    </div>
  );
}
