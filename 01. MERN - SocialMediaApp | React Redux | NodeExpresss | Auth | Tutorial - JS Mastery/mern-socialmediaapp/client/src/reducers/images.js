import { CREATE_IMAGE } from "../constants/actionTypes";

const imagesReducer = (images = [], action) => {
	switch (
		action.type // i..e "CREATE"...
	) {
		case CREATE_IMAGE:
			return [...images, action.payload]; // Updating the state in store
		default:
			return images;
	}
};

export default imagesReducer;
