import style from './styles/App.module.css';
import InputForm from './components/InputForm';

function App() {
  return (
    <div className={style.appContainer}>
      <InputForm />
    </div>
  );
}

export default App;
