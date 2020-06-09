import axios from "axios";

export const nextStep = (currentStep) => (dispatch) => {
  try {
    dispatch({ type: "NEXT_STEP", payload: currentStep });
  } catch (err) {
    dispatch({ type: "NEXTSTEP_FAIL" });
  }
};

export const previousStep = (currentStep) => (dispatch) => {
  try {
    dispatch({ type: "PREVIOUS_STEP", payload: currentStep });
  } catch (err) {
    dispatch({ type: "[REVIOUSSTEP_FAIL" });
  }
};

export const setStep = (currentStep) => (dispatch) => {
  try {
    dispatch({ type: "SET_STEP", payload: currentStep });
  } catch (err) {
    dispatch({ type: "SETSTEP_FAIL" });
  }
};

export const setDimensions = (dimensions) => (dispatch) => {
  try {
    dispatch({ type: "SET_DIMENSIONS", payload: dimensions });
  } catch (err) {
    dispatch({ type: "DIMENSIONS_FAIL" });
  }
};

export const setType = (type) => (dispatch) => {
  try {
    dispatch({ type: "SET_TYPE", payload: type });
  } catch (err) {
    dispatch({ type: "TYPE_FAIL" });
  }
};

export const setAddress = (address) => (dispatch) => {
  try {
    dispatch({ type: "SET_ADDRESS", payload: address });
  } catch (err) {
    dispatch({ type: "ADDRESS_FAIL" });
  }
};

export const setContent = (content) => (dispatch) => {
  try {
    dispatch({ type: "SET_CONTENT", payload: content });
  } catch (err) {
    dispatch({ type: "CONTENT_FAIL" });
  }
};

export const setFrequency = (frequency) => (dispatch) => {
  try {
    dispatch({ type: "SET_FREQUENCY", payload: frequency });
  } catch (err) {
    dispatch({ type: "FREQUENCY_FAIL" });
  }
};

export const setAccess = (access) => (dispatch) => {
  try {
    dispatch({ type: "SET_ACCESS", payload: access });
  } catch (err) {
    dispatch({ type: "ACCESS_FAIL" });
  }
};

export const setTitleDescription = (titleDescription) => (dispatch) => {
  try {
    dispatch({ type: "SET_TITLEDESCRIPTION", payload: titleDescription });
  } catch (err) {
    dispatch({ type: "TITLEDESCRIPTION_FAIL" });
  }
};

export const setPrice = (price) => (dispatch) => {
  try {
    dispatch({ type: "SET_PRICE", payload: price });
  } catch (err) {
    dispatch({ type: "PRICE_FAIL" });
  }
};

export const setImages = (images) => (dispatch) => {
  try {
    dispatch({ type: "SET_IMAGES", payload: images });
  } catch (err) {
    dispatch({ type: "IMAGES_FAIL" });
  }
};

export const submitSpace = (data) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      "x-auth-token":
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXIiOiI1ZWJlNGE1ZjQ0YjBlYzJjZTg0Mjk0YzIifSwiaWF0IjoxNTkxNTU5NzA1LCJleHAiOjE1OTE2NTk3MDV9.Gez1w3ZPyXk8CMok99lkx0wKxMnVlN4F6znvw6oRtgg  ",
    },
  };

  const body = new FormData();

  Object.keys(data).forEach((element) => {
    if (element !== "size" || element !== "images") {
      body.append(element, data[element]);
    }
  });

  const images = data.images;
  /* when creating multiple blobs using an async function inside of the map method and you need to wait
   until all the async functions finish using "await Promise.all()" */
  await Promise.all(
    Object.keys(images).map(async (element) => {
      if (images[element] !== "")
        body.append(
          `${element}`,

          await fetch(data.images[element]).then((r) => r.blob()) //convert blob URL to blob
        );
    })
  );

  Object.keys(data.size).map((element) =>
    body.append(element, data.size[element])
  );

  // let reader = new FileReader();
  // reader.readAsDataURL(blob); // converts the blob to base64 and calls onload
  // reader.onload = function () {
  //   data[element] = JSON.stringify(reader.result);
  // };
  //   }
  // });

  // Object.keys(images).map((element, index) => {
  //   const reader = new FileReader();
  //   reader.readAsDataURL(images[element]);
  //   reader.onloadend = () => {
  //     data.images[element] = reader.result;
  //   };
  // });

  try {
    const res = await axios.post("/api/listing", body, config);
    dispatch({ type: "SUBMITSPACE_SUCCESS", payload: res.data });
    return res;
  } catch (err) {
    dispatch({ type: "SUBMITSPACE_FAIL" });
    console.log(err.response.data.errors);
  }
};
