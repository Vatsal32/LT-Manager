import { BOOKING_SUCCESSFUL, BOOKING_UNSUCCESSFUL } from "../actions/booking";

const initialState = {
  errors: {},
  booked: null,
};

const BookingReducer = (state = initialState, action) => {
  switch (action.type) {
    case BOOKING_SUCCESSFUL:
      return {
        ...state,
        booked: true,
        errors: {},
      };
    case BOOKING_UNSUCCESSFUL:

      return {
        ...state,
        booked: false,
        errors: {
          ...action.payload.errors,
        },
      };
    default:
      return state;
  }
};

export default BookingReducer;
