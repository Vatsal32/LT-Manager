import { APPROVE_BOOKING_FAILED, APPROVE_BOOKING_SUCCESSFUL, BOOKING_RESET, BOOKING_SUCCESSFUL, BOOKING_UNSUCCESSFUL } from "../actions/booking";

const initialState = {
  errors: {},
  booked: null,
  approved: null,
  approveErrors: {}
};

const BookingReducer = (state = initialState, action) => {
  switch (action.type) {
    case BOOKING_SUCCESSFUL:
      return {
        ...state,
        booked: action.payload.data,
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
    case BOOKING_RESET:
      return initialState;
    case APPROVE_BOOKING_FAILED: 
      return {
        ...state,
        approved: false,
        approveErrors: action.payload
      };
    case APPROVE_BOOKING_SUCCESSFUL:
      return {
        ...state,
        approved: true,
        approveErrors: {}
      };
    default:
      return state;
  }
};

export default BookingReducer;
