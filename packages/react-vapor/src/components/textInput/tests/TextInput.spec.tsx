import * as React from 'react';
import {render, expectToThrow, screen, fireEvent} from '@test-utils';
import userEvent from '@testing-library/user-event';
import {TextInput, InputValidator} from '../TextInput';
import {FormProvider} from '../../form/FormProvider';

describe('TextInput', () => {
    it('throws an error if the rendering a TextInput outside a FormProvider', () => {
        expectToThrow(() => {
            render(<TextInput type="text" label="Label" />);
        }, 'useTextInput must be used within a FormProvider.');
    });

    it('renders an input with the specified defaultValue', () => {
        render(
            <FormProvider>
                <TextInput type="text" label="Label" defaultValue="🌶" />
            </FormProvider>
        );

        const textInput = screen.getByRole('textbox', {name: /label/i});
        expect(textInput).toBeInTheDocument();
        expect(textInput).toHaveValue('🌶');
    });

    it('renders a title above the input when specified', () => {
        render(
            <FormProvider>
                <TextInput type="text" label="Label" title="🍌" />
            </FormProvider>
        );

        expect(screen.getByRole('heading', {name: '🍌'})).toBeInTheDocument();
    });

    it('renders a description above the input when specified', () => {
        render(
            <FormProvider>
                <TextInput type="text" label="Label" description="🍌" />
            </FormProvider>
        );

        expect(screen.getByText('🍌')).toBeInTheDocument();
    });

    it('renders the specified help text under the input when specified', () => {
        render(
            <FormProvider>
                <TextInput type="text" label="Label" helpText="🍌" />
            </FormProvider>
        );

        expect(screen.getByText('🍌')).toBeInTheDocument();
    });

    it('renders a question mark icon with a tooltip when tooltip is specified', async () => {
        render(
            <FormProvider>
                <TextInput type="text" label="Label" tooltip="🍌" />
            </FormProvider>
        );

        const icon = screen.getByRole('img', {name: /questionstrokedmedium icon/i});
        userEvent.hover(icon);

        expect(await screen.findByText('🍌')).toBeInTheDocument();
    });

    it('disables the input when disabled prop is true', () => {
        render(
            <FormProvider>
                <TextInput type="text" label="Label" disabled />
            </FormProvider>
        );

        expect(screen.getByRole('textbox', {name: /label/i})).toBeDisabled();
    });

    it('validates the input on blur when showValidationOnBlur prop is true', () => {
        const validator: InputValidator = (val) => {
            if (val === '✅') {
                return {status: 'valid', message: 'valid!'};
            } else if (val === '⚠️') {
                return {status: 'warning', message: 'warning!'};
            } else {
                return {status: 'invalid', message: 'invalid!'};
            }
        };

        render(
            <FormProvider>
                <TextInput type="text" label="💬" required validate={validator} showValidationOnBlur />
            </FormProvider>
        );

        const textinput = screen.getByRole('textbox', {name: '💬'});
        userEvent.type(textinput, '✅');

        expect(textinput).toBeValid();
        expect(screen.queryByText('valid!')).not.toBeInTheDocument();
        expect(screen.queryByRole('img', {name: 'checkStrokedSmall icon'})).not.toBeInTheDocument();

        fireEvent.blur(textinput);

        expect(screen.getByText('valid!')).toBeInTheDocument();
        expect(screen.getByRole('img', {name: 'checkStrokedSmall icon'})).toBeInTheDocument();

        userEvent.clear(textinput);

        expect(textinput).toBeInvalid();
        expect(screen.queryByText('valid!')).not.toBeInTheDocument();
        expect(screen.queryByRole('img', {name: 'checkStrokedSmall icon'})).not.toBeInTheDocument();

        userEvent.type(textinput, '⚠️');
        expect(textinput).toBeValid();
        fireEvent.blur(textinput);

        expect(screen.getByText('warning!')).toBeInTheDocument();
        expect(screen.getByRole('img', {name: 'warningStrokedSmall icon'})).toBeInTheDocument();

        userEvent.clear(textinput);
        expect(textinput).toBeInvalid();
        userEvent.type(textinput, '❌');
        expect(textinput).toBeInvalid();
        fireEvent.blur(textinput);

        expect(screen.getByText('invalid!')).toBeInTheDocument();
        expect(screen.getByRole('img', {name: 'criticalStrokedSmall icon'})).toBeInTheDocument();
    });

    it('validates the input on mount when showValidationOnMount prop is true', () => {
        const validator: InputValidator = (val) => (val ? {status: 'valid'} : {status: 'invalid', message: 'invalid!'});

        render(
            <FormProvider>
                <TextInput type="text" label="💬" required validate={validator} showValidationOnMount />
            </FormProvider>
        );

        expect(screen.getByRole('textbox', {name: '💬'})).toBeInvalid();
        expect(screen.getByText('invalid!')).toBeInTheDocument();
        expect(screen.getByRole('img', {name: 'criticalStrokedSmall icon'})).toBeInTheDocument();
    });

    it('validates the input on change when showValidationOnChange prop is true', () => {
        const validator: InputValidator = (val) =>
            val ? {status: 'valid', message: 'valid!'} : {status: 'invalid', message: 'invalid!'};

        render(
            <FormProvider>
                <TextInput type="text" label="💬" required validate={validator} showValidationOnChange />
            </FormProvider>
        );

        const textinput = screen.getByRole('textbox', {name: '💬'});

        expect(screen.queryByText('invalid!')).not.toBeInTheDocument();
        expect(screen.queryByRole('img', {name: 'criticalStrokedSmall icon'})).not.toBeInTheDocument();

        userEvent.type(textinput, '✅');

        expect(textinput).toBeValid();
        expect(screen.getByText('valid!')).toBeInTheDocument();
        expect(screen.getByRole('img', {name: 'checkStrokedSmall icon'})).toBeInTheDocument();

        userEvent.clear(textinput);

        expect(textinput).toBeInvalid();
        expect(screen.getByText('invalid!')).toBeInTheDocument();
        expect(screen.getByRole('img', {name: 'criticalStrokedSmall icon'})).toBeInTheDocument();
    });

    it('is independant from the other inputs in the same provider', () => {
        const validator: InputValidator = (val) => (val ? {status: 'valid'} : {status: 'invalid'});

        render(
            <FormProvider>
                <TextInput type="text" label="first name" required validate={validator} />
                <TextInput type="text" label="last name" required validate={validator} />
            </FormProvider>
        );

        const firstNameInput = screen.getByRole('textbox', {name: 'first name'});
        const lastNameInput = screen.getByRole('textbox', {name: 'last name'});

        userEvent.type(firstNameInput, 'John');

        expect(firstNameInput).toHaveValue('John');
        expect(firstNameInput).toBeValid();
        expect(lastNameInput).toHaveValue('');
        expect(lastNameInput).toBeInvalid();

        userEvent.type(lastNameInput, 'Doe');

        expect(firstNameInput).toHaveValue('John');
        expect(firstNameInput).toBeValid();
        expect(lastNameInput).toHaveValue('Doe');
        expect(lastNameInput).toBeValid();
    });
});
