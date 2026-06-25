// Registry of build-time blog figures: name -> builder().
// Each builder returns { viewBox, body, caption, ariaLabel, anim }.
import greenfield from './greenfield.js';
import establishedCodebase from './established-codebase.js';
import progressiveDisclosure from './progressive-disclosure.js';
import lostInTheMiddle from './lost-in-the-middle.js';
import finiteWindow from './finite-window.js';
import connectedContext from './connected-context.js';

export const figures = {
  'greenfield': greenfield,
  'established-codebase': establishedCodebase,
  'progressive-disclosure': progressiveDisclosure,
  'lost-in-the-middle': lostInTheMiddle,
  'finite-window': finiteWindow,
  'connected-context': connectedContext,
};
