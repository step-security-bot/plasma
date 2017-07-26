import { IReduxAction } from '../../utils/ReduxUtils';
import { IDropdownOption } from './DropdownSearch';
import {FixedQueue} from '../../utils/FixedQueue';

export interface IDefaultDropdownSearchPayload {
  id: string;
}

export interface IInputDrodownSearchPayload extends IDefaultDropdownSearchPayload {
  keyCode?: number;
}

export interface IOptionsDropdownSearchPayload extends IDefaultDropdownSearchPayload, IInputDrodownSearchPayload {
  optionsDropdown?: IDropdownOption[];
  filterText?: string;
  selectedOptions?: FixedQueue<IDropdownOption>;
  selectedOption?: IDropdownOption;
  selectedOptionValue?: string;
  addedSelectedOption?: IDropdownOption;
  isOpened?: boolean;
}

export const DropdownSearchActions = {
  toggle: 'TOGGLE_DROPDOWN_SEARCH',
  open: 'OPEN_DROPDOWN_SEARCH',
  close: 'CLOSE_DROPDOWN_SEARCH',
  add: 'ADD_DROPDOWN_SEARCH',
  addMultiSelect: 'ADD_MULTI_SELECT_DROPDOWN_SEARCH',
  addCustomSelectedOption: 'ADD_CUSTOM_SELECTED_OPTION',
  remove: 'REMOVE_DROPDOWN_SEARCH',
  update: 'UPDATE_DROPDOWN_SEARCH',
  filter: 'FILTER_DROPDOWN_SEARCH',
  select: 'SELECT_DROPDOWN_SEARCH',
  active: 'ACTIVE_DROPDOWN_SEARCH',
  removeSelectedOption: 'REMOVE_SELECTED_OPTION_DROPDOWN_SEARCH',
  removeAllSelectedOptions: 'REMOVE_ALL_SELECTED_OPTIONS_MULTISELECT_DROPDOWN_SEARCH',
  multiSelect: 'MULTI_SELECT_OPTION_DROPDOWN_SEARCH',
  onKeyDownMultiselect: 'KEY_DOWN_MULTISELECT',
};

export const applyFilterDropdownSearch = (id: string, filterText: string): IReduxAction<IOptionsDropdownSearchPayload> => ({
  type: DropdownSearchActions.filter,
  payload: {
    id,
    filterText,
  },
});

export const updateOptionsDropdownSearch = (id: string,
  optionsDropdown: IDropdownOption[]): IReduxAction<IOptionsDropdownSearchPayload> => ({
    type: DropdownSearchActions.update,
    payload: {
      id,
      optionsDropdown,
    },
  });

export const toggleDropdownSearch = (id: string): IReduxAction<IDefaultDropdownSearchPayload> => ({
  type: DropdownSearchActions.toggle,
  payload: {
    id,
  },
});

export const openDropdownSearch = (id: string): IReduxAction<IDefaultDropdownSearchPayload> => ({
  type: DropdownSearchActions.open,
  payload: {
    id,
  },
});

export const closeDropdownSearch = (id: string): IReduxAction<IDefaultDropdownSearchPayload> => ({
  type: DropdownSearchActions.close,
  payload: {
    id,
  },
});

export const addDropdownSearch = (id: string, optionsDropdown: IDropdownOption[] = []): IReduxAction<IOptionsDropdownSearchPayload> => ({
  type: DropdownSearchActions.add,
  payload: {
    id,
    optionsDropdown,
    filterText: '',
  },
});

export const addMultiSelectDropdownSearch = (id: string, optionsDropdown: IDropdownOption[] = []): IReduxAction<IOptionsDropdownSearchPayload> => ({
  type: DropdownSearchActions.addMultiSelect,
  payload: {
    id,
    optionsDropdown,
    filterText: '',
  },
});

export const removeDropdownSearch = (id: string): IReduxAction<IDefaultDropdownSearchPayload> => ({
  type: DropdownSearchActions.remove,
  payload: {
    id,
  },
});

export const selectOptionDropdownSearch = (id: string, addedSelectedOption: IDropdownOption): IReduxAction<IOptionsDropdownSearchPayload> => ({
  type: DropdownSearchActions.select,
  payload: {
    id,
    addedSelectedOption,
  },
});

export const multiSelectOptionDropdownSearch = (id: string, addedSelectedOption: IDropdownOption): IReduxAction<IOptionsDropdownSearchPayload> => ({
  type: DropdownSearchActions.multiSelect,
  payload: {
    id,
    addedSelectedOption,
  },
});

export const addCustomSelectedOption = (id: string, selectedOptionValue: string): IReduxAction<IOptionsDropdownSearchPayload> => ({
  type: DropdownSearchActions.addCustomSelectedOption,
  payload: {
    id,
    selectedOptionValue,
  },
});

export const removeSelectedOptionDropdownSearch = (id: string, selectedOptionValue: string): IReduxAction<IOptionsDropdownSearchPayload> => ({
  type: DropdownSearchActions.removeSelectedOption,
  payload: {
    id,
    selectedOptionValue,
  },
});

export const removeAllSelectedOptionsMultiselectDropdownSearch = (id: string): IReduxAction<IOptionsDropdownSearchPayload> => ({
  type: DropdownSearchActions.removeAllSelectedOptions,
  payload: {
    id,
  },
});

export const updateActiveOptionDropdownSearch = (id: string, keyCode: number): IReduxAction<IInputDrodownSearchPayload> => ({
  type: DropdownSearchActions.active,
  payload: {
    id,
    keyCode,
  },
});

export const keyDownMultiselectDropdownSearch = (id: string, keyCode: number): IReduxAction<IInputDrodownSearchPayload> => ({
  type: DropdownSearchActions.onKeyDownMultiselect,
  payload: {
    id,
    keyCode,
  },
});
