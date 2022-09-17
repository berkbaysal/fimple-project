import style from './styles/App.module.css';
import InputForm from './components/InputForm';
import ResultDisplay from './components/ResultDisplay';
import PaymentTable from './components/PaymentTable';
import { useRef, useState } from 'react';
import { Box, Modal } from '@mui/material';

function App() {
  const [tableVisible, setTableVisible] = useState<boolean>(false);
  const resultDisplayRef = useRef(null);

  return (
    <div className={style.appContainer}>
      <div className={style.uiWrapper}>
        <div className={style.inputFormWrapper}>
          <InputForm setTableVisible={setTableVisible} ref={resultDisplayRef} />
          <p className={style.infoNote}>* Faiz uygulama aralığı ödeme aralığından farklı ise bu alanları kullanın.</p>
        </div>
        <div className={style.resultDisplayWrapper}>
          <ResultDisplay ref={resultDisplayRef} />
        </div>
      </div>
      <Modal open={tableVisible} onClose={() => setTableVisible(false)} sx={{ maxHeight: '100vh' }}>
        <Box className={style.modalBox}>
          <PaymentTable headers={['Taksit No', 'Taksit Tutarı', 'Ödenen Ana Para', 'Kalan Ana Para', 'Ödenen Faiz', 'KKDF', 'BSMV']} />
        </Box>
      </Modal>
    </div>
  );
}

export default App;
