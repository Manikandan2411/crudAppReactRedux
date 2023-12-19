
import { Form } from 'antd';
import './App.css';
import Home from './Home';

function App() {
  const [form] = Form.useForm();
  return (
    <div className="App">
     <Home form={form}/>
    </div>
  );
}

export default App;
