import React, {
	ReactNode,
	useState,
	forwardRef,
	ForwardRefRenderFunction,
	Ref,
} from "react";
import { Spin } from "antd";
import { SpinIndicator } from "antd/lib/spin";

interface DwSpinProps {
	children: ReactNode;
	ref: SpinIndicator;
}

interface DwSpinState {
	spinning: boolean;
}

const DwSpin = forwardRef<null, DwSpinProps>(({ children }, ref) => {
	console.log(ref);
	const [spinning, setSpinning] = useState<boolean>(false);
	return (
		<Spin spinning={spinning} ref={ref}>
			{children}
		</Spin>
	);
});

const useSpin = () => {
	return [];
};

export default DwSpin;
