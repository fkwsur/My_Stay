import { Auth } from './component/Auth';
import { Main, DetailRoom } from './component/Main';
import { Admin } from './component/Admin';
import { Room } from './component/Room';
import { CheckIn } from './component/CheckinManage';
import { Reserve } from './component/Reserve';
import { Header } from './component/Main';
import { Route, Switch } from 'react-router-dom';
import './App.css';

const App = () => {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path="/" component={Main} />
        <Route exact path="/:id" component={DetailRoom} />
        <Route exact path="/reserve/:id" component={Reserve} />
        <Route exact path="/auth" component={Auth} />
        <Route exact path="/admin" component={Admin} />
        <Route exact path="/admin/:id" component={Room} />
        <Route exact path="/admin/checkIn/:id" component={CheckIn} />
      </Switch>
    </div>
  );
}

export default App;
