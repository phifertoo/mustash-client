import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { dashboardMap } from './dashboardMap';
import profileWorker from './profileWorker';

export const UserProfile = ({ step, user_id, token }) => {
  const [data, setData] = useState({
    email: '',
    avatar: 'https://dummyimage.com/100x100/000/fff.png',
    firstName: '',
    lastName: '',
    city: '',
    phone: '',
    password: '',
    repeatPassword: '',
  });

  const {
    email,
    avatar,
    firstName,
    lastName,
    city,
    phone,
    password,
    repeatPassword,
  } = data;

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    if (e.target.files[0].size <= 3000000) {
      setData({
        ...data,
        avatar: window.URL.createObjectURL(e.target.files[0]),
      });
    } else {
      e.target.value = '';
      alert('Pictures must be less than 3MB');
    }
  };

  const code = profileWorker.toString();
  const blob = new Blob(['(' + code + ')()']);
  const myWorker = new Worker(URL.createObjectURL(blob));
  //add an event listener in the main file to listen for messages from the web worker
  myWorker.onmessage = (e) => {
    console.log('it worked');
  };

  const handleSubmit = (e, data, user_id, token) => {
    console.log(data);
    e.preventDefault();
    data.user_id = user_id;
    data.token = token;
    myWorker.postMessage(data);
  };

  return (
    <Fragment>
      {dashboardMap[step] === 'userProfile' && (
        <div className='container'>
          <h1>Edit Profile</h1>
          <hr />
          <div className='row'>
            <div className='col-md-3'>
              <div className='text-center'>
                <img src={avatar} className='avatar img-circle' alt='failed' />
                <h6>Upload a new photo</h6>
                <input
                  className='form-control'
                  name='image'
                  type='file'
                  accept='image/*'
                  onChange={(e) => handleImage(e)}
                />
              </div>
            </div>

            <div className='col-md-9 personal-info'>
              <div className='alert alert-info alert-dismissable'>
                <a className='panel-close close' data-dismiss='alert'>
                  ×
                </a>
                <i className='fa fa-coffee'></i>
                This is an <strong>.alert</strong>. Use this to show important
                messages to the user.
              </div>
              <h3>Personal info</h3>

              <form
                className='form-horizontal'
                onSubmit={(e) => handleSubmit(e, data, user_id, token)}
                role='form'
              >
                <div className='form-group'>
                  <label className='col-lg-3 control-label'>First name:</label>
                  <div className='col-lg-8'>
                    <input
                      className='form-control'
                      type='text'
                      name='firstName'
                      value={firstName}
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                </div>
                <div className='form-group'>
                  <label className='col-lg-3 control-label'>Last name:</label>
                  <div className='col-lg-8'>
                    <input
                      className='form-control'
                      type='text'
                      name='lastName'
                      value={lastName}
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                </div>
                <div className='form-group'>
                  <label className='col-lg-3 control-label'>Email:</label>
                  <div className='col-lg-8'>
                    <input
                      className='form-control'
                      type='email'
                      name='email'
                      value={email}
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                </div>
                <div className='form-group'>
                  <label className='col-lg-3 control-label'>
                    Phone Number:
                  </label>
                  <div className='col-lg-8'>
                    <input
                      className='form-control'
                      type='text'
                      name='phone'
                      value={phone}
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                </div>
                <div className='form-group'>
                  <label className='col-lg-3 control-label'>City:</label>
                  <div className='col-lg-8'>
                    <input
                      className='form-control'
                      type='text'
                      name='city'
                      value={city}
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                </div>
                <div className='form-group'>
                  <label className='col-lg-3 control-label'>
                    Change Password:
                  </label>
                  <div className='col-lg-8'>
                    <input
                      className='form-control'
                      type='password'
                      name='password'
                      value={password}
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                </div>
                <div className='form-group'>
                  <label className='col-lg-3 control-label'>
                    Repeat Password:
                  </label>
                  <div className='col-lg-8'>
                    <input
                      className='form-control'
                      type='password'
                      name='repeatPassword'
                      value={repeatPassword}
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                </div>

                <div className='form-group'>
                  <label className='col-md-3 control-label'></label>
                  <div className='col-md-8'>
                    <input
                      type='submit'
                      className='btn btn-primary'
                      value='Save Changes'
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

UserProfile.propTypes = {};

const mapStateToProps = (state) => ({
  step: state.updateListings.step,
  token: state.auth.token,
  user_id: state.auth.user,
});

export default connect(mapStateToProps, {})(UserProfile);
