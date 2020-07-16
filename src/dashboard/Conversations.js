import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
// import Moment from 'react-moment';
import { connect } from 'react-redux';
import { dashboardMap } from './dashboardMap';
import {
  getConversations,
  startConversation,
  replyConversation,
  deleteConversation,
} from '../ducks/conversations';

const Conversations = ({
  step,
  getConversations,
  startConversation,
  replyConversation,
  deleteConversation,
  token,
}) => {
  useEffect(() => {
    getConversations(token);
  });

  const handleStartConversation = (recipient_id, token, newMessage) => {
    const input = { recipient_id, token, newMessage };
    startConversation(input);
  };

  const handleReplyConversation = (
    recipient_id,
    conversation_id,
    token,
    newMessage
  ) => {
    const input = { recipient_id, token, newMessage, conversation_id };
    replyConversation(input);
  };

  const handleDeleteConversation = (conversation_id, token) => {
    const input = { token, conversation_id };
    deleteConversation(input);
  };

  return (
    <Fragment>
      {dashboardMap[step] === 'conversations' && (
        <div className='comment-container p-1 my-1'>
          <div>
            <p className='comment-name'>test</p>
          </div>
          <div>
            <p className='my-1 post-text mb-4'>test</p>
            <p className='comment-date'> Posted on: test</p>
            <button
              className='btn btn-primary'
              onClick={() =>
                handleStartConversation(
                  '5f0a2a0d2f27286538d85df2',
                  token,
                  'test6'
                )
              }
            >
              Start Conversation
            </button>
            <button
              className='btn btn-primary'
              onClick={() =>
                handleReplyConversation(
                  '5f0a2a0d2f27286538d85df2',
                  '5ytq10yxlkk1xmkfr3eace',
                  token,
                  'test6'
                )
              }
            >
              Reply Conversation
            </button>
            <button
              className='btn btn-primary'
              onClick={() =>
                handleDeleteConversation('fbio3wzpngbgcbfidwtp2i', token)
              }
            >
              Delete Conversation
            </button>
          </div>
        </div>
      )}
    </Fragment>
  );
};

Conversations.propTypes = {
  getConversations: PropTypes.func.isRequired,
  startConversation: PropTypes.func.isRequired,
  replyConversation: PropTypes.func.isRequired,
  deleteConversation: PropTypes.func.isRequired,
  step: PropTypes.number.isRequired,
  token: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  step: state.updateListings.step,
  token: state.auth.token,
});

export default connect(mapStateToProps, {
  getConversations,
  startConversation,
  replyConversation,
  deleteConversation,
})(Conversations);
