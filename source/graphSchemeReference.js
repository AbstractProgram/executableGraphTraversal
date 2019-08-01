export const nodeLabel = {
  subgraphTemplate: 'SubgraphTemplate',
  port: 'Port',
  stage: 'Stage',
  process: 'Process',
  configuration: 'Configuration',
  evaluation: 'Evaluation',
  file: 'File',
}

export const connectionType = {
  next: 'NEXT',
  fork: 'FORK',
  insert: 'INSERT',
  extend: 'EXTEND',
  root: 'ROOT',
  execute: 'EXECUTE',
  run: 'RUN',
  inherit: 'INHERIT',
  configure: 'CONFIGURE',
  default: 'DEFAULT',
  case: 'CASE',
  resource: 'RESOURCE',
}

export const connectionProperty = {
  context: ['applicationReference', 'filesystemReference'],
}