Demonstrates two issues with retoolrpc.

## First issue: commonjs module typescript checks

To reproduce:

1. Check out `main`
2. `npm install`
3. `npm run tsc`

Expected: no typescript errors

Actual: several errors:

```
$ npm run tsc

> retoolrpc-typescript-issue@1.0.0 tsc
> tsc

node_modules/retoolrpc/src/rpc.ts:151:20 - error TS2532: Object is possibly 'undefined'.

151         arguments: this._functions[functionName].arguments,
                       ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

node_modules/retoolrpc/src/rpc.ts:152:22 - error TS2532: Object is possibly 'undefined'.

152         permissions: this._functions[functionName].permissions,
                         ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

node_modules/retoolrpc/src/utils/schema.ts:27:13 - error TS18048: 'argDefinition' is possibly 'undefined'.

27         if (argDefinition.required) {
               ~~~~~~~~~~~~~

node_modules/retoolrpc/src/utils/schema.ts:34:13 - error TS18048: 'argDefinition' is possibly 'undefined'.

34         if (argDefinition.array) {
               ~~~~~~~~~~~~~

node_modules/retoolrpc/src/utils/schema.ts:40:88 - error TS18048: 'argDefinition' is possibly 'undefined'.

40           const parseValueTypeItems = argValue.map((item) => this.parseValueType(item, argDefinition.type))
                                                                                          ~~~~~~~~~~~~~

node_modules/retoolrpc/src/utils/schema.ts:42:84 - error TS18048: 'argDefinition' is possibly 'undefined'.

42             parsedErrors.push(`Argument "${argName}" should be an array of type "${argDefinition.type}".`)
                                                                                      ~~~~~~~~~~~~~

node_modules/retoolrpc/src/utils/schema.ts:47:69 - error TS18048: 'argDefinition' is possibly 'undefined'.

47           const parsedValueTypeItem = this.parseValueType(argValue, argDefinition.type)
                                                                       ~~~~~~~~~~~~~

node_modules/retoolrpc/src/utils/schema.ts:49:75 - error TS18048: 'argDefinition' is possibly 'undefined'.

49             parsedErrors.push(`Argument "${argName}" should be of type "${argDefinition.type}".`)
                                                                             ~~~~~~~~~~~~~


Found 8 errors in 2 files.

Errors  Files
     2  node_modules/retoolrpc/src/rpc.ts:151
     6  node_modules/retoolrpc/src/utils/schema.ts:27
```

As far as I understand, this happens because retoolrpc is not setting `main` correctly in package.json.

## Second issue: typescript issues under "moduleResolution": "bundler"

To reproduce:

1. Check out `bundler`
2. `npm install`
3. `npm run tsc`

Expected: no typescript errors

Actual: errors about not finding types

```
$ npm run tsc

> retoolrpc-typescript-issue@1.0.0 tsc
> tsc

index.ts:1:27 - error TS7016: Could not find a declaration file for module 'retoolrpc'. '/Users/noahgilmore/code/retoolrpc-typescript-issue/node_modules/retoolrpc/dist/index.mjs' implicitly has an 'any' type.
  There are types at '/Users/noahgilmore/code/retoolrpc-typescript-issue/node_modules/retoolrpc/index.ts', but this result could not be resolved when respecting package.json "exports". The 'retoolrpc' library may need to update its package.json or typings.

1 import { RetoolRPC } from "retoolrpc";
                            ~~~~~~~~~~~

index.ts:20:26 - error TS7006: Parameter 'args' implicitly has an 'any' type.

20   implementation: async (args, context) => {
                            ~~~~

index.ts:20:32 - error TS7006: Parameter 'context' implicitly has an 'any' type.

20   implementation: async (args, context) => {
                                  ~~~~~~~


Found 3 errors in the same file, starting at: index.ts:1
```

As far as I understand, this happens because retoolrpc is not setting `types` correctly in package.json.
