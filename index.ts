import { RetoolRPC } from "retoolrpc";

console.log("Hello world", RetoolRPC);
const rpc = new RetoolRPC({
  version: "0.0.1",
  apiToken: "test",
  host: "https://test.retool.com",
  resourceId: "...",
  environmentName: "production",
  pollingIntervalMs: 1000,
  pollingTimeoutMs: 5000,
  logLevel: "info",
});

rpc.register({
  name: "retoolRpcTest",
  arguments: {
    test: { type: "string", description: "Test Argument", required: true },
  },
  implementation: async (args, context) => {
    return {
      message: `Hello world, you provided ${args.test}`,
      context,
    };
  },
});
void rpc.listen();
