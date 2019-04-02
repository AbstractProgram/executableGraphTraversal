import { Entity } from './Entity.class.js'

interface GraphElementData {
  label: object;
  key: string | number;
  [key: string]: any; // optional other fields
}

export function GraphElementFunction({ superConstructor = null } = {}) {
  const self = function GraphElement() {
    assert(false, '• Construction should not reach the original function constructor, rather the proxy exposing its interface should deal with its behavior.')
  }

  // superConstructor == null ? extendFromNull(self) : extendFromConstructable(self, superConstructor)
  extendFromConstructable(self, Entity)

  self.prototype.entityImplementation = {}

  let selfInstance = new self()
  // console.log(selfInstance |> Object.getPrototypeOf |> Object.getPrototypeOf)
  const proxiedSelf = selfInstance::selfInstance.createClientInterface.construct()
  return proxiedSelf
}

export const GraphElement = Object.assign(Entity.prototypeDelegation)

Object.assign(GraphElement, {
  // get [Symbol.species]() {
  //   return GraphElement
  // },
  reference: {},
  prototypeDelegation: Object.create(null),
})

Object.assign(GraphElement.prototypeDelegation, {
  getKey: function(key) {
    return this.key
  },
})

GraphElement[Entity.reference.prototypeInstance.setter.prototypeDelegation]({
  prototypeDelegation: GraphElement.prototypeDelegation,
  entityClass: GraphElement,
})

GraphElement[Entity.reference.prototypeInstance.setter.instantiate]({
  [Entity.reference.prototypeInstance.fallbackImplementation.instantiatePrototypeInstanceKey]({ instanceObject, prototypeDelegation } = {}) {
    prototypeDelegation ||= GraphElement[Entity.reference.prototypeInstance.getter.prototypeDelegation]('prototypeDelegation')
    instanceObject ||= Object.create(prototypeDelegation)
    return instanceObject
  },
  [Entity.reference.prototypeInstance.fallbackImplementation.instantiateEntityInstanceKey]({ instanceObject, prototypeDelegation }) {
    prototypeDelegation ||= GraphElement[Entity.reference.prototypeInstance.getter.prototypeDelegation]('entityClass')
    instanceObject ||= Object.create(prototypeDelegation)
    return instanceObject
  },
})

GraphElement[Entity.reference.prototypeInstance.setter.initialize]({
  data([{ data }: { data: GraphElementData }], { instanceObject } = {}) {
    Object.assign(instanceObject, data) // apply data to instance
    return instanceObject
  },
  //* constructor that is made to work with the plugin functionality.
  key([{ key }: { key: string | number }], { instanceObject, prototypeDelegation }) {
    instanceObject.key = key
    let data = true || instanceObject.plugin.databaseModelAdapter({ key: instanceObject.key })
    Object.assign(instanceObject, data)
    return instanceObject
  },
})

GraphElement[Entity.reference.configuredConstructable.setter.construct]({
  plugin(args, { self = this, instanceObject }) {
    instanceObject ||= Object.create(GraphElement)
    //! Apply multiple inheritance from argument list instances.
    instanceObject.prototypeDelegatedInstance = (...argumentList) => self::self.prototypeDelegatedInstance.construct(argumentList, { implementationKey: 'key' })
    return instanceObject
  },
})

Object.assign(GraphElement, {
  clientInterface: GraphElement[Entity.reference.clientInterface.method.construct]([
    {
      configuredConstructable: GraphElement[Entity.reference.configuredConstructable.method.construct]([
        {
          instantiateImplementationKey: Entity.reference.prototypeInstance.fallbackImplementation.instantiatePrototypeInstanceKey,
          initializeImplementationKey: 'data',
        },
      ]),
    },
  ]),
})