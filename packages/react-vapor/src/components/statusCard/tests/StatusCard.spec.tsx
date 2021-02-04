import {shallow} from 'enzyme';
import * as React from 'react';

import {Loading} from '../../loading/Loading';
import {Svg} from '../../svg';
import {StatusCard} from '../StatusCard';

describe('StatusCard', () => {
    it('should render without errors', () => {
        expect(() => {
            shallow(<StatusCard color="green" title="title" />);
        }).not.toThrow();
    });

    it('should render a <Loading /> component when the prop loading is set to true', () => {
        const card = shallow(<StatusCard color="green" title="title" loading />);

        expect(card.find(Loading).length).toBe(1);
    });

    it('has the "simple" class if the "simple" prop is true', () => {
        const card = shallow(<StatusCard color="green" title="title" simple />);

        expect(card.hasClass('simple')).toBe(true);
    });

    it('has the "isSuccess" class if not in loading', () => {
        const card = shallow(<StatusCard color="green" title="title" />);

        expect(card.hasClass('isSuccess')).toBe(true);
    });

    it('does not have the "isSuccess" class if in loading', () => {
        const card = shallow(<StatusCard color="green" title="title" loading />);

        expect(card.hasClass('isSuccess')).toBe(false);
    });

    it('renders a Svg if the "icon" prop is specified', () => {
        const card = shallow(<StatusCard color="green" title="title" icon="help" />);

        expect(card.find(Svg).exists()).toBe(true);
        expect(card.find(Svg).prop('svgName')).toBe('help');
    });
});
