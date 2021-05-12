const { NODE_ENV } = process.env;

const ENV = {
  IS_PROD: NODE_ENV === 'production',
  IS_DEV: NODE_ENV === 'development',
};

export default ENV;
