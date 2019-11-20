"use strict";var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");Object.defineProperty(exports, "__esModule", { value: true });exports.stageNode = void 0;var _events = _interopRequireDefault(require("events"));






const { stageNode } = {



















  async stageNode(
  {
    graphInstance = this,
    nodeInstance,
    traversalConfig,
    traversalDepth = 0,
    path = null,
    additionalChildNode = [],

    eventEmitter = new _events.default(),
    aggregator } =
  {},
  { parentTraversalArg = null, traverseCallContext = {} } = {})
  {var _ref;
    let { implementation } = traversalConfig.calculateConfig({ graphInstance });
    let traversalInterceptionImplementation = implementation.traversalInterception || (targetFunction => new Proxy(targetFunction, {}));
    aggregator || (aggregator = new (implementation.aggregator.bind(nodeInstance))());


    const processDataCallback = ({ nextProcessData, additionalParameter }) =>
    graphInstance.executeEdge.call(graphInstance,
    {
      stageNode: nodeInstance,
      nextProcessData,
      traversalConfig,
      aggregator,
      getImplementation: (implementationKey) =>
      traversalConfig.getImplementationCallback({ key: 'processNode', graphInstance })({
        nodeImplementationKey: implementationKey ? { processNode: implementationKey } : undefined }),

      graphInstance },

    { additionalParameter, traverseCallContext });






    let groupIterator = graphInstance.forkEdge.call(graphInstance, {
      stageNode: nodeInstance,
      getImplementation: (implementationKey) =>
      traversalConfig.getImplementationCallback({ key: 'portNode', graphInstance })({ nodeImplementationKey: implementationKey ? { portNode: implementationKey } : undefined }),
      additionalChildNode });



    let proxifiedRecursiveIteration = (_ref = graphInstance.traverseGroupIterationRecursiveCall.bind(graphInstance), traversalInterceptionImplementation.call(graphInstance, _ref));
    let result = await proxifiedRecursiveIteration({
      groupIterator,
      processDataCallback,
      aggregator,
      nodeInstance,
      traversalDepth,
      eventEmitter,
      traversalConfig,
      additionalChildNode,
      parentTraversalArg: arguments,
      traverseCallContext });


    return result;
  } };exports.stageNode = stageNode;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NvdXJjZS9jb25zdHJ1Y3RhYmxlL0dyYXBoL21ldGhvZC9zdGFnZU5vZGUuanMiXSwibmFtZXMiOlsic3RhZ2VOb2RlIiwiZ3JhcGhJbnN0YW5jZSIsIm5vZGVJbnN0YW5jZSIsInRyYXZlcnNhbENvbmZpZyIsInRyYXZlcnNhbERlcHRoIiwicGF0aCIsImFkZGl0aW9uYWxDaGlsZE5vZGUiLCJldmVudEVtaXR0ZXIiLCJFdmVudEVtaXR0ZXIiLCJhZ2dyZWdhdG9yIiwicGFyZW50VHJhdmVyc2FsQXJnIiwidHJhdmVyc2VDYWxsQ29udGV4dCIsImltcGxlbWVudGF0aW9uIiwiY2FsY3VsYXRlQ29uZmlnIiwidHJhdmVyc2FsSW50ZXJjZXB0aW9uSW1wbGVtZW50YXRpb24iLCJ0cmF2ZXJzYWxJbnRlcmNlcHRpb24iLCJ0YXJnZXRGdW5jdGlvbiIsIlByb3h5IiwicHJvY2Vzc0RhdGFDYWxsYmFjayIsIm5leHRQcm9jZXNzRGF0YSIsImFkZGl0aW9uYWxQYXJhbWV0ZXIiLCJleGVjdXRlRWRnZSIsImdldEltcGxlbWVudGF0aW9uIiwiaW1wbGVtZW50YXRpb25LZXkiLCJnZXRJbXBsZW1lbnRhdGlvbkNhbGxiYWNrIiwia2V5Iiwibm9kZUltcGxlbWVudGF0aW9uS2V5IiwicHJvY2Vzc05vZGUiLCJ1bmRlZmluZWQiLCJncm91cEl0ZXJhdG9yIiwiZm9ya0VkZ2UiLCJwb3J0Tm9kZSIsInByb3hpZmllZFJlY3Vyc2l2ZUl0ZXJhdGlvbiIsInRyYXZlcnNlR3JvdXBJdGVyYXRpb25SZWN1cnNpdmVDYWxsIiwicmVzdWx0IiwiYXJndW1lbnRzIl0sIm1hcHBpbmdzIjoiMkxBQUE7Ozs7Ozs7QUFPTyxNQUFNLEVBQUVBLFNBQUYsS0FBZ0I7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBb0IzQixRQUFNQSxTQUFOO0FBQ0U7QUFDRUMsSUFBQUEsYUFBYSxHQUFHLElBRGxCO0FBRUVDLElBQUFBLFlBRkY7QUFHRUMsSUFBQUEsZUFIRjtBQUlFQyxJQUFBQSxjQUFjLEdBQUcsQ0FKbkI7QUFLRUMsSUFBQUEsSUFBSSxHQUFHLElBTFQ7QUFNRUMsSUFBQUEsbUJBQW1CLEdBQUcsRUFOeEI7O0FBUUVDLElBQUFBLFlBQVksR0FBRyxJQUFJQyxlQUFKLEVBUmpCO0FBU0VDLElBQUFBLFVBVEY7QUFVSSxJQVhOO0FBWUUsSUFBRUMsa0JBQWtCLEdBQUcsSUFBdkIsRUFBNkJDLG1CQUFtQixHQUFHLEVBQW5ELEtBQTBELEVBWjVEO0FBYUU7QUFDQSxRQUFJLEVBQUVDLGNBQUYsS0FBcUJULGVBQWUsQ0FBQ1UsZUFBaEIsQ0FBZ0MsRUFBRVosYUFBRixFQUFoQyxDQUF6QjtBQUNBLFFBQUlhLG1DQUFtQyxHQUFHRixjQUFjLENBQUNHLHFCQUFmLEtBQXlDQyxjQUFjLElBQUksSUFBSUMsS0FBSixDQUFVRCxjQUFWLEVBQTBCLEVBQTFCLENBQTNELENBQTFDO0FBQ0FQLElBQUFBLFVBQVUsS0FBVkEsVUFBVSxHQUFLLEtBQW1CRyxjQUFjLENBQUNILFVBQWxDLE1BQUtQLFlBQUwsSUFBTCxDQUFWOzs7QUFHQSxVQUFNZ0IsbUJBQW1CLEdBQUcsQ0FBQyxFQUFFQyxlQUFGLEVBQW1CQyxtQkFBbkIsRUFBRDtBQUNYbkIsSUFBQUEsYUFBYSxDQUFDb0IsV0FBN0IsTUFBQXBCLGFBQWE7QUFDWDtBQUNFRCxNQUFBQSxTQUFTLEVBQUVFLFlBRGI7QUFFRWlCLE1BQUFBLGVBRkY7QUFHRWhCLE1BQUFBLGVBSEY7QUFJRU0sTUFBQUEsVUFKRjtBQUtFYSxNQUFBQSxpQkFBaUIsRUFBRSxDQUFBQyxpQkFBaUI7QUFDbENwQixNQUFBQSxlQUFlLENBQUNxQix5QkFBaEIsQ0FBMEMsRUFBRUMsR0FBRyxFQUFFLGFBQVAsRUFBc0J4QixhQUF0QixFQUExQyxFQUFpRjtBQUMvRXlCLFFBQUFBLHFCQUFxQixFQUFFSCxpQkFBaUIsR0FBRyxFQUFFSSxXQUFXLEVBQUVKLGlCQUFmLEVBQUgsR0FBd0NLLFNBREQsRUFBakYsQ0FOSjs7QUFTRTNCLE1BQUFBLGFBVEYsRUFEVzs7QUFZWCxNQUFFbUIsbUJBQUYsRUFBdUJULG1CQUF2QixFQVpXLENBRGY7Ozs7Ozs7QUFvQkEsUUFBSWtCLGFBQWEsR0FBa0I1QixhQUFhLENBQUM2QixRQUE3QixNQUFBN0IsYUFBYSxFQUF5QjtBQUN4REQsTUFBQUEsU0FBUyxFQUFFRSxZQUQ2QztBQUV4RG9CLE1BQUFBLGlCQUFpQixFQUFFLENBQUFDLGlCQUFpQjtBQUNsQ3BCLE1BQUFBLGVBQWUsQ0FBQ3FCLHlCQUFoQixDQUEwQyxFQUFFQyxHQUFHLEVBQUUsVUFBUCxFQUFtQnhCLGFBQW5CLEVBQTFDLEVBQThFLEVBQUV5QixxQkFBcUIsRUFBRUgsaUJBQWlCLEdBQUcsRUFBRVEsUUFBUSxFQUFFUixpQkFBWixFQUFILEdBQXFDSyxTQUEvRSxFQUE5RSxDQUhzRDtBQUl4RHRCLE1BQUFBLG1CQUp3RCxFQUF6QixDQUFqQzs7OztBQVFBLFFBQUkwQiwyQkFBMkIsV0FBa0IvQixhQUFhLENBQUNnQyxtQ0FBaEMsTUFBR2hDLGFBQUgsR0FBc0ZhLG1DQUF0RixNQUF1RWIsYUFBdkUsUUFBL0I7QUFDQSxRQUFJaUMsTUFBTSxHQUFHLE1BQU1GLDJCQUEyQixDQUFDO0FBQzdDSCxNQUFBQSxhQUQ2QztBQUU3Q1gsTUFBQUEsbUJBRjZDO0FBRzdDVCxNQUFBQSxVQUg2QztBQUk3Q1AsTUFBQUEsWUFKNkM7QUFLN0NFLE1BQUFBLGNBTDZDO0FBTTdDRyxNQUFBQSxZQU42QztBQU83Q0osTUFBQUEsZUFQNkM7QUFRN0NHLE1BQUFBLG1CQVI2QztBQVM3Q0ksTUFBQUEsa0JBQWtCLEVBQUV5QixTQVR5QjtBQVU3Q3hCLE1BQUFBLG1CQVY2QyxFQUFELENBQTlDOzs7QUFhQSxXQUFPdUIsTUFBUDtBQUNELEdBbEYwQixFQUF0QixDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEV2ZW50RW1pdHRlciBmcm9tICdldmVudHMnXG5cbi8qKlxuICogU3RhZ2Ugbm9kZSBpcyBhbiBlbnRyeXBvaW50IG5vZGUgdGhhdCB0aGUgZ3JhcGggdHJhdmVyc2FsIGNhbiBiZSBzdGFydGVkIGZyb20uXG4gKiBAcmV0dXJuIHtBbnl9IGEgcmVzdWx0IHdoaWNoIGNvdWxkIGJlIGFuIGFycmF5IG9yIGEgc3RyaW5nLCBldGMuIEFjY29yZGluZyB0byB0aGUgQWdncmVnYXRpb24gJiB0cmF2ZXJzYWwgaW50ZXJjZXB0aW9uIGltcGxlbWVudGF0aW9uIHVzZWQuXG4gKi9cbi8vIE5vdGU6IHdyYXBwaW5nIGluIG9iamVjdCBhbGxvd3MgdGhlIHVzYWdlIG9mIGRlY29yYXRvcnMgYXMgdGhleSBjb3VsZG4ndCBiZSB1c2VkIG9uIHNlcGFyYXRlIGZ1bmN0aW9ucy5cbmV4cG9ydCBjb25zdCB7IHN0YWdlTm9kZSB9ID0ge1xuICAvKiogXG4gICAqIEFuIGFwcHJvYWNoIHRvIHNldCBkZWZhdWx0IHBhcmFtZXRlcnMgZm9yIHRoZSBmdW5jdGlvbi5cbiAgICogQHByb3hpZnlNZXRob2REZWNvcmF0b3IoKHRhcmdldCwgdGhpc0FyZywgYXJndW1lbnRzTGlzdCwgdGFyZ2V0Q2xhc3MsIG1ldGhvZE5hbWUpID0+IHtcbiAgICAvLyBzZXQgZGVmYXVsdCBwYXJhbWV0ZXJzIGFuZCBleHBvc2UgdGhlbSB0byBzdWJzZXF1ZW50IG1ldGhvZCBkZWNvcmF0b3JzLiAtIGRlZXAgbWVyZ2Ugb2YgbmVzdGVkIHBhcmFtZXRlclxuICAgIGFyZ3VtZW50c0xpc3QgPSBtZXJnZURlZmF1bHRQYXJhbWV0ZXIoe1xuICAgICAgcGFzc2VkQXJnOiBhcmd1bWVudHNMaXN0LFxuICAgICAgZGVmYXVsdEFyZzogW1xuICAgICAgICB7XG4gICAgICAgICAgZ3JhcGhJbnN0YW5jZTogdGhpc0FyZyxcbiAgICAgICAgICB0cmF2ZXJzYWxEZXB0aDogMCxcbiAgICAgICAgICBwYXRoOiBudWxsLFxuICAgICAgICAgIGFkZGl0aW9uYWxDaGlsZE5vZGU6IFtdLFxuICAgICAgICB9LFxuICAgICAgICB7IHBhcmVudFRyYXZlcnNhbEFyZzogbnVsbCB9LFxuICAgICAgXSxcbiAgICB9KVxuICAgIHJldHVybiBSZWZsZWN0LmFwcGx5KHRhcmdldCwgdGhpc0FyZywgYXJndW1lbnRzTGlzdClcbiAgfSkgXG4gICovXG4gIGFzeW5jIHN0YWdlTm9kZShcbiAgICB7XG4gICAgICBncmFwaEluc3RhbmNlID0gdGhpcywgLy8gPHR5cGUgR3JhcGg+XG4gICAgICBub2RlSW5zdGFuY2UsXG4gICAgICB0cmF2ZXJzYWxDb25maWcsXG4gICAgICB0cmF2ZXJzYWxEZXB0aCA9IDAsIC8vIDx0eXBlIE51bWJlcj4gbGV2ZWwgb2YgcmVjdXJzaW9uIC0gYWxsb3dzIHRvIGlkZW50aWZ5IGVudHJ5cG9pbnQgbGV2ZWwgKHRvcGxldmVsKSB0aGF0IG5lZWRzIHRvIHJldHVybiB0aGUgdmFsdWUgb2YgYWdncmVnYXRvci5cbiAgICAgIHBhdGggPSBudWxsLCAvLyBwYXRoIHRvIHRoZSBjdXJyZW50IHRyYXZlcnNhbC4gIC8vIFRPRE86IGltcGxlbWVudCBwYXRoIHNlcXVlbmNlIHByZXNlcnZhdGlvbi4gYWxsb3cgZm9yIHRoZSBub2RlIHRyYXZlcnNlIGZ1bmN0aW9uIHRvIHJlbHkgb24gdGhlIGN1cnJlbnQgcGF0aCBkYXRhLlxuICAgICAgYWRkaXRpb25hbENoaWxkTm9kZSA9IFtdLCAvLyBjaGlsZCBub2RlcyB0byBhZGQgdG8gdGhlIGN1cnJlbnQgbm9kZSdzIGNoaWxkcmVuLiBUaGVzZSBhcmUgYWRkZWQgaW5kaXJlY3RseSB0byBhIG5vZGUgd2l0aG91dCBjaGFuZ2luZyB0aGUgbm9kZSdzIGNoaWxkcmVuIGl0c2VsZiwgYXMgYSB3YXkgdG8gZXh0ZW5kIGN1cnJlbnQgbm9kZXMuXG4gICAgICAvLyBzdXBwb3J0ZWQgZXZlbnRzOiAnbm9kZVRyYXZlcnNhbENvbXBsZXRlZCdcbiAgICAgIGV2ZW50RW1pdHRlciA9IG5ldyBFdmVudEVtaXR0ZXIoKSwgLy8gY3JlYXRlIGFuIGV2ZW50IGVtaXR0ZXIgdG8gY2F0Y2ggZXZlbnRzIGZyb20gbmVzdGVkIG5vZGVzIG9mIHRoaXMgbm9kZSBkdXJpbmcgdGhlaXIgdHJhdmVyc2Fscy5cbiAgICAgIGFnZ3JlZ2F0b3IsIC8vIHVzZWQgdG8gYWdncmVnYXRlIHJlc3VsdHMgb2YgbmVzdGVkIG5vZGVzLlxuICAgIH0gPSB7fSxcbiAgICB7IHBhcmVudFRyYXZlcnNhbEFyZyA9IG51bGwsIHRyYXZlcnNlQ2FsbENvbnRleHQgPSB7fSB9ID0ge30sXG4gICkge1xuICAgIGxldCB7IGltcGxlbWVudGF0aW9uIH0gPSB0cmF2ZXJzYWxDb25maWcuY2FsY3VsYXRlQ29uZmlnKHsgZ3JhcGhJbnN0YW5jZSB9KVxuICAgIGxldCB0cmF2ZXJzYWxJbnRlcmNlcHRpb25JbXBsZW1lbnRhdGlvbiA9IGltcGxlbWVudGF0aW9uLnRyYXZlcnNhbEludGVyY2VwdGlvbiB8fCAodGFyZ2V0RnVuY3Rpb24gPT4gbmV3IFByb3h5KHRhcmdldEZ1bmN0aW9uLCB7fSkpIC8vIGluIGNhc2Ugbm8gaW1wbGVtZW50YXRpb24gZXhpc3RzIGZvciBpbnRlcmNlcHRpbmcgdHJhdmVyc2FsLCB1c2UgYW4gZW1wdHkgcHJveHkuXG4gICAgYWdncmVnYXRvciB8fD0gbmV3IChub2RlSW5zdGFuY2U6OmltcGxlbWVudGF0aW9uLmFnZ3JlZ2F0b3IpKClcblxuICAgIC8vIEVYRUNVVEUgZWRnZVxuICAgIGNvbnN0IHByb2Nlc3NEYXRhQ2FsbGJhY2sgPSAoeyBuZXh0UHJvY2Vzc0RhdGEsIGFkZGl0aW9uYWxQYXJhbWV0ZXIgfSkgPT5cbiAgICAgIGdyYXBoSW5zdGFuY2U6OmdyYXBoSW5zdGFuY2UuZXhlY3V0ZUVkZ2UoXG4gICAgICAgIHtcbiAgICAgICAgICBzdGFnZU5vZGU6IG5vZGVJbnN0YW5jZSxcbiAgICAgICAgICBuZXh0UHJvY2Vzc0RhdGEsXG4gICAgICAgICAgdHJhdmVyc2FsQ29uZmlnLFxuICAgICAgICAgIGFnZ3JlZ2F0b3IsXG4gICAgICAgICAgZ2V0SW1wbGVtZW50YXRpb246IGltcGxlbWVudGF0aW9uS2V5ID0+XG4gICAgICAgICAgICB0cmF2ZXJzYWxDb25maWcuZ2V0SW1wbGVtZW50YXRpb25DYWxsYmFjayh7IGtleTogJ3Byb2Nlc3NOb2RlJywgZ3JhcGhJbnN0YW5jZSB9KSh7XG4gICAgICAgICAgICAgIG5vZGVJbXBsZW1lbnRhdGlvbktleTogaW1wbGVtZW50YXRpb25LZXkgPyB7IHByb2Nlc3NOb2RlOiBpbXBsZW1lbnRhdGlvbktleSB9IDogdW5kZWZpbmVkLFxuICAgICAgICAgICAgfSksXG4gICAgICAgICAgZ3JhcGhJbnN0YW5jZSxcbiAgICAgICAgfSxcbiAgICAgICAgeyBhZGRpdGlvbmFsUGFyYW1ldGVyLCB0cmF2ZXJzZUNhbGxDb250ZXh0IH0sXG4gICAgICApXG5cbiAgICAvKiogQ29yZSBmdW5jdGlvbmFsaXR5IHJlcXVpcmVkIGlzIHRvIHRyYXZlcnNlIG5vZGVzLCBhbnkgYWRkaXRpb25hbCBpcyBhZGRlZCB0aHJvdWdoIGludGVyY2VwdGluZyB0aGUgdHJhdmVyc2FsLlxuICAgICAqIEZPUksgZWRnZSAtIHRyYXZlcnNlIHN0YWdlIG5vZGUgdG8gb3RoZXIgbmV4dCBub2RlcyB0aHJvdWdoIHRoZSBwb3J0IG5vZGVzLlxuICAgICAqIEByZXR1cm4ge2l0ZXJhdG9yfSBwcm92aWRpbmcgbm9kZSBwYXJhbWV0ZXJzIGZvciByZWN1cnNpdmUgdHJhdmVyc2FsIGNhbGxzLlxuICAgICAqL1xuICAgIGxldCBncm91cEl0ZXJhdG9yID0gZ3JhcGhJbnN0YW5jZTo6Z3JhcGhJbnN0YW5jZS5mb3JrRWRnZSh7XG4gICAgICBzdGFnZU5vZGU6IG5vZGVJbnN0YW5jZSxcbiAgICAgIGdldEltcGxlbWVudGF0aW9uOiBpbXBsZW1lbnRhdGlvbktleSA9PlxuICAgICAgICB0cmF2ZXJzYWxDb25maWcuZ2V0SW1wbGVtZW50YXRpb25DYWxsYmFjayh7IGtleTogJ3BvcnROb2RlJywgZ3JhcGhJbnN0YW5jZSB9KSh7IG5vZGVJbXBsZW1lbnRhdGlvbktleTogaW1wbGVtZW50YXRpb25LZXkgPyB7IHBvcnROb2RlOiBpbXBsZW1lbnRhdGlvbktleSB9IDogdW5kZWZpbmVkIH0pLFxuICAgICAgYWRkaXRpb25hbENoaWxkTm9kZSxcbiAgICB9KVxuXG4gICAgLy8gaW50ZXJjZXB0IGFuZCByZXR1cm4gcmVzdWx0IChTdGFnZSBpbnRlcmNlcHRpb24pXG4gICAgbGV0IHByb3hpZmllZFJlY3Vyc2l2ZUl0ZXJhdGlvbiA9IGdyYXBoSW5zdGFuY2U6OmdyYXBoSW5zdGFuY2UudHJhdmVyc2VHcm91cEl0ZXJhdGlvblJlY3Vyc2l2ZUNhbGwgfD4gZ3JhcGhJbnN0YW5jZTo6dHJhdmVyc2FsSW50ZXJjZXB0aW9uSW1wbGVtZW50YXRpb25cbiAgICBsZXQgcmVzdWx0ID0gYXdhaXQgcHJveGlmaWVkUmVjdXJzaXZlSXRlcmF0aW9uKHtcbiAgICAgIGdyb3VwSXRlcmF0b3IsXG4gICAgICBwcm9jZXNzRGF0YUNhbGxiYWNrLFxuICAgICAgYWdncmVnYXRvcixcbiAgICAgIG5vZGVJbnN0YW5jZSxcbiAgICAgIHRyYXZlcnNhbERlcHRoLFxuICAgICAgZXZlbnRFbWl0dGVyLFxuICAgICAgdHJhdmVyc2FsQ29uZmlnLFxuICAgICAgYWRkaXRpb25hbENoaWxkTm9kZSxcbiAgICAgIHBhcmVudFRyYXZlcnNhbEFyZzogYXJndW1lbnRzLFxuICAgICAgdHJhdmVyc2VDYWxsQ29udGV4dCxcbiAgICB9KVxuXG4gICAgcmV0dXJuIHJlc3VsdFxuICB9LFxufVxuIl19