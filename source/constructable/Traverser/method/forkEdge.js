"use strict";var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");Object.defineProperty(exports, "__esModule", { value: true });exports.forkEdge = forkEdge;var _assert = _interopRequireDefault(require("assert"));
var schemeReference = _interopRequireWildcard(require("../../../dataModel/graphSchemeReference.js"));








async function* forkEdge({ stageNode, additionalChildNode, getImplementation, nestedTraversalCallParameter }) {var _context;
  const { forkArray } = await (_context = this.graph.database, this.graph.database.getFork).call(_context, { nodeID: stageNode.identity });
  if (forkArray.length == 0) return;

  forkArray.sort((former, latter) => former.connection.properties.order - latter.connection.properties.order || isNaN(former.connection.properties.order) - isNaN(latter.connection.properties.order));

  for (let forkEdge of forkArray) {
    (0, _assert.default)(forkEdge.destination.labels.includes(schemeReference.nodeLabel.port), `• "${forkEdge.destination.labels}" Unsupported node type for a FORK connection.`);


    let implementation = getImplementation(forkEdge.destination.properties.implementation);
    let nodeIterator = implementation.call(this, { forkEdge, additionalChildNode });

    let traversalIterator = this.traversalIteration.call(this, { nodeIteratorFeed: nodeIterator, nestedTraversalCallParameter });

    yield {
      group: {
        traversalIterator,

        config: {
          forkEdge,
          handlePropagationImplementationKey: forkEdge.connection.properties.handlePropagationImplementation } } };



  }
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NvdXJjZS9jb25zdHJ1Y3RhYmxlL1RyYXZlcnNlci9tZXRob2QvZm9ya0VkZ2UuanMiXSwibmFtZXMiOlsiZm9ya0VkZ2UiLCJzdGFnZU5vZGUiLCJhZGRpdGlvbmFsQ2hpbGROb2RlIiwiZ2V0SW1wbGVtZW50YXRpb24iLCJuZXN0ZWRUcmF2ZXJzYWxDYWxsUGFyYW1ldGVyIiwiZm9ya0FycmF5IiwiZ3JhcGgiLCJkYXRhYmFzZSIsImdldEZvcmsiLCJub2RlSUQiLCJpZGVudGl0eSIsImxlbmd0aCIsInNvcnQiLCJmb3JtZXIiLCJsYXR0ZXIiLCJjb25uZWN0aW9uIiwicHJvcGVydGllcyIsIm9yZGVyIiwiaXNOYU4iLCJkZXN0aW5hdGlvbiIsImxhYmVscyIsImluY2x1ZGVzIiwic2NoZW1lUmVmZXJlbmNlIiwibm9kZUxhYmVsIiwicG9ydCIsImltcGxlbWVudGF0aW9uIiwibm9kZUl0ZXJhdG9yIiwidHJhdmVyc2FsSXRlcmF0b3IiLCJ0cmF2ZXJzYWxJdGVyYXRpb24iLCJub2RlSXRlcmF0b3JGZWVkIiwiZ3JvdXAiLCJjb25maWciLCJoYW5kbGVQcm9wYWdhdGlvbkltcGxlbWVudGF0aW9uS2V5IiwiaGFuZGxlUHJvcGFnYXRpb25JbXBsZW1lbnRhdGlvbiJdLCJtYXBwaW5ncyI6Im1SQUFBO0FBQ0E7Ozs7Ozs7OztBQVNPLGdCQUFnQkEsUUFBaEIsQ0FBeUIsRUFBRUMsU0FBRixFQUFhQyxtQkFBYixFQUFrQ0MsaUJBQWxDLEVBQXFEQyw0QkFBckQsRUFBekIsRUFBOEc7QUFDbkgsUUFBTSxFQUFFQyxTQUFGLEtBQWdCLE1BQU0saUJBQUtDLEtBQUwsQ0FBV0MsUUFBWCxFQUFxQixLQUFLRCxLQUFMLENBQVdDLFFBQVgsQ0FBb0JDLE9BQXpDLGlCQUFpRCxFQUFFQyxNQUFNLEVBQUVSLFNBQVMsQ0FBQ1MsUUFBcEIsRUFBakQsQ0FBNUI7QUFDQSxNQUFJTCxTQUFTLENBQUNNLE1BQVYsSUFBb0IsQ0FBeEIsRUFBMkI7O0FBRTNCTixFQUFBQSxTQUFTLENBQUNPLElBQVYsQ0FBZSxDQUFDQyxNQUFELEVBQVNDLE1BQVQsS0FBb0JELE1BQU0sQ0FBQ0UsVUFBUCxDQUFrQkMsVUFBbEIsQ0FBNkJDLEtBQTdCLEdBQXFDSCxNQUFNLENBQUNDLFVBQVAsQ0FBa0JDLFVBQWxCLENBQTZCQyxLQUFsRSxJQUEyRUMsS0FBSyxDQUFDTCxNQUFNLENBQUNFLFVBQVAsQ0FBa0JDLFVBQWxCLENBQTZCQyxLQUE5QixDQUFMLEdBQTRDQyxLQUFLLENBQUNKLE1BQU0sQ0FBQ0MsVUFBUCxDQUFrQkMsVUFBbEIsQ0FBNkJDLEtBQTlCLENBQS9KOztBQUVBLE9BQUssSUFBSWpCLFFBQVQsSUFBcUJLLFNBQXJCLEVBQWdDO0FBQzlCLHlCQUFPTCxRQUFRLENBQUNtQixXQUFULENBQXFCQyxNQUFyQixDQUE0QkMsUUFBNUIsQ0FBcUNDLGVBQWUsQ0FBQ0MsU0FBaEIsQ0FBMEJDLElBQS9ELENBQVAsRUFBOEUsTUFBS3hCLFFBQVEsQ0FBQ21CLFdBQVQsQ0FBcUJDLE1BQU8sZ0RBQS9HOzs7QUFHQSxRQUFJSyxjQUFjLEdBQUd0QixpQkFBaUIsQ0FBQ0gsUUFBUSxDQUFDbUIsV0FBVCxDQUFxQkgsVUFBckIsQ0FBZ0NTLGNBQWpDLENBQXRDO0FBQ0EsUUFBSUMsWUFBWSxHQUFTRCxjQUFOLFlBQXFCLEVBQUV6QixRQUFGLEVBQVlFLG1CQUFaLEVBQXJCLENBQW5COztBQUVBLFFBQUl5QixpQkFBaUIsR0FBUyxLQUFLQyxrQkFBWCxZQUE4QixFQUFFQyxnQkFBZ0IsRUFBRUgsWUFBcEIsRUFBa0N0Qiw0QkFBbEMsRUFBOUIsQ0FBeEI7O0FBRUEsVUFBTTtBQUNKMEIsTUFBQUEsS0FBSyxFQUFFO0FBQ0xILFFBQUFBLGlCQURLOztBQUdMSSxRQUFBQSxNQUFNLEVBQUU7QUFDTi9CLFVBQUFBLFFBRE07QUFFTmdDLFVBQUFBLGtDQUFrQyxFQUFFaEMsUUFBUSxDQUFDZSxVQUFULENBQW9CQyxVQUFwQixDQUErQmlCLCtCQUY3RCxFQUhILEVBREgsRUFBTjs7OztBQVVEO0FBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgYXNzZXJ0IGZyb20gJ2Fzc2VydCdcbmltcG9ydCAqIGFzIHNjaGVtZVJlZmVyZW5jZSBmcm9tICcuLi8uLi8uLi9kYXRhTW9kZWwvZ3JhcGhTY2hlbWVSZWZlcmVuY2UuanMnXG5cbi8qKlxuICogQGRlc2NyaXB0aW9uIGxvb3BzIHRocm91Z2ggYWxsIHRoZSBgbm9kZSBwb3J0c2AgYW5kIGluaXRpYWxpemVzIGVhY2ggb25lIHRvIGV4ZWN1dGUgdGhlIGBub2RlIGNvbm5lY3Rpb25zYCBzcGVjaWZpYyBmb3IgaXQuXG4gKiBAeWllbGQgIHtpdGVyYXRvciBmZWVkIG9mIG9iamVjdH0gbm9kZXMgZ3JvdXAgb2JqZWN0IC0gbmVzdGVkIG9iamVjdCBjb250YWluaW5nIEZvcmsvUG9ydCBpdGVyYXRvciB3aXRoIG5lc3RlZCBOZXh0L1N0YWdlIGl0ZXJhdG9yIGZvciBlYWNoLlxuICogVE9ETzogYWRkIGFiaWxpdHkgdG8gcGFzcyB0cmF2ZXJzYWwgY29uZmlndXJhdGlvbiB0byBhIGdyb3VwIG9mIGNvbm5lY3Rpb25zLiBFYWNoIHBvcnQgaG9sZHMgdHJhdmVyc2FsIGNvZmlncyB0aGF0IHNob3VsZCBhZmZlY3QgYWxsIGNvbm5lY3Rpb24gY29ubmVjdGVkIHRvIHRoaXMgcG9ydC5cbiAqIE9SXG4gKiBAcmV0dXJuIHt1bmRlZmluZWR9IGluIGNhc2Ugbm8gZm9ya3MuXG4gKiovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24qIGZvcmtFZGdlKHsgc3RhZ2VOb2RlLCBhZGRpdGlvbmFsQ2hpbGROb2RlLCBnZXRJbXBsZW1lbnRhdGlvbiwgbmVzdGVkVHJhdmVyc2FsQ2FsbFBhcmFtZXRlciB9KSB7XG4gIGNvbnN0IHsgZm9ya0FycmF5IH0gPSBhd2FpdCB0aGlzLmdyYXBoLmRhdGFiYXNlOjp0aGlzLmdyYXBoLmRhdGFiYXNlLmdldEZvcmsoeyBub2RlSUQ6IHN0YWdlTm9kZS5pZGVudGl0eSB9KVxuICBpZiAoZm9ya0FycmF5Lmxlbmd0aCA9PSAwKSByZXR1cm5cbiAgLy8gQnVsayBhY3Rpb25zIG9uIGZvcmtzIC0gc29ydCBmb3Jrc1xuICBmb3JrQXJyYXkuc29ydCgoZm9ybWVyLCBsYXR0ZXIpID0+IGZvcm1lci5jb25uZWN0aW9uLnByb3BlcnRpZXMub3JkZXIgLSBsYXR0ZXIuY29ubmVjdGlvbi5wcm9wZXJ0aWVzLm9yZGVyIHx8IGlzTmFOKGZvcm1lci5jb25uZWN0aW9uLnByb3BlcnRpZXMub3JkZXIpIC0gaXNOYU4obGF0dGVyLmNvbm5lY3Rpb24ucHJvcGVydGllcy5vcmRlcikpIC8vIHVzaW5nIGBvcmRlcmAgcHJvcGVydHlcblxuICBmb3IgKGxldCBmb3JrRWRnZSBvZiBmb3JrQXJyYXkpIHtcbiAgICBhc3NlcnQoZm9ya0VkZ2UuZGVzdGluYXRpb24ubGFiZWxzLmluY2x1ZGVzKHNjaGVtZVJlZmVyZW5jZS5ub2RlTGFiZWwucG9ydCksIGDigKIgXCIke2ZvcmtFZGdlLmRlc3RpbmF0aW9uLmxhYmVsc31cIiBVbnN1cHBvcnRlZCBub2RlIHR5cGUgZm9yIGEgRk9SSyBjb25uZWN0aW9uLmApIC8vIHZlcmlmeSBub2RlIHR5cGVcblxuICAgIC8vIGdldCBub2RlIGl0ZWFydG9yIGZyb20gXCJwb3J0Tm9kZVwiIGltcGxlbWVuYXRpb24gLSBlLmcuIFwibmVzdGVkTm9kZVwiXG4gICAgbGV0IGltcGxlbWVudGF0aW9uID0gZ2V0SW1wbGVtZW50YXRpb24oZm9ya0VkZ2UuZGVzdGluYXRpb24ucHJvcGVydGllcy5pbXBsZW1lbnRhdGlvbikgLy8gVHJhdmVyc2FsIGltcGxlbWVudGF0aW9uIC0gbm9kZS9lZGdlIHByb3BlcnRpZXMgaW1wbGVtZW50YXRpb24gaGllcmFyY2h5IC0gY2FsY3VsYXRlIGFuZCBwaWNrIGNvcnJlY3QgaW1wbGVtZW50YXRpb24gYWNjb3JkaW5nIHRvIHBhcmFtZXRlciBoaWVyYXJjaHkuXG4gICAgbGV0IG5vZGVJdGVyYXRvciA9IHRoaXM6OmltcGxlbWVudGF0aW9uKHsgZm9ya0VkZ2UsIGFkZGl0aW9uYWxDaGlsZE5vZGUgfSlcbiAgICAvLyBwaXBlIG5vZGUgaXRyYXRvciB0byBjcmVhdGUgYSB0cmF2ZXJzYWwgaXRlcmF0b3IgKHdoZXJlIHRyYXZlcnNhbCBpbnZvY2F0aW9uIGNhbGxiYWNrIGlzIHByb3ZpZGVkKVxuICAgIGxldCB0cmF2ZXJzYWxJdGVyYXRvciA9IHRoaXM6OnRoaXMudHJhdmVyc2FsSXRlcmF0aW9uKHsgbm9kZUl0ZXJhdG9yRmVlZDogbm9kZUl0ZXJhdG9yLCBuZXN0ZWRUcmF2ZXJzYWxDYWxsUGFyYW1ldGVyIH0pXG5cbiAgICB5aWVsZCB7XG4gICAgICBncm91cDoge1xuICAgICAgICB0cmF2ZXJzYWxJdGVyYXRvcixcbiAgICAgICAgLy8gbm9kZXMgZ3JvdXAgY29uZmlndXJhdGlvbiBhbmQgaW5mb1xuICAgICAgICBjb25maWc6IHtcbiAgICAgICAgICBmb3JrRWRnZSxcbiAgICAgICAgICBoYW5kbGVQcm9wYWdhdGlvbkltcGxlbWVudGF0aW9uS2V5OiBmb3JrRWRnZS5jb25uZWN0aW9uLnByb3BlcnRpZXMuaGFuZGxlUHJvcGFnYXRpb25JbXBsZW1lbnRhdGlvbixcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfVxuICB9XG59XG4iXX0=