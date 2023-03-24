import { createBitComponent } from "../../Polymorphism";
import classNames from "../../classnames";

import "./style.scss";

export type Props = {
    vertical?: boolean;
};

export default createBitComponent<Props, "span">("Divider", ({
    as,
    className,
    vertical = false,
    ...props
}, ref) => {
    const Component = as || "span";

    return (
        <Component ref={ref} className={classNames("divider", vertical && "is-vertical", className)} {...props} />
    );
});
