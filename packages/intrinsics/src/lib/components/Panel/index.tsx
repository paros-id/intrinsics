import { createBitComponent } from "../../Polymorphism";
import classNames from "../../classnames";

import "./style.scss";

export default createBitComponent<{}, "div">("Panel", ({
    as,
    className,
    ...props
}, ref) => {
    const Component = as || "div";

    return (
        <Component ref={ref} className={classNames("panel", className)} {...props} />
    );
});
