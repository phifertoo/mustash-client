import axios from 'axios';

const initialState = {
  conversations: [],
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case 'STARTCONVERSATION_SUCCESS':
    case 'GETCONVERSATIONS_SUCCESS':
    case 'REPLYCONVERSATION_SUCCESS':
    case 'DELETECONVERSATION_SUCCESS':
      return { ...state, conversations: payload };
    default:
      return state;
  }
}

export const getConversations = (token) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': token,
    },
  };
  try {
    const res = await axios.get(`/api/messages`, config);
    dispatch({ type: 'GETCONVERSATIONS_SUCCESS', payload: res.data });
  } catch (err) {
    console.log(err);
  }
};

export const startConversation = (input) => async (dispatch) => {
  console.log(input);

  const config = {
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': input.token,
    },
  };
  const body = {
    newMessage: input.newMessage,
  };
  try {
    const res = await axios.post(
      `/api/messages/${input.recipient_id}`,
      body,
      config
    );
    dispatch({ type: 'STARTCONVERSATION_SUCCESS', payload: res.data.result1 });
  } catch (err) {
    console.log(err);
  }
};

export const replyConversation = (input) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': input.token,
    },
  };
  const body = {
    newMessage: input.newMessage,
  };
  try {
    const res = await axios.post(
      `/api/messages/reply/${input.recipient_id}/${input.conversation_id}`,
      body,
      config
    );
    dispatch({ type: 'REPLYCONVERSATION_SUCCESS', payload: res.data.result1 });
  } catch (err) {
    console.log(err);
  }
};

export const deleteConversation = (input) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': input.token,
    },
  };
  try {
    const res = await axios.delete(
      `/api/messages/${input.conversation_id}`,
      config
    );
    console.log(res.data);
    dispatch({
      type: 'DELETECONVERSATION_SUCCESS',
      payload: res.data.conversations,
    });
  } catch (err) {
    console.log(err);
  }
};
