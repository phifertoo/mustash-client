export default () => {
  onmessage = async (e) => {
    // console.log('Message received from main script' + e.data[0]);
    // const workerResult = 'Result from webWorker';
    // console.log('Posting message back to main script');

    const submitProfile = async (data) => {
      const { user_id, token } = data;

      const body = new FormData();

      Object.keys(data).forEach((element) => {
        if (element !== 'avatar' || element !== 'user_id') {
          body.append(element, data[element]);
        }
      });
      body.append(
        'avatar',
        await fetch(data.avatar).then((r) => r.blob()) //convert blob URL to blob
      );

      try {
        // const res = await axios.post('/api/listing', body, config);
        const res = await fetch(`http://localhost:5000/api/users/${user_id}`, {
          method: 'POST',
          headers: {
            // 'Content-Type': 'multipart/form-data',
            'x-auth-token': token,
          },
          body,
        });
        console.log(res);
        //send a message back to the component that the object was successfully posted to the backend
        postMessage(JSON.stringify(res));
      } catch (err) {
        console.log(err);
      }
    };
    // console.log(e.data[0], JSON.parse(e.data[0]));
    submitProfile(e.data);
  };
};
