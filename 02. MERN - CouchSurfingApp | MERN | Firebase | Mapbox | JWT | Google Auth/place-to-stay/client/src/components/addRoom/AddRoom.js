import React, { useState, useEffect } from "react";
import {
	Container,
	Stepper,
	Step,
	StepButton,
	Stack,
	Button,
	Box,
} from "@mui/material";

import { useValue } from "../../context/ContextProvider";

import AddLocation from "./addLocation/AddLocation";
import AddDetails from "./addDetails/AddDetails";
import AddImages from "./addImages/AddImages";

// This component contains the stepper
const AddRoom = () => {
	// Retrieving the state to check wether the steps are completed or not
	const {
		state: { images, details },
	} = useValue();

	// This state sets a step as active. Blue step
	const [activeStep, setActiveStep] = useState(0);
	// This state contains an array of objects. Every object is a step
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

	// This function checks wether the  Next button has to be active or disabled
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

	// This checks whether images have been uploaded and the step therefore is completed.
	// Fires every time the images array in state changes
	useEffect(() => {
		// Checks if there are uploaded images
		if (images.length) {
			// Checks if the third step images completed state is still false
			if (!steps[2].completed) {
				// In this case we set it to true
				setComplete(2, true);
			}
		} else {
			// In case there are NO images we check if the completed state is already true
			if (steps[2].completed) {
				// In this case we set it back to false again
				setComplete(2, false);
			}
		}
	}, [images]);

	// This checks whether details have been filled in and the step therefore is completed.
	// Fires every time the details object in state changes
	useEffect(() => {
		// Checks if there are uploaded images
		if (details.title.length > 4 && details.description.length > 9) {
			// Checks if the second step details completed state is still false
			if (!steps[1].completed) {
				// In this case we set it to true
				setComplete(1, true);
			}
		} else {
			// In case there are NO details we check if the completed state is already true
			if (steps[1].completed) {
				// In this case we set it back to false again
				setComplete(1, false);
			}
		}
	}, [details]);

	// This function changes the complete - state of the steps.
	// The index is the index of the images object inside the steps state. The status can be true or false
	const setComplete = (index, status) => {
		// We recieve all the steps
		setSteps((steps) => {
			// We only change the completed state related to this index:
			steps[index].completed = status; // This could be true or false
			// Spreading the steps in an array and return it back:
			return [...steps];
		});
	};

	return (
		<Container sx={{ my: 4 }}>
			<Stepper
				alternativeLabel // Adds labels underneath the buttons no beside it
				nonLinear // This makes stepper flexible
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
					// This is a switch in JSX. Shows the component for every step.
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
					disabled={!activeStep} // If active step is 0 this will be true. Back button is disabled
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
