import { setCssVar } from 'quasar';
import { boot } from 'quasar/wrappers';

// types
import { ConfigGlobal } from '../components/types';

// config
const zazitMestoJinakConfig: ConfigGlobal = JSON.parse(
  process.env.ZAZIT_MESTO_JINAK_CONFIG,
);

const initVars = (): void => {
  setCssVar('white', zazitMestoJinakConfig.colorWhite);
  setCssVar('black', zazitMestoJinakConfig.colorBlack);
  setCssVar('primary', zazitMestoJinakConfig.colorPrimary);
  setCssVar('secondary', zazitMestoJinakConfig.colorSecondary);
  setCssVar('info', zazitMestoJinakConfig.colorGrayLight);
  setCssVar('red', zazitMestoJinakConfig.colorRed);
  setCssVar(
    'custom-form-field-validation-err',
    zazitMestoJinakConfig.colorCustomFormFieldValidationErr,
  );
};

export { zazitMestoJinakConfig, initVars };

export default boot((): void => {
  initVars();
});
