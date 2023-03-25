import { useEffect, useMemo } from "react";

function useStyles(
    getStyles: () => string,
    deps: any[] = []
) {
    const elem = useMemo(() => {
        const element = document.createElement("style");
        element.innerHTML = getStyles();
        return element;
    }, deps);

    useEffect(() => {
        document.head.appendChild(elem);

        return () => {
            document.head.removeChild(elem)
        };
    }, [ elem ]);
}

export default useStyles;
