  const allEvents = document.getElementById('posts');

//When user isnt interested anymore
async function subtractInterest (item) {
  const interestButton = document.getElementById(`interest-${item.id}`);
  await fetch(`http://localhost:3000/events/not_interested/${item.id}`, {
    method: 'PATCH'
  })
  .then(response => response.json())
  .then(data => {
    interestButton.innerHTML = `Interested ${data.intrest}`;
  })
  .catch(error => {
    console.error(error);
  });
  interestButton.addEventListener('click', () => addInterest(item), {once: true})
}

//when user is interested
async function addInterest (item) {
  const interestButton = document.getElementById(`interest-${item.id}`);
  await fetch(`http://localhost:3000/events/interested/${item.id}`, {
    method: 'PATCH'
  })
  .then(response => response.json())
  .then(data => {
    interestButton.innerHTML = `Interested ${data.intrest}`;
  })
  .catch(error => {
    console.error(error);
  });
  interestButton.addEventListener('click', () => subtractInterest(item), {once: true})
}

//not attending anymore
async function not_attending (item) {
  const attendButton = document.getElementById(`attend-${item.id}`);
  await fetch(`http://localhost:3000/events/not_attending/${item.id}`, {
    method: 'PATCH'
  })
  .then(response => response.json())
  .then(data => {
    attendButton.innerHTML = `Attending ${data.attending}`;
  })
  .catch(error => {
    console.error(error);
  });
  attendButton.addEventListener('click', () => attend(item), {once: true})
}

//attend event
async function attend (item) {
  const attendButton = document.getElementById(`attend-${item.id}`);
  await fetch(`http://localhost:3000/events/attend/${item.id}`, {
    method: 'PATCH'
  })
  .then(response => response.json())
  .then(data => {
    attendButton.innerHTML = `Attending ${data.attending}`;
  })
  .catch(error => {
    console.error(error);
  });
  attendButton.addEventListener('click', () => not_attending(item), {once: true})
}

const options = {
  headers: {
    'Authorization': localStorage.getItem('token')
  }
};

fetch('http://localhost:3000/events', options)
  .then(response => response.json())
  .then(data => {
    data.forEach(item => {
      const eventDiv = document.createElement('div');
      const eventTitle = document.createElement('h3');
      eventTitle.textContent = item.title;
      const eventContent = document.createElement('p');
      eventContent.textContent = item.description;
      const interest = document.createElement('button');
      interest.innerHTML = `Interested ${item.intrest}`;
      interest.id = `interest-${item.id}`;
      const attending = document.createElement('button');
      attending.innerHTML = `Attending ${item.attending}`;
      attending.id = `attend-${item.id}`;
      eventDiv.appendChild(eventTitle)
      eventDiv.appendChild(eventContent)
      eventDiv.appendChild(interest);
      eventDiv.appendChild(attending);
      interest.addEventListener('click', () => addInterest(item), {once: true});
      attending.addEventListener('click', () => attend(item), {once: true});
      allEvents.appendChild(eventDiv);

    });
  });



  const form = document.getElementById('post-form');
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const event_title = document.getElementById('title').value;
    const event_description = document.getElementById('content').value;
    const formData = {
      event_title,
      event_description
    };
  
    fetch('http://localhost:3000/events', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)

    })
    .then(response => response.json())
    .then(data => {

      item = data[0];
      const eventDiv = document.createElement('div');
      const eventTitle = document.createElement('h3');
      eventTitle.textContent = item.title;

      const eventContent = document.createElement('p');
      eventContent.textContent = item.description;

      const interest = document.createElement('button');
      interest.innerHTML = `Interested ${item.intrest}`;
      interest.id = `interest-${item.id}`;

      const attending = document.createElement('button');
      attending.innerHTML = `Attending ${item.attending}`;
      attending.id = `attend-${item.id}`;

      eventDiv.appendChild(eventTitle)
      eventDiv.appendChild(eventContent)
      eventDiv.appendChild(interest);
      eventDiv.appendChild(attending);
      interest.addEventListener('click', () => addInterest(item), {once: true});
      attending.addEventListener('click', () =>  attend(item), {once: true});
      allEvents.appendChild(eventDiv);
    })
    .catch(error => {
      console.error(error);
    });
  });
