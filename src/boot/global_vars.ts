import { setCssVar } from 'quasar';
import { boot } from 'quasar/wrappers';

// config
const zazitMestoJinakConfig = JSON.parse(process.env.ZAZIT_MESTO_JINAK_CONFIG);

const initVars = (): void => {
  setCssVar('white', zazitMestoJinakConfig.colorWhite);
  setCssVar('black', zazitMestoJinakConfig.colorBlack);
  setCssVar('primary', zazitMestoJinakConfig.colorPrimary);
  setCssVar('secondary', zazitMestoJinakConfig.colorSecondary);
  setCssVar('negative', zazitMestoJinakConfig.colorRed);
  setCssVar('positive', zazitMestoJinakConfig.colorGreen);
  setCssVar('info', zazitMestoJinakConfig.colorSurface);
  setCssVar('red', zazitMestoJinakConfig.colorRed);
  setCssVar('surface', zazitMestoJinakConfig.colorSurface);
};

export { zazitMestoJinakConfig, initVars };

export default boot((): void => {
  initVars();
});
