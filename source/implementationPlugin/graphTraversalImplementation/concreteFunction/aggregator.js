// Aggregates graph traversal results
export class AggregatorArray {
  value: Array
  constructor(initialValue: Array) {
    this.value = initialValue || []
    return this
  }
  // add item to aggregator
  add(item, aggregator = this) {
    // filter null and undefined
    // if (!item) throw new Error(`• Returned undefined or null result of data processing.`)
    if (item) aggregator.value.push(item) && aggregator
    else aggregator
    // return aggregator.value.unshift(item) // insert at start
  }
  // merge aggregators
  merge(additionalAggregatorArray: [Aggregator], targetAggregator: Aggregator = this) {
    for (let additionalAggregator of additionalAggregatorArray) {
      targetAggregator.value = [...targetAggregator.value, ...additionalAggregator.value]
    }
    return targetAggregator
  }
}

export class ConditionCheck {
  value: Boolean
  constructor(initialValue) {
    this.value = initialValue || true // assume true till check fails.
    return this
  }
}
