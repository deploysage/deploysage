// See https://www.npmjs.com/package/mirror-creator
// Allows us to easily setup constants inside of
// client/app/bundles/DeploySage/actions/deploySageActionCreators.jsx
import mirrorCreator from 'mirror-creator';

export default mirrorCreator([
  'REPO_URL_UPDATE',
]);
