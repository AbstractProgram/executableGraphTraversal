import assert from 'assert'

// Responsible for processing data.
export async function executeEdge({ stageNode, nextProcessData, aggregator, traversalConfig, getImplementation, graphInstance }, { additionalParameter, traverseCallContext }) {
  if (!traversalConfig.shouldExecuteProcess()) return null

  let execute
  const { executeArray } = await graphInstance.databaseWrapper.getExecution({ concreteDatabase: graphInstance.database, nodeID: stageNode.identity })
  if (executeArray.length > 1) throw new Error(`• Multiple execute relationships are not supported in Stage node.`)
  // skip if no execute connection
  else if (executeArray.length == 0) return null
  else execute = executeArray[0]

  // node/edge properties implementation hierarchy
  let nodeImplementationKey // traversal implementatio key
  if (execute.connection.properties.implementation) nodeImplementationKey = { processNode: execute.connection.properties.implementation }
  let implementation = getImplementation({ nodeImplementationKey }) // calculate and pick correct implementation according to parameter hierarchy.

  // Execute node dataItem
  let result = await stageNode::implementation({ processNode: execute.destination, stageNode, graphInstance, nextProcessData }, { additionalParameter, traverseCallContext })

  if (traversalConfig.shouldIncludeResult()) aggregator.add(result)
  return result
}
