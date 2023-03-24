import { ComponentPropsWithoutRef, ElementType, forwardRef, Ref } from "react";

export type PolyProps<C extends ElementType, P = {}> = P & (
    { as?: C } & ComponentPropsWithoutRef<C>
);

export type BitProps<C extends ElementType, P = {}> = PolyProps<C, P> & {
    className?: string;
    children?: any;
    ref?: Ref<C>;
};

export type BitComponent<P, T extends ElementType> = <C extends ElementType = T>(props: BitProps<C, P>, ref?: any) => any;

/**
 * With this fun little TS trick, we suddenly add built-in props to a component
 * without explicitly declaring or importing them. Clean magic!
 */
export function createBitComponent<P extends {}, C extends ElementType>(name: string, component: BitComponent<P, C>) {
    Object.defineProperty(component, "name", { writable: false, value: name });
    return forwardRef(component) as any as BitComponent<P, C>;
}
