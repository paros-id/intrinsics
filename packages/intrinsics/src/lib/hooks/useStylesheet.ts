import React from "react";

let cache: Record<string, HTMLLinkElement> = {};

export const useStylesheet = (url: string, destroy = false) => {
    React.useEffect(() => {
        let elem = cache[url];

        if(!elem) {
            elem = document.createElement("link");
            elem.rel = "stylesheet";
            elem.href = url;

            document.head.appendChild(elem);
            cache[url] = elem;
        }

        if(destroy) return () => {
            if(document.head.contains(elem) && cache[url]) {
                elem.remove();
                delete cache[url];
            }
        };
    }, [ url ]);
};

export default useStylesheet;
