import style from './styles/App.module.css';
import InputForm from './components/InputForm';
import ResultDisplay from './components/ResultDisplay';
import PaymentTable from './components/PaymentTable';
import { useState } from 'react';
import { Box, Modal } from '@mui/material';

function App() {
  const [tableVisible, setTableVisible] = useState<boolean>(false);

  const boxStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    borderRadius: '2rem',
    boxShadow: 24,
    overflow: 'hidden',
    minWidth: '50%',
    height: 'min(800px,80vh)',
    paddingBottom: '2rem',
    px: 1,
  };

  return (
    <div className={style.appContainer}>
      <div className={style.uiWrapper}>
        <div className={style.inputFormWrapper}>
          <InputForm setTableVisible={setTableVisible} />
          <p className={style.infoNote}>* Faiz uygulama aralığı ödeme aralığından farklı ise bu alanları kullanın.</p>
        </div>
        <div className={style.resultDisplayWrapper}>
          <ResultDisplay />
        </div>
      </div>
      <Modal open={tableVisible} onClose={() => setTableVisible(false)} sx={{ maxHeight: '100vh' }}>
        <Box sx={{ ...boxStyle }}>
          <PaymentTable headers={['Taksit No', 'Taksit Tutarı', 'Ödenen Ana Para', 'Kalan Ana Para', 'Ödenen Faiz', 'KKDF', 'BSMV']} />
        </Box>
      </Modal>
    </div>
  );
}

export default App;
