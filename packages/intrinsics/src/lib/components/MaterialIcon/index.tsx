import { createBitComponent } from "../../Polymorphism";
import useStylesheet from "../../hooks/useStylesheet";
import classNames from "../../classnames";

import "./style.scss";

const sheets = {
    "normal": "https://fonts.googleapis.com/icon?family=Material+Icons",
    "outline": "https://fonts.googleapis.com/icon?family=Material+Icons+Outlined",
    "round": "https://fonts.googleapis.com/icon?family=Material+Icons+Round",
    "twotone": "https://fonts.googleapis.com/icon?family=Material+Icons+Two+Tone",
    "sharp": "https://fonts.googleapis.com/icon?family=Material+Icons+Sharp"
};

export type IconVariant = "normal" | "outline" | "round" | "twotone" | "sharp";

export type Props = {
    variant?: IconVariant;
    icon: string;
};

export default createBitComponent<Props, "i">("MaterialIcon", ({
    as,
    variant = "normal",
    className,
    icon,
    ...props
}, ref) => {
    useStylesheet(sheets[variant]);

    const Component = as || "i";

    return (
        <Component {...props} ref={ref}
            className={classNames("material-icon", `variant-${variant}`, className)}
            children={icon} />
    );
});
