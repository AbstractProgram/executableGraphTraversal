"use strict";var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");Object.defineProperty(exports, "__esModule", { value: true });exports.returnReference = returnReference;exports.traverseReference = traverseReference;var schemeReference = _interopRequireWildcard(require("../../../dataModel/graphSchemeReference.js"));
var _concreteDatabaseWrapper = require("../../../dataModel/concreteDatabaseWrapper.js");




async function returnReference(
{ graphInstance, nodeInstance, traversalConfig, traversalDepth, path, additionalChildNode, eventEmitter, aggregator },
{ parentTraversalArg, traverseCallContext })
{
  const { reference } = await graphInstance.databaseWrapper.getRerouteReturnReferenceElement({ concreteDatabase: graphInstance.database, nodeID: nodeInstance.identity });
  let resolvedNode = await resolveReference({ reference, graphInstance, traverseCallContext });
  if (resolvedNode)

    while (resolvedNode && resolvedNode.labels.includes(schemeReference.nodeLabel.reroute))
    resolvedNode = await graphInstance.traverse(
    {
      nodeInstance: resolvedNode,
      implementationKey: {
        [schemeReference.nodeLabel.reroute]: 'returnReference' } },


    {
      traverseCallContext });



  return resolvedNode;
}


async function traverseReference(
{ graphInstance, nodeInstance, traversalConfig, traversalDepth, path, additionalChildNode, eventEmitter, aggregator },
{ parentTraversalArg, traverseCallContext })
{
  const { reference, extend, insertArray } = await graphInstance.databaseWrapper.getRerouteTraverseReferenceElement({ concreteDatabase: graphInstance.database, nodeID: nodeInstance.identity });


  let referencedNode;
  if (reference) referencedNode = await resolveReference({ reference, graphInstance, traverseCallContext });else

    if (extend) referencedNode = extend.destination;else
    return;


  let insertAdditionalNode = insertArray.
  sort((former, latter) => former.connection.properties.order - latter.connection.properties.order).
  map(insert => {var _insert$connection$pr, _insert$connection$pr2;return {
      node: insert.source,
      placement: {

        position: (_insert$connection$pr = insert.connection.properties) === null || _insert$connection$pr === void 0 ? void 0 : _insert$connection$pr.placement[0],
        connectionKey: (_insert$connection$pr2 = insert.connection.properties) === null || _insert$connection$pr2 === void 0 ? void 0 : _insert$connection$pr2.placement[1] } };});


  additionalChildNode = [...(additionalChildNode || []), ...insertAdditionalNode];


  arguments[0].traversalConfig = traversalConfig;
  arguments[0].nodeInstance = referencedNode;
  arguments[0].additionalChildNode = additionalChildNode;

  return await graphInstance.traverse(...arguments);
}


async function resolveReference({ reference, graphInstance, traverseCallContext }) {

  if ((0, _concreteDatabaseWrapper.isSelfEdge)(reference)) {

    let labelIndex = reference.destination.labels.indexOf(schemeReference.nodeLabel.reroute);
    reference.destination.labels[labelIndex] += `-ignore`;
  }

  let resolvedNode;
  switch (reference.connection.properties.resolutionImplementation) {
    case 'caseSwitch':
      resolvedNode = await switchResolution({ graphInstance, reference, traverseCallContext });
      break;
    case 'node':
    default:
      resolvedNode = reference.destination;
      break;}


  return resolvedNode;
}

async function switchResolution({ graphInstance, reference, traverseCallContext }) {
  let referencedNode;


  let resultNodeArray = await graphInstance.traverse(





  {
    nodeInstance: reference.destination,
    implementationKey: {
      processNode: 'switchCase',
      traversalInterception: 'traverseThenProcessWithLogicalOperator',
      aggregator: 'ConditionAggregator' } },


  {
    traverseCallContext: {
      targetNode: traverseCallContext.targetNode || reference.source } });




  if (resultNodeArray.length > 1) throw new Error('• REFERENCE relationship that returns multiple nodes is not supported.');else
  if (resultNodeArray.length != 0) referencedNode = resultNodeArray[0];
  return referencedNode;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NvdXJjZS9jb25zdHJ1Y3RhYmxlL0dyYXBoL21ldGhvZC9yZXJvdXRlTm9kZS5qcyJdLCJuYW1lcyI6WyJyZXR1cm5SZWZlcmVuY2UiLCJncmFwaEluc3RhbmNlIiwibm9kZUluc3RhbmNlIiwidHJhdmVyc2FsQ29uZmlnIiwidHJhdmVyc2FsRGVwdGgiLCJwYXRoIiwiYWRkaXRpb25hbENoaWxkTm9kZSIsImV2ZW50RW1pdHRlciIsImFnZ3JlZ2F0b3IiLCJwYXJlbnRUcmF2ZXJzYWxBcmciLCJ0cmF2ZXJzZUNhbGxDb250ZXh0IiwicmVmZXJlbmNlIiwiZGF0YWJhc2VXcmFwcGVyIiwiZ2V0UmVyb3V0ZVJldHVyblJlZmVyZW5jZUVsZW1lbnQiLCJjb25jcmV0ZURhdGFiYXNlIiwiZGF0YWJhc2UiLCJub2RlSUQiLCJpZGVudGl0eSIsInJlc29sdmVkTm9kZSIsInJlc29sdmVSZWZlcmVuY2UiLCJsYWJlbHMiLCJpbmNsdWRlcyIsInNjaGVtZVJlZmVyZW5jZSIsIm5vZGVMYWJlbCIsInJlcm91dGUiLCJ0cmF2ZXJzZSIsImltcGxlbWVudGF0aW9uS2V5IiwidHJhdmVyc2VSZWZlcmVuY2UiLCJleHRlbmQiLCJpbnNlcnRBcnJheSIsImdldFJlcm91dGVUcmF2ZXJzZVJlZmVyZW5jZUVsZW1lbnQiLCJyZWZlcmVuY2VkTm9kZSIsImRlc3RpbmF0aW9uIiwiaW5zZXJ0QWRkaXRpb25hbE5vZGUiLCJzb3J0IiwiZm9ybWVyIiwibGF0dGVyIiwiY29ubmVjdGlvbiIsInByb3BlcnRpZXMiLCJvcmRlciIsIm1hcCIsImluc2VydCIsIm5vZGUiLCJzb3VyY2UiLCJwbGFjZW1lbnQiLCJwb3NpdGlvbiIsImNvbm5lY3Rpb25LZXkiLCJhcmd1bWVudHMiLCJsYWJlbEluZGV4IiwiaW5kZXhPZiIsInJlc29sdXRpb25JbXBsZW1lbnRhdGlvbiIsInN3aXRjaFJlc29sdXRpb24iLCJyZXN1bHROb2RlQXJyYXkiLCJwcm9jZXNzTm9kZSIs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R1AsU0FBUyxDQUFDcUIsV0FBekI7QUFDQSxZQVBKOzs7QUFVQSxTQUFPZCxZQUFQO0FBQ0Q7O0FBRUQsZUFBZWlDLGdCQUFmLENBQWdDLEVBQUVsRCxhQUFGLEVBQWlCVSxTQUFqQixFQUE0QkQsbUJBQTVCLEVBQWhDLEVBQW1GO0FBQ2pGLE1BQUlxQixjQUFKOzs7QUFHQSxNQUFJcUIsZUFBZSxHQUFHLE1BQU1uRCxhQUFhLENBQUN3QixRQUFkOzs7Ozs7QUFNMUI7QUFDRXZCLElBQUFBLFlBQVksRUFBRVMsU0FBUyxDQUFDcUIsV0FEMUI7QUFFRU4sSUFBQUEsaUJBQWlCLEVBQUU7QUFDakIyQixNQUFBQSxXQUFXLEVBQUUsWUFESTtBQUVqQkMsTUFBQUEscUJBQXFCLEVBQUUsd0NBRk47QUFHakI5QyxNQUFBQSxVQUFVLEVBQUUscUJBSEssRUFGckIsRUFOMEI7OztBQWMxQjtBQUNFRSxJQUFBQSxtQkFBbUIsRUFBRTtBQUNuQjZDLE1BQUFBLFVBQVUsRUFBRTdDLG1CQUFtQixDQUFDNkMsVUFBcEIsSUFBa0M1QyxTQUFTLENBQUNnQyxNQURyQyxFQUR2QixFQWQwQixDQUE1Qjs7Ozs7QUFxQkEsTUFBSVMsZUFBZSxDQUFDSSxNQUFoQixHQUF5QixDQUE3QixFQUFnQyxNQUFNLElBQUlDLEtBQUosQ0FBVSx3RUFBVixDQUFOLENBQWhDO0FBQ0ssTUFBSUwsZUFBZSxDQUFDSSxNQUFoQixJQUEwQixDQUE5QixFQUFpQ3pCLGNBQWMsR0FBR3FCLGVBQWUsQ0FBQyxDQUFELENBQWhDO0FBQ3RDLFNBQU9yQixjQUFQO0FBQ0QiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBzY2hlbWVSZWZlcmVuY2UgZnJvbSAnLi4vLi4vLi4vZGF0YU1vZGVsL2dyYXBoU2NoZW1lUmVmZXJlbmNlLmpzJ1xuaW1wb3J0IHsgaXNTZWxmRWRnZSB9IGZyb20gJy4uLy4uLy4uL2RhdGFNb2RlbC9jb25jcmV0ZURhdGFiYXNlV3JhcHBlci5qcydcbi8qKlxuICogUmVyb3V0ZSBub2RlIGlzIGFuIGVudHJ5cG9pbnQgbm9kZSB0aGF0IHRoZSBncmFwaCB0cmF2ZXJzYWwgY2FuIGJlIHN0YXJ0ZWQgZnJvbS5cbiAqL1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gcmV0dXJuUmVmZXJlbmNlKFxuICB7IGdyYXBoSW5zdGFuY2UsIG5vZGVJbnN0YW5jZSwgdHJhdmVyc2FsQ29uZmlnLCB0cmF2ZXJzYWxEZXB0aCwgcGF0aCwgYWRkaXRpb25hbENoaWxkTm9kZSwgZXZlbnRFbWl0dGVyLCBhZ2dyZWdhdG9yIH0sXG4gIHsgcGFyZW50VHJhdmVyc2FsQXJnLCB0cmF2ZXJzZUNhbGxDb250ZXh0IH0sXG4pIHtcbiAgY29uc3QgeyByZWZlcmVuY2UgfSA9IGF3YWl0IGdyYXBoSW5zdGFuY2UuZGF0YWJhc2VXcmFwcGVyLmdldFJlcm91dGVSZXR1cm5SZWZlcmVuY2VFbGVtZW50KHsgY29uY3JldGVEYXRhYmFzZTogZ3JhcGhJbnN0YW5jZS5kYXRhYmFzZSwgbm9kZUlEOiBub2RlSW5zdGFuY2UuaWRlbnRpdHkgfSlcbiAgbGV0IHJlc29sdmVkTm9kZSA9IGF3YWl0IHJlc29sdmVSZWZlcmVuY2UoeyByZWZlcmVuY2UsIGdyYXBoSW5zdGFuY2UsIHRyYXZlcnNlQ2FsbENvbnRleHQgfSlcbiAgaWYgKHJlc29sdmVkTm9kZSlcbiAgICAvLyBpZiB0aGUgcmVmZXJlbmNlIG5vZGUgaXMgYSByZXJvdXRlIGl0c2VsZiwgdHJhdmVyc2UgaXQgcmVjdXJzaXZlbHlcbiAgICB3aGlsZSAocmVzb2x2ZWROb2RlICYmIHJlc29sdmVkTm9kZS5sYWJlbHMuaW5jbHVkZXMoc2NoZW1lUmVmZXJlbmNlLm5vZGVMYWJlbC5yZXJvdXRlKSlcbiAgICAgIHJlc29sdmVkTm9kZSA9IGF3YWl0IGdyYXBoSW5zdGFuY2UudHJhdmVyc2UoXG4gICAgICAgIHtcbiAgICAgICAgICBub2RlSW5zdGFuY2U6IHJlc29sdmVkTm9kZSxcbiAgICAgICAgICBpbXBsZW1lbnRhdGlvbktleToge1xuICAgICAgICAgICAgW3NjaGVtZVJlZmVyZW5jZS5ub2RlTGFiZWwucmVyb3V0ZV06ICdyZXR1cm5SZWZlcmVuY2UnLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICB0cmF2ZXJzZUNhbGxDb250ZXh0LFxuICAgICAgICB9LFxuICAgICAgKVxuXG4gIHJldHVybiByZXNvbHZlZE5vZGVcbn1cblxuLy8gVE9ETzogcHJvdmlkZSBhIHdheSB0byBtYXJrIHN1YmdyYXBoIHRlbXBsYXRlcywgdG8gZGlzdGluZ3Vpc2ggdGhlbSBmcm9tIG90aGVyIHJlcm91dGUgbm9kZXMgaW4gdGhlIGdyYXBoLlxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHRyYXZlcnNlUmVmZXJlbmNlKFxuICB7IGdyYXBoSW5zdGFuY2UsIG5vZGVJbnN0YW5jZSwgdHJhdmVyc2FsQ29uZmlnLCB0cmF2ZXJzYWxEZXB0aCwgcGF0aCwgYWRkaXRpb25hbENoaWxkTm9kZSwgZXZlbnRFbWl0dGVyLCBhZ2dyZWdhdG9yIH0sXG4gIHsgcGFyZW50VHJhdmVyc2FsQXJnLCB0cmF2ZXJzZUNhbGxDb250ZXh0IH0sXG4pIHtcbiAgY29uc3QgeyByZWZlcmVuY2UsIGV4dGVuZCwgaW5zZXJ0QXJyYXkgfSA9IGF3YWl0IGdyYXBoSW5zdGFuY2UuZGF0YWJhc2VXcmFwcGVyLmdldFJlcm91dGVUcmF2ZXJzZVJlZmVyZW5jZUVsZW1lbnQoeyBjb25jcmV0ZURhdGFiYXNlOiBncmFwaEluc3RhbmNlLmRhdGFiYXNlLCBub2RlSUQ6IG5vZGVJbnN0YW5jZS5pZGVudGl0eSB9KVxuXG4gIC8vIGdldCByZWZlcmVuY2VkTm9kZSBhbmQgaGFuZGxlIGV4dGVuZGVkIG5vZGUuXG4gIGxldCByZWZlcmVuY2VkTm9kZVxuICBpZiAocmVmZXJlbmNlKSByZWZlcmVuY2VkTm9kZSA9IGF3YWl0IHJlc29sdmVSZWZlcmVuY2UoeyByZWZlcmVuY2UsIGdyYXBoSW5zdGFuY2UsIHRyYXZlcnNlQ2FsbENvbnRleHQgfSlcbiAgLy8gVE9ETzogcmV0aGluayB0aGUgaW1wbGVtZW50YXRpb24gb2YgZXh0ZW5kIGFuZCBob3cgdGhlIG92ZXJyaWRpbmcgd29ya3MuXG4gIGVsc2UgaWYgKGV4dGVuZCkgcmVmZXJlbmNlZE5vZGUgPSBleHRlbmQuZGVzdGluYXRpb25cbiAgZWxzZSByZXR1cm4gLy8gaW4gY2FzZSBubyByZWZlcmVuY2Ugbm9kZSB3YXMgcmVzb2x2ZWRcblxuICAvLyBnZXQgYWRkaXRpb25hbCBub2RlcyBmcm9tIGluc2VydCBhcnJheSBhbmQgYWRkIHRoZW0gdG8gdGhlIHBhc3NlZCBhcnJheS5cbiAgbGV0IGluc2VydEFkZGl0aW9uYWxOb2RlID0gaW5zZXJ0QXJyYXlcbiAgICAuc29ydCgoZm9ybWVyLCBsYXR0ZXIpID0+IGZvcm1lci5jb25uZWN0aW9uLnByb3BlcnRpZXMub3JkZXIgLSBsYXR0ZXIuY29ubmVjdGlvbi5wcm9wZXJ0aWVzLm9yZGVyKSAvLyB1c2luZyBgb3JkZXJgIHByb3BlcnR5IC8vIEJ1bGsgYWN0aW9ucyBvbiBmb3JrcyAtIHNvcnQgZm9ya3NcbiAgICAubWFwKGluc2VydCA9PiAoe1xuICAgICAgbm9kZTogaW5zZXJ0LnNvdXJjZSxcbiAgICAgIHBsYWNlbWVudDoge1xuICAgICAgICAvLyBjb252ZW50aW9uIGZvciBkYXRhIHN0cnVjdHVyZSBvZiBwbGFjZW1lbnQgYXJyYXkgLSAwOiAnYmVmb3JlJyB8ICdhZnRlcicsIDE6IGNvbm5lY3Rpb25LZXlcbiAgICAgICAgcG9zaXRpb246IGluc2VydC5jb25uZWN0aW9uLnByb3BlcnRpZXM/LnBsYWNlbWVudFswXSxcbiAgICAgICAgY29ubmVjdGlvbktleTogaW5zZXJ0LmNvbm5lY3Rpb24ucHJvcGVydGllcz8ucGxhY2VtZW50WzFdLFxuICAgICAgfSxcbiAgICB9KSlcbiAgYWRkaXRpb25hbENoaWxkTm9kZSA9IFsuLi4oYWRkaXRpb25hbENoaWxkTm9kZSB8fCBbXSksIC4uLmluc2VydEFkZGl0aW9uYWxOb2RlXVxuXG4gIC8vIHNldCBhZGRpdGlvbmFsIHBhcmFtZXRlcnNcbiAgYXJndW1lbnRzWzBdLnRyYXZlcnNhbENvbmZpZyA9IHRyYXZlcnNhbENvbmZpZ1xuICBhcmd1bWVudHNbMF0ubm9kZUluc3RhbmNlID0gcmVmZXJlbmNlZE5vZGUgLy8gcmVmZXJlbmNlZE5vZGUgd2lsbCBiZSB1c2VkIGFzIGVudHJ5cG9pbnQgdG8gdHJhdmVyc2FsIGNhbGxcbiAgYXJndW1lbnRzWzBdLmFkZGl0aW9uYWxDaGlsZE5vZGUgPSBhZGRpdGlvbmFsQ2hpbGROb2RlXG4gIC8vIHRyYXZlcnNlIHJlZmVyZW5jZSBub2RlIGluIHRoZSBzYW1lIHRyYXZlcnNhbCByZWN1cnNpdmUgc2NvcGVzLlxuICByZXR1cm4gYXdhaXQgZ3JhcGhJbnN0YW5jZS50cmF2ZXJzZSguLi5hcmd1bWVudHMpXG59XG5cbi8vIFJlc29sdXRpb24gb2YgcmVmZXJlbmNlIG5vZGUgdXNpbmcgZGlmZmVyZW50IG1lY2hhbmlzbXMuXG5hc3luYyBmdW5jdGlvbiByZXNvbHZlUmVmZXJlbmNlKHsgcmVmZXJlbmNlLCBncmFwaEluc3RhbmNlLCB0cmF2ZXJzZUNhbGxDb250ZXh0IH0pIHtcbiAgLy8gcHJldmVudCBjaXJjdWxhciB0cmF2ZXJzYWwsIGluIGNhc2UgbXVsdGlwbGUgdHlwZXMgYXJlIHVzZWQgZm9yIHRoZSBzYW1lIG5vZGUgYW5kIHRoZSByZWZlcmVuY2UgZWRnZSBpcyBzZWxmIGVkZ2U6XG4gIGlmIChpc1NlbGZFZGdlKHJlZmVyZW5jZSkpIHtcbiAgICAvLyB3b3JrYXJvdW5kIGlzIHRvIHJlbW92ZSB0aGUgUmVyb3V0ZSB0eXBlIGZyb20gdGhlIGxhYmVscyBhcnJheS4gVE9ETzogY29uc2lkZXIgYWxsb3dpbmcgYSBwYXJhbWV0ZXIgdGhhdCBjb250cm9scyB3aGljaCBlbnRyeXBvaW50IG5vZGUgaW1wbGVtZW50YXRpb25zIGFyZSBpZ25vcmVkLlxuICAgIGxldCBsYWJlbEluZGV4ID0gcmVmZXJlbmNlLmRlc3RpbmF0aW9uLmxhYmVscy5pbmRleE9mKHNjaGVtZVJlZmVyZW5jZS5ub2RlTGFiZWwucmVyb3V0ZSlcbiAgICByZWZlcmVuY2UuZGVzdGluYXRpb24ubGFiZWxzW2xhYmVsSW5kZXhdICs9IGAtaWdub3JlYCAvLyBpZ25vcmUgb24gbmV4dCB0cmF2ZXJzYWwgKGtlZXAgdGhlIGVudHJ5IGZvciBkZWJ1Z2dpbmcgcHVycG9zZXMpLlxuICB9XG5cbiAgbGV0IHJlc29sdmVkTm9kZVxuICBzd2l0Y2ggKHJlZmVyZW5jZS5jb25uZWN0aW9uLnByb3BlcnRpZXMucmVzb2x1dGlvbkltcGxlbWVudGF0aW9uKSB7XG4gICAgY2FzZSAnY2FzZVN3aXRjaCc6XG4gICAgICByZXNvbHZlZE5vZGUgPSBhd2FpdCBzd2l0Y2hSZXNvbHV0aW9uKHsgZ3JhcGhJbnN0YW5jZSwgcmVmZXJlbmNlLCB0cmF2ZXJzZUNhbGxDb250ZXh0IH0pXG4gICAgICBicmVha1xuICAgIGNhc2UgJ25vZGUnOlxuICAgIGRlZmF1bHQ6XG4gICAgICByZXNvbHZlZE5vZGUgPSByZWZlcmVuY2UuZGVzdGluYXRpb25cbiAgICAgIGJyZWFrXG4gIH1cblxuICByZXR1cm4gcmVzb2x2ZWROb2RlXG59XG5cbmFzeW5jIGZ1bmN0aW9uIHN3aXRjaFJlc29sdXRpb24oeyBncmFwaEluc3RhbmNlLCByZWZlcmVuY2UsIHRyYXZlcnNlQ2FsbENvbnRleHQgfSkge1xuICBsZXQgcmVmZXJlbmNlZE5vZGVcbiAgLy8gUnVuIHJlZmVyZW5jZSBub2RlIGluIGEgc2VwYXJhdGUgdHJhdmVyc2FsIHJlY3Vyc2l2ZSBzY29wZXMsIGFuZCByZXR1cm4gcmVzdWx0LlxuICAvLyB0cmF2ZXJzZSB0aGUgZGVzdGluYXRpb24gYW5kIGV4dHJhY3Qgbm9kZSBmcm9tIHRoZSByZXN1bHQgdmFsdWUuXG4gIGxldCByZXN1bHROb2RlQXJyYXkgPSBhd2FpdCBncmFwaEluc3RhbmNlLnRyYXZlcnNlKFxuICAgIC8qIFRPRE86IE5vdGU6IHRoaXMgaXMgYSBxdWljayBpbXBsZW1lbnRhdGlvbiBiZWNhdXNlIGRpZ2dpbmcgaW50byB0aGUgY29yZSBjb2RlIGlzIHRpbWUgY29uc3VtaW5nLCB0aGUgZGlmZmVyZW50IGNvbmNlcHRzIHVzZWQgaW4gaGVyZSBjb3VsZCBiZSBpbXByb3ZlZCBhbmQgYnVpbHQgdXBvbiBvdGhlciBhbHJlYWR5IGV4aXN0aW5nIGNvbmNlcHRzOiBcbiAgICAgICAgICAgIFRPRE86IGNyZWF0ZSBhbiBpbnN0YW5jZSBncmFwaCBmcm9tIHRoZSBjdXJyZW50IGdyYXBoSW5zdGFuY2UsIHRvIGFsbG93IHBhc3NpbmcgYWRkaXRpb25hbCBjb250ZXh0IHBhcmFtZXRycy5cbiAgICAgICAgICAgICAgICDigKIgJ3RyYXZlcnNhbENhbGxDb250ZXh0JyAtIHRoZSAybmQgcHJvdmlkZWQgYXJndW1lbnQgY291bGQgYmUgaW5zdGVhZCBhcHBsaWVkIGFzIGEgcmVndWxhciBDb250ZXh0IHNwZWNpZmljIGZvciB0aGUgY2FsbCwgYnkgY3JlYXRpbmcgYSBuZXcgZ3JhcGhJbnN0YW5jZSBjaGFpbiB3aXRoIGl0J3MgdW5pcXVlIGNvbnRleHQsIGluIGFkZGl0aW9uIHRvIHRoZSBhbHJlYWR5IGV4aXN0aW5nIGNvbnRleHQgaW5zdGFuY2UuXG4gICAgICAgICAgICB3YXMgdGhpcyBkb25lID8gfn7igKIgQ29uZGl0aW9uQWdncmVnYXRvciAmIHRyYXZlcnNlVGhlblByb2Nlc3NXaXRoTG9naWNhbE9wZXJhdG9yIGltcGxlbWVudGF0aW9ucyBjb3VsZCBiZSBpbnRlZ3JhdHRlZCBpbnRvIHRoZSBvdGhlciBpbXBsZW1lbnRhdGlvbnMufn5cbiAgICAgICAgICAqL1xuICAgIHtcbiAgICAgIG5vZGVJbnN0YW5jZTogcmVmZXJlbmNlLmRlc3RpbmF0aW9uLFxuICAgICAgaW1wbGVtZW50YXRpb25LZXk6IHtcbiAgICAgICAgcHJvY2Vzc05vZGU6ICdzd2l0Y2hDYXNlJyxcbiAgICAgICAgdHJhdmVyc2FsSW50ZXJjZXB0aW9uOiAndHJhdmVyc2VUaGVuUHJvY2Vzc1dpdGhMb2dpY2FsT3BlcmF0b3InLFxuICAgICAgICBhZ2dyZWdhdG9yOiAnQ29uZGl0aW9uQWdncmVnYXRvcicsXG4gICAgICB9LFxuICAgIH0sXG4gICAge1xuICAgICAgdHJhdmVyc2VDYWxsQ29udGV4dDoge1xuICAgICAgICB0YXJnZXROb2RlOiB0cmF2ZXJzZUNhbGxDb250ZXh0LnRhcmdldE5vZGUgfHwgcmVmZXJlbmNlLnNvdXJjZSwgLy8gcGFzcyB0aGUgbm9kZSByZXF1ZXN0aW5nIHRoZSByZXNvbHV0aW9uIG9mIHRoZSByZXJvdXRlIG5vZGUgaWYgaXQgZXhpc3RzLCBvciB0aGUgcmVyb3V0ZSBpdHNlbGYgaW4gY2FzZSBjYWxsZWQgYXMgcm9vdCBsZXZlbCBpbiB0aGUgdHJhdmVyc2FsLlxuICAgICAgfSxcbiAgICB9LFxuICApIC8vIHRyYXZlcnNlIHN1YmdyYXBoIHRvIHJldHJpZXZlIGEgcmVmZXJlbmNlZCBub2RlLlxuXG4gIGlmIChyZXN1bHROb2RlQXJyYXkubGVuZ3RoID4gMSkgdGhyb3cgbmV3IEVycm9yKCfigKIgUkVGRVJFTkNFIHJlbGF0aW9uc2hpcCB0aGF0IHJldHVybnMgbXVsdGlwbGUgbm9kZXMgaXMgbm90IHN1cHBvcnRlZC4nKVxuICBlbHNlIGlmIChyZXN1bHROb2RlQXJyYXkubGVuZ3RoICE9IDApIHJlZmVyZW5jZWROb2RlID0gcmVzdWx0Tm9kZUFycmF5WzBdXG4gIHJldHVybiByZWZlcmVuY2VkTm9kZVxufVxuIl19