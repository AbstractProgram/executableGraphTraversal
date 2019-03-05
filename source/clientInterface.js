import assert from 'assert'
import { linkConstructor } from './prototypeChain/linkConstructor.js'
import { add, execute, conditional } from '@dependency/commonPattern/source/decoratorUtility.js'
import { createProxyHandlerReflectedToTargetObject, addRequiredPropertyForConstructorProxy } from '@dependency/commonPattern/source/proxyUtility.js'
import { shallowMergeNonExistingPropertyOnly } from './utility/shallowObjectMerge.js'

// Responsible for configuration management during GraphController initialization.
@execute({ staticMethod: 'initializeStaticClass', args: [], self: true })
class GraphControllerConfiguration {

    // on creation of instance choose class implementation.
    static constructorPrototypeChain = { // items must be related to the same constructor chain.
        GraphController:  null, 
        Node: null, 
        DataItem: null
    }; // class prototype chian with default implementation. 
    static defaultClientInterfaceInstance;

    static initializeStaticClass(self) { // Overcome restrictions in initialization of static variables where 'self' is not defained (solves the case where `const self = class { /* self is not defined */ }`).
        self.constructorPrototypeChain = linkConstructor({})
        self.defaultClientInterfaceInstance = new self({ constructorPrototypeChain: self.constructorPrototypeChain })
    }

    constructorPrototypeChain = {}
    pluginInstance = {}
    contextInstance = {}

    constructor(option = {}) {
        const instance = this, self = instance.constructor
        let { pluginInstance, contextInstance, constructorPrototypeChain } = option           
        if(!constructorPrototypeChain) constructorPrototypeChain = self.constructorPrototypeChain // checks for `null` too.

        if(constructorPrototypeChain) { // verify that all required components present
            assert(constructorPrototypeChain.GraphController, '`constructorPrototypeChain` object must contain `GraphController` property.')
            assert(constructorPrototypeChain.Node, '`constructorPrototypeChain` object must contain `Node` property.')
            assert(constructorPrototypeChain.DataItem, '`constructorPrototypeChain` object must contain `DataItem` property.')
        }
        
        // set instance properties or overwrite existing ones.
        instance.constructorPrototypeChain = constructorPrototypeChain
        instance.pluginInstance = pluginInstance
        instance.contextInstance = contextInstance
        return instance
    }

    /**
     * Graph controller initialization - GraphController isn't consumed directly, rather through this method.
     */
    static constructGraphInstance({
        interfaceInstance = GraphControllerConfiguration.defaultClientInterfaceInstance, // used to extract GraphController parameters
        argumentList
    } = {}) {
        let { GraphController, Node, DataItem } =  interfaceInstance.constructorPrototypeChain,     
            pluginInstance = interfaceInstance.pluginInstance,
            contextInstance = interfaceInstance.contextInstance, // traversalImplementationType: 'aggregateIntoArray' 
            cacheInstance = interfaceInstance.cacheInstance;

        // assert(this.databaseModelAdapter, '• `databaseModelAdapter` Should be set. either default `rethinkdbConnection` parameter for the default adapter object is not set, or adapter is missing.' )

        // attach context and plugins to the Controller - allowing custom prototypal chain creation on instance instantiation through usage of proxies. 
        let graphController = new GraphController({
            additionalDelegatedChain: {
                plugin: pluginInstance,
                context: contextInstance,
                cache: cacheInstance,
            },
            // TODO: Maybe create proxy and add the plugins to the proxy in some way to alter the behavior.
            // Node: new Proxy(Node, {}), 
            // DataItem: new Proxy(DataItem, {}), 
        })
        // GraphController.getSubclass('Node') // relies on the static method added to the class constructor.
        // controller.getSubclass('Node') // relies on the context added prototype function "getSubclass"
        
        return graphController.traverseGraph({ nodeKey: 'x' })

        // wrap instance construction with passed object context (thisArg.pluginInstance, thisArg.contextInstance) with plugin and context added to prototype chain.
        // let graphTraversalResult = graphController.traverseGraph(argumentsList)

        /** TODO: 
         * the returned node created, the proxy will wrap the instance in the new prototype chain. 
         * While subsequent internal calls, won't be affected.
         * => Therefore the constructors used by the controller to create internal instances should be configurable. 
        */
        
        // return graphTraversalResult
    }
}

/** 
 * The client interface allows to interact with the module in multiple ways. i.e. it doesn't contain the core logic, but the wiring simplifying the configuration & usage of the different componenets of this module.
 * It defines: 
 *      - The initialization behavior - e.g. through instantiation (executing interface as constructor with `new` keyword) or executing the interface by calling (executing interface as function).
 *              • Apply => Create constructor with specific implementation, manipulating the behavior of the instance creation. 
 *              • Construct => Create instance from default class. E.g. Node subclass instance.
 *      - Sets default parameters for the different components of the module.
 *      - Manages interface instances allowing to create new interface from a previously configured interface instance. (TODO: This feature could be separated as its own module)
 *      - Provides a consistent exposed client interface - allowing easier refactoring of internal components when needed.
 */
class ClientInterfaceClass extends GraphControllerConfiguration {

    constructor(...args) {
        super(...args)
        const instance = this
        return { 
            instance, // for internal usage inside this file.
            get proxiedInstance() {
                return instance.createInstanceProxy()
            }
        }
    }

    createInstanceProxy({ instance = this } = {}) {
        const self = instance.constructor
        // proxy handler reflects all opertaions to instance object and adds additional 'construct' & 'apply' operations.
        let reflectedInstanceTrap = createProxyHandlerReflectedToTargetObject({ target: instance })
        let proxyHandler = Object.assign(
            reflectedInstanceTrap, 
            {
                // set new properties or overwrite existing.
                apply(target, thisArg, argumentList) {
                    // create a new clientInterface using the current ClientInterface instance.
                    let clientInterface = self.createNewInstanceWithInitialInstanceValue({ baseInstance: instance, constructorArgumentList: argumentList })
                    return clientInterface
                }, 
                construct(target /* the function used in proxy */, argumentList, proxiedInterfaceInstance) {
                    return self.constructGraphInstance({ argumentList, interfaceInstance: proxiedInterfaceInstance })
                }
            }
        )
        proxyHandler = addRequiredPropertyForConstructorProxy({ proxyHandler }) // IMPORTANT: ensures that constructor proxy traps comply with Ecmascript proxy specification.
        return new Proxy(function() {} /* Constructable - Enables traps for 'apply' & 'construct' */, proxyHandler)
    }

    /* Create new interface instance using another passed instance as an initial object (using an instance as a base for creating another one). */
    static createNewInstanceWithInitialInstanceValue({ baseInstance, constructorArgumentList }) {
        const self = ClientInterfaceClass
        let { instance: newInstance, proxiedInstance } = new self(...constructorArgumentList)
        // if(constructorArgumentList[0].x == '3') console.log(newInstance)
        shallowMergeNonExistingPropertyOnly({ baseObject: baseInstance, targetObject: newInstance })
        return proxiedInstance
    }
    
}
export const Graph = new Proxy(ClientInterfaceClass, {
    apply(target, thisArg, argumentsList) {
        let { proxiedInstance: configuredInterface } = new ClientInterfaceClass(...argumentsList)
        return configuredInterface

        // // Choose to create a cached context or anonymous garbage collected one.
        // const MC = ModuleContext({ cacheReferenceName: `ModuleContext-${'1'}` /*  used to combine all related contexts under same object */ })
        // // Create new context for the modules using proxy. And cache them with unique names if 'cacheName' is set.
        // const connectClassPrototypeProxied = new MC({ target: connectClassPrototype, cacheName: (cacheName) ? `${cacheName}` : null  })

        // Rethinkdb default adapter: 
        // import { rethinkDBModelAdapter } from './implementation/databaseModelAdapter/rethinkDBModelAdapter.js'
        // rethinkdbConnection, // for default adapter in case model is not passed
        // // set database model for interacting with database during graph traversal. Either the default database or the passed adapter
        // if(!databaseModelAdapter && rethinkdbConnection)
        //     databaseModelAdapter = rethinkDBModelAdapter({ rethinkdbConnection })
    }, 
    // bypass `ClientInterfaceClass` proxy.
    construct(target, argumentList, proxiedInterfaceClass) {
        return GraphControllerConfiguration.constructGraphInstance({ argumentList })
    }
})