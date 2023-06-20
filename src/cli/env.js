const parseEnv = () => {
  const variables = process.env;

  for (const key in variables) {
    if (key.startsWith("RSS_")) {
      console.log(`${key}=${variables[key]}`);
    }
  }
};

parseEnv();
