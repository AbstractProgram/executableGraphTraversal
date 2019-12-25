"use strict";var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");Object.defineProperty(exports, "__esModule", { value: true });exports.resolveValue = resolveValue;exports.conditionSubgraphValueResolution = conditionSubgraphValueResolution;exports.conditionSubgraphWithNonBooleanValueResolution = conditionSubgraphWithNonBooleanValueResolution;var _concreteDatabaseWrapper = require("../dataModel/concreteDatabaseWrapper.js");
var _assert = _interopRequireDefault(require("assert"));



async function resolveValue({ targetNode, graph, traverseCallContext }) {
  const value = await graph.databaseWrapper.getValueElement({ concreteDatabase: graph.database, nodeID: targetNode.identity });
  if (!value) return;

  let resolvedValue;

  switch (value.connection.properties.implementation) {
    case 'conditionSubgraph':
      (0, _assert.default)(!(0, _concreteDatabaseWrapper.isSelfEdge)(value), `• Self-edge for VALUE connection with "conditionSubgraph" implementation, currently not supported, as it causes infinite loop.`);
      resolvedValue = await graph.traverserInstruction.valueResolution.conditionSubgraphValueResolution({ value, graph, traverseCallContext });
      break;
    case 'properties':
      resolvedValue = value.source.properties;
      break;
    case 'node':
      resolvedValue = value.source;
      break;
    case 'valueProperty':
    default:
      resolvedValue = value.source.properties.value;
      break;}

  return resolvedValue;
}













async function conditionSubgraphValueResolution({ value, graph, traverseCallContext }) {
  let resolvedValue;


  let resultValueArray = await graph.traverse(





  {
    nodeInstance: value.source,
    implementationKey: {
      processNode: 'executeFunctionReference',
      traversalInterception: 'traverseThenProcessWithLogicalOperator',
      aggregator: 'ConditionAggregator' } },


  {
    traverseCallContext: {
      targetNode: traverseCallContext && traverseCallContext.targetNode || value.destination } });




  if (resultValueArray.length > 1) resolvedValue = resultValueArray.every(item => Boolean(item));else
  if (resultValueArray.length != 0) resolvedValue = resultValueArray[0];
  return resolvedValue;
}


async function conditionSubgraphWithNonBooleanValueResolution({ value, graph, traverseCallContext }) {}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NvdXJjZS90cmF2ZXJzZXJJbnN0cnVjdGlvbi92YWx1ZVJlc29sdXRpb24uanMiXSwibmFtZXMiOlsicmVzb2x2ZVZhbHVlIiwidGFyZ2V0Tm9kZSIsImdyYXBoIiwidHJhdmVyc2VDYWxsQ29udGV4dCIsInZhbHVlIiwiZGF0YWJhc2VXcmFwcGVyIiwiZ2V0VmFsdWVFbGVtZW50IiwiY29uY3JldGVEYXRhYmFzZSIsImRhdGFiYXNlIiwibm9kZUlEIiwiaWRlbnRpdHkiLCJyZXNvbHZlZFZhbHVlIiwiY29ubmVjdGlvbiIsInByb3BlcnRpZXMiLCJpbXBsZW1lbnRhdGlvbiIsInRyYXZlcnNlckluc3RydWN0aW9uIiwidmFsdWVSZXNvbHV0aW9uIiwiY29uZGl0aW9uU3ViZ3JhcGhWYWx1ZVJlc29sdXRpb24iLCJzb3VyY2UiLCJyZXN1bHRWYWx1ZUFycmF5IiwidHJhdmVyc2UiLCJub2RlSW5zdGFuY2UiLCJpbXBsZW1lbnRhdGlvbktleSIsInByb2Nlc3NOb2RlIiwidHJhdmVyc2FsSW50ZXJjZXB0aW9uIiwiYWdncmVnYXRvciIsImRlc3RpbmF0aW9uIiwibGVuZ3RoIiwiZXZlcnkiLCJpdGVtIiwiQm9vbGVhbiIsImNvbmRpdGlvblN1YmdyYXBoV2l0aE5vbkJvb2xlYW5WYWx1ZVJlc29sdXRpb24iXSwibWFwcGluZ3MiOiJ3WEFBQTtBQUNBOzs7O0FBSU8sZUFBZUEsWUFBZixDQUE0QixFQUFFQyxVQUFGLEVBQWNDLEtBQWQsRUFBcUJDLG1CQUFyQixFQUE1QixFQUF3RTtBQUM3RSxRQUFNQyxLQUFLLEdBQUcsTUFBTUYsS0FBSyxDQUFDRyxlQUFOLENBQXNCQyxlQUF0QixDQUFzQyxFQUFFQyxnQkFBZ0IsRUFBRUwsS0FBSyxDQUFDTSxRQUExQixFQUFvQ0MsTUFBTSxFQUFFUixVQUFVLENBQUNTLFFBQXZELEVBQXRDLENBQXBCO0FBQ0EsTUFBSSxDQUFDTixLQUFMLEVBQVk7O0FBRVosTUFBSU8sYUFBSjs7QUFFQSxVQUFRUCxLQUFLLENBQUNRLFVBQU4sQ0FBaUJDLFVBQWpCLENBQTRCQyxjQUFwQztBQUNFLFNBQUssbUJBQUw7QUFDRSwyQkFBTyxDQUFDLHlDQUFXVixLQUFYLENBQVIsRUFBNEIsZ0lBQTVCO0FBQ0FPLE1BQUFBLGFBQWEsR0FBRyxNQUFNVCxLQUFLLENBQUNhLG9CQUFOLENBQTJCQyxlQUEzQixDQUEyQ0MsZ0NBQTNDLENBQTRFLEVBQUViLEtBQUYsRUFBU0YsS0FBVCxFQUFnQkMsbUJBQWhCLEVBQTVFLENBQXRCO0FBQ0E7QUFDRixTQUFLLFlBQUw7QUFDRVEsTUFBQUEsYUFBYSxHQUFHUCxLQUFLLENBQUNjLE1BQU4sQ0FBYUwsVUFBN0I7QUFDQTtBQUNGLFNBQUssTUFBTDtBQUNFRixNQUFBQSxhQUFhLEdBQUdQLEtBQUssQ0FBQ2MsTUFBdEI7QUFDQTtBQUNGLFNBQUssZUFBTDtBQUNBO0FBQ0VQLE1BQUFBLGFBQWEsR0FBR1AsS0FBSyxDQUFDYyxNQUFOLENBQWFMLFVBQWIsQ0FBd0JULEtBQXhDO0FBQ0EsWUFkSjs7QUFnQkEsU0FBT08sYUFBUDtBQUNEOzs7Ozs7Ozs7Ozs7OztBQWNNLGVBQWVNLGdDQUFmLENBQWdELEVBQUViLEtBQUYsRUFBU0YsS0FBVCxFQUFnQkMsbUJBQWhCLEVBQWhELEVBQXVGO0FBQzVGLE1BQUlRLGFBQUo7OztBQUdBLE1BQUlRLGdCQUFnQixHQUFHLE1BQU1qQixLQUFLLENBQUNrQixRQUFOOzs7Ozs7QUFNM0I7QUFDRUMsSUFBQUEsWUFBWSxFQUFFakIsS0FBSyxDQUFDYyxNQUR0QjtBQUVFSSxJQUFBQSxpQkFBaUIsRUFBRTtBQUNqQkMsTUFBQUEsV0FBVyxFQUFFLDBCQURJO0FBRWpCQyxNQUFBQSxxQkFBcUIsRUFBRSx3Q0FGTjtBQUdqQkMsTUFBQUEsVUFBVSxFQUFFLHFCQUhLLEVBRnJCLEVBTjJCOzs7QUFjM0I7QUFDRXRCLElBQUFBLG1CQUFtQixFQUFFO0FBQ25CRixNQUFBQSxVQUFVLEVBQUdFLG1CQUFtQixJQUFJQSxtQkFBbUIsQ0FBQ0YsVUFBNUMsSUFBMkRHLEtBQUssQ0FBQ3NCLFdBRDFELEVBRHZCLEVBZDJCLENBQTdCOzs7OztBQXFCQSxNQUFJUCxnQkFBZ0IsQ0FBQ1EsTUFBakIsR0FBMEIsQ0FBOUIsRUFBaUNoQixhQUFhLEdBQUdRLGdCQUFnQixDQUFDUyxLQUFqQixDQUF1QkMsSUFBSSxJQUFJQyxPQUFPLENBQUNELElBQUQsQ0FBdEMsQ0FBaEIsQ0FBakM7QUFDSyxNQUFJVixnQkFBZ0IsQ0FBQ1EsTUFBakIsSUFBMkIsQ0FBL0IsRUFBa0NoQixhQUFhLEdBQUdRLGdCQUFnQixDQUFDLENBQUQsQ0FBaEM7QUFDdkMsU0FBT1IsYUFBUDtBQUNEOzs7QUFHTSxlQUFlb0IsOENBQWYsQ0FBOEQsRUFBRTNCLEtBQUYsRUFBU0YsS0FBVCxFQUFnQkMsbUJBQWhCLEVBQTlELEVBQXFHLENBQUUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBpc1NlbGZFZGdlIH0gZnJvbSAnLi4vZGF0YU1vZGVsL2NvbmNyZXRlRGF0YWJhc2VXcmFwcGVyLmpzJ1xuaW1wb3J0IGFzc2VydCBmcm9tICdhc3NlcnQnXG5cbi8vIFRPRE86IE1vdmUgb3RoZXIgbm9kZSBpbnN0cnVjdGlvbiBvdXRzaWRlIG9mIG5vZGUgdHlwZSBmdW5jdGlvbnMsIHRvIG1ha2UgYSBtb3JlIG1vZHVsYXIgaW5zdHJ1Y3Rpb24gZnVuY3Rpb25zLlxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gcmVzb2x2ZVZhbHVlKHsgdGFyZ2V0Tm9kZSwgZ3JhcGgsIHRyYXZlcnNlQ2FsbENvbnRleHQgfSkge1xuICBjb25zdCB2YWx1ZSA9IGF3YWl0IGdyYXBoLmRhdGFiYXNlV3JhcHBlci5nZXRWYWx1ZUVsZW1lbnQoeyBjb25jcmV0ZURhdGFiYXNlOiBncmFwaC5kYXRhYmFzZSwgbm9kZUlEOiB0YXJnZXROb2RlLmlkZW50aXR5IH0pXG4gIGlmICghdmFsdWUpIHJldHVyblxuXG4gIGxldCByZXNvbHZlZFZhbHVlXG4gIC8qIHJ1biBjb25kaXRpb24gY2hlY2sgYWdhaW5zdCBjb21wYXJpc29uIHZhbHVlLiBIaWVyYXJjaHkgb2YgY29tcGFyaXNvbiB2YWx1ZSBjYWxjdWxhdGlvbjogICAqL1xuICBzd2l0Y2ggKHZhbHVlLmNvbm5lY3Rpb24ucHJvcGVydGllcy5pbXBsZW1lbnRhdGlvbikge1xuICAgIGNhc2UgJ2NvbmRpdGlvblN1YmdyYXBoJzpcbiAgICAgIGFzc2VydCghaXNTZWxmRWRnZSh2YWx1ZSksIGDigKIgU2VsZi1lZGdlIGZvciBWQUxVRSBjb25uZWN0aW9uIHdpdGggXCJjb25kaXRpb25TdWJncmFwaFwiIGltcGxlbWVudGF0aW9uLCBjdXJyZW50bHkgbm90IHN1cHBvcnRlZCwgYXMgaXQgY2F1c2VzIGluZmluaXRlIGxvb3AuYCkgLy8gVE9ETzogZGVhbCB3aXRoIGNpcmN1bGFyIHRyYXZlcnNhbCBmb3IgdGhpcyB0eXBlLlxuICAgICAgcmVzb2x2ZWRWYWx1ZSA9IGF3YWl0IGdyYXBoLnRyYXZlcnNlckluc3RydWN0aW9uLnZhbHVlUmVzb2x1dGlvbi5jb25kaXRpb25TdWJncmFwaFZhbHVlUmVzb2x1dGlvbih7IHZhbHVlLCBncmFwaCwgdHJhdmVyc2VDYWxsQ29udGV4dCB9KVxuICAgICAgYnJlYWtcbiAgICBjYXNlICdwcm9wZXJ0aWVzJzpcbiAgICAgIHJlc29sdmVkVmFsdWUgPSB2YWx1ZS5zb3VyY2UucHJvcGVydGllc1xuICAgICAgYnJlYWtcbiAgICBjYXNlICdub2RlJzpcbiAgICAgIHJlc29sdmVkVmFsdWUgPSB2YWx1ZS5zb3VyY2VcbiAgICAgIGJyZWFrXG4gICAgY2FzZSAndmFsdWVQcm9wZXJ0eSc6XG4gICAgZGVmYXVsdDpcbiAgICAgIHJlc29sdmVkVmFsdWUgPSB2YWx1ZS5zb3VyY2UucHJvcGVydGllcy52YWx1ZVxuICAgICAgYnJlYWtcbiAgfVxuICByZXR1cm4gcmVzb2x2ZWRWYWx1ZVxufVxuXG4vKlxuICAgIF9fX18gICAgICAgICAgICAgICAgXyBfIF8gICBfICAgICAgICAgICAgIFxuICAgLyBfX198X19fICBfIF9fICAgX198IChfKSB8XyhfKSBfX18gIF8gX18gIFxuICB8IHwgICAvIF8gXFx8ICdfIFxcIC8gX2AgfCB8IF9ffCB8LyBfIFxcfCAnXyBcXCBcbiAgfCB8X198IChfKSB8IHwgfCB8IChffCB8IHwgfF98IHwgKF8pIHwgfCB8IHxcbiAgIFxcX19fX1xcX19fL3xffCB8X3xcXF9fLF98X3xcXF9ffF98XFxfX18vfF98IHxffFxuICAgU2VsZWN0aXZlIC8gQ29uZGl0aW9uYWxcbiovXG4vKipcbiAqIEByZXR1cm4ge05vZGUgT2JqZWN0fSAtIGEgbm9kZSBvYmplY3QgY29udGFpbmluZyBkYXRhLlxuIFRoZSBjb25kaXRpb24gc3ViZ3JhcGggcmV0dXJucyBhIGJvb2xlYW4gdmFsdWUuXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBjb25kaXRpb25TdWJncmFwaFZhbHVlUmVzb2x1dGlvbih7IHZhbHVlLCBncmFwaCwgdHJhdmVyc2VDYWxsQ29udGV4dCB9KSB7XG4gIGxldCByZXNvbHZlZFZhbHVlXG4gIC8vIFJ1biByZWZlcmVuY2Ugbm9kZSBpbiBhIHNlcGFyYXRlIHRyYXZlcnNhbCByZWN1cnNpdmUgc2NvcGVzLCBhbmQgcmV0dXJuIHJlc3VsdC5cbiAgLy8gdHJhdmVyc2UgdGhlIGRlc3RpbmF0aW9uIGFuZCBleHRyYWN0IG5vZGUgZnJvbSB0aGUgcmVzdWx0IHZhbHVlLlxuICBsZXQgcmVzdWx0VmFsdWVBcnJheSA9IGF3YWl0IGdyYXBoLnRyYXZlcnNlKFxuICAgIC8qIFRPRE86IE5vdGU6IHRoaXMgaXMgYSBxdWljayBpbXBsZW1lbnRhdGlvbiBiZWNhdXNlIGRpZ2dpbmcgaW50byB0aGUgY29yZSBjb2RlIGlzIHRpbWUgY29uc3VtaW5nLCB0aGUgZGlmZmVyZW50IGNvbmNlcHRzIHVzZWQgaW4gaGVyZSBjb3VsZCBiZSBpbXByb3ZlZCBhbmQgYnVpbHQgdXBvbiBvdGhlciBhbHJlYWR5IGV4aXN0aW5nIGNvbmNlcHRzOiBcbiAgICAgICAgICAgVE9ETzogY3JlYXRlIGFuIGluc3RhbmNlIGdyYXBoIGZyb20gdGhlIGN1cnJlbnQgZ3JhcGgsIHRvIGFsbG93IHBhc3NpbmcgYWRkaXRpb25hbCBjb250ZXh0IHBhcmFtZXRycy5cbiAgICAgICAgICAgICAgIOKAoiAndHJhdmVyc2FsQ2FsbENvbnRleHQnIC0gdGhlIDJuZCBwcm92aWRlZCBhcmd1bWVudCBjb3VsZCBiZSBpbnN0ZWFkIGFwcGxpZWQgYXMgYSByZWd1bGFyIENvbnRleHQgc3BlY2lmaWMgZm9yIHRoZSBjYWxsLCBieSBjcmVhdGluZyBhIG5ldyBncmFwaCBjaGFpbiB3aXRoIGl0J3MgdW5pcXVlIGNvbnRleHQsIGluIGFkZGl0aW9uIHRvIHRoZSBhbHJlYWR5IGV4aXN0aW5nIGNvbnRleHQgaW5zdGFuY2UuXG4gICAgICAgICAgIHdhcyB0aGlzIGRvbmUgPyB+fuKAoiBDb25kaXRpb25BZ2dyZWdhdG9yICYgdHJhdmVyc2VUaGVuUHJvY2Vzc1dpdGhMb2dpY2FsT3BlcmF0b3IgaW1wbGVtZW50YXRpb25zIGNvdWxkIGJlIGludGVncmF0dGVkIGludG8gdGhlIG90aGVyIGltcGxlbWVudGF0aW9ucy5+flxuICAgICAgICAgKi9cbiAgICB7XG4gICAgICBub2RlSW5zdGFuY2U6IHZhbHVlLnNvdXJjZSxcbiAgICAgIGltcGxlbWVudGF0aW9uS2V5OiB7XG4gICAgICAgIHByb2Nlc3NOb2RlOiAnZXhlY3V0ZUZ1bmN0aW9uUmVmZXJlbmNlJywgLy8gZGVmYXVsdCBpbXBsZW1lbnRhdGlvbiBmb3IgcHJvY2Vzc2luZyBzdGFnZXMgaW4gY29uZGl0aW9uIGdyYXBoLlxuICAgICAgICB0cmF2ZXJzYWxJbnRlcmNlcHRpb246ICd0cmF2ZXJzZVRoZW5Qcm9jZXNzV2l0aExvZ2ljYWxPcGVyYXRvcicsXG4gICAgICAgIGFnZ3JlZ2F0b3I6ICdDb25kaXRpb25BZ2dyZWdhdG9yJyxcbiAgICAgIH0sXG4gICAgfSxcbiAgICB7XG4gICAgICB0cmF2ZXJzZUNhbGxDb250ZXh0OiB7XG4gICAgICAgIHRhcmdldE5vZGU6ICh0cmF2ZXJzZUNhbGxDb250ZXh0ICYmIHRyYXZlcnNlQ2FsbENvbnRleHQudGFyZ2V0Tm9kZSkgfHwgdmFsdWUuZGVzdGluYXRpb24sIC8vIHBhc3MgdGhlIG5vZGUgcmVxdWVzdGluZyB0aGUgcmVzb2x1dGlvbiBvZiB0aGUgcmVyb3V0ZSBub2RlIGlmIGl0IGV4aXN0cywgb3IgdGhlIHJlcm91dGUgaXRzZWxmIGluIGNhc2UgY2FsbGVkIGFzIHJvb3QgbGV2ZWwgaW4gdGhlIHRyYXZlcnNhbC5cbiAgICAgIH0sXG4gICAgfSxcbiAgKSAvLyB0cmF2ZXJzZSBzdWJncmFwaCB0byByZXRyaWV2ZSBhIHJlZmVyZW5jZWQgbm9kZS5cblxuICBpZiAocmVzdWx0VmFsdWVBcnJheS5sZW5ndGggPiAxKSByZXNvbHZlZFZhbHVlID0gcmVzdWx0VmFsdWVBcnJheS5ldmVyeShpdGVtID0+IEJvb2xlYW4oaXRlbSkpXG4gIGVsc2UgaWYgKHJlc3VsdFZhbHVlQXJyYXkubGVuZ3RoICE9IDApIHJlc29sdmVkVmFsdWUgPSByZXN1bHRWYWx1ZUFycmF5WzBdXG4gIHJldHVybiByZXNvbHZlZFZhbHVlXG59XG5cbi8vIFRPRE86IGNvbmRpdGlvbiBzdWJncmFwaCB0aGF0IHJldHVybnMgbm9uLWJvb2xlYW4sIGZ1bmN0aW9ucyBmb3IgbWFraW5nIGNvbXBsZXggY29uZGl0aW9uIGNoZWNrcy5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBjb25kaXRpb25TdWJncmFwaFdpdGhOb25Cb29sZWFuVmFsdWVSZXNvbHV0aW9uKHsgdmFsdWUsIGdyYXBoLCB0cmF2ZXJzZUNhbGxDb250ZXh0IH0pIHt9XG4iXX0=