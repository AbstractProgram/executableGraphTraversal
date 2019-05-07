import { Entity } from '@dependency/entity'

interface GraphElementData {
  label: object;
  key: string | number;
  [key: string]: any; // optional other fields
}

export const GraphElement = new Entity.clientInterface({ description: 'GraphElement', instanceType: 'object' })

GraphElement.prototype
  |> (_ =>
    Object.assign(_, {
      getKey: function(key) {
        return this.key
      },
    }))

GraphElement.reference |> (_ => Object.assign(_, {}))

GraphElement[Reference.initialize.setter.list]({
  //* constructor that is made to work with the plugin functionality.
  key([{ key }: { key: string | number }], { instanceObject, prototypeDelegation }) {
    instanceObject.key = key
    let data = true || instanceObject.plugin.databaseModelAdapter({ key: instanceObject.key })
    Object.assign(instanceObject, data)
    return instanceObject
  },
})
GraphElement[Reference.constructor.setter.list]({
  plugin(args, { self = this, instanceObject }) {
    instanceObject ||= Object.create(GraphElement)
    //! Apply multiple inheritance from argument list instances.
    // instanceObject.prototypeDelegatedInstance = (...argumentList) => self::self.prototypeDelegatedInstance.construct(argumentList, { implementationKey: 'key' })
    return instanceObject
  },
})

// Create client interface
let configuredConstructable =
  GraphElement[Reference.constructor.switch]({ implementationKey: Reference.constructor.key.configuredConstructable })
  |> (g => {
    g.next('intermittent')
    return g.next({
      description: 'EntityConstructableForClientInterfaceData',
      initializeFallback: Reference.initialize.key.data,
    }).value
  })
GraphElement.clientInterfaceData =
  GraphElement[Reference.clientInterface.switch]({ implementationKey: Reference.clientInterface.key.prototypeConstruct })
  |> (g => {
    g.next('intermittent')
    return g.next({ configuredConstructable }).value
  })
