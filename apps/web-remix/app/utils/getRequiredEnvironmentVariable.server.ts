export function getRequiredEnvironmentVariable(name: string): string | never {
  const variable = process.env[name];

  if (!variable) {
    throw new Error(`Missing required environment variable \`${name}\`!`);
  }

  return variable;
}
