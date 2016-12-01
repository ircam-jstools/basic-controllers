import BaseController from './BaseController';


class Group extends BaseController {
  constructor(label, $container = null) {
    super();

    this.type = 'group';
    this.label = label;
  }
}
