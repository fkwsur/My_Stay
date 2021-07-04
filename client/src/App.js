import { Auth } from './component/Auth';
import { Main, DetailRoom } from './component/Main';
import { Admin } from './component/Admin';
import { Room } from './component/Room';
import { CheckIn } from './component/CheckinManage';
import { Reserve } from './component/Reserve';
import { MyPage } from './component/MyPage';
import { Header } from './component/Main';
import { Chatting } from './component/Chatting';
import { Route, Switch } from 'react-router-dom';
import './App.css';

const App = () => {
  return (
    <div className="App">
      <Header />
     
      <div className="wrap">
      <Switch>
        <Route exact path="/main" component={Main} />
        <Route exact path="/main/:id" component={DetailRoom} />
        <Route exact path="/main/reserve/:id" component={Reserve} />
        <Route exact path="/auth" component={Auth} />
        <Route exact path="/admin" component={Admin} />
        <Route exact path="/MyPage" component={MyPage} />
        <Route exact path="/admin/:id" component={Room} />
        <Route exact path="/admin/checkIn/:id" component={CheckIn} />
      </Switch>
      <Chatting />
      </div>
    </div>
  );
}

export default App;
