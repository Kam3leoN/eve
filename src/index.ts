/**
 * Point d’entrée public — exports nommés pour tree-shaking (ESM).
 */

export * from './core/index';
export * from './lib.config';
export { registerElements } from './components/register';
export { Button } from './components/button/button';
export { ButtonIcon } from './components/button-icon/button-icon';
export { ButtonSplit } from './components/button-split/button-split';
export { ButtonGroup } from './components/button-group/button-group';
export { Card } from './components/card/card';
export { NavigationCard } from './components/navigation-card/navigation-card';
export { Shape, type ShapeName } from './components/shape/shape';
export { LoadingIndicator } from './components/loading-indicator/loading-indicator';
export { TextField } from './components/text-field/text-field';
