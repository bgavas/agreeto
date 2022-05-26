/// <reference types="@remix-run/dev" />
/// <reference types="@remix-run/node/globals" />

declare module "@remix-run/node" {
  import type {
    DataFunctionArgs,
    LinksFunction,
    MetaFunction,
  } from "@remix-run/node";
  export * from "@remix-run/node/index";

  export type LoadContext = {};

  type DataFunctionArgsWithContext = Omit<DataFunctionArgs, "context"> & {
    context: LoadContext;
  };

  export type ActionArguments = DataFunctionArgsWithContext;
  export type LoaderArguments = DataFunctionArgs;

  export type ErrorBoundaryProps = { error: Error };
  export type LinksResult = ReturnType<LinksFunction>;
  export type MetaParameters = Parameters<MetaFunction>[0];
  export type MetaResult = ReturnType<MetaFunction>;
}
