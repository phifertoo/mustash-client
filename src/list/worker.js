export default () => {
  onmessage = async (e) => {
    // console.log('Message received from main script' + e.data[0]);
    // const workerResult = 'Result from webWorker';
    // console.log('Posting message back to main script');

    const submitSpace = async (data) => {
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
        // const res = await axios.post('/api/listing', body, config);
        const res = await fetch('http://localhost:5000/api/listing', {
          method: 'POST',
          headers: {
            // 'Content-Type': 'multipart/form-data',
            'x-auth-token': data.token,
          },
          body: body,
        });
        //send a message back to the component that the object was successfully posted to the backend

        postMessage(JSON.stringify(res));
      } catch (err) {
        console.log(err);
      }
    };
    // console.log(e.data[0], JSON.parse(e.data[0]));
    const input = JSON.parse(e.data[0]);

    submitSpace(input);
  };
};
