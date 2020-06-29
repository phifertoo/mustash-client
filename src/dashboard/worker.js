export default () => {
  onmessage = async (e) => {
    // console.log('Message received from main script' + e.data[0]);
    // const workerResult = 'Result from webWorker';
    // console.log('Posting message back to main script');

    const addImages = async (data) => {
      const body = new FormData();
      body.append('_id', data._id);

      const imageArray = data.imageArray;
      /* when creating multiple blobs using an async function inside of the map method and you need to wait
       until all the async functions finish using "await Promise.all()" */

      await Promise.all(
        imageArray.map(async (element, index) => {
          body.append(
            `key${index}`,
            await fetch(element).then((r) => r.blob()) //convert blob URL to blob
          );
        })
      );

      try {
        const res = await fetch('http://localhost:5000/api/listing/images', {
          method: 'POST',
          headers: {
            // 'Content-Type': 'multipart/form-data',
            'x-auth-token': data.token,
          },
          body,
        });
        //send a message back to the component that the object was successfully posted to the backend

        postMessage(JSON.stringify(res));
      } catch (err) {
        console.log(err);
      }
    };
    // console.log(e.data[0], JSON.parse(e.data[0]));
    // const input = JSON.parse(e.data[0]);

    addImages(e.data[0]);
  };
};
