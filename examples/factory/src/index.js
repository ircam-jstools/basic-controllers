import * as controllers from '../../../dist/index';

const definitions = [
  {
    id: 'title-0',
    type: 'title',
    label: 'Title',
  }, {
    id: 'slider-0',
    type: 'slider',
    label: 'My Slider',
    size: 'large',
    min: 0,
    max: 1000,
    step: 1,
    default: 253,
  }, {
    id: 'group-0',
    type: 'group',
    label: 'Group',
    default: 'opened',
    elements: [
      {
        id: 'number-1',
        type: 'number-box',
        default: 0.4,
        min: -1,
        max: 1,
        step: 0.01,
      }, {
        id: 'text-1',
        type: 'text',
        label: 'My Text',
        readonly: false,
        default: 'default text',
      }, {
        id: 'group-1',
        type: 'group',
        label: 'Group',
        default: 'opened',
        elements: [
          {
            id: 'number-2',
            type: 'number-box',
            default: 0.4,
            min: -1,
            max: 1,
            step: 0.01,
          },
        ],
      },
    ],
  }, {
    id: 'select-0',
    type: 'select-list',
    options: ['1', '2', '3'],
    default: '2',
  }
];

const controls = controllers.create('#container', definitions);

// get components
const group0 = controls.getComponent('group-0');
const number1 = controls.getComponent('group-0/number-1');
const number2 = controls.getComponent('group-0/group-1/number-2');

// console.log(group0);
// console.log(number1);
// console.log(number2);

// add listeners
// controls.addListener('slider-0', (value) => console.log(value));
// controls.addListener('group-0/number-1', (value) => console.log(value));

// controls.addListener('group-0', (id, value) => console.log(id, value));
// controls.addListener('group-0/group-1', (id, value) => console.log(id, value));

// controls.addListener((id, value) => console.log(id, value));

// group0.addListener('number-1', (value) => console.log(value));
// group0.addListener('group-1', (id, value) => console.log(id, value));
group0.addListener((id, value) => console.log(id, value));
