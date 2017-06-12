import * as React from 'react';
import {ChosenSelect} from '../ChosenSelect';
import * as _ from 'underscore';

export class ChosenSelectExamples extends React.Component<any, any> {

  getNumberOfOptions(number: number) {
    return _.times(number, (index: number) => {
      const indexShow = index + 1;
      return <option value={indexShow}>Option {indexShow}</option>;
    });
  }

  render() {
    return (
      <div className='mt2'>
        <h1 className='text-blue mb1'>Chosen Single Select</h1>
        <div className='form-group'>
          <label className='form-control-label'>
            Default Chosen single select
          </label>
          <div className='form-control'>
            <ChosenSelect placeholderTextSingle='Choose a country' value='France' width='400px'
                          onChosenChange={(event: JQueryEventObject, args: Chosen.SelectedData) => console.log('Changed: ', args)}>
              <option value='Canada'>Canada</option>
              <option value='France'>France</option>
              <option value='United States'>United States</option>
            </ChosenSelect>
          </div>
        </div>
        <div className='form-group'>
          <label className='form-control-label'>
            Chosen multi select
          </label>
          <div className='form-control'>
            <ChosenSelect placeholderTextSingle='Choose a country' defaultValue={['Canada']} multiple width='400px'
                          onChosenChange={(event: JQueryEventObject, args: Chosen.SelectedData) => console.log('Changed: ', args)}>
              <option value='Canada'>Canada</option>
              <option value='France'>France</option>
              <option value='United States'>United States</option>
            </ChosenSelect>
          </div>
        </div>
        <div className='form-group'>
          <label className='form-control-label'>
            Chosen single select with 2000 options
          </label>
          <div className='form-control'>
            <ChosenSelect placeholderTextSingle='Choose a option' width='400px'>
              {this.getNumberOfOptions(2000)}
            </ChosenSelect>
          </div>
        </div>
      </div>);
  }
}
