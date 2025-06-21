import { BaseRepository } from '../repositories/shared/base.repository';
import { SINGLETON_KEY } from '../constants/common';

export const Repository = (route: string = '') => {
  return function <T extends new (...args: any[]) => BaseRepository>(Constructor: T) {
    return class extends Constructor {
      override route: string;

      constructor(...args: any[]) {
        super(...args);
        this.route = route;
      }
    };
  };
};

type Singleton<T extends new (...args: any[]) => any> = T & {
  [SINGLETON_KEY]: T extends new (...args: any[]) => infer I ? I : never;
};

export const Singleton = () => {
  return <T extends new (...args: any[]) => any>(type: T) => {
    return new Proxy(type, {
      construct(target: Singleton<T>, argsList: any[], newTarget) {
        if (target.prototype !== newTarget.prototype) {
          return Reflect.construct(target, argsList, newTarget);
        }

        if (!target[SINGLETON_KEY]) {
          target[SINGLETON_KEY] = Reflect.construct(target, argsList, newTarget);
        }

        return target[SINGLETON_KEY];
      },
    });
  };
};
