import React, { useState } from "react";
import {
	Container,
	Stepper,
	Step,
	StepButton,
	Stack,
	Button,
	Box,
} from "@mui/material";

import AddLocation from "./addLocation/AddLocation";
import AddDetails from "./addDetails/AddDetails";
import AddImages from "./addImages/AddImages";

// This component contains the stepper
const AddRoom = () => {
	const [activeStep, setActiveStep] = useState(0);
	const [steps, setSteps] = useState([
		{ label: "Location", completed: false },
		{ label: "Details", completed: false },
		{ label: "Images", completed: false },
	]);

	const handleNext = () => {
		// Checks if active step is not the last step
		if (activeStep < steps.length - 1) {
			return setActiveStep((activeStep) => activeStep + 1);
		} else {
			// Checks if it is the last step:
			const stepIndex = findUnfinished();
			setActiveStep(stepIndex);
		}
	};

	const checkDisabled = () => {
		// Checks if active step is not the last step
		if (activeStep < steps.length - 1) {
			return false;
		}
		// If we are on the last step we have to find the index of any step which is not completed yet
		const index = findUnfinished();
		// If all the steps are completed we retain - 1
		if (index !== -1) {
			// If index is not -1 there are still uncompleted steps
			return false;
		}
		// If index is -1 all the steps are completed.
		return true; // This disables the next button
	};
	const findUnfinished = () => {
		// If we are on the last step we have to find the index of any step which is not completed yet
		return steps.findIndex((step) => !step.completed);
	};

	return (
		<Container sx={{ my: 4 }}>
			<Stepper
				alternativeLabel // Adds labels undernath the buttons no beside it
				nonLinear // This makes stepper flexiible
				activeStep={activeStep}
				sx={{ mb: 3 }}
			>
				{steps.map((step, index) => (
					<Step key={step.label} completed={step.completed}>
						<StepButton onClick={() => setActiveStep(index)}>
							{step.label}
						</StepButton>
					</Step>
				))}
			</Stepper>
			<Box>
				{
					{
						0: <AddLocation />,
						1: <AddDetails />,
						2: <AddImages />,
					}[activeStep]
				}
			</Box>
			<Stack
				direction="row"
				sx={{ pt: 2, pb: 7, justifyContent: "space-around" }}
			>
				<Button
					color="inherit"
					disabled={!activeStep} // If active step is 0 this will be true. Disabled
					onClick={
						() => setActiveStep((activeStep) => activeStep - 1) // This decreases the active step by 1
					}
				>
					Back
				</Button>
				<Button
					disabled={checkDisabled()} // We have to invoke it with every click
					onClick={handleNext}
				>
					Next
				</Button>
			</Stack>
		</Container>
	);
};

export default AddRoom;
