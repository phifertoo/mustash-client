import axios from 'axios';

const initialState = {
  currentStep: 8,
  address: {
    street: '555 s flower',
    city: 'los angeles',
    state: 'ca',
    zip: '90017',
  },
  type: 'lot',
  size: {
    length: 0,
    width: 0,
    height: 0,
  },
  content: ['large'],
  frequency: 'daily',
  access: '24/7',
  price: 200,
  description: 'hello',
  images: { image1: '', image2: '', image3: '', image4: '', image5: '' },
  title: 'goodbye',
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case 'SET_DIMENSIONS':
      return {
        ...state,
        size: {
          length: payload.length,
          width: payload.width,
          height: payload.height,
        },
      };
    case 'SET_TYPE':
      return {
        ...state,
        type: payload,
      };
    case 'SET_ADDRESS':
      return {
        ...state,
        address: {
          street: payload.street,
          city: payload.city,
          state: payload.state,
          zip: Number(payload.zip),
        },
      };
    case 'SET_CONTENT':
      return {
        ...state,
        content: payload,
      };
    case 'SET_FREQUENCY':
      return {
        ...state,
        frequency: payload,
      };
    case 'SET_ACCESS':
      return {
        ...state,
        access: payload,
      };
    case 'SET_TITLEDESCRIPTION':
      return {
        ...state,
        title: payload.title,
        description: payload.description,
      };
    case 'SET_PRICE':
      return {
        ...state,
        price: Number(payload),
      };
    case 'SET_IMAGES':
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
    case 'NEXT_STEP':
      return { ...state, currentStep: payload + 1 };
    case 'PREVIOUS_STEP':
      if (payload.currentStep !== 0) {
        return { ...state, currentStep: payload - 1 };
      }
      break;
    case 'SET_STEP':
      return {
        ...state,
        currentStep: payload,
      };
    default:
      return state;
  }
}

export const nextStep = (currentStep) => (dispatch) => {
  try {
    dispatch({ type: 'NEXT_STEP', payload: currentStep });
  } catch (err) {
    dispatch({ type: 'NEXTSTEP_FAIL' });
  }
};

export const previousStep = (currentStep) => (dispatch) => {
  try {
    dispatch({ type: 'PREVIOUS_STEP', payload: currentStep });
  } catch (err) {
    dispatch({ type: 'PREVIOUSSTEP_FAIL' });
  }
};

export const setStep = (currentStep) => (dispatch) => {
  try {
    dispatch({ type: 'SET_STEP', payload: currentStep });
  } catch (err) {
    dispatch({ type: 'SETSTEP_FAIL' });
  }
};

export const setProperty = (type, property) => (dispatch) => {
  try {
    dispatch({ type: `SET_${type.toUpperCase()}`, payload: property });
  } catch (err) {
    dispatch({ type: 'SETPROPERTY_FAIL' });
  }
};

export const submitSpace = (data) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
      'x-auth-token': data.token,
    },
  };

  const body = new FormData();

  Object.keys(data).forEach((element) => {
    if (element !== 'size' || element !== 'images') {
      body.append(element, data[element]);
    }
  });

  const images = data.images;
  /* when creating multiple blobs using an async function inside of the map method and you need to wait
   until all the async functions finish using "await Promise.all()" */
  await Promise.all(
    Object.keys(images).map(async (element) => {
      if (images[element] !== '')
        body.append(
          `${element}`,

          await fetch(data.images[element]).then((r) => r.blob()) //convert blob URL to blob
        );
    })
  );
  Object.keys(data.size).map((
    element //since the sizes are nested, we have to un-nest the size data
  ) => body.append(element, data.size[element]));

  try {
    const res = await axios.post('/api/listing', body, config);
    dispatch({ type: 'SUBMITSPACE_SUCCESS', payload: res.data });
    return res;
  } catch (err) {
    dispatch({ type: 'SUBMITSPACE_FAIL' });
    console.log(err.response.data.errors);
  }
};
