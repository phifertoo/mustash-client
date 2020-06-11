const initialState = {
  currentStep: 9,
  address: {
    street: "555 s flower",
    city: "los angeles",
    state: "ca",
    zip: "90017",
  },
  type: "lot",
  size: {
    length: 0,
    width: 0,
    height: 0,
  },
  content: ["large"],
  frequency: "daily",
  access: "24/7",
  price: 200,
  description: "hello",
  images: { image1: "", image2: "", image3: "", image4: "", image5: "" },
  title: "goodbye",
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case "SET_DIMENSIONS":
      return {
        ...state,
        size: {
          length: payload.length,
          width: payload.width,
          height: payload.height,
        },
      };
    case "SET_TYPE":
      return {
        ...state,
        type: payload,
      };
    case "SET_ADDRESS":
      return {
        ...state,
        address: {
          street: payload.street,
          city: payload.city,
          state: payload.state,
          zip: Number(payload.zip),
        },
      };
    case "SET_CONTENT":
      return {
        ...state,
        content: payload,
      };
    case "SET_FREQUENCY":
      return {
        ...state,
        frequency: payload,
      };
    case "SET_ACCESS":
      return {
        ...state,
        access: payload,
      };
    case "SET_TITLEDESCRIPTION":
      return {
        ...state,
        title: payload.title,
        description: payload.description,
      };
    case "SET_PRICE":
      return {
        ...state,
        price: Number(payload),
      };
    case "SET_IMAGES":
      return {
        ...state,
        // images: payload,
        images: {
          image1: payload.image1,
          image2: payload.image2,
          image3: payload.image3,
          image4: payload.image4,
          image5: payload.image5,
        },
      };
    case "NEXT_STEP":
      return { ...state, currentStep: payload + 1 };
    case "PREVIOUS_STEP":
      if (payload.currentStep !== 0) {
        return { ...state, currentStep: payload - 1 };
      }
      break;
    case "SET_STEP":
      return {
        ...state,
        currentStep: payload,
      };
    default:
      return state;
  }
}
