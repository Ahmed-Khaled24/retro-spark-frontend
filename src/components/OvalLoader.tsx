import { type FC } from "react";
import { Oval } from "react-loader-spinner";

interface OvalLoaderProps {
    size?: number;
    color?: string;
    strokeWidth?: number;
}
const OvalLoader: FC<OvalLoaderProps> = ({
    size = 80,
    color = "#ff6f61",
    strokeWidth = 2,
}) => {
    return (
        <Oval
            height={size}
            width={size}
            color={color}
            visible={true}
            ariaLabel="oval-loading"
            secondaryColor={color}
            strokeWidth={strokeWidth}
            strokeWidthSecondary={strokeWidth}
        />
    );
};

export default OvalLoader;
