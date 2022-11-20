export const BOOKING_SUCCESSFUL = "BOOKING_SUCCESSFUL";
export const BOOKING = "BOOKING";
export const BOOKING_UNSUCCESSFUL = "BOOKING_UNSUCCESSFUL";

export const bookingAction = (payload) => {
  return {
    type: BOOKING,
    payload,
  };
};

export const bookingSuccessfulAction = () => {
  return {
    type: BOOKING_SUCCESSFUL
  };
};

export const bookingFailedAction = (errors) => {
  return {
    type: BOOKING_UNSUCCESSFUL,
    payload: {
      errors,
    },
  };
};
