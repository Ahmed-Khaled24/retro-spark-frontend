import { type FC } from "react";
import { Oval } from "react-loader-spinner";

interface OvalLoaderProps {
    /**
     * @default 80
     */
    size?: number;
    /**
     * @default #ff6f61
     */
    color?: string;
    /**
     * @default 2
     */
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
