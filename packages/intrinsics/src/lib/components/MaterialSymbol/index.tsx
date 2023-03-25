import { useId } from "react";

import { createBitComponent } from "../../Polymorphism";
import useStylesheet from "../../hooks/useStylesheet";
import useStyles from "../../hooks/useStyles";
import classNames from "../../classnames";

import "./style.scss";

const sheets = {
    "Outlined": "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200",
    "Rounded": "https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200",
    "Sharp": "https://fonts.googleapis.com/css2?family=Material+Symbols+Sharp:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200p"
};

export type IconVariant = "Outlined" | "Rounded" | "Sharp";

export type Props = {
    variant?: IconVariant;
    icon: string;

    fill?: 0 | 1;
    weight?: 100 | 200 | 300 | 400 | 500 | 600 | 700;
    grade?: -25 | 0 | 200;
    size?: 20 | 24 | 40 | 48;
};

export default createBitComponent<Props, "i">("MaterialSymbol", ({
    as,
    variant = "Outlined",
    className,
    icon,

    fill = 1,
    weight = 400,
    grade = 0,
    size = 48,

    ...props
}, ref) => {
    const uniqueId = "material-symbol" + useId().replaceAll(":", "-") + variant.toLowerCase();

    useStylesheet(sheets[variant]);
    useStyles(() => (`
        .${uniqueId} {
            font-family: 'Material Symbols ${variant}';
            font-variation-settings: 'FILL' ${fill}, 'wght' ${weight}, 'GRAD' ${grade}, 'opsz' ${size};
        }
    `), [ fill, weight, grade, size, variant ]);

    const Component = as || "i";

    return (
        <Component {...props} ref={ref}
            className={classNames("material-symbol", uniqueId, className)}
            children={icon} />
    );
});
