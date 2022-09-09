emailjs.init('LfsJWeBH_5GmVbGGx');

const btn = document.getElementById('btn__form');

document.getElementById('form')
 .addEventListener('submit', function(event) {
   event.preventDefault();

   btn.value = 'Sending...';

   const serviceID = 'service_te8rlzr';
   const templateID = 'template_1ef7yt6';

   emailjs.sendForm(serviceID, templateID, this)
    .then(() => {
      btn.value = 'ENVIAR';
      Toastify({
        text: "Mensaje enviado!",
        duration: 2000,
        gravity: "top",
        position: "right",
        style: {
          background: "#EFDFBF",
          margin:"60px",
          position:"absolute",
          color:"#1A3C40",
          border: "2px solid #1A3C40",
          cursor:"default",
          padding:"15px 20px"
        },
      }).showToast();
    }, (err) => {
      btn.value = 'ENVIAR';
      alert(JSON.stringify(err));
    });
});