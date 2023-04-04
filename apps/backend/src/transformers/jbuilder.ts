export type TransformerPaylod<T = any> = {
  data: T;
  error: any;
};

class Transformers<T> {
  serialize = ({ data, error }: TransformerPaylod<T>) => {
    return {
      data,
      error,
    };
  };
}

export default Transformers;
