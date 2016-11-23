import { shallow, mount, ReactWrapper } from 'enzyme';
import { TableCollapsibleRowToggle, ITableCollapsibleRowToggleProps } from '../TableCollapsibleRowToggle';
/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */

describe('Tables', () => {

  describe('<TableCollapsibleRowToggle />', () => {
    it('should render without errors', () => {

      expect(() => {
        shallow(
          <TableCollapsibleRowToggle isExpanded={false} />
        );
      }).not.toThrow();
    });
  });

  describe('<TableCollapsibleRowToggle />', () => {
    let isExpanded: boolean;
    let tableCollapsibleRowToggle: ReactWrapper<ITableCollapsibleRowToggleProps, any>;

    beforeEach(() => {
      isExpanded = false;

      tableCollapsibleRowToggle = mount(
        <TableCollapsibleRowToggle isExpanded={isExpanded} />,
        { attachTo: document.getElementById('AppTableBodyRow') }
      );
    });

    afterEach(() => {
      tableCollapsibleRowToggle.unmount();
      tableCollapsibleRowToggle.detach();
    });

    it('should get if it is expanded as a prop', () => {
      let isExpandedProp = tableCollapsibleRowToggle.props().isExpanded;

      expect(isExpandedProp).toBeDefined();
      expect(isExpandedProp).toBe(isExpanded);
    });

    it('should have a svg with state-collapsed if collapsed', () => {
      expect(tableCollapsibleRowToggle.find('.state-collapsed').length).toBe(1);
      expect(tableCollapsibleRowToggle.find('.state-expanded').length).toBe(0);
    });

    it('should have a svg with state-expanded if expanded', () => {
      tableCollapsibleRowToggle.setProps({ isExpanded: true });
      expect(tableCollapsibleRowToggle.find('.state-expanded').length).toBe(1);
      expect(tableCollapsibleRowToggle.find('.state-collapsed').length).toBe(0);
    });
  });
});
