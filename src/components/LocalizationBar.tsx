import style from '../styles/Localization.module.css';
import { useLocalizationContext } from '../context/LocalizationContext';
import content from '../static/localization';

const LocalizationBar = () => {
  const localizationContext = useLocalizationContext();

  function constructAvailableLocalizations() {
    let availableLocalizations: JSX.Element[] = [];
    for (const [key, value] of Object.entries(content)) {
      availableLocalizations.push(
        <div
          className={`${style.localizationOption} ${localizationContext.localization === key ? style.selected : ''}`}
          onClick={() => {
            if (localizationContext.localization !== key) localizationContext.updateLocalization(key);
          }}
        >
          {value.language}
        </div>
      );
    }
    return availableLocalizations;
  }

  return <div className={style.localizationContainer}>{constructAvailableLocalizations()}</div>;
};

export default LocalizationBar;
