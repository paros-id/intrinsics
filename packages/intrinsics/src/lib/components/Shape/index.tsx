import { Ref } from "react";
import { createBitComponent } from "../../Polymorphism";
import classNames from "../../classnames";

import "./style.scss";

export type Shapes = "square" | "circle" | "rectangle" | "squircle";
export type AspectRatios = "1x1" | "1x2" | "2x1" | "3x2" | "2x3" | "4x3" | "3x4" | "16x9" | "9x16" | "21x9" | "9x21";

export type Props = {
    innerRef?: Ref<HTMLDivElement>;
    shape?: Shapes;
    /**
     * Only for shape="rectangle"
     */
    ratio?: AspectRatios;
};

export default createBitComponent<Props, "div">("Shape", ({
    as,
    innerRef,
    shape = "rectangle",
    ratio = "16x9",
    children,
    className,
    ...props
}, ref) => {
    const Component = as || "div";

    return (
        <Component ref={ref} className={classNames("shape", `is-${shape}`, `is-ratio-${ratio}`, className)} {...props}>
            <div ref={innerRef} className="inner">{children}</div>
        </Component>
    );
});
