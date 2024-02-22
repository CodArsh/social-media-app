import { PixelRatio, Platform } from 'react-native';
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import icoMoonConfig from './selection.json';
import { BaseColors } from './theme';

const CustomIcon = createIconSetFromIcoMoon(icoMoonConfig);

const iconSize = 22;
const navIconSize =
  __DEV__ === false && Platform.OS === 'android'
    ? PixelRatio.getPixelSizeForLayoutSize(8)
    : iconSize;
const replaceSuffixPattern = /--(active|big|small|very-big)/g;

const CustIcon = {
  notification: [navIconSize, BaseColors.primary],
  filter: [navIconSize, BaseColors.primary],
  'heart-calendar': [navIconSize, BaseColors.primary],
  Gender1: [navIconSize, BaseColors.primary],
  Gender2: [navIconSize, BaseColors.primary],
  couple: [navIconSize, BaseColors.primary],
  'Gender-3': [navIconSize, BaseColors.primary],
  'Gender-4': [navIconSize, BaseColors.primary],
  'Gender-5': [navIconSize, BaseColors.primary],
  'Gender-6': [navIconSize, BaseColors.primary],
  tick: [navIconSize, BaseColors.primary],
  calendar: [navIconSize, BaseColors.primary],
  camera: [navIconSize, BaseColors.primary],
  close: [navIconSize, BaseColors.primary],
  arrow: [navIconSize, BaseColors.primary],
  videocall: [navIconSize, BaseColors.primary],
  'Icon-feather-edit': [navIconSize, BaseColors.primary],
  'Icon-feather-sliders': [navIconSize, BaseColors.primary],
  interest: [navIconSize, BaseColors.primary],
  phone: [navIconSize, BaseColors.primary],
  Love_Icon: [navIconSize, BaseColors.primary],
  'emojione-monotone_winking-face': [navIconSize, BaseColors.primary],
  Subscribe: [navIconSize, BaseColors.primary],
  block: [navIconSize, BaseColors.primary],
  logout: [navIconSize, BaseColors.primary],
  dots: [navIconSize, BaseColors.primary],
  profile: [navIconSize, BaseColors.primary],
};

const iconsArray = [[CustIcon, CustomIcon]];

const iconsMap = {};
const iconsLoaded = new Promise(resolve => {
  const allFonts = [iconsArray].map(iconArrayMain =>
    Promise.all(
      iconArrayMain.map(iconArray =>
        Promise.all(
          Object.keys(iconArray[0]).map(iconName =>
            // IconName--suffix--other-suffix is just the mapping name in iconsMap
            iconArray[1].getImageSource(
              iconName.replace(replaceSuffixPattern, ''),
              iconArray[0][iconName][0],
              iconArray[0][iconName][1],
            ),
          ),
        ).then(
          sources =>
            Object.keys(iconArray[0]).forEach(
              (iconName, idx) => (iconsMap[iconName] = sources[idx]),
            ),
          // resolve(true);
        ),
      ),
    ).then(() => {
      resolve(true);
    }),
  );

  return Promise.all(allFonts);
});

export { iconsMap, iconsLoaded, CustomIcon };
