import * as React from 'react';
import * as _ from 'underscore';

import {Input} from '../input/Input';
import {Label} from '../input/Label';
import {AddInputAction} from './AddInputAction';
import {DeleteInputAction} from './DeleteInputAction';
import * as styles from './styles/SplitMultilineInput.css';

export interface ISplitInput {
  id: string;
  label: string;
  placeholder?: string;
  validation?: (value: any) => boolean;
  validationMessage?: string;
}

export interface ISplitValue {
  [inputId: string]: any;
}

export interface ISplitMultilineInputOwnProps {
  inputs: ISplitInput[];
  defaultValues: ISplitValue[];
  onChange?: (values: ISplitValue[]) => void;
}

export interface ISplitMultilineInputProps extends ISplitMultilineInputOwnProps {}

export interface ISplitMultilineInputState {
  values: ISplitValue[];
}

export class SplitMultilineInput extends React.PureComponent<ISplitMultilineInputProps, ISplitMultilineInputState> {

  constructor(props: ISplitMultilineInputProps, state: ISplitMultilineInputState) {
    super(props, state);
    this.state = {
      values: this.props.defaultValues,
    };
  }

  componentDidUpdate(prevProps: ISplitMultilineInputProps) {
    if (!_.isEqual(prevProps.defaultValues, this.props.defaultValues)) {
      this.setState({
        values: this.props.defaultValues,
      });
    }
  }

  render() {
    return (
      <div className={styles.inputBlock}>
        <ul>
          {this.getDeletableInputs()}
          {this.getNewInput()}
        </ul>
      </div>
    );
  }

  private getDeletableInputs() {
    return _.map(this.state.values, (values: ISplitValue, index: number) => {
      const labelIds: string[] = _.keys(values);
      const inputLength: number = labelIds.length;
      const inputs: JSX.Element[] = _.map(labelIds, (labelId: string, inputIndex: number) => {
        const input: ISplitInput = _.findWhere(this.props.inputs, {id: labelId});

        if (input) {
          const deleteButton: JSX.Element = inputIndex + 1 === inputLength ? <DeleteInputAction onClick={() => this.removeLine(index)} /> : null;
          return (
            <Input
              classes={styles.input}
              value={values[labelId]}
              placeholder={input.placeholder}
              validate={input.validation ? (value: any) => input.validation(value) : undefined}
              key={labelId + inputIndex}
              onChange={(value?: string, valid?: boolean) => this.changeValue(value, valid, index, labelId)}
            >
              <Label>{input.label}</Label>
              {deleteButton}
            </Input>
          );
        }
      });

      return (
        <li key={`split-${index}`} className={styles.inputLine}>
          {inputs}
        </li>
      );
    });
  }

  private getNewInput() {
    const inputRefs: Input[] = [];
    const inputs: JSX.Element[] = _.map(this.props.inputs, (input: ISplitInput, inputIndex: number) => {
      const addButton: JSX.Element = inputIndex + 1 === this.props.inputs.length ? <AddInputAction onClick={() => this.addLine(inputRefs)} /> : null;
      return (
        <Input
          ref={(ref: Input) => inputRefs.push(ref)}
          key={`add-${inputIndex}`}
          classes={styles.input}
          placeholder={input.placeholder}
          validate={input.validation ? (value: any) => input.validation(value) : undefined}
        >
          <Label invalidMessage={input.validationMessage}>{input.label}</Label>
          {addButton}
        </Input>
      );
    });
    return (
      <li key='new-input' className={styles.inputLine}>
        {inputs}
      </li>
    );
  }

  private removeLine(index: number) {
    const values: ISplitValue[] = [
      ...this.state.values.slice(0, index),
      ...this.state.values.slice(index + 1),
    ];
    this.setState({
      values,
    }, this.handleChange);
  }

  private addLine(inputRefs: Input[]) {
    let inError: boolean = false;
    const values: ISplitValue = {};
    _.each(this.props.inputs, (input: ISplitInput, inputIndex: number) => {
      const value: any = inputRefs[inputIndex].getInnerValue();

      inputRefs[inputIndex].validate();

      inError = inError || input.validation && !input.validation(value);
      values[input.id] = value;
    });

    if (!inError) {
      this.setState({
        values: [
          ...this.state.values,
          values,
        ],
      }, this.handleChange);
      _.each(inputRefs, (inputRef: Input) => inputRef.reset());
    }
  }

  private changeValue(value: string, valid: boolean, index: number, labelId: string) {
    if (_.isUndefined(valid) || valid) {
      const values: ISplitValue[] = this.state.values.slice(0);
      values[index][labelId] = value;
      this.setState({
        values,
      }, this.handleChange);
    }
  }

  private handleChange() {
    if (this.props.onChange) {
      this.props.onChange(this.state.values);
    }
  }
}
