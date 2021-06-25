import { Auth } from './component/Auth';
import { Main } from './component/Main';
import { Admin } from './component/Admin';
import { Room } from './component/Room';
import { Header } from './component/Main';
import { Route, Switch } from 'react-router-dom';
import './App.css';

const App = () => {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path="/" component={Main} />
        <Route exact path="/auth" component={Auth} />
        <Route exact path="/admin" component={Admin} />
        <Route exact path="/admin/:id" component={Room} />/
      </Switch>
    </div>
  );
}

export default App;
