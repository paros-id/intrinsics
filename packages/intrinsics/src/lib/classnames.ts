type ClassName = string | string[] | boolean | null | undefined;
export default function classNames(...classes: ClassName[]): string {
    return classes.reduce((classes: string[], className) => {
        if(!className) return classes;
        if(Array.isArray(className)) return [...classes, ...classNames(...className)];

        if(typeof className === "string") {
            classes.push(className);
        }

        return classes;
    }, []).join(" ");
}
