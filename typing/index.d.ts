export declare type TypeDefinition = object;
export declare type TypeOptions = object;
export declare type KeyValueDefinition = {
  keyValue: (options?: TypeOptions) => TypeDefinition;
};
export declare type SimpleDefinition = {
  object: (options?: TypeOptions) => TypeDefinition;
  bool: (options?: TypeOptions) => TypeDefinition;
  string: (options?: TypeOptions) => TypeDefinition;
  array: (options?: TypeOptions) => TypeDefinition;
  number: (options?: TypeOptions) => TypeDefinition;
};
export declare type TypeDefinitionFunction = SimpleDefinition & KeyValueDefinition;
export declare type ReducerType = {
  [key as string]: (...any) => any;
};
export declare type SimpleType<T> = {
  set: (value: T) => void;
  update: (value: T) => void;
  reset: () => void;
  get: () => T;
  isInitialized: () => boolean;
};
export declare type ArrayType = typeof Array;
export declare namespace Types {
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
  type Array = SimpleType<ArrayType>;
  type Number = SimpleType<number>;
}
