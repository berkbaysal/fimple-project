import style from './styles/App.module.css';
import InputForm from './components/InputForm';
import ResultDisplay from './components/ResultDisplay';
import PaymentTable from './components/PaymentTable';
import { useRef, useState } from 'react';
import { Box, Modal } from '@mui/material';
import LocalizationBar from './components/LocalizationBar';
import content from './static/localization';
import { useLocalizationContext } from './context/LocalizationContext';

function App() {
  const [tableVisible, setTableVisible] = useState<boolean>(false);
  const resultDisplayRef = useRef<HTMLDivElement>(null);
  const lang = useLocalizationContext().localization;

  return (
    <>
      <LocalizationBar />
      <div className={style.appContainer}>
        <div className={style.uiWrapper}>
          <div className={style.inputFormWrapper}>
            <InputForm setTableVisible={setTableVisible} ref={resultDisplayRef} />
            <p className={style.infoNote}>* {content[lang].compoundingPeriodFootnote}</p>
          </div>
          <div className={style.resultDisplayWrapper}>
            <ResultDisplay ref={resultDisplayRef} />
          </div>
        </div>
        <Modal open={tableVisible} onClose={() => setTableVisible(false)} sx={{ maxHeight: '100vh' }}>
          <Box className={style.modalBox}>
            <PaymentTable
              headers={[
                content[lang].tableHeaders.installmentNo,
                content[lang].tableHeaders.installmentAmount,
                content[lang].tableHeaders.principalPaid,
                content[lang].tableHeaders.remainingPrincipal,
                content[lang].tableHeaders.paidInterest,
                content[lang].tableHeaders.kkdf,
                content[lang].tableHeaders.bsmv,
              ]}
            />
          </Box>
        </Modal>
      </div>
    </>
  );
}

export default App;
