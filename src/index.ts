import { mount } from 'ripple';
// @ts-expect-error: known issue with Ripple type imports
import { App } from './App.ripple';

mount(App, {
	target: document.getElementById('root'),
});
