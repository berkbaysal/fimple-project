import style from './styles/App.module.css';
import InputForm from './components/InputForm';
import ResultDisplay from './components/ResultDisplay';
import PaymentTable from './components/PaymentTable';
import { useState } from 'react';
import { Box, Modal } from '@mui/material';

function App() {
  const [tableVisible, setTableVisible] = useState<boolean>(true);

  const modalStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    width: '50%',
    minWidth: '500px',
    maxHeight: '90%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    borderRadius: '2rem',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };

  return (
    <div className={style.appContainer}>
      <div className={style.uiWrapper}>
        <div className={style.inputFormWrapper}>
          <InputForm setTableVisible={setTableVisible} />
        </div>
        <div className={style.resultDisplayWrapper}>
          <ResultDisplay />
        </div>
      </div>
      <Modal open={tableVisible} onClose={() => setTableVisible(false)}>
        <Box sx={{ ...modalStyle }}>
          <PaymentTable headers={['Taksit No', 'Taksit Tutarı', 'Ödenen Ana Para', 'Kalan Ana Para', 'Ödenen Faiz', 'KKDF', 'BSMV']} />
        </Box>
      </Modal>
    </div>
  );
}

export default App;
