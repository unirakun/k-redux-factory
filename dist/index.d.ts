declare module "k-redux-factory" {
  export type TypeDefinition = object;
  export type TypeOptions = object;
  export type KeyValueDefinition = {
    keyValue: (options?: TypeOptions) => TypeDefinition;
  };
  export type SimpleDefinition = {
    object: (options?: TypeOptions) => TypeDefinition;
    bool: (options?: TypeOptions) => TypeDefinition;
    string: (options?: TypeOptions) => TypeDefinition;
    array: (options?: TypeOptions) => TypeDefinition;
    number: (options?: TypeOptions) => TypeDefinition;
  };
  export type TypeDefinitionFunction = SimpleDefinition & KeyValueDefinition;
  export type ReducerType = {
    [key as string]: (...any: any[]) => any;
  };
  export type SimpleType<T> = {
    set: (value: T) => void;
    update: (value: T) => void;
    reset: () => void;
    get: () => T;
    isInitialized: () => boolean;
  };
  export type ArrayType = typeof Array;
  export namespace Types {
    interface KeyValue<T, U> extends ReducerType {
      set: (elements: T[]) => void;
      add: (elements: T | T[]) => void;
      update: (elements: T | T[]) => void;
      addOrUpdate: (elements: T | T[]) => void;
      remove: (elements: T | T[] | U | U[]) => void;
      reset: () => void;
      get: (id?: U | U[]) => T | T[];
      getBy: (propertyPath: string, value: any) => T;
      getKeys: () => U[];
      getAsArray: () => T[];
      getLength: () => number;
      isInitialized: () => boolean;
      getState: () => any;
      hasKey: (key: U) => boolean;
    }
    type Object<T extends object> = SimpleType<T>;
    type Bool = SimpleType<boolean>;
    type String = SimpleType<string>;
    type Array<T> = SimpleType<T[]>;
    type Number = SimpleType<number>;
  }
}
